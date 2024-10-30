from flask import Flask
from flask_cors import CORS
from routes import routes
import os

# Initialize our service
app = Flask(__name__)
CORS(app)
# Register the routes we defined the the routes.py blueprint
app.register_blueprint(routes)

# Run our server
if __name__ == '__main__':
    app.run(debug=True)