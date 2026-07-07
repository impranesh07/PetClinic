from extainson import db
from datetime import datetime

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "fullName": self.full_name,
            "email": self.email,
            "message": self.message,
            "createdAt": self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }