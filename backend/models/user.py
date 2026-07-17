from database.db import db

class User(db.Model):
    
    __bind_key__ = "user"

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    uid = db.Column(db.String(200), unique=True, nullable=False)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(150), unique=True, nullable=False)

    photo = db.Column(db.String(500))

    provider = db.Column(db.String(20))

    created_at = db.Column(db.DateTime, server_default=db.func.now())