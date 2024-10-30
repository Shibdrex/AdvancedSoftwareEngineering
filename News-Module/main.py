from flask import Flask
from routes import routes

# Initialize our service
app = Flask(__name__)

# Register the routes we defined the the routes.py blueprint
app.register_blueprint(routes)

# Run our server
if __name__ == '__main__':
    app.run(debug=True)