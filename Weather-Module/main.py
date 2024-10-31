from weatherController import getWetter
from flask import Flask, request, jsonify
from flask_cors import CORS
app=Flask(__name__)
CORS(app)

@app.route("/weather", methods=['GET'])
def weather():
    ort = request.args.get('ort', type=str)
    wetter = getWetter(ort)
    if wetter.get("error") is None:
        return jsonify(wetter), 200
    else:
        return jsonify(wetter), 400
if __name__ == '__main__':
    app.run(debug=True)
