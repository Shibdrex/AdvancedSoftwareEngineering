from global_auth_valid import check_auth, check_source, check_all

# Class to manage authorization and validation of requests
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
        
        
    def check_all(self, auth, user_agent):
        """Combines `check_auth_auth` and `check_auth_source` for ease of use.

        Args:
            `auth` (str): Authentication to check
            `user_agent` (str): Source to check
            
        Returns:
            `tuple`: Message and status code according to check. None if `user_agent` is recognized as known and `auth` is successful.
        """
        return check_all(self, auth, user_agent)

        
# TESTS
if __name__ == '__main__':
    authorization_validation_manager = AuthorizationValidationManager()

    print(authorization_validation_manager.check_auth_auth("test-key-authorized"))
    print(authorization_validation_manager.check_auth_auth("test-key-unauthorized"))

    print(authorization_validation_manager.check_auth_source("authorized-user"))
    print(authorization_validation_manager.check_auth_source("unauthorized-user"))

    print("Tests: <finished>")