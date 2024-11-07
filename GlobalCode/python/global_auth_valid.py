import os


def check_auth(auth):
    """Compare `auth` with values in environment variable `AUTHORIZATION_KEYS`.

    Args:
        `auth` (str): String to compare

    Returns:
        `tuple`: Consists of dictionary with one string value and a status code literal. 
        None if `auth` is a value of the environment variable.
    """
    try:
        auth_keys = os.getenv('AUTHORIZATION_KEYS').split(';')
    except AttributeError:
        return {"message": "No authorization keys set"}, 500
    if not auth in auth_keys:
        return {"message": "Client is not authorized to make requests"}, 401
    return None, None


def check_source(user_agent):
    """Compare `user_agent` with values in environment variable `KNOWN_USER_AGENTS`.

    Args:
        `user_agent` (str): String to compare

    Returns:
        `tuple`: Consists of dictionary with one string value and a status code literal. 
        None if `user_agent` is a value of the environment variable.
    """
    try:
        known_user_agents = os.getenv('KNOWN_USER_AGENTS').split(';')
    except AttributeError:
        return {"message": "No User-Agents set as known"}, 500
    if not user_agent in known_user_agents:
        return {"message": "User-Agent is unknown to service"}, 401
    return None, None


def check_all(self, auth, user_agent):
    """Combines `check_auth_auth` and `check_auth_source` for ease of use.

    Args:
        `auth` (str): Authentication to check
        `user_agent` (str): Source to check
        
    Returns:
        `tuple`: Message and status code according to check. None if `user_agent` is recognized as known and `auth` is successful.
    """
    message, status = self.check_auth_auth(auth)
    if not message == None:
        return message, status

    message, status = self.check_auth_source(user_agent)
    if not message == None:
        return message, status
    return None, None