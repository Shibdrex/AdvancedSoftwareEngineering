import os
from global_auth_valid import check_auth, check_source


class AuthorizationValidationManager:
    """Class to manage authorization and validation of requests.
    """

    def check_auth_auth(self, auth):
        """Checks `auth` by comparing with environment variable.

        Args:
            `auth` (str): Authentication to check

        Returns:
            `tuple`: Message and status code according to check. None if `auth` successful.
        """
        return check_auth(auth)
    
    def check_auth_source(self, user_agent):
        """Checks `user_agent` by comparing with environment variable.

        Args:
            `user_agent` (str): Source to check

        Returns:
            `tuple`: Message and status code according to check. None if `user_agent` is recognized as known.
        """
        return check_source(user_agent)
        

    def check_input_validity(self, input_text, voice):
        """Check `input_text` is string and `voice` is a available voice by comparing with environment variable.

        Args:
            `input_text` (str): String text to check
            `voice` (str): Voice string to check

        Returns:
            `tuple`: Message and status code according to check. None if `input_text` is string and `voice` is available.
        """
        if not isinstance(input_text, str):
            return {"message": "Input text not a String text"}, 415
        try:
            available_voices = os.getenv('AVAILABLE_VOICES').split(';')
        except AttributeError:
            return {"message": "No voices set, using default"}, 100
        if not voice in available_voices:
            return {"message": "Unknown or unavailable voice, using default"}, 100
        return None, None
        

    def check_all(self, auth, user_agent, input_text, voice):
        """Combines `check_auth_auth`, `check_auth_source` and `check_input_validity` for ease of use.

        Args:
            `auth` (str): Authentication to check
            `user_agent` (str): Source to check
            `input_text` (str): String text to check
            `voice` (str): Voice string to check
            
        Returns:
            `tuple`: Message and status code according to check. 
            None if `user_agent` is recognized as known and `auth` is successful.
            `input_text` must be string and `voice` must be available.
        """
        message, status = self.check_auth_auth(auth)
        if not message == None:
            return message, status

        message, status = self.check_auth_source(user_agent)
        if not message == None:
            return message, status
        
        message, status = self.check_input_validity(input_text, voice)
        if not message == None:
            return message, status
        return None, None
        
        
# TESTS
if __name__ == '__main__':
    authorization_validation_manager = AuthorizationValidationManager()

    print(authorization_validation_manager.check_auth_auth("test-key-authorized"))
    print(authorization_validation_manager.check_auth_auth("test-key-unauthorized"))

    print(authorization_validation_manager.check_auth_source("authorized-user"))
    print(authorization_validation_manager.check_auth_source("unauthorized-user"))

    print(authorization_validation_manager.check_input_validity({"test": 1}, "Steve"))
    print(authorization_validation_manager.check_input_validity("test-text", "Kevin"))
    print(authorization_validation_manager.check_input_validity("test-text", "Steve"))

    print("Tests: <finished>")