from flask import Blueprint, request, jsonify
from database.db import db
from models.user import User

auth_bp = Blueprint("auth_bp", __name__, url_prefix="/api")

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    # Check if user already exists
    existing_user = User.query.filter_by(uid=data["uid"]).first()

    if existing_user:
        return jsonify({
            "message": "Welcome back!",
            "user": {
                "id": existing_user.id,
                "name": existing_user.name,
                "email": existing_user.email,
                "photo": existing_user.photo,
                "provider": existing_user.provider
            }
        }), 200

    # Create new user
    user = User(
        uid=data["uid"],
        name=data["name"],
        email=data["email"],
        photo=data["photo"],
        provider=data["provider"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "New user registered successfully!",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "photo": user.photo,
            "provider": user.provider
        }
    }), 201