# flasktrade

Weekly assignment project

Deployed on AWS lightsail:
https://flasktrade-service.s5ei5ipq3r2cq.ap-southeast-2.cs.amazonlightsail.com/

Problems met and resolved:

/**
flask setups:
The other way to create app
def create_app():
    app = Flask(__name__)
    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    return app      
app = create_app()
$env:FLASK_ENV = "development" $env:FLASK_APP = "app.py" python -m flask run
**/

/**
plot not working:
FIX:
matplotlib(not use the latest one)
**/


/**
form POST submit from html not working
FIX:
in html file: request form must use method="POST" *capitalised POST
**/


/**
problem caused by venv:
FIX:
to include system-site-packages
include-system-site-packages = true #change from false to true to include all installed libs
**/


/**
problem caused by No 'Access-Control-Allow-Origin' header is present on the requested resource.
It happened when fetch() in *.js using different domain name
FIX:
If you are using Flask same as the question; you have first to install flask-cors
$ pip install -U flask-cors
Then include the Flask cors in your application.

from flask_cors import CORS
A simple application will look like:

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
  return "Hello, cross-origin-world!"
**/

/**
Date formation reading problem from csv
FIX:
data = bt.feeds.GenericCSVData(dataname='2020-FTM1d.csv', dtformat=2)
use dtformat=2 means using float unix timestamp
**/


/**
Flask not allowing import in static javascript, can only use native javascript
FIX:
1. use static *.js including inside html
  <script src=""></script>
2. make methods in custom js file as import was done normally
**/


/**
Need an asychonous way to fetch news feed using crawler
FIX:
setInterval( () => {
    // console.log(fetch('http://localhost:5000/crawler'))
    fetch('http://localhost:5000/crawler')
} , 10000)
**/


/**
Get-ExecutionPolicy -List
& "c:/Users/Liam Han/Desktop/COINVIEW/venv/Scripts/Activate.ps1"
Set-ExecutionPolicy Unrestricted -Scope Process
**/


/**
Cannot install libs while building docker
Set base image (host OS)
FROM python:3.8-buster (change from 3.8-alpine)
**/
