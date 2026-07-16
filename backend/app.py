import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from sqlalchemy import inspect

from config import Config
from database.db import db

# Import Models
from models.doctor_model import Doctor
from models.product import Product
from models.vaccination import Vaccination

# Import Blueprints
from routes.contact_routes import contact_bp
from routes.doctor_routes import doctor_bp
from routes.product_routes import product_bp
from routes.vaccination_routes import vaccination_bp

app = Flask(__name__)

# Load Configuration
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize Database
db.init_app(app)

# Register Blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(product_bp)
app.register_blueprint(vaccination_bp)

# Create Database Tables
with app.app_context():
    db.create_all()

    print("=" * 50)
    print("Petify Backend Started Successfully")
    print("=" * 50)

    # Contact Database
    print("\nContact Database")
    contact_inspector = inspect(db.engine)
    print(contact_inspector.get_table_names())

    # Doctor Database
    doctor_inspector = inspect(db.engines["doctor"])
    print("\nDoctor Database")
    print(doctor_inspector.get_table_names())

    # Product Database
    product_inspector = inspect(db.engines["product"])
    print("\nProduct Database")
    print(product_inspector.get_table_names())

    # Vaccination Database
    vaccination_inspector = inspect(db.engines["vaccination"])
    print("\nVaccination Database")
    print(vaccination_inspector.get_table_names())

    print("=" * 50)


@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Petify Flask Backend Running"
    }


@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)


if __name__ == "__main__":
    os.makedirs("uploads", exist_ok=True)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )