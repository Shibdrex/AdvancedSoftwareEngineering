from flask import Blueprint, request
from NewsAPI_manager import NewsManager

news_routes = Blueprint('news_routes', __name__)
news_manager = NewsManager()

#Anfrage extra machen
@news_routes.route('/news', methods=['GET'])
def aktuelle_news():
    # Get parameters from query string
    ressort = request.args.get('ressort', type=str)

    # API endpoint and parameters
    params = {}
    
    # Add parameters if provided
    if ressort:
        params["ressort"] = ressort

    news_response = news_manager.get_news(params=params)

     # Hier sicherstellen, dass der Rückgabewert korrekt ist
    if isinstance(news_response, tuple):  # Wenn ein Tuple zurückgegeben wird
        return news_response  # Gib das Tuple direkt zurück
    return news_response, 200  # Andernfalls gib die JSON-Antwort zurück

    

