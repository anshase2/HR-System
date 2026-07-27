using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, string folderName);
        Task DeleteFileAsync(string filePath);
        //extract text from pdf file
    }
}
