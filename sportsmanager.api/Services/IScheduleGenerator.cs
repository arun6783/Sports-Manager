using Microsoft.AspNetCore.Http;
using Schedule.Generator.Api.Models;

namespace Schedule.Generator.Api.Services
{
    public interface IScheduleGenerator
    {
        GameSchedules GenerateSchedule(int totalPlayers, int courtsAvailable, List<string>? players, int totalRounds);
    }

}
