using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using File = API.Core.Entities.File;
using Syncfusion.EJ2.DocumentEditor;
using Newtonsoft.Json;
using System.Net;

namespace API.Infrastructure.Services
{
    public class DriveService : IDriveService
    {
        private readonly IFirebaseStorageService _firebaseStorageService;
        private readonly IFirebaseService _firebaseService;
        public DriveService(IFirebaseStorageService firebaseStorageService, IFirebaseService firebaseService)
        {
            _firebaseStorageService = firebaseStorageService;
            _firebaseService = firebaseService;
        }
        public async Task EditFile(File file)
        {
            await DeleteFile(file);

            //Store File to Storage Bucket
            string url = await _firebaseStorageService.StoreFile(file.FileUrl, file.FileName);

            file.FileUrl = url;

            //Store File Reference To Database
            await _firebaseService.EditData("File/" + file.Id, file);
        }
        public async Task<object> CreateFile(File file)
        {
            file.FileType = GetExtension(file.FileUrl);

            if (string.IsNullOrEmpty(file.FileType))
            {
                //Unsupported File Type Error
                return null;
            }

            file.FileName += "." + file.FileType;

            //Store File to Storage Bucket
            string url = await _firebaseStorageService.StoreFile(file.FileUrl, file.FileName);

            file.FileUrl = url;

            //Store File Reference To Database
            await _firebaseService.StoreData<File>("File", file);

            return file;
        }

        private string GetContentType(string path)//Gets the type of the file at that directory
        {
            var provider = new FileExtensionContentTypeProvider();

            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }

        public string GetExtension(string fileUrl)
        {
            int n = fileUrl.IndexOf("base64,");

            var _fileUrl = fileUrl.Remove(0, n + 7);

            var data = _fileUrl.Substring(0, 5);

            switch (data.ToUpper())
            {
                case "IVBOR":
                    return "png";
                case "/9J/4":
                    return "jpg";
                case "AAAAF":
                    return "mp4";
                case "JVBER":
                    return "pdf";
                case "AAABA":
                    return "ico";
                case "UMFYI":
                    return "rar";
                case "E1XYD":
                    if (fileUrl.Contains("spreadsheet"))
                        return "xlsx";

                    if (fileUrl.Contains("wordprocessing"))
                        return "docx";

                    return string.Empty;
                case "U1PKC":
                    return "txt";
                case "MQOWM":
                case "77U/M":
                    return "srt";
                case "UESDB":
                    if(fileUrl.Contains("spreadsheet"))
                        return "xlsx";

                    if (fileUrl.Contains("wordprocessing"))
                        return "docx";

                    return string.Empty;
                default:
                    return string.Empty;
            }
        }

        public async Task DeleteFile(File file)
        {
            //Store File to Storage Bucket
            await _firebaseStorageService.DeleteFile(file.FileName);

            //Store File Reference To Database
            await _firebaseService.DeleteData("File/" + file.Id);
        }

        public async Task<List<File>> GetFiles(UserDto userDto)
        {
            var files = await _firebaseService.GetData<File>("File");

            return files.Where(file => file.Owner.OrganizationId == userDto.OrganizationId).ToList();
        }

        public async Task CreateFolder(Folder folder)
        {
            await _firebaseService.StoreData<Folder>("Folder", folder);
        }

        public async Task DeleteFolder(Folder folder)
        {
            await _firebaseService.DeleteData("Folder/" + folder.Id);

            //Delete all sub-folders
            var folders = await GetFolders(folder.Owner);

            var relevantFolders = folders.Where(_folder => _folder.Owner.OrganizationId == folder.Owner.OrganizationId).ToList();

            relevantFolders = relevantFolders.Where(_folder => _folder.Directory == $"{folder.Directory}{folder.FolderName}/").ToList();

            foreach (var _folder in relevantFolders)
            {
                await DeleteFolder(_folder);
            }

            //Delete all files in the folder
            var files = await GetFiles(folder.Owner);

            var relevantFiles = files.Where(file => file.Owner.OrganizationId == folder.Owner.OrganizationId).ToList();

            relevantFiles = relevantFiles.Where(file => file.Directory == $"{folder.Directory}{folder.FolderName}/").ToList();

            foreach (var file in relevantFiles)
            {
                await DeleteFile(file);
            }
        }

        public async Task<List<Folder>> GetFolders(UserDto userDto)
        {
            var folders = await _firebaseService.GetData<Folder>("Folder");

            return folders.Where(folder => folder.Owner.OrganizationId == userDto.OrganizationId).ToList();
        }

        public File GetSFDT(File file)
        {
            using (WebClient client = new WebClient())
            {
                var bytes = client.DownloadData(file.FileUrl);

                var stream = new MemoryStream(bytes);

                file.FileUrl = ConvertDocument(stream, FormatType.Docx);

                return file;
            }            
        }

        public string ConvertDocument(Stream stream, FormatType formatType)
        {
            string sfdtText = "";
            WordDocument document =WordDocument.Load(stream, formatType);
            sfdtText = JsonConvert.SerializeObject(document);
            document.Dispose();

            return sfdtText;
        }
        
    }
}
