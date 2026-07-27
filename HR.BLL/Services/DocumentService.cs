using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using HR.BLL.Interfaces;
using UglyToad.PdfPig;

namespace HR.BLL.Services
{
    public class DocumentService : IDocumentService
    {
        public async Task<string> ExtractTextAsync(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLower();

            return extension switch
            {
                ".pdf" => await ExtractPdfTextAsync(filePath),

                ".docx" => await ExtractDocxTextAsync(filePath),

                _ => throw new Exception("Unsupported file type")
            };
        }


        private Task<string> ExtractPdfTextAsync(string filePath)
        {
            var text = string.Empty;

            using (var document = PdfDocument.Open(filePath))
            {
                foreach (var page in document.GetPages())
                {
                    text += page.Text;
                }
            }

            return Task.FromResult(text);
        }


        private Task<string> ExtractDocxTextAsync(string filePath)
        {
            var text = string.Empty;

            using (WordprocessingDocument doc = WordprocessingDocument.Open(filePath, false))
            {
                var body = doc.MainDocumentPart?.Document.Body;

                if (body != null)
                {
                    text = body.InnerText;
                }
            }

            return Task.FromResult(text);
        }
    }
}
