var chart = LightweightCharts.createChart(document.getElementById("chart"), {
  width: 500,
  height: 300,
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  layout: {
    backgroundColor: "#253248",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "#334158",
    },
    horzLines: {
      color: "#334158",
    },
  },
  crosshair: {
    mode: LightweightCharts.CrosshairMode.Magnet,
    // .Normal
  },
  rightpriceScale: {
    scaleMargins: {
      top: 0.3,
      bottom: 0.25,
    },
    borderVisible: true,
    borderColor: "#485c7b",
  },
  timeScale: {
    borderColor: "#485c7b",
  },
});

var candleSeries = chart.addCandlestickSeries({
  upColor: "#4bffb5",
  downColor: "#ff4976",
  borderDownColor: "#ff4976",
  borderUpColor: "#4bffb5",
  wickDownColor: "#838ca1",
  wickUpColor: "#838ca1",
});

var volumeSeries = chart.addHistogramSeries({
  color: "#26a69a",
  priceFormat: {
    type: "volume",
  },
  priceScaleId: "",
  scaleMargins: {
    top: 0.8,
    bottom: 0,
  },
});

fetch(
  "https://flasktrade-service.s5ei5ipq3r2cq.ap-southeast-2.cs.amazonlightsail.com/history"
)
  .then((r) => r.json())
  .then((response) => {
    // console.log(response)
    candleSeries.setData(response);
    var temp = JSON.stringify(response[0]);
    var symbol = JSON.parse(temp)["symbol"].toLowerCase();
    realtimeUpdate(symbol);
  });

exports.realtimeUpdate = (symbol) => {
  var urlBinanceSocket =
    "wss://stream.binance.com:9443/ws/" + symbol + "@kline_15m";
  // console.log(urlBinanceSocket)
  var binanceSocket = new WebSocket(urlBinanceSocket);

  binanceSocket.onerror = function (event) {
    console.log(event);
    return "error";
  };

  binanceSocket.onmessage = function (event) {
    // console.log(event.data)
    var kmsg = JSON.parse(event.data);
    var updateCandlestick = kmsg.k;
    // console.log(updateCandlestick)
    candleSeries.update({
      time: updateCandlestick.t / 1000, // time: Date.now(),
      open: updateCandlestick.o,
      high: updateCandlestick.h,
      low: updateCandlestick.l,
      close: updateCandlestick.c,
    });
    return "success";
  };
};
