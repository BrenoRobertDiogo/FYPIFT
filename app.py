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

@app.route('/fazerLogin', methods=['post', 'get'])
def fazerLogin():  # put application's code here
    print(request.form.get('cadastro'))
    print(request.form.get('login'))
    if request.form.get('cadastro'):
        print('CADASTRO FEITO COM SUCESSO')
        nome = request.form.get('nome_cad')
        email = request.form.get('email_cad')
        senha = request.form.get('senha_cad')

        with open('dadosPessoas.json', 'r') as arq:
            dadosArq: list = json.load(arq)

        with open('dadosPessoas.json', 'w') as arq:
            
            dados = {"nome": nome, "senha": senha, "email": email}
            dadosArq.append(dados)
            arq.write(json.dumps(dadosArq))


        print(', '.join([nome, email, senha]))
        return redirect(url_for('login'))#render_template('login.html')
    else:
        print('LOGIN FEITO')
        email = request.form.get('email_login')
        senha = request.form.get('senha_login')

        with open('dadosPessoas.json', 'r') as arq:
            dadosArq: list = json.load(arq)
        print(', '.join([email, senha]))
        print(dadosArq)
        for data in dadosArq:
            
            if data['email'] == email and data['senha'] == senha:
                return render_template('index.html')# redirect(url_for('Principal'))
        return 'Senha errada'

if __name__ == '__main__':
    app.run(debug=True)
