from flask import Flask, render_template, request, redirect
import json

from flask.helpers import url_for

app = Flask(__name__)

@app.route('/login', methods=['get'])
def login():  # put application's code here
    return render_template('login.html')

@app.route('/index', methods=['get', 'post'])
def index():  # put application's code here
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
