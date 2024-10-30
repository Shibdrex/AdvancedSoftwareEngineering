print("Starting the application...")

from flask import Flask
from newsAPI import news_routes


app = Flask(__name__)

app.register_blueprint(news_routes)

# Server laufen lassen
if __name__ == '__main__':
    print("Running the server...")
    app.run(debug=True)