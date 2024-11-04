import requests
from datetime import datetime, timedelta
import pytz
from dateutil import parser

class NewsManager:
    # Konstruktor der Klasse
    def __init__(self):
        self.url ='https://www.tagesschau.de/api2u/news/'  

    # Funktion um Nachrcihten zu bekommen
    def get_news(self,params):

        response = requests.get(self.url, params=params)
    
        # Überprüfen ob der Request erfolgreich war
        if response.status_code == 200:
            data = response.json()
        
            # Hier werden nach den News aus den letzen 24 h gefiltert
            now = datetime.now(pytz.utc)
            last_24_hours = now - timedelta(hours=24)
            recent_news = [
                news_item for news_item in data.get("news", [])
                if "date" in news_item and parser.parse(news_item["date"]) >= last_24_hours
            ]

            return {
                "recent_news_count": len(recent_news),
                "recent_news": recent_news
            }, 200
        
        # Fehlermeldung wenn Abfrage nicht erfolgreich
        else:
            return {"error": "Failed to retrieve news"}, response.status_code



