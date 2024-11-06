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
    

    def check_input_validity(self, place):
        """Checks `place` to make sure it's not empty and a string.

        Args:
            `place` (str): Place string to check

        Returns:
            `tuple`: Message and status code accord to check. None if `place` is string and not empty.
        """
        if place == None:
            return {"message": "Input prompt is either not set in body or is empty"}, 422
        if not isinstance(place, str):
            return {"message": "Input prompt not a String text"}, 415
        if place == "":
            return {"message": "Input prompt is empty"}, 422
        return None, None
        
        
    def check_all(self, auth, user_agent, place):
        """Combines `check_auth_auth`, `check_auth_source` and `check_input_validity` for ease of use.

        Args:
            `auth` (str): Authentication to check
            `user_agent` (str): Source to check
            `place` (str): Prompt string to check
            
        Returns:
            `tuple`: Message and status code according to check. 
            None if `user_agent` is recognized as known and `auth` is successful.
            `place` must be string and not empty.
        """
        message, status = self.check_auth_auth(auth)
        if not message == None:
            return message, status

        message, status = self.check_auth_source(user_agent)
        if not message == None:
            return message, status
        
        message, status = self.check_input_validity(place)
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

    print(authorization_validation_manager.check_input_validity(123))
    print(authorization_validation_manager.check_input_validity("test-text"))
    
    print(authorization_validation_manager.check_all("test-key-authorized", "authorized-user"))

    print("Tests: <finished>")