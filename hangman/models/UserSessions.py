import uuid
import random

class UserSessions:

    def __init__(self):
        self.UserSessionsData = {}


    def add_Usersession(self, username, session_key):
        # TODO : Add session to DB

        self.UserSessionsData[username] = session_key

    def get_username_with_sessionKey(self, session_key):
        for username, session in self.UserSessionsData.items():
            if session == session_key:
                return username

    def check_user(self, username):
        return username in self.UserSessionsData

    def build_authentication_response(self, username):
        if self.check_user(username):
            session_key = self.UserSessionsData.get(username)
        else:
            session_key = self.generate_new_session_key(username)
        autuntication_response = {
            'sessionKey' : session_key,
            'username': username
        }
        return autuntication_response



    def generate_new_session_key(self, username):
        ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        chars=[]
        for i in range(16):
            chars.append(random.choice(ALPHABET))
        
        new_session_key = "".join(chars)
        self.add_Usersession(username, new_session_key)
        return new_session_key
