import conf
import csv
from binance.client import Client
import time

client = Client(conf.API_Key, conf.API_SecretKey)

exchange_info = client.get_exchange_info()
# print(exchange_info)

# Get all prices
# prices = client.get_all_tickers()
# for coinPrice in prices:
#     print(coinPrice)

# tickers = client.get_ticker(symbol='FTMUSDT')
# print(tickers)

# candles = client.get_klines(
#     symbol='FTMUSDT', interval=Client.KLINE_INTERVAL_15MINUTE)

# file = open('data/15minutes.csv', 'w', newline='')
# candlestick_writer = csv.writer(file, delimiter=',')

# for candlestick in candles:
#     print(candlestick)
#     candlestick[0] = candlestick[0] / 1000
#     candlestick_writer.writerow(candlestick)

# file.close()


def buildKlines15m(symbol):
    try:
        print("Start building data:" + symbol)
        candlesticks = client.get_historical_klines(
            symbol, Client.KLINE_INTERVAL_15MINUTE, "1609459200",
            str(time.time()))

        file2 = open('data/2021-' + symbol + '15m.csv', 'w', newline='')
        candlestick_writer2 = csv.writer(file2, delimiter=',')

        for candlestick in candlesticks:
            candlestick[0] = candlestick[0] / 1000
            candlestick_writer2.writerow(candlestick)

        file2.close()
        print("Done building data:" + symbol)
        return "finished"
    except Exception:
        print("Failed building data")
        return "failed"


def getExchangeInfo():
    try:
        file3 = open('data/exchange_info.csv', 'w', newline='')
        exinfo_writer = csv.writer(file3)

        pack = exchange_info['symbols']

        for pak in pack:
            for k, v in pak.items():
                exinfo_writer.writerow([k, v])

        file3.close()
        print("Done fetching exchange info")
        return True
    except Exception:
        print("Failed fetching exchange info")
        return False
