using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.DTOs.Ai
{
    public class CVAnalysisDTO
    {
        public int Id { get; set; }

        public decimal MatchPercentage { get; set; }//score of how well the CV matches the job description

        public string AiEvaluationSummary { get; set; } = string.Empty;
        public List<string> MatchedSkills { get; set; } = new();
        public string Recommendation { get; set; } = string.Empty;
    }
}

