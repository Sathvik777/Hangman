from gameSession import GameSession

users_game_session = {}


def start_game(session_key):
    users_game_session[session_key] = GameSession()
    word_seleted_for_user = users_game_session.get(session_key).word_seleted
    return {'wordLength': len(word_seleted_for_user)}


def play_game(session_key, key_pressed):
    game_session = users_game_session.get(session_key)
    response = game_session.get_answer_response(key_pressed.lower())
    return response

def end_game(session_key):
    del users_game_session[session_key]