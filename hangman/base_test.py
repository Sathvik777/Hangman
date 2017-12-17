from app import app
import unittest 
import json

class FlaskBookshelfTests(unittest.TestCase): 

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass 

    def setUp(self):
        # creates a test client
        self.app = app.test_client()
        # propagate the exceptions to the test client
        self.app.testing = True 

    def tearDown(self):
        pass 

    def test_home_status_code(self):
        # sends HTTP GET request to the application
        # on the specified path
        result = self.app.get('/') 

        # assert the status code of the response
        self.assertEqual(result.status_code, 200)

    """sends HTTP GET request to the servre 
        verifies login for test user"""
    def test_login_postive(self):
            
        test_username = "test_user"
        result = self.app.get('/login?username=' + test_username)

        self.assertEqual(result.status_code, 200)  
        json_response = json.loads(result.get_data())

        self.assertTrue('sessionKey' in json_response)

        self.assertEqual(json_response.get('username'),test_username)  
            

    def test_game_flow(self):
        test_player = "test_player"
        result = self.app.get('/login?username='+test_player)
        json_response = json.loads(result.get_data())
        session_key = json_response.get('sessionKey')
        response=self.app.post('/start', 
                       data=json.dumps(dict(session_key= session_key)),
                       content_type='application/json')

        self.assertEqual(response.status_code, 200) 
        
        json_response = json.loads(response.get_data())
        self.assertTrue('word' in json_response)

        response=self.app.post('/end', 
                       data=json.dumps(dict(session_key= session_key,
                       score = 20
                       )),
                       content_type='application/json')

        self.assertEqual(result.status_code, 200) 



if __name__ == '__main__':
    unittest.main()