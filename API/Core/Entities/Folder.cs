using API.Application.DTO;

namespace API.Core.Entities
{
    public class Folder
    {
        public int? Id { get; set; }
        public UserDto Owner { get; set; }
        public string Directory { get; set; }
        public string FolderName { get; set; }
    }
}
