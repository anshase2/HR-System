using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace HR.DAL.Entities
{
    public class CVAnalysis
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public decimal MatchPercentage { get; set; }
        public string AiEvaluationSummary { get; set; } = string.Empty;
        public string MatchedSkills { get; set; } = string.Empty;
        public string Recommendation { get; set; } = string.Empty;
        public Application Application { get; set; } = null!;
    }
}
