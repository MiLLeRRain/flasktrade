from bs4 import BeautifulSoup
import requests
import json as js
from flask import jsonify

# Announcement page
targetUrl = "https://www.binance.com/en/support/announcement/c-48?navId=48"
urlHead = "https://www.binance.com/en/support/announcement/{}"
filename = "new_listing"


def openUrl(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'}
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        r.encoding = 'utf-8'
        print("success loading {}".format(url))
        return r.text
    else:
        print("failed loading {}".format(url))


def readLast():
    precode = 0
    try:
        with open(filename, 'r') as f:
            array = js.load(f)
            precode = array[0]['code']
        f.close()
    except Exception:
        print("error reading file")
    print("Last stored code:" + precode)
    return precode


def getLastNewsJson():
    try:
        with open(filename, 'r') as f:
            array = js.load(f)
            lastNews_href = urlHead.format(array[0]['code']) # parse.urljoin(urlHead, array[0]['code'])
            lastNewsJson = {
                "title": array[0]['title'],
                "lastNews_href": lastNews_href,
                "date": array[0]['releaseDate']
            }
        f.close()
        return jsonify(lastNewsJson)
    except Exception:
        print("error reading file")


def pushNews(lastNews, lastNews_code, updateDate):
    # Assemble the url with code
    lastNews_href = urlHead.format(lastNews_code) # parse.urljoin(urlHead, array[0]['code'])
    print("\n", "lastNews_href:", lastNews_href, "\n", "title:", lastNews)
    return jsonify({
        "title": lastNews,
        "lastNews_href": lastNews_href,
        "date": updateDate
    })


def fetch():
    preNews_code = readLast()
    lastNews = ""
    print("watching...", targetUrl, "#FF0000")
    # while True:
    ret = openUrl(targetUrl)
    if ret:
        # turn html text to object
        soup = BeautifulSoup(ret, 'html.parser')
        # find the New Listing feeds
        article_data = js.loads(
            soup.find("script", {"id": "__APP_DATA"}).get_text())
        articles = article_data['routeProps']['b723']['catalogs'][0]['articles']

        lastNewsPack = articles[0]
        print(lastNewsPack)
        lastNews = lastNewsPack['title']
        lastNews_code = lastNewsPack['code']
        updateDate = lastNewsPack['releaseDate']

        if preNews_code != lastNews_code:
            print("New Listing Update:")
            preNews_code = lastNews_code
            # write to local
            with open(filename, 'w') as f:
                js.dump(articles, f)
            f.close()
            pushNews(lastNews, lastNews_code, updateDate)
    # time.sleep(10)