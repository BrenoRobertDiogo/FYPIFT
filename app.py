from flask import Flask, render_template, request, redirect, jsonify
import json
from models import Local, Usuario
from utils.logger import settingsColor, getLoggerAplication
from playhouse.shortcuts import model_to_dict, dict_to_model

from flask.helpers import url_for

settingsColor()

logDados = getLoggerAplication("DADOS")

app = Flask(__name__)

@app.route('/login', methods=['get'])
def login():  # put application's code here
    return render_template('login.html')

@app.route('/', methods=['get', 'post'])
def index():  # put application's code here
    return render_template('index.html')

@app.route("/dados/<local>")
def dados(local):
    result = list( Local.select().where( Local.tipo == local.upper() ).dicts() )
    return jsonify( { "dados": result } ), 200

if __name__ == '__main__':
    app.run(debug=True)
