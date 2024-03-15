namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;

    public string PhotoUrl { get; set; } = null!;

    public string Description { get; set; }= null!;

    public DateTime CreatedAt { get; set; }=DateTime.Now;  

    public DateTime LastActive { get; set; } = DateTime.Now;
    public ICollection<PhotoDto> Photos { get; set; }
}