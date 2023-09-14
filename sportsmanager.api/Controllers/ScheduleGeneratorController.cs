using Microsoft.AspNetCore.Mvc;
using Schedule.Generator.Api.Models;
using Schedule.Generator.Api.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleGeneratorController : ControllerBase
    {
        private readonly IScheduleGenerator _scheduleGenerator;
        private const int DefaultTotalRounds = 15;

        public ScheduleGeneratorController(IScheduleGenerator scheduleGenerator)
        {
            _scheduleGenerator = scheduleGenerator;
        }

        [HttpGet(Name = "GenerateSchedule")]
        public ActionResult<GameSchedules> Get([FromBody] ScheduleInput input)
        {
            var a = _scheduleGenerator.GenerateSchedule(input.NumberOfPlayers, input.NumberOfCourts, input.PlayerNames, input.TotalRounds.GetValueOrDefault(DefaultTotalRounds));
            return new OkObjectResult(a);
        }

    }
}