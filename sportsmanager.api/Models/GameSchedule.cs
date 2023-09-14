using System.Numerics;

namespace Schedule.Generator.Api.Models
{
    public class GameSchedules
    {
        public List<GameSchedule> Schedules { get; set; } = new List<GameSchedule>();


        public List<string> AllPlayers { get; set; }


        public GameSchedules(List<string> allPlayers)
        {

            AllPlayers = allPlayers;
        }

        public Dictionary<string, int> RestStats
        {
            get
            {
                var result = new Dictionary<string, int>();

                foreach (var item in AllPlayers)
                {
                    if (!result.ContainsKey(item))
                    {
                        result.Add(item, 0);
                    }

                }

                foreach (var schedule in Schedules)
                {
                    foreach (var restingPlayer in schedule.Resting)
                    {
                        if (result.ContainsKey(restingPlayer))
                        {
                            result[restingPlayer]++;
                        }

                    }
                }

                return result;
            }
        }

        public double RestAverage
        {
            get
            {
                int sum = 0;
                foreach (var kvp in RestStats)
                {
                    sum += kvp.Value;
                }

                return (double)sum / RestStats.Count;
            }
        }
    }
    public class GameSchedule
    {
        public int Round { get; set; }

        public int CourtsUsed { get; set; }

        public List<CourtPlayers> Playing { get; set; } = new List<CourtPlayers>();

        public List<string> Resting { get; set; } = new List<string> ();

    }

    public class CourtPlayers 
    {
        public int CourtNumber { get; set; }

        public List<string> Players { get; set; }
    }
}