using Schedule.Generator.Api.Models;
using System;

namespace Schedule.Generator.Api.Services
{
    public class RoundRobinScheduleGenerator : IScheduleGenerator
    {
        public GameSchedules GenerateSchedule(int totalPlayers, int courtsAvailable, List<string>? players, int totalRounds)
        {


            while (totalPlayers < courtsAvailable * 4)
            {
                courtsAvailable--;
            }

            int playersPerMatch = courtsAvailable * 4;

            players = GetDefaultPlayerNames(totalPlayers, players);

            var gameSchedules = new GameSchedules(players);


            var totalSkipped = 0;
            for (int round = 1; round <= totalRounds; round++)
            {

                var result = new GameSchedule() { Round = round, CourtsUsed = courtsAvailable };

                List<string> topHalf = players.Take(players.Count / 2).ToList();
                List<string> bottomHalf = players.Skip(players.Count / 2).ToList();
                var played = new List<string>();
                for (int i = 1; i <= courtsAvailable; i++)
                {
                    var topHalfPlayer1Index = i - 1;
                    var topHalfPlayer2Index = new Random().Next(topHalf.Count);

                    while (topHalfPlayer1Index == topHalfPlayer2Index)
                    {
                        topHalfPlayer2Index = new Random().Next(topHalf.Count);
                    }

                    string player1 = topHalf[topHalfPlayer1Index];
                    string player2 = topHalf[totalPlayers / 2 - i];
                    string player3 = bottomHalf[i - 1];
                    string player4 = bottomHalf[totalPlayers / 2 -i];
                    var playersthisRound = new List<string> { player1, player2, player3, player4 };

                    played.AddRange(playersthisRound);
                    result.Playing.Add(new CourtPlayers() { CourtNumber = i, Players = playersthisRound });
                }

                var notPlayed = players.Except(played).ToList();

                if (notPlayed.Count == 0)
                {
                    notPlayed.Add(players[totalPlayers - 1]);
                }



                if (courtsAvailable > 1)
                {
                    foreach (var notPlayedPlayer in notPlayed)
                    {
                        var index = players.IndexOf(notPlayedPlayer);
                        players.RemoveAt(index);
                        players.Insert(0, notPlayedPlayer);
                    }
                                      
                }
                else
                {

                    for (int i = 1; i <= courtsAvailable; i++)
                    {

                        var restPlayer = players[totalPlayers - 1];
                        players.Insert(0, restPlayer);
                        players.RemoveAt(totalPlayers);
                    }
                }


                bool skipThisRound = false;
                foreach (var restingPlayer in notPlayed)
                {
                    if (CheckIfIRestedTooMuch(gameSchedules.RestStats, restingPlayer))
                    {
                        skipThisRound = true;
                        break;
                    }
                }
                var previousRound = gameSchedules.Schedules.FirstOrDefault(x => x.Round == round - 1);
                if(previousRound!=null && previousRound.Resting.Intersect(notPlayed).Any())
                {
                    skipThisRound = true;
                }
                    if (skipThisRound && totalSkipped<1000)
                {
                    round--;
                    totalSkipped++;
                }
                else
                {
                    result.Resting.AddRange(notPlayed);
                    gameSchedules.Schedules.Add(result);
                }
            }

            return gameSchedules;

        }


       private bool CheckIfIRestedTooMuch(Dictionary<string, int> restStats, string keyToCheck)
        {


            int valueToCheck;
            if (restStats.TryGetValue(keyToCheck, out valueToCheck))
            {               

                var minimumSatValue = restStats.Min(x => x.Value);                

                bool isHigher = minimumSatValue > 0 && restStats[keyToCheck] >= minimumSatValue + 1;

                if (isHigher)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }


        private static Dictionary<string, int> InitializeRestCount(List<string>? players)
        {
            Dictionary<string, int> restCounts = new Dictionary<string, int>();
            for (int i = 0; i < players.Count; i++)
            {
                string player = players[i];
                restCounts[player] = 0;
            }

            return restCounts;
        }

        private static List<string> GetDefaultPlayerNames(int totalPlayers, List<string>? players)
        {
            if (players == null)
            {
                players = new List<string>();

                for (int i = 1; i <= totalPlayers; i++)
                {
                    players.Add("Player " + i);
                }
            }

            return players;
        }

     
    }

}
