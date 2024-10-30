from flask import Blueprint, request, jsonify
import requests
from datetime import datetime, timedelta
import pytz
from dateutil import parser

class NewsManager:
    # Konstruktor der Klasse
    def __init__(self):
        self.url ='https://www.tagesschau.de/api2u/news/'  

    def get_news(self,params):
        # API request

        response = requests.get(self.url, params=params)
    
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

