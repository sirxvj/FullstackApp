using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _userRepository.GetUsersAsync());
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<MemberDto?>> GetUserById(int id){
            return Ok( await _userRepository.GetUserByIdAsync(id));
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult<MemberDto?>> GetUserByUsername([FromRoute] string username)
        {
            return Ok(await _userRepository.GetUserByUserName(username));
        }
    }
}