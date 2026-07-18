import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:

    # Default Database (Contact)
    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" + os.path.join(BASE_DIR, "instance", "contact.db")
    )

    # Multiple Databases
    SQLALCHEMY_BINDS = {
    "doctor": "sqlite:///" + os.path.join(BASE_DIR, "instance", "doctor.db"),

    "product": "sqlite:///" + os.path.join(BASE_DIR, "instance", "product.db"),

    "vaccination": "sqlite:///" + os.path.join(BASE_DIR, "instance", "vaccination.db"),

    "user": "sqlite:///" + os.path.join(BASE_DIR, "instance", "user.db"),

    "service_provider": "sqlite:///" + os.path.join(BASE_DIR, "instance", "service_provider.db"),

    # NEW
    "booking": "sqlite:///" + os.path.join(BASE_DIR, "instance", "booking.db")
  }
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False