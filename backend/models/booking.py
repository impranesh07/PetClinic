from datetime import datetime
from database.db import db


class Booking(db.Model):

    __bind_key__ = "booking"

    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    # Firebase UID
    user_id = db.Column(db.String(128), nullable=False)

    provider_id = db.Column(db.Integer, nullable=False)

    provider_name = db.Column(db.String(100), nullable=False)

    contact = db.Column(db.String(20), nullable=False)

    amount = db.Column(db.Integer, nullable=False)

    status = db.Column(
        db.String(30),
        default="Pending"
    )

    booking_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )