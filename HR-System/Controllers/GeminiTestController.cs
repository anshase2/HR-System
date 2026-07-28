using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeminiTestController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;


        public GeminiTestController(
            IConfiguration configuration,
            HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }


        [HttpPost("test")]
        public async Task<IActionResult> TestGemini(
            string prompt)
        {

            var apiKey = _configuration["Gemini:ApiKey"];
            var model = _configuration["Gemini:Model"];

            var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";

            var request = new
            {
                contents = new[]
                {
                new
                {
                    parts = new[]
                    {
                        new
                        {
                            text = prompt
                        }
                    }
                }
            }
            };


            var response =
                await _httpClient.PostAsJsonAsync(url, request);


            var result =
                await response.Content.ReadAsStringAsync();


            return Ok(result);
        }
    }
}