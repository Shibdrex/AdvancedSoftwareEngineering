from flask import Flask
from routes import routes
from flask_cors import CORS


# Initialize our service
app = Flask(__name__)
app.register_blueprint(routes)
CORS(app)
# Register the routes we defined the the routes.py blueprint
#app.register_blueprint(routes)

# Run our server
if __name__ == '__main__':
    app.run(debug=True)


    