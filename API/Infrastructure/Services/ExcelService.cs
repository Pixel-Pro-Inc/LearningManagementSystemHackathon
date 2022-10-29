using API.Application.Extensions;
using API.Application.Helpers;
using API.Application.Interfaces;
using API.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace API.Infrastructure.Services
{
    public class ExcelService: IExcelService
    {
        private readonly string _rootPath;
        private readonly IFirebaseService _firebaseServices;

        public ExcelService(IFirebaseService firebaseServices, IWebHostEnvironment env)
        {
            _firebaseServices = firebaseServices;
            _rootPath = env.WebRootPath;
        }

    }
}
