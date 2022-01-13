import backtrader as bt
import datetime
import get_data

oversell = 30
overbuy = 70

class RSIStrategy(bt.Strategy):

    def __init__(self):
        self.rsi = bt.talib.RSI(self.data, period=14)

    def next(self):
        if self.rsi < oversell and not self.position:
            self.buy(size=10000)
        if self.rsi > overbuy and self.position:
            self.close()

def test(start, end, os, ob, symbol):

    if get_data.buildKlines15m(symbol) != "finished":
        print("failed")
        return
    # start = '2021-7-1'
    # end = '2021-12-31'
    cerebro = bt.Cerebro()

    global oversell
    oversell = os
    global overbuy
    overbuy = ob

    fromdate = datetime.datetime.strptime(start, '%Y-%m-%d')
    todate = datetime.datetime.strptime(end, '%Y-%m-%d')
    data = bt.feeds.GenericCSVData(dataname='data/2021-'+symbol+'15m.csv',
                                dtformat=2, compression=15,
                                timeframe=bt.TimeFrame.Minutes,
                                fromdate=fromdate, todate=todate
                                )

    cerebro.adddata(data)
    cerebro.addstrategy(RSIStrategy)

    cerebro.run()
    cerebro.plot()
