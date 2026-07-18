from flask import Blueprint, request, jsonify
from database.db import db
from models.booking import Booking

booking_bp = Blueprint(
    "booking_bp",
    __name__
)

# ===============================
# Create Booking
# ===============================
@booking_bp.route("/bookings", methods=["POST"])
def create_booking():

    data = request.get_json()

    required_fields = [
        "user_id",
        "provider_id",
        "provider_name",
        "contact",
        "amount"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False,
                "message": f"Missing field: {field}"
            }), 400

    booking = Booking(
        user_id=data["user_id"],
        provider_id=data["provider_id"],
        provider_name=data["provider_name"],
        contact=data["contact"],
        amount=data["amount"],
        status="Pending"
    )

    db.session.add(booking)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Booking Successful"
    }), 201


# ===============================
# Get All Bookings (Admin)
# ===============================
@booking_bp.route("/bookings", methods=["GET"])
def get_all_bookings():

    bookings = Booking.query.order_by(
        Booking.booking_date.desc()
    ).all()

    result = []

    for booking in bookings:
        result.append({
            "id": booking.id,
            "user_id": booking.user_id,
            "provider_id": booking.provider_id,
            "provider_name": booking.provider_name,
            "contact": booking.contact,
            "amount": booking.amount,
            "status": booking.status,
            "booking_date": booking.booking_date.strftime("%d-%m-%Y %H:%M")
        })

    return jsonify(result)


# ===============================
# User Booking History
# ===============================
@booking_bp.route("/bookings/user/<string:user_id>", methods=["GET"])
def get_user_bookings(user_id):

    bookings = Booking.query.filter_by(
        user_id=user_id
    ).order_by(
        Booking.booking_date.desc()
    ).all()

    result = []

    for booking in bookings:
        result.append({
            "id": booking.id,
            "provider_name": booking.provider_name,
            "contact": booking.contact,
            "amount": booking.amount,
            "status": booking.status,
            "booking_date": booking.booking_date.strftime("%d-%m-%Y %H:%M")
        })

    return jsonify(result)


# ===============================
# Update Booking Status
# ===============================
@booking_bp.route("/bookings/<int:id>", methods=["PUT"])
def update_booking(id):

    booking = Booking.query.get(id)

    if booking is None:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    data = request.get_json()

    if "status" not in data:
        return jsonify({
            "success": False,
            "message": "Status is required"
        }), 400

    booking.status = data["status"]

    db.session.commit()

    return jsonify({
        "success": True,
        "message": f"Booking {booking.status} successfully"
    }), 200


# ===============================
# Cancel Booking
# ===============================
@booking_bp.route("/bookings/<int:id>", methods=["DELETE"])
def delete_booking(id):

    booking = Booking.query.get(id)

    if booking is None:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    # Don't delete the record; mark it as cancelled.
    booking.status = "Cancelled"

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Booking Cancelled Successfully"
    }), 200