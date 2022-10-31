namespace API.Core.Entities
{
    public class Announcement
    {
        public int? Id { get; set; }
        public string Channel { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Audience { get; set; }
    }
}
