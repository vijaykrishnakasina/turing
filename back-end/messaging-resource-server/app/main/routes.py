from flask import Blueprint

from app.main import main_blueprint


@main_blueprint.route('/')
def index():
    return "Welcome to the messaging API!"
