from flask import Flask
from flask_cors import CORS
from extainson import db
from backend.routes.contact import contact_bp

app = Flask(__name__)
CORS(app)

# Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact_form.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Bind database to this app
db.init_app(app)

# Register your feature blueprints here
app.register_blueprint(contact_bp)

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)