from flask import Blueprint, request, jsonify
import requests
from datetime import datetime, timedelta
import pytz
from dateutil import parser

class NewsManager:
    # Konstruktor der Klasse
    def __init__(self):
        self.url ='https://www.tagesschau.de/api2u/news/'  



    #Funktion um Nachrcihten zu bekommen
    def get_news(self,params):

        response = requests.get(self.url, params=params)
    
        #Überprüfen ob der Request erfolgreich war
        if response.status_code == 200:
            data = response.json()
        
            #Hier werden nach den News aus den letzen 24 h gefiltert
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
        
        #Fehlermeldung wenn Abfrage nicht erfolgreich
        else:
            return jsonify({"error": "Failed to retrieve news"}), response.status_code


# TESTS      

if __name__ == '__main__':
    news_manager= NewsManager()
    
    # Sport
    try:
        news_manager.get_news('sport')
        print("1/7")

    except Exception as e:
        print("Fehler bei Sport")

    # Inland
    try:
        news_manager.get_news('inland')
        print("2/7")

    except Exception as e:
        print("Fehler bei Inland")

    # Ausland
    try:
        news_manager.get_news('ausland')
        print("3/7")

    except Exception as e:
        print("Fehler bei Ausland")

    # Wirtschaft
    try:
        news_manager.get_news('wirtschaft')
        print("4/7")

    except Exception as e:
        print("Fehler bei Wirtschaft")

    # Video
    try:
        news_manager.get_news('video')
        print("5/7")

    except Exception as e:
        print("Fehler bei Video")

    # Investigativ
    try:
        news_manager.get_news('investigativ')
        print("6/7")

    except Exception as e:
        print("Fehler bei Investigativ")

    # Wissen
    try:
        news_manager.get_news('wissen')
        print("7/7")

    except Exception as e:
        print("Fehler bei wissen")

