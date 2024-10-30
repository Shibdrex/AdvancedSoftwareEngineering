import os


# Class to manage authorization and validation of requests
class AuthorizationValidationManager:

    # Initialize class
    def __init__(self):
        self

    # Compare auth param with keys set in environment variable
    # and return a dictonary and status code
    # returns None, None if authorization is successful
    def check_auth_auth(self, auth):
        try:
            auth_keys = os.getenv('AUTHORIZATION_KEYS').split(';')
        except AttributeError:
            return {"message": "No authorization keys set"}, 500
        if not auth in auth_keys:
            return {"message": "Client is not authorized to make requests"}, 401
        return None, None

    # Compare user_agent param with users set in environment variable
    # and return a dictonary and status code
    # returns None, None if authorization is successful
    def check_auth_source(self, user_agent):
        try:
            known_user_agents = os.getenv('KNOWN_USER_AGENTS').split(';')
        except AttributeError:
            return {"message": "No User-Agents set as known"}, 500
        if not user_agent in known_user_agents:
            return {"message": "User-Agent is unknown to service"}, 401
        return None, None
    
    # Check if input_text is string, compare voice param with voices set in environment variable
    # and return a dictonary and status code
    # returns None, None if validation of request content is successful
    def check_input_validity(self, input_text, voice):
        if not isinstance(input_text, str):
            return {"message": "Input text not a String text"}, 415
        try:
            available_voices = os.getenv('AVAILABLE_VOICES').split(';')
        except AttributeError:
            return {"message": "No voices set, using default"}, 100
        if not voice in available_voices:
            return {"message": "Unknown or unavailable voice, using default"}, 100
        return None, None
        
    # Simply a compound method to execute all checks
    def check_all(self, auth, user_agent, input_text, voice):
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