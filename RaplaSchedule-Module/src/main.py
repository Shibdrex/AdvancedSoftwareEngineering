
from flask import Flask
from routes import routes
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(routes)
CORS(app)
if __name__ == '_main_':
    app.run(debug = True )
