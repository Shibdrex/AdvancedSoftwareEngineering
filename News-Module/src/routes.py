from flask import Blueprint, request, jsonify
from newsapi_manager import NewsManager
from auth_valid_manager import AuthorizationValidationManager

routes = Blueprint('routes', __name__)

news_manager = NewsManager()
authentication_validation_manager = AuthorizationValidationManager()

#  Route um die News zu laden (wird an die Tagesschau Api weitergelietet)
@routes.route('/news', methods=['GET'])
def aktuelle_news():
    message, status = authentication_validation_manager.check_all(
        auth = request.headers.get('Auth'),
        user_agent = request.headers.get('User-Agent')
        )
    
    if not message == None:
        return jsonify(message), status
    # Themenparameter wird aus der 
    ressort = request.args.get('ressort', type=str)

    params = {}
    
    if ressort:
        params["ressort"] = ressort

    news_response = news_manager.get_news(params=params)

     # Hier sicherstellen, dass der Rückgabewert korrekt ist als Tupel
    if isinstance(news_response, tuple): 
        return jsonify(news_response)  
    return jsonify(news_response)
    

