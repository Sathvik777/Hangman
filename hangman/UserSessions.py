import uuid

class UserSessions:

    def __init__(self):
        print("__init__  UserSessions")
        self.UserSessionsData = {}


    def add_Usersession(self, username, session_key):
        # TODO : Add session to DB

        self.UserSessionsData[username] = session_key

    def check_session(self, session_key):
        return session_key in self.UserSessionsData.values()

    def check_user(self, username):
        return username in self.UserSessionsData

    def build_authentication_response(self, username):
        if(self.check_user(username)):
            session_key = self.UserSessionsData.get(username)
        else:
            session_key = self.generate_new_session_key(username)
        autuntication_response = {
            'sessionKey' : session_key,
            'username': username
        }
        print(autuntication_response["sessionKey"])
        return autuntication_response



    def generate_new_session_key(self, username):
        new_session_key = str(uuid.uuid4())
        self.add_Usersession(username, new_session_key)
        return new_session_key
