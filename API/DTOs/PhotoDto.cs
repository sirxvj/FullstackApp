namespace API.DTOs;

public record PhotoDto
{
    public int Id { get; set; }
    public  string Url { get; set; }
    public bool IsMain { get; set; }
}