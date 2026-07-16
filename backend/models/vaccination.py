from database.db import db

class Vaccination(db.Model):
    __bind_key__ = "vaccination"
    __tablename__ = "vaccinations"

    id = db.Column(db.Integer, primary_key=True)

    pet_name = db.Column(db.String(100), nullable=False)

    age = db.Column(db.String(50), nullable=False)

    breed = db.Column(db.String(100), nullable=False)

    gender = db.Column(db.String(20), nullable=False)

    preferred_date = db.Column(db.String(50), nullable=False)

    vaccine = db.Column(db.String(100), nullable=False)

    status = db.Column(db.String(20), default="Pending")