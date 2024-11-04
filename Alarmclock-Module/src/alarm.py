from datetime import datetime, timedelta

class Alarm:

    def __init__(self):
        self.alarm_time = None


    def set_alarm(self, alarm_time: str):
        """
        Set the alarm time.

        :param alarm_time: The alarm time in 'HH:MM' format (24-hour).
        """
        self.alarm_time = datetime.strptime(alarm_time, "%H:%M").time()

    
    def time_until_alarm(self):
        """
        Calculate and retunr the time remaining until the alarm goes off.

        :return: A string representing the time remaining, or a message if not alarm is set.
        """
        if self.alarm_time is None:
            return "No alarm set."
        
        now = datetime.now()
        alarm_datetime = datetime.combine(now.date(), self.alarm_time)

        # If the alarm time is earlier than the current time, assume it's for the next day.
        if alarm_datetime < now:
            alarm_datetime += timedelta(days=1)

        time_remaining = alarm_datetime - now
        return str(time_remaining)
    

    def is_alarm_time(self):
        """
        Check if the alarm time has been reached or passed.

        :return: True if the current time is equal to or past the alarm time, False otherwise.
        """
        if self.alarm_time is None:
            return False
        now = datetime.now().time()
        return now >= self.alarm_time