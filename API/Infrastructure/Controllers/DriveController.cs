using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using File = API.Core.Entities.File;

namespace API.Infrastructure.Controllers
{
    public class DriveController : BaseApiController
    {
        private readonly IDriveService _driveService;
        public DriveController(IDriveService driveService)
        {
            _driveService = driveService;
        }

        #region Folders
        [HttpPost("folder/retrieve")]
        public async Task<ActionResult<List<Folder>>> GetFolders(UserDto userDto)
        {
            return await _driveService.GetFolders(userDto);
        }

        [HttpPost("folder/create")]
        public async Task<ActionResult<List<Folder>>> CreateFolder(Folder folder)
        {
            var folders = await _driveService.GetFolders(folder.Owner);

            foreach (var _folder in folders)
            {
                if (_folder.Owner.OrganizationId == folder.Owner.OrganizationId
                    && _folder.Directory == folder.Directory
                    && _folder.FolderName == folder.FolderName)
                    return BadRequest("Folder already exists at this directory.");
            }

            await _driveService.CreateFolder(folder);
            return await _driveService.GetFolders(folder.Owner);
        }

        [HttpPost("folder/delete")]
        public async Task<ActionResult<List<Folder>>> DeleteFolder(Folder folder)
        {
            await _driveService.DeleteFolder(folder);
            return await _driveService.GetFolders(folder.Owner);
        }
        #endregion

        #region Files
        [HttpPost("file/retrieve")]
        public async Task<ActionResult<List<File>>> GetFiles(UserDto userDto)
        {
            return await _driveService.GetFiles(userDto);
        }

        [HttpPost("file/create")]
        public async Task<ActionResult<List<File>>> CreateFile(File file)
        {
            var files = await _driveService.GetFiles(file.Owner);

            foreach (var _file in files)
            {
                if (_file.Owner.OrganizationId == file.Owner.OrganizationId
                    && _file.Directory == file.Directory
                    && _file.FileName == file.FileName)
                    return BadRequest("File already exists at this directory.");
            }

            var result = await _driveService.CreateFile(file);
            if(result == null)
            {
                BadRequest("Unsupported Media Format");
            }

            return await _driveService.GetFiles(file.Owner);
        }

        [HttpPost("file/edit")]
        public async Task EditFile(File file)
        {
            await _driveService.EditFile(file);
        }

        [HttpPost("file/delete")]
        public async Task<ActionResult<List<File>>> DeleteFile(File file)
        {
            await _driveService.DeleteFile(file);
            return await _driveService.GetFiles(file.Owner);
        }
        #endregion

        #region Documents
        [HttpPost("document/retrieve")]
        public async Task<ActionResult<List<File>>> GetDocuments(UserDto userDto)
        {
            List<string> docTypes = new List<string>() { "pdf", "docx", "xlsx"};

            return (await _driveService.GetFiles(userDto)).Where(d => docTypes.Contains(d.FileType)).ToList();
        }
        #endregion

        #region SFDT
        [HttpPost("sfdt/retrieve")]
        public async Task<ActionResult<File>> GetSFDT(File file)
        {
            return _driveService.GetSFDT(file);
        }
        #endregion
    }
}
