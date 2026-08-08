using System.Security.Cryptography;
using HR.BLL.Interfaces;

namespace HR.BLL.Services
{
    public class OtpService : IOtpService
    {
        public string GenerateOtp()
        {
            int value = RandomNumberGenerator.GetInt32(0, 1000000);
            return value.ToString("D6");
        }
    }
}
