import get_data


class Test_Get_data_BuildKlines15m:

    def test_buildKlines15m_1(self):
        result = get_data.buildKlines15m("USDT")
        assert result == "failed"

    def test_buildKlines15m_2(self):
        result = get_data.buildKlines15m("LTC")
        assert result == "failed"

    def test_buildKlines15m_3(self):
        result = get_data.buildKlines15m(None)
        assert result == "failed"

    def test_buildKlines15m_4(self):
        result = get_data.buildKlines15m("XRP")
        assert result == "failed"

    def test_buildKlines15m_5(self):
        result = get_data.buildKlines15m("JPY")
        assert result == "failed"

    def test_buildKlines15m_6(self):
        result = get_data.buildKlines15m("ETH")
        assert result == "failed"

    def test_buildKlines15m_7(self):
        result = get_data.buildKlines15m("USD")
        assert result == "failed"
