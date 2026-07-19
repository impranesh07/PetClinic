from flask import Blueprint, request, jsonify
from database.db import db
from models.vaccination import Vaccination

vaccination_bp = Blueprint(
    "vaccination_bp",
    __name__,
    url_prefix="/api"
)

# =====================================
# Submit Vaccination Request
# =====================================
@vaccination_bp.route("/vaccination", methods=["POST"])
def add_vaccination():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        vaccination = Vaccination(
            user_uid=data.get("user_uid"),   # Firebase UID
            pet_name=data.get("pet_name"),
            age=data.get("age"),
            breed=data.get("breed"),
            gender=data.get("gender"),
            preferred_date=data.get("preferred_date"),
            vaccine=data.get("vaccine"),
            status="Pending"
        )

        db.session.add(vaccination)
        db.session.commit()

        return jsonify({
            "message": "Vaccination Request Submitted Successfully"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# =====================================
# Admin - Get All Requests
# =====================================
@vaccination_bp.route("/vaccination", methods=["GET"])
def get_vaccinations():

    vaccinations = Vaccination.query.all()

    result = []

    for item in vaccinations:
        result.append({
            "id": item.id,
            "user_uid": item.user_uid,
            "pet_name": item.pet_name,
            "age": item.age,
            "breed": item.breed,
            "gender": item.gender,
            "preferred_date": item.preferred_date,
            "vaccine": item.vaccine,
            "status": item.status
        })

    return jsonify(result)


# =====================================
# User - Get Own Requests
# =====================================
@vaccination_bp.route("/vaccination/user/<string:user_uid>", methods=["GET"])
def get_user_vaccination(user_uid):

    vaccinations = Vaccination.query.filter_by(user_uid=user_uid).all()

    result = []

    for item in vaccinations:
        result.append({
            "id": item.id,
            "pet_name": item.pet_name,
            "age": item.age,
            "breed": item.breed,
            "gender": item.gender,
            "preferred_date": item.preferred_date,
            "vaccine": item.vaccine,
            "status": item.status
        })

    return jsonify(result)


# =====================================
# Approve Request
# =====================================
@vaccination_bp.route("/vaccination/<int:id>/approve", methods=["PUT"])
def approve_request(id):

    vaccination = Vaccination.query.get_or_404(id)

    vaccination.status = "Approved"

    db.session.commit()

    return jsonify({
        "message": "Vaccination Approved Successfully"
    })


# =====================================
# Reject Request
# =====================================
@vaccination_bp.route("/vaccination/<int:id>/reject", methods=["PUT"])
def reject_request(id):

    vaccination = Vaccination.query.get_or_404(id)

    vaccination.status = "Rejected"

    db.session.commit()

    return jsonify({
        "message": "Vaccination Rejected Successfully"
    })