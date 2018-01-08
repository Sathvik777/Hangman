# Hangman


#### Prerequisite
------------------------

* Python 3.X
* pip
* NPM - 5.X


#### Install and Run - Instructions
------------------------

- Clone the repository: `git clone https://github.com/Sathvik777/Hangman.git`

- Change working directory to ViaPlayNode-Test:`cd Hangman_app`

- In ViaPlayNode-Test directory  download and paste `config.js` file provided by owner

- Install all packages need: `pip install -r requirements.txt --no-index`

- Run tests to make sure Endpoint is working: `python base_test.py`

- Start the Node server : `python app.py`

- Server starts at default port `5000`

#### Hangman Game Flow
------------------------
API-USEAGE:
  GET

    endpoint: /login

    Query-param: username = 'username'

    resposne-body    : {

    "sessionKey" : "randomly generated string"

    }

    resposne error http-header  : 401

    reason : username not provided


  POST

    endpoint: /start

    request-body    : {

    "session_key" : "string when loged in"

    }

    response-body    : {

    "word" : "word"

    }

    resposne error http-header  : 401

    reason : session_key not provided

  POST

    endpoint: /end

    Query-param: won = 0 (lost) | 1 (won)

    request-body    : {

    "session_key" : "string when loged in",
    "score" : number of attempts left * 10

    }

    response-body    : {

    "status": "ok"

    }

    resposne error http-header  : 400

    reason : session_key or won not provided

  GET

    endpoint: /leaderboard

    response-body    :[
        {
            "name": username,
            "score": score
        }
    ] 

    
#### TO-DO
------------------------
* More specific error handling
* Better config management
* Negative tests
* Detailed unit tests



#### Important Notes
------------------------

* For ease of use app uses in-memory insted of database. So, If server is stoped data will be lost



\ ゜o゜)ノ

