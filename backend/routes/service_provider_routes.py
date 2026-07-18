import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

from database.db import db
from models.service_provider import ServiceProvider

service_provider_bp = Blueprint(
    "service_provider_bp",
    __name__
)

UPLOAD_FOLDER = "uploads"


# -------------------------
# Add Service Provider
# -------------------------
@service_provider_bp.route("/providers", methods=["POST"])
def add_provider():

    name = request.form.get("name")
    service_type = request.form.get("service_type")
    experience = request.form.get("experience")
    contact = request.form.get("contact")
    rate = request.form.get("rate")
    details = request.form.get("details")

    photo = request.files.get("photo")

    filename = None

    if photo:

        os.makedirs(
            os.path.join(current_app.root_path, UPLOAD_FOLDER),
            exist_ok=True
        )

        filename = secure_filename(photo.filename)

        photo.save(
            os.path.join(
                current_app.root_path,
                UPLOAD_FOLDER,
                filename
            )
        )

    provider = ServiceProvider(
        name=name,
        service_type=service_type,
        experience=experience,
        contact=contact,
        rate=rate,
        details=details,
        photo=filename
    )

    db.session.add(provider)
    db.session.commit()

    return jsonify({
        "message": "Provider Added Successfully"
    }), 201


# -------------------------
# Get All Providers
# -------------------------
@service_provider_bp.route("/providers", methods=["GET"])
def get_providers():

    providers = ServiceProvider.query.all()

    data = []

    for p in providers:

        photo_url = None

        if p.photo:
            photo_url = request.host_url + "uploads/" + p.photo

        data.append({
            "id": p.id,
            "name": p.name,
            "service_type": p.service_type,
            "experience": p.experience,
            "contact": p.contact,
            "rate": p.rate,
            "details": p.details,
            "photo": photo_url
        })

    return jsonify(data)


# -------------------------
# Delete Service Provider
# -------------------------
@service_provider_bp.route("/providers/<int:id>", methods=["DELETE"])
def delete_provider(id):

    provider = ServiceProvider.query.get(id)

    if provider is None:
        return jsonify({
            "message": "Provider not found"
        }), 404

    # Delete image from uploads folder
    if provider.photo:

        image_path = os.path.join(
            current_app.root_path,
            UPLOAD_FOLDER,
            provider.photo
        )

        if os.path.exists(image_path):
            os.remove(image_path)

    db.session.delete(provider)
    db.session.commit()

    return jsonify({
        "message": "Provider deleted successfully"
    }), 200