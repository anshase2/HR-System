using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.BLL.Interfaces
{
    public interface IDocumentService
    {
        Task<string> ExtractTextAsync(string filePath);

    }
}
