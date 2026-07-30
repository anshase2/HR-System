using HR.DAL.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.BLL.DTOs.Auth;

namespace HR.BLL.Interfaces
{
    public interface IJwtService
    {
        authenticationResponseDTO CreateJwtToken(ApplicationUser user);

    }
}
