from flask import Blueprint, request, jsonify
from extainson import db
from models import ContactMessage

# Create a Blueprint named 'contact_bp'
contact_bp = Blueprint('contact_bp', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    full_name = data.get('fullName')
    email = data.get('email')
    message = data.get('message')
    
    if not full_name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400
    
    try:
        new_message = ContactMessage(full_name=full_name, email=email, message=message)
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "Saved successfully!",
            "received_data": new_message.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500