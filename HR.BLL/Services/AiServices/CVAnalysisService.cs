using HR.BLL.Interfaces;
using HR.BLL.Interfaces.AiContracts;
using HR.DAL.Entities;
using HR.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Services.AiServices
{
    public class CVAnalysisService: ICVAnalysisService
    {
        private readonly IApplicationRepository _applicationRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IDocumentService _documentService;
        private readonly IPromptService _promptService;
        private readonly IAIService _aiService;
        private readonly IGenericRepository<CVAnalysis> _repository;


        public CVAnalysisService(
            IApplicationRepository applicationRepository,
            IDocumentService documentService,
            IPromptService promptService,
            IAIService aiService,
            IGenericRepository<CVAnalysis> repository,
            IJobRepository jobRepository)
        {
            _applicationRepository = applicationRepository;
            _documentService = documentService;
            _promptService = promptService;
            _aiService = aiService;
            _repository = repository;
            _jobRepository = jobRepository;
        }



        public async Task AnalyzeApplicationAsync(
            int applicationId)
        {

            // Get Application
            var application =
                await _applicationRepository
                .GetByIdAsync(applicationId);


            if (application == null)
                throw new Exception(
                    "Application not found");



            // Extract CV text
            var resumeText =
                await _documentService
                .ExtractTextAsync(
                    application.CvUrl);



            // Create Prompt
            var job = await _jobRepository.GetByIdAsync(application.JobId);

            if (job == null)
                throw new Exception("Job not found");
            var prompt =
                _promptService.BuildPrompt(
                    job,
                    resumeText);



            // Call AI
            var aiResult =
                await _aiService
                .AnalyzeAsync(prompt);



            // Save result
            var analysis = new CVAnalysis
            {
                ApplicationId = applicationId,

                ResumeText = resumeText,

                MatchPercentage = aiResult.MatchPercentage,

                AiEvaluationSummary =
                    aiResult.AiEvaluationSummary
            };


            await _repository.AddAsync(analysis);
            await _repository.SaveChangesAsync();

        }
    }
}
