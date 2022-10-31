namespace API.Application.DTO
{
    public class UserDto
    {
        public string Organization { get; set; }
        public string FirstNames { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
        public List<string> Languages { get; set; }
        public string OrganizationId { get; set; }
        public string Email { get; set; }
        public string AccountType { get; set; }
        public bool Disabled { get; set; }
        public string AvatarUrl { get; set; }
        public string? AvatarPublicId { get; set; }
    }
}
