from flask import Blueprint, request, jsonify
import requests
from datetime import datetime, timedelta
import pytz
from dateutil import parser

url = 'https://www.tagesschau.de'

news_routes = Blueprint('news_routes', __name__)

# Route to get current news based on region and category
@news_routes.route('/news', methods=['GET'])
def aktuelle_news():
    # Get parameters from query string
    region = request.args.get('region', default=0, type=str)
    ressort = request.args.get('ressort', type=str)

    # API endpoint and parameters
    news_url = url + '/api2u/news/'
    params = {}
    
    # Add parameters if provided
    if region != "0":
        params["regions"] = region
    if ressort:
        params["ressort"] = ressort

    # API request
    response = requests.get(news_url, params=params if params else None)
    
    # Check if request was successful
    if response.status_code == 200:
        data = response.json()
        
        # Filter news from the last 24 hours
        now = datetime.now(pytz.utc)
        last_24_hours = now - timedelta(hours=24)
        recent_news = [
            news_item for news_item in data.get("news", [])
            if "date" in news_item and parser.parse(news_item["date"]) >= last_24_hours
        ]

        return jsonify({
            "recent_news_count": len(recent_news),
            "recent_news": recent_news
        })
    else:
        return jsonify({"error": "Failed to retrieve news"}), response.status_code

# Route to get search results based on a search query
@news_routes.route('/search', methods=['GET'])
def user_relevant_news():
    # Get parameters from query string
    searchText = request.args.get('searchText', type=str)
    pageSize = request.args.get('pageSize', default=10, type=int)
    resultPage = request.args.get('resultPage', default=1, type=int)
    
    # Construct parameters dictionary
    user_news_url = url + '/api2u/search/'
    params = {
        'searchText': searchText,
        'pageSize': pageSize,
        'resultPage': resultPage
    }
    
    # API request
    response = requests.get(user_news_url, params=params)
    
    # Check if request was successful
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Failed to retrieve search results"}), response.status_code
