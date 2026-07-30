using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Auth
{
    public class CreateEmplyeeResponseDTO
    {
        public Guid Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;
        public List<string>? Errors { get; set; }
    }
}
