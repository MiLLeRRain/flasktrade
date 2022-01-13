const rewire = require("rewire")
const render = rewire("./render")
const addDiamonds = render.__get__("addDiamonds")
// @ponicode
describe("addDiamonds", () => {
    test("0", () => {
        let result = addDiamonds()
        expect(result).toMatchSnapshot()
    })
})
