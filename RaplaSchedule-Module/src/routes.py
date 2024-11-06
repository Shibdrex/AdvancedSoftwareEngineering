from flask import  jsonify, Blueprint, request
from auth_valid_manager import AuthorizationValidationManager
from raplaschedulemanager import RaplaScheduleManager

routes= Blueprint("routes", __name__)
rapla_schedule_manager = RaplaScheduleManager()
authorization_validation_manager = AuthorizationValidationManager()


@routes.route('/', methods=['GET'])
def do_healthcheck():
    return jsonify({"message": "Healthy"}), 200


# Endpunkt für Vorlesungen von morgen
@routes.route('/events/tomorrow', methods=['GET'])
def events_tomorrow():
    message, status = authorization_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
    )
    if not message == None:
        return jsonify(message), status
    events = rapla_schedule_manager.get_tomorrows_events()
    return jsonify(events), 200

