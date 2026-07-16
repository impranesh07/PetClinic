from database.db import db

class Product(db.Model):
    __bind_key__ = "product"
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    toy_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    material = db.Column(db.String(100))
    status = db.Column(db.String(50))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))