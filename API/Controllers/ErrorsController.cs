using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorsController:ControllerBase
    {
        private readonly DataContext _context;

        public ErrorsController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> UnauthorizedError()
        {
            return "strin jsdbnjksbd";
        }
        
        [HttpGet("not-found")]
        public async Task<ActionResult<AppUser>> GetNotFoundError()
        {
            var user = await _context.Users.FindAsync(-1);
            if (user is null) return NotFound();
            return Ok(user);
        }

        [HttpGet("server-error")]
        public async Task<ActionResult<string>> GetServerError()
        {
            var user = await _context.Users.FindAsync(-1);
            var result = user.ToString();
            return result;
        }


        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is custom bad request");
        }

        [HttpPost("seed-data")]
        public async Task MakeSeedData()
        {
            await SeedData.Seed(_context);
        }
    }
}