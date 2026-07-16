import os

from flask import Blueprint
from flask import request
from flask import jsonify

from werkzeug.utils import secure_filename

from database.db import db
from models.doctor_model import Doctor

doctor_bp = Blueprint("doctor_bp", __name__)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@doctor_bp.route("/api/doctors", methods=["POST"])
def add_doctor():

    name = request.form.get("name")
    specialization = request.form.get("specialization")
    experience = request.form.get("experience")
    timing = request.form.get("timing")

    image = request.files.get("photo")

    filename = ""

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(UPLOAD_FOLDER, filename))

    doctor = Doctor(
        name=name,
        specialization=specialization,
        experience=experience,
        timing=timing,
        photo=filename
    )

    db.session.add(doctor)
    db.session.commit()

    return jsonify({
        "message": "Doctor Added Successfully"
    })


@doctor_bp.route("/api/doctors", methods=["GET"])
def get_doctors():

    doctors = Doctor.query.all()

    data = []

    for doctor in doctors:

        data.append({

            "id": doctor.id,
            "name": doctor.name,
            "specialization": doctor.specialization,
            "experience": doctor.experience,
            "timing": doctor.timing,
            "photo": f"http://127.0.0.1:5000/uploads/{doctor.photo}"

        })

    return jsonify(data)