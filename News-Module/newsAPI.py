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

    news = news_manager.get_news(params=params)

    return news, 200

    

