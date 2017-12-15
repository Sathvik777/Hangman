from operator import itemgetter
from collections import OrderedDict

class LeaderboardCache:

    def __init__(self, limit):
        self.cachedLeaderboard ={}
        # 70 because 60 is the max score and first entry will set the value
        self.lowestScore = 70
        self.limit = limit     



    def add_new_score(self, username, score):
        self.cachedLeaderboard[username] = score

    def get_leadearboard(self):
        return OrderedDict(sorted(self.cachedLeaderboard.items(), key=lambda t: t[1]))





        
