from flask import Blueprint, request, jsonify
from alarm import Alarm
from auth_valid_manager import AuthorizationValidationManager

routes = Blueprint('routes', __name__)

alarm = Alarm()
authorization_validation_manager = AuthorizationValidationManager()

@routes.route('/', methods=['GET'])
def do_healthcheck():
    return jsonify({"message": "Healthy"}), 200


@routes.route('/set-alarm', methods=['POST'])
def set_alarm():
    alarm_time = request.json['time']
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    if not alarm_time:
        return jsonify({"message": "Please provide an alarm time in 'HH::MM' fomrat"}), 400
    
    try:
        alarm.set_alarm(alarm_time)
        return jsonify({"message": f"Alarm set for {alarm_time}"}), 200
    except ValueError:
        return jsonify({"message": "Invalid time format. Use 'HH:MM' in 24-hour format."})
    

@routes.route('/time-until-alarm', methods=['GET'])
def time_until_alarm():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    time_remaining = alarm.time_until_alarm()
    return jsonify({"time_until_alarm": time_remaining})


@routes.route('/is-alarm-time', methods=['GET'])
def is_alarm_time():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    status = alarm.is_alarm_time()
    return jsonify({"is_alarm_time": status})

