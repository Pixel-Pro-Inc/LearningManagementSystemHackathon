using API.Application.DTO;
using API.Core.Entities;
using File = API.Core.Entities.File;

namespace API.Application.Interfaces
{
    public interface IDriveService
    {
        public Task<List<Folder>> GetFolders(UserDto userDto);
        public Task CreateFolder(Folder folder);
        public Task DeleteFolder(Folder folder);

        public Task<List<File>> GetFiles(UserDto userDto);
        public Task<object> CreateFile(File file);

        public Task EditFile(File file);
        public Task DeleteFile(File file);

        public File GetSFDT(File file);
    }
}
