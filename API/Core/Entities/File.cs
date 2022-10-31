using API.Application.DTO;

namespace API.Core.Entities
{
    public class File
    {
        public int? Id { get; set; }
        public UserDto Owner { get; set; }
        public string Directory { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public string? FileType { get; set; }
    }
}
