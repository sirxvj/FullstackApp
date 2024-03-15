using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public record UserDto
    (
        [Required]
        [Length(3,50)]
        string Username,
        [Required]
        string Token
    );
}