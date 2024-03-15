using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IAccountService
    {
        Task<UserDto?> Register(RegisterDto user);
        
        
        Task<UserDto?> Login(LoginDto loginDto);
       
    }
}