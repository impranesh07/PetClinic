import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:

    # Default Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "instance", "contact.db")

    SQLALCHEMY_BINDS = {
        "doctor": "sqlite:///" + os.path.join(BASE_DIR, "instance", "doctor.db"),
        "product": "sqlite:///" + os.path.join(BASE_DIR, "instance", "product.db"),
        "vaccination": "sqlite:///" + os.path.join(BASE_DIR, "instance", "vaccination.db"),

        # ADD THIS
        "user": "sqlite:///" + os.path.join(BASE_DIR, "instance", "user.db")
    }

    SQLALCHEMY_TRACK_MODIFICATIONS = False