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
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AccountService:IAccountService
    {
       private readonly DataContext _dataContext;
       private readonly ITokenService _tokenService;

        public AccountService(DataContext dataContext, ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        public async Task<UserDto?> Register(RegisterDto user)
        {
            if (await UserExists(user.Username)) return null;
            
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

        
        public async Task<UserDto?> Login(LoginDto loginDto)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(u=>u.UserName==loginDto.Username);

            if(user == null) return null;

            using var hmac = new HMACSHA256(user.PasswordSalt);

            var loginHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            if(!Enumerable.SequenceEqual(loginHash,user.PasswordHash)){
                return null;
            }
            return new UserDto(user.UserName,_tokenService.CreateToken(user));
        }
        private async Task<bool> UserExists(string username)
        {
            return await _dataContext.Users.AnyAsync(u=>u.UserName==username);
        }


    }
}