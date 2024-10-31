import requests

def getPosition(ort):
    try:
        apiKey = "jx9tnmXq5hCPF9dSxQ1i1IXMq96grtdrwWYLz-oymas"

        urlGeocode = f"https://geocode.search.hereapi.com/v1/geocode?q={ort}&apiKey={apiKey}"
        responseGeocode = requests.get(urlGeocode)
        position = responseGeocode.json().get("items")[0].get("position")
        return position
    except:
        raise ValueError("Fehler")

def getWetter(ort):
    try:
        position = getPosition(ort)
        url = f"https://api.open-meteo.com/v1/forecast?latitude={position.get("lat")}&longitude={position.get("lng")}&daily=temperature_2m_max,temperature_2m_min,rain_sum"
        response = requests.get(url)
        # print(response.json())
        tempMax = response.json().get("daily").get("temperature_2m_max")[0]
        tempMin = response.json().get("daily").get("temperature_2m_min")[0]
        regen = response.json().get("daily").get("rain_sum")[0]
        # print(f"Wetter in {ort}: Maximale Temperatur: {tempMax} Minimale Temperatur: {tempMin}")
        return {"tempMax": tempMax, "tempMin": tempMin, "regen": regen}
    except:
        return {"error": "Fehler bei Ausgabe vom Wetter"}

