using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext:DbContext
{
    public DataContext(DbContextOptions options):base(options)
    {}

    public DbSet<AppUser> Users { get; set; } = null!;
    public DbSet<Photo> Photos { get; set; } = null!;
    
}