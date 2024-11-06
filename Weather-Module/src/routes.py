from flask import Blueprint, request, jsonify
from weather_api_manager import WeatherAPIManager
from auth_valid_manager import AuthorizationValidationManager

routes = Blueprint('routes', __name__)

weather_manager = WeatherAPIManager()
authorization_validation_manager = AuthorizationValidationManager()

@routes.route('/', methods=['GET'])
def do_healthcheck():
    return jsonify({"message": "Healthy"}), 200


@routes.route("/weather", methods=['GET'])
def get_weather():
    place = request.args.get('ort', type=str)
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent'),
        place = place
    )
    if not message == None:
        return jsonify(message), status
    
    weather = weather_manager.getWeather(place)

    if weather == None:
        return jsonify({"message": "Service ran into an error while retrieving weather data"}), 500
    else:
        return jsonify(weather), 200