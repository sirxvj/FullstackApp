using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record MemberUpdateDto
    {
        public required string UserName { get; set; }
        public string? Description { get; set; }
    }
}