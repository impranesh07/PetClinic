import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from database.db import db
from models.product import Product

product_bp = Blueprint("product_bp", __name__, url_prefix="/api")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ===========================
# Add Product
# ===========================
@product_bp.route("/add-product", methods=["POST"])
def add_product():

    toy_name = request.form.get("toy_name")
    category = request.form.get("category")
    price = request.form.get("price")
    material = request.form.get("material")
    status = request.form.get("status")
    description = request.form.get("description")

    image = request.files.get("image")

    filename = ""

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(UPLOAD_FOLDER, filename))

    product = Product(
        toy_name=toy_name,
        category=category,
        price=float(price),
        material=material,
        status=status,
        description=description,
        image=filename
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({
        "message": "Product Added Successfully"
    }), 201


# ===========================
# Get All Products
# ===========================
@product_bp.route("/products", methods=["GET"])
def get_products():

    products = Product.query.all()

    data = []

    for product in products:
        data.append({
            "id": product.id,
            "name": product.toy_name,
            "category": product.category,
            "price": product.price,
            "material": product.material,
            "status": product.status,
            "description": product.description,
            "image": f"http://127.0.0.1:5000/uploads/{product.image}" if product.image else None
        })

    return jsonify(data)


# ===========================
# Delete Product
# ===========================
@product_bp.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product Deleted Successfully"
    })