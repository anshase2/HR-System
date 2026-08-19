using DocumentFormat.OpenXml.Vml;
using HR.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

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

            var host = section["Host"] ?? "smtp.gmail.com";
            var port = int.Parse(section["Port"] ?? "465");
            var username = section["Username"];
            var password = section["Password"];
            var from = section["FromEmail"] ?? username;
            var displayName = section["FromName"] ?? "HR System";

            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(displayName, from)
            );

            message.To.Add(
                new MailboxAddress("", to)
            );

            message.Subject = subject;

            message.Body = new TextPart("html")
            {
                Text = body
            };

            using var client = new MailKit.Net.Smtp.SmtpClient();

            try
            {
         

                await client.ConnectAsync(
                    host,
                    port,
                    SecureSocketOptions.SslOnConnect
                );


                await client.AuthenticateAsync(
                    username,
                    password
                );


                await client.SendAsync(message);


                await client.DisconnectAsync(true);

            }
            catch (Exception ex)
            {
                Console.WriteLine("SMTP ERROR:");
                Console.WriteLine(ex.ToString());

                throw;
            }
        }
    }
}
