from flask import Flask
from routes import routes
from flask_cors import CORS


# Initialize our service
app = Flask(__name__)
# To deal with CrossOrigin issue,
# when requests come from the system running the server
CORS(app)
# Register the routes we defined the the routes.py blueprint
app.register_blueprint(routes)

# Run our server
if __name__ == '__main__':
    app.run(debug=True)