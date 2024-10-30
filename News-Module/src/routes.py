from flask import Blueprint, request
from NewsAPI_manager import NewsManager

routes = Blueprint('routes', __name__)

news_manager = NewsManager()

#  Route um die News zu laden (wird an die Tagesschau Api weitergelietet)
@routes.route('/news', methods=['GET'])
def aktuelle_news():

    # Themenparameter wird aus der 
    ressort = request.args.get('ressort', type=str)

    params = {}
    
    if ressort:
        params["ressort"] = ressort

    news_response = news_manager.get_news(params=params)

     # Hier sicherstellen, dass der Rückgabewert korrekt ist als Tupel
    if isinstance(news_response, tuple): 
        return news_response  
    return news_response, 200 
    

