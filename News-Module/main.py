print("Starting the application...")

from flask import Flask
from newsAPI import news_routes

# Initialize our service
app = Flask(__name__)

# Register the routes we defined in the routes.py blueprint
app.register_blueprint(news_routes)

# Run our server
if __name__ == '__main__':
    print("Running the server...")
    app.run(debug=True)