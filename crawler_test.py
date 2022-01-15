import crawler


class Test_Crawler_OpenUrl:

    def test_openUrl_1(self):
        result = crawler.openUrl("www.google.com")[:15]
        assert result == "failed"

    def test_openUrl_2(self):
        result = crawler.openUrl("https://")[:15]
        assert result == "failed"

    def test_openUrl_3(self):
        result = crawler.openUrl("")[:15]
        assert result == "failed"

    def test_openUrl_4(self):
        result = crawler.openUrl(None)[:15]
        assert result == "failed"

    def test_openUrl_5(self):
        result = crawler.openUrl("Www.GooGle.com")[:15]
        assert result == "failed"

    def test_openUrl_6(self):
        result = crawler.openUrl(crawler.targetUrl)[:15]
        assert result == "<!DOCTYPE html>"
