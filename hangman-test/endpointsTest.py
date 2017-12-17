from urllib.request import urlopen
from flask import Flask
from flask_testing import LiveServerTestCase 

# Testing with LiveServer
class MyTest(LiveServerTestCase):
  # if the create_app is not implemented NotImplementedError will be raised
  def create_app(self):
    app = Flask(__name__)
    app.config['TESTING'] = True
    return app 

  def test_flask_application_is_up_and_running(self):
      response = urlopen(self.get_server_url())
      print(response)
      self.assertEqual(response.code, 200)


if __name__ == '__main__':
    unittest.main()