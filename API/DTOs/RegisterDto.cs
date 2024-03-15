using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record RegisterDto
    (
        [Required]
        [Length(3,50)]
        string Username,
        [Required]
        [Length(4,50)]
        string Password
    );
}