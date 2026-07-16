from database.db import db

class Doctor(db.Model):
      
    __bind_key__ = "doctor" 

    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    specialization = db.Column(db.String(100), nullable=False)

    experience = db.Column(db.String(50), nullable=False)

    timing = db.Column(db.String(100), nullable=False)

    photo = db.Column(db.String(255), nullable=True)