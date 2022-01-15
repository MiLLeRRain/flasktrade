from time import sleep
from flask import Flask, render_template, request, flash, redirect, jsonify
from numpy import equal
from werkzeug.utils import send_from_directory
import conf
from binance.client import Client
from binance.enums import *
import backtest
from flask_cors import CORS
import crawler as cr
import iconfetch as icon
import requests


app = Flask(__name__)
app.secret_key = b'&*!@^(F*(*ASgvdsASf-sag123'

CORS(app)

title = symbol = 'BTCUSDT'
news = ""

client = Client(conf.API_Key, conf.API_SecretKey)
urlCryptoCompare = "https://min-api.cryptocompare.com/data/all/coinlist?"
allCoinData = requests.get(urlCryptoCompare).json()


@app.route('/')
def index():

    account = client.get_account()
    balances = account['balances']

    exchange_info = client.get_exchange_info()
    symbols = exchange_info['symbols']

    # Get fiat trading pairs Symbol
    fiatSymbs = []

    for fiatsymb in symbols:
        if fiatsymb['quoteAsset'] == 'USDT':
            fiatSymbs.append(fiatsymb['symbol'])
    # print(fiatSymbs)

    # Get account balances with values > 0
    legit_balances = []

    for bal in balances:
        if float(bal['free']) > 0:
            legit_balances.append(bal)
            url = icon.getIcon(bal['asset'], allCoinData)
            bal['imgUrl'] = url
            # print(bal)
            # print(url)
    # print(legit_balances)

    return render_template('index.html', title=title, my_balances=legit_balances, fiatSymbols=fiatSymbs)


@app.route('/buy', methods=['POST'])
def buy():
    global title, symbol
    title = symbol = request.form['select_symbol']
    try:
        order = client.create_order(
            symbol=request.form['select_symbol'],
            side=SIDE_BUY,
            # type=ORDER_TYPE_MARKET,
            type=ORDER_TYPE_LIMIT,
            timeInForce=TIME_IN_FORCE_GTC,
            quantity=request.form['quantity'],
            price='2500'
        )
    except Exception as e:
        flash(str(e), "Buy Error")

    return redirect('/')


@app.route('/crawler')
def crawler():
    cr.fetch()
    return "fetch"


@app.route('/newsfeed')
def newsfeed():
    return cr.getLastNewsJson()


@app.route('/history')
def history():
    global symbol
    candlesticks = client.get_historical_klines(
        symbol, Client.KLINE_INTERVAL_15MINUTE, "1 Jan, 2022")
    # (method) get_historical_klines:
    # (symbol, interval, start_str, end_str=None, limit=500, klines_type: HistoricalKlinesType = HistoricalKlinesType.SPOT) -> list

    processed_candlesticks = []

    for data in candlesticks:
        candlestick = {
            "time": data[0] / 1000,
            "open": data[1],
            "high": data[2],
            "low": data[3],
            "close": data[4],
            "symbol": symbol
        }

        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)


@app.route('/test', methods=['POST'])
def test():
    print(request.form)
    global symbol
    if symbol != "":
        try:
            startDate = request.form['startDate']
            endDate = request.form['endDate']
            backtest.test(startDate, endDate, 30, 70, symbol)
        except Exception as e:
            flash(str(e), "Test Error")
    return redirect('/')


# @app.route('/static/<path:filename>')
# def es_static(filename):
#     return send_from_directory("static", filename)


@app.route('/play')
def play():
    return render_template('play.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
