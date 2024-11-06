from global_auth_valid import check_auth, check_source
import os


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
        


    def check_input_validity(self, input_file, stop_key):
        """Checks `input_file` to make sure it is a `.wav` or `.mp3` and `stop_key` by comparing with environment variable.

        Args:
            `input_file` (str): Path to file to check
            `stop_key` (str): Keyboard-Key to check

        Returns:
            tuple: Message and status code according to check. None if `input_file` is in required format and `stop_key` is recognized as known.
        """
        if input_file == None or stop_key == None:
            return None, None
        _, ext = os.path.splitext(input_file)
        if not ext == '.wav' or not ext == '.mp3':
            return {"message": "Input file not a .wav or .mp3 file"}, 415
        try:
            allowed_stop_keys = os.getenv('ALLOWED_STOP_KEYS').split(';')
        except AttributeError:
            return {"message": "No stop keys set as allowed"}, 500
        if not stop_key in allowed_stop_keys:
            return {"message": "Stop key is not allowed"}, 401
        return None, None
        
        
    def check_all(self, auth, user_agent, input_file = None, stop_key = None):
        """Combines `check_auth_auth`, `check_auth_source` and `check_input_validity` for ease of use.

        Args:
            `auth` (str): Authentication to check
            `user_agent` (str): Source to check
            `input_file` (str): String path to file to check
            `stop_key` (str): String Keyboard-Key to check
            
        Returns:
            `tuple`: Message and status code according to check. 
            None if `user_agent` is recognized as known and `auth` is successful.
            `input_file` and `stop_key` must conform to requirements.
        """
        message, status = self.check_auth_auth(auth)
        if not message == None:
            return message, status
    
        message, status = self.check_auth_source(user_agent)
        if not message == None:
            return message, status
        
        message, status = self.check_input_validity(input_file, stop_key)
        if not message == None:
            return message, status
        return None, None

    

        
# TESTS
if __name__ == '__main__':
    authorization_validation_manager = AuthorizationValidationManager()

    TEST_FILE = "testfile.wav"

    print(authorization_validation_manager.check_auth_auth("test-key-authorized"))
    print(authorization_validation_manager.check_auth_auth("test-key-unauthorized"))

    print(authorization_validation_manager.check_auth_source("authorized-user"))
    print(authorization_validation_manager.check_auth_source("unauthorized-user"))

    print(authorization_validation_manager.check_input_validity(TEST_FILE, 'g'))

    print("Tests: <finished>")