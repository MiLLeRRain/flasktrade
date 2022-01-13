urlBase = "https://www.cryptocompare.com{}"


def getIcon(symbol, data):
    # print(data)
    # print(type(data['Response']))
    imgUrl = urlBase.format(data['Data'][symbol]['ImageUrl'])
    return imgUrl
