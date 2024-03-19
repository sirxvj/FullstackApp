using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserService:IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<MemberDto?> GetUserByIdAsync(int id)
    {
        return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(u => u.Id == id); //FindAsync(id);
    }

    public async Task<MemberDto?> GetUserByUserName(string username)
    {
        return await _context.Users
            .Where(u => u.UserName == username).ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetUsersAsync()
    {
        return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
    }
    public async Task<bool> Update(MemberUpdateDto member,string username){

        var user = await _context.Users.Where(u=>u.UserName==username).FirstOrDefaultAsync();
        if(user==null || user.UserName != username){
            return false;
        }
        _mapper.Map(member,user);
        _context.Entry(user).State=EntityState.Modified;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task SaveChanges(AppUser user)
    {
        _context.Users.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}