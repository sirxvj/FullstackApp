using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public record LoginDto(
        [Required]
        [Length(3,50)]
        string Username,
        [Required]
        [Length(3,50)]
        string Password
    );
}