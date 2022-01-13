const rewire = require("rewire")
const chart = rewire("./chart")
const realtimeUpdate = chart.__get__("realtimeUpdate")
// @ponicode
describe("realtimeUpdate", () => {
    test("0", () => {
        realtimeUpdate("ETH")
    })

    test("1", () => {
        realtimeUpdate("JPY")
    })

    test("2", () => {
        realtimeUpdate("BTC")
    })

    test("3", () => {
        realtimeUpdate(undefined)
    })

    test("4", () => {
        realtimeUpdate("")
    })
})
