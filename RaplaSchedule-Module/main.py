
from flask import Flask, jsonify
from routes import rapla_routes



app = Flask(__name__)
app.register_blueprint(rapla_routes)
if __name__ == '_main_':
    app.run(debug = True )
