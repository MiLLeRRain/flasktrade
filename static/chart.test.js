const chart = require("./chart");
const realtimeUpdate = chart.__get__("realtimeUpdate");
// @ponicode
describe("realtimeUpdate", () => {
  test("0", () => {
    let result = realtimeUpdate("wss://stream.binance.com:9443/ws/");
    expect(result).toBe("error");
  });

  test("1", () => {
    let result = realtimeUpdate("ltcusdt");
    expect(result).toBe("success");
  });

  test("2", () => {
    let result = realtimeUpdate("USDT");
    expect(result).toBe("error");
  });

  test("3", () => {
    let result = realtimeUpdate("BCHusdt");
    expect(result).toBe("error");
  });

  test("4", () => {
    let result = realtimeUpdate("GBP");
    expect(result).toBe("error");
  });

  test("5", () => {
    let result = realtimeUpdate("btcusdt");
    expect(result).toBe("success");
  });

  test("6", () => {
    let result = realtimeUpdate("JPY");
    expect(result).toBe("error");
  });

  test("7", () => {
    let result = realtimeUpdate("");
    expect(result).toBe("error");
  });

  test("8", () => {
    let result = realtimeUpdate(undefined);
    expect(result).toBe("error");
  });

  test("9", () => {
    let result = realtimeUpdate("ETH");
    expect(result).toMatchSnapshot();
  });

  test("10", () => {
    let result = realtimeUpdate("BSV");
    expect(result).toMatchSnapshot();
  });

  test("11", () => {
    let result = realtimeUpdate("USD");
    expect(result).toMatchSnapshot();
  });

  test("12", () => {
    let result = realtimeUpdate("XRP");
    expect(result).toMatchSnapshot();
  });

  test("13", () => {
    let result = realtimeUpdate("EUR");
    expect(result).toMatchSnapshot();
  });
});
