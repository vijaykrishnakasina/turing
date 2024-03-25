import os


class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///messages.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'
    JWT_SECRET_KEY = 'super-secret'
