using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper, IPhotoService photoService)
        {
            _userService = userService;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            return Ok(await _userService.GetUsersAsync());
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<MemberDto?>> GetUserById(int id){
            return Ok( await _userService.GetUserByIdAsync(id));
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult<MemberDto?>> GetUserByUsername([FromRoute] string username)
        {
            return Ok(await _userService.GetUserByUserName(username));
        }
        [HttpPut]
        public async Task<ActionResult<MemberDto>> UpdateUser(MemberUpdateDto memberUpdate)
        {

            var username = User.GetUsername();
            if(await _userService.Update(memberUpdate,username)) return NoContent();
            return BadRequest("User does not exist");
            
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userService.GetUserByUserName(User.GetUsername());

            var result = await _photoService.Upload(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo{
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                IsMain = true
                };
            foreach (var userPhoto in user.Photos)
            {
                userPhoto.IsMain = false;
            }
            user.Photos.Add(photo); 
        }
    }
}