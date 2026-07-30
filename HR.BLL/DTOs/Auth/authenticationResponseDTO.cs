using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Auth
{
    public class authenticationResponseDTO
    {
        public string? Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}
