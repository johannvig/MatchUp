from flask import Flask
from flask_cors import CORS
from models.utilisateur import db
from routes.auth import auth

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///matchup.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

app.register_blueprint(auth)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
