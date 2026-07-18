from database.db import db

class ServiceProvider(db.Model):
     
    __bind_key__ = "service_provider"
    __tablename__ = "service_providers"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(150), nullable=False)

    service_type = db.Column(db.String(100), nullable=False)

    experience = db.Column(db.Integer, nullable=False)

    contact = db.Column(db.String(20), nullable=False)

    rate = db.Column(db.Integer, nullable=False)

    details = db.Column(db.Text)

    photo = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.service_type,
            "experience": f"{self.experience} Years",
            "contact": self.contact,
            "rate": f"₹{self.rate}",
            "details": self.details,
            "photo": self.photo
        }