from flask import  jsonify, Blueprint

from raplaschedulemanager import RaplaScheduleManager

rapla_routes= Blueprint("rapla_route", __name__)
rapla_schedule_manager = RaplaScheduleManager()
# Endpunkt für Vorlesungen von morgen
@rapla_routes.route('/events/tomorrow', methods=['GET'])
def events_tomorrow():
    events = rapla_schedule_manager.get_tomorrows_events()
    return jsonify(events)

