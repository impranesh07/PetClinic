import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from sqlalchemy import inspect

from config import Config
from database.db import db

# ===========================
# Import Models
# ===========================
from models.doctor_model import Doctor
from models.product import Product
from models.vaccination import Vaccination
from models.user import User
from models.service_provider import ServiceProvider
from models.booking import Booking

# ===========================
# Import Blueprints
# ===========================
from routes.contact_routes import contact_bp
from routes.doctor_routes import doctor_bp
from routes.product_routes import product_bp
from routes.vaccination_routes import vaccination_bp
from routes.auth_routes import auth_bp
from routes.service_provider_routes import service_provider_bp
from routes.booking_routes import booking_bp

# ===========================
# Create Flask App
# ===========================
app = Flask(__name__)

# ===========================
# Configuration
# ===========================
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize Database
db.init_app(app)

# ===========================
# Register Blueprints
# ===========================
app.register_blueprint(contact_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(product_bp)
app.register_blueprint(vaccination_bp)
app.register_blueprint(auth_bp)

# Service Provider Routes
app.register_blueprint(service_provider_bp, url_prefix="/api")

# Booking Routes
app.register_blueprint(booking_bp, url_prefix="/api")

# ===========================
# Create Upload Folder
# ===========================
os.makedirs("uploads", exist_ok=True)

# ===========================
# Create Database Tables
# ===========================
with app.app_context():

    db.create_all()

    print("=" * 70)
    print("🚀 Petify Backend Started Successfully")
    print("=" * 70)

    # Default Database
    try:
        print("\nDefault Database")
        print(inspect(db.engine).get_table_names())
    except Exception as e:
        print("Default DB Error:", e)

    # Doctor Database
    try:
        print("\nDoctor Database")
        print(inspect(db.engines["doctor"]).get_table_names())
    except Exception as e:
        print("Doctor DB Error:", e)

    # Product Database
    try:
        print("\nProduct Database")
        print(inspect(db.engines["product"]).get_table_names())
    except Exception as e:
        print("Product DB Error:", e)

    # Vaccination Database
    try:
        print("\nVaccination Database")
        print(inspect(db.engines["vaccination"]).get_table_names())
    except Exception as e:
        print("Vaccination DB Error:", e)

    # User Database
    try:
        print("\nUser Database")
        print(inspect(db.engines["user"]).get_table_names())
    except Exception as e:
        print("User DB Error:", e)

    # Service Provider Database
    try:
        print("\nService Provider Database")
        print(inspect(db.engines["service_provider"]).get_table_names())
    except Exception as e:
        print("Service Provider DB Error:", e)

    # Booking Database
    try:
        print("\nBooking Database")
        print(inspect(db.engines["booking"]).get_table_names())
    except Exception as e:
        print("Booking DB Error:", e)

    print("=" * 70)

# ===========================
# Home Route
# ===========================
@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Petify Flask Backend Running"
    }

# ===========================
# Serve Uploaded Images
# ===========================
@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)

# ===========================
# Run Server
# ===========================
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )