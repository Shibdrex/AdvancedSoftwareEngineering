from datetime import datetime, timedelta
from ics import Calendar

# Pfad zur .ics-Datei angeben
ics_file_path = r"C:\Users\taktarde\OneDrive - B. Braun\Aesculap\DHBW\5.Semester\ASWE\rapla\dhbw-stuttgart.ics"

# Morgen's Datum berechnen
tomorrow = datetime.now() + timedelta(days=1)

tomorrow_date_str = tomorrow.strftime('%Y-%m-%d')

# .ics Datei laden und parsen
with open(ics_file_path, 'r', encoding='utf-8') as file:
    calendar = Calendar(file.read())

# Vorlesungen für morgen filtern und anzeigen
print(f"Vorlesungen für {tomorrow.strftime('%d.%m.%Y')}:\n")
for event in calendar.events:
    event_date = event.begin.date().strftime('%Y-%m-%d')
    if event_date == tomorrow_date_str:
        print(f"Vorlesung: {event.name}")
        print(f"Start: {event.begin.strftime('%H:%M')}")
        print(f"Ende: {event.end.strftime('%H:%M')}")
        print(f"UID: {event.uid}")
        print("-" * 30)