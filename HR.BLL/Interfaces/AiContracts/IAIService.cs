using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.BLL.DTOs.AiDTOs;
namespace HR.BLL.Interfaces.AiContracts
{
    public interface IAIService
    {
        Task<CVAnalysisDTO> AnalyzeAsync(string prompt);

    }
}
