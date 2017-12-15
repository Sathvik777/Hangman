import random

class GameSession:

    words = ["3dhubs", "marvin", "print", "filament", "order", "layer"]

    letter_gussed_again_response = "You have already guessed that letter. Try diffrent one"

    letters_gussed_correct = "Great! keep going"


    def __init__(self):
        self.word_seleted = (self.words[random.randint(0,len(self.words))])
        self.letters_guessed=[]
        self.number_of_attemps = 0

    def get_answer_response(self, requested_letter):

        game_completed = False
        game_won = False

        if(requested_letter in self.letters_guessed):
            response = {
                'message' : self.letter_gussed_again_response
            }
        elif (requested_letter in self.word_seleted):

            indices = [i for i, x in enumerate(self.word_seleted) if x == requested_letter]
            self.letters_guessed += len(indices) * requested_letter
            
            if(self.number_of_attemps > 5):
                game_completed = True
                game_won = False
            elif (len(self.letters_guessed) == len(self.word_seleted)):
                game_completed = True
                game_won = True

            response = {
                'message' : self.letters_gussed_correct,
                'indices':indices,
                'lengthOfWord': len(self.word_seleted),
                'gameCompleted': game_completed,
                'gameWon': game_won
            }
        else:
            response = {
                'message' : self.letters_gussed_correct,
                'indices':[],
                'lengthOfWord': len(self.word_seleted),
                'gameCompleted': game_completed,
                'gameWon': game_won
                }
            self.number_of_attemps += 1
             

        return response