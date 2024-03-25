from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(256), nullable=False)
    user = db.Column(db.String(128), nullable=True)

    def __repr__(self):
        return '<Message %r>' % self.content
