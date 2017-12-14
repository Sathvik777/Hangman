import uuid

class UserSessions:

    def __init__(self):
        self.UserSessionsData = {}


    def add_Usersession(self, username, session_key):
        # TODO : Add session to DB

        self.UserSessionsData[username] = session_key

    def check_session(self, session_key):
        return session_key in self.UserSessionsData.values()

    def check_user(self, username):
        return username in self.UserSessionsData

    def build_authentication_response(self, username):
        autuntication_response = {
            'sessionKey' : self.UserSessionsData.get(
                username, self.generate_new_session_key(username)
                ),
            'username': username
        }
        return autuntication_response



    def generate_new_session_key(self, username):
        new_session_key = str(uuid.uuid4())
        self.add_Usersession(username, new_session_key)
        return new_session_key
