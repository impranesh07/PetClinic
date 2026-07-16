from database.db import db

class Contact(db.Model):

    __tablename__ = "contacts"

    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __init__(self, fullName, email, message):
        self.fullName = fullName
        self.email = email
        self.message = message