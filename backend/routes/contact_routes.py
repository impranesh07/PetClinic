from flask import Blueprint, request, jsonify
from database.db import db
from models.contact_model import Contact

contact_bp = Blueprint("contact_bp", __name__)


@contact_bp.route("/api/contact", methods=["POST"])
def save_contact():

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    fullName = data.get("fullName")
    email = data.get("email")
    message = data.get("message")

    if not fullName or not email or not message:
        return jsonify({"message": "All fields are required"}), 400

    new_contact = Contact(
        fullName=fullName,
        email=email,
        message=message
    )

    db.session.add(new_contact)
    db.session.commit()

    return jsonify({
        "message": "Contact saved successfully"
    }), 201