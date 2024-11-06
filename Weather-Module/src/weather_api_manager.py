import requests
import os


class WeatherAPIManager:
    apiKey = None
    
    def __init__(self):
        self.apiKey = os.getenv("WEATHER_API_KEY")
        if self.apiKey == None:
            exit("The ApiKey environment variable is not set!")


    def getPosition(self, place):
        urlGeocode = f"https://geocode.search.hereapi.com/v1/geocode?q={place}&apiKey={self.apiKey}"
        responseGeocode = requests.get(urlGeocode)
        if responseGeocode.status_code == 200:
            return responseGeocode.json().get("items")[0].get("position")
        return None
    
    def getWeather(self, place):
        position = self.getPosition(place)
        if position == None:
            return None
        url = f"https://api.open-meteo.com/v1/forecast?latitude={position.get("lat")}&longitude={position.get("lng")}&daily=temperature_2m_max,temperature_2m_min,rain_sum"
        response = requests.get(url)
        if response == None:
            return None
        tempMax = response.json().get("daily").get("temperature_2m_max")[0]
        tempMin = response.json().get("daily").get("temperature_2m_min")[0]
        rain = response.json().get("daily").get("rain_sum")[0]
        return {"tempMax": tempMax, "tempMin": tempMin, "regen": rain}

