namespace Schedule.Generator.Api.Models
{
    public class ScheduleInput
    {
        public int NumberOfCourts { get; set; }
        public List<string>? PlayerNames { get; set; }
        public int NumberOfPlayers { get; set; }

        public int? TotalRounds { get; set; }
    }
}