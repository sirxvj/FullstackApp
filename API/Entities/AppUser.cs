using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public string Description { get; set; }

    public DateTime CreatedAt { get; set; }=DateTime.Now;  

    public DateTime LastActive { get; set; } = DateTime.Now;
    public ICollection<Photo> Photos { get; set; }
}