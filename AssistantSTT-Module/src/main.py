from flask import Flask
from flask_cors import CORS
from routes import routes

# Initialize flask server
app = Flask(__name__)
# To deal with CrossOrigin issue,
# when requests come from the system running the server
CORS(app)
# Register routes as blueprint
app.register_blueprint(routes)

# Run flask server
if __name__ == '__main__':
    app.run(debug=True)