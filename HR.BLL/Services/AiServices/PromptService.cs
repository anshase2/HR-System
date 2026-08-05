using HR.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HR.BLL.Interfaces.AiContracts;
using System.Threading.Tasks;

namespace HR.BLL.Services.AiServices
{
    public class PromptService: IPromptService
    {
        public string BuildPrompt(
        Job job,//jobdto
        string cvText)
        {

            return $@"

You are an HR AI assistant.

Analyze this candidate CV
and compare it with the job requirements.

Job Title:
{job.Title}


Job Description:
{job.Description}


Required Skills:
{string.Join(", ",
        job.RequiredSkills.Select(x => x.Name))}


Candidate CV:
{cvText}


Return ONLY JSON:

{{
  ""MatchPercentage"": 0,
  ""AiEvaluationSummary"": """",
  ""MatchedSkills"": [],
  ""Recommendation"": """"
}}


Rules:
- MatchPercentage must be between 0 and 100.
- Identify matching skills.
- Recommendation should be Interview or Reject.

";

        }
    }
}

