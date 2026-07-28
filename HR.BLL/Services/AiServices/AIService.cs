using HR.BLL.DTOs.AiDTOs;
using HR.BLL.Interfaces.AiContracts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HR.BLL.Services.AiServices
{
    public class AIService:IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AIService(
            HttpClient httpClient,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }


        public async Task<CVAnalysisDTO> AnalyzeAsync(string prompt)
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


            var response = await _httpClient.PostAsJsonAsync(
                url,
                request);


            response.EnsureSuccessStatusCode();


            var result = await response.Content
                .ReadFromJsonAsync<JsonElement>();


            var text =
                result
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();


            var analysis =
                JsonSerializer.Deserialize<CVAnalysisDTO>(
                    text!,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });


            return analysis!;
        }
    }
}
