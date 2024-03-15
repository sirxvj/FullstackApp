using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserService
{
    Task<MemberDto?> GetUserByIdAsync(int id);
    Task<MemberDto?> GetUserByUserName(string username);
    Task<IEnumerable<MemberDto>> GetUsersAsync();
}