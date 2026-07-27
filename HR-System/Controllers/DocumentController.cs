using HR.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IFileService _fileService;

        public DocumentController(
            IDocumentService documentService,
            IFileService fileService)
        {
            _documentService = documentService;
            _fileService = fileService;
        }


        [HttpPost("extract")]
        public async Task<IActionResult> Extract(IFormFile file)
        {
            var path = await _fileService.SaveFileAsync(file, "cvs");

            var text = await _documentService.ExtractTextAsync(path);

            return Ok(new
            {
                FilePath = path,
                Text = text
            });
        }
    }
}
