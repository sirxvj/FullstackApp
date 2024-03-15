using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly DataContext _dataContext;

        private readonly ITokenService _tokenService;

        public AccountController(DataContext dataContext,ITokenService tokenService)
        {
            _dataContext=dataContext;
            _tokenService = tokenService;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody]RegisterDto user)
        {
            if (await UserExists(user.Username)) return BadRequest("User Already Exists");
            
            using var hmac = new HMACSHA256();

            var newUser = new AppUser()
            {
                UserName = user.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                PasswordSalt = hmac.Key
            };
            _dataContext.Users.Add(newUser);
            await _dataContext.SaveChangesAsync();
            return new UserDto(user.Username,_tokenService.CreateToken(newUser));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody]LoginDto loginDto)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(u=>u.UserName==loginDto.Username);

            if(user == null) return Unauthorized("User doesnt exist");

            using var hmac = new HMACSHA256(user.PasswordSalt);

            var loginHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            if(!Enumerable.SequenceEqual(loginHash,user.PasswordHash)){
                return Unauthorized("Couldn`t login(wrong password))");
            }
            return new UserDto(user.UserName,_tokenService.CreateToken(user));
        }
        private async Task<bool> UserExists(string username)
        {
            return await _dataContext.Users.AnyAsync(u=>u.UserName==username);
        }
    }
}