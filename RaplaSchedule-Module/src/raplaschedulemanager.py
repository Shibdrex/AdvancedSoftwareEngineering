from datetime import datetime, timedelta
from ics import Calendar
import os



class RaplaScheduleManager:
    ics_file_path= "/app/dhbw-stuttgart.ics"

    def get_tomorrows_events(self):
        # Datum von morgen berechnen
        tomorrow = datetime.now() + timedelta(days=1)   
        tomorrow_date_str = tomorrow.strftime('%Y-%m-%d')

        
        if not os.path.exists(self.ics_file_path):
            return []

        
        with open(self.ics_file_path, 'r', encoding='utf-8') as file:
            calendar = Calendar(file.read())

        
        events_list = []
        for event in calendar.events:
            event_date = event.begin.date().strftime('%Y-%m-%d')
            if event_date == tomorrow_date_str:
                events_list.append({
                    "Vorlesung": event.name,
                    "Start": event.begin.strftime('%H:%M'),
                    "Ende": event.end.strftime('%H:%M'),
                    "UID": event.uid
                })
        return events_list