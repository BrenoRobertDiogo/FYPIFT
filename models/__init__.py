from peewee import *
import datetime

db = SqliteDatabase('./db/aplicacao.db')

class BaseModel(Model):
    class Meta:
        database = db

class Usuario(BaseModel):
    usuario = CharField(max_length=50)
    senha   = CharField(max_length=100)
    perfil  = CharField(max_length=20)
    criacao = DateTimeField(default=datetime.datetime.now)

class Local(BaseModel):
    tipo = CharField(max_length=255)
    nome = CharField(max_length=255)
    lat  = DoubleField()
    lng  = DoubleField()
