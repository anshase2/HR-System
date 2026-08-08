using HR.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;

namespace HR.BLL.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var section = _config.GetSection("EmailSettings");
            var host = section["Host"];
            var port = int.Parse(section["Port"] ?? "587");
            var username = section["Username"];
            var password = section["Password"];
            var from = section["FromEmail"] ?? username;
            var displayName = section["FromName"] ?? "HR System";

            using var client = new SmtpClient(host, port)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(username, password)
            };

            var mail = new MailMessage()
            {
                From = new MailAddress(from, displayName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mail.To.Add(to);

            await client.SendMailAsync(mail);
        }
    }
}
