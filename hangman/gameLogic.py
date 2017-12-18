from models.gameSession import GameSession
from models.Leaderboard import LeaderboardCache


leaderboardCache = LeaderboardCache(15)

users_game_session = {}


def start_game(session_key):
    user_GameSession = GameSession()
    users_game_session[session_key] = user_GameSession
    word_seleted_for_user = users_game_session.get(session_key).word_seleted
    return {'word': word_seleted_for_user}


def play_game(session_key, key_pressed):
    game_session = users_game_session.get(session_key)
    response = game_session.get_answer_response(key_pressed.lower())
    return response


def end_game_update_score(session_key, score, username):
    lowestScore = leaderboardCache.lowestScore
    if (lowestScore < score):
        # add userssession to this class
        # change argumeent oders
        leaderboardCache.add_new_score(username, score)
    del users_game_session[session_key]


def end_game_without_update(session_key):
    del users_game_session[session_key]

def get_leadearboard():
    response = []
    leaderboard = leaderboardCache.get_leadearboard()
    for username, score in leaderboard.items():
        print(username)
        response.append({
            'name': username,
            'score': score
        })
    return response
