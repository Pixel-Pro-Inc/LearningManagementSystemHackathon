using System;

namespace API.Application.DTO
{
    public class MessageDto
    {
        public string MessageChannel { get; set; }

        public string SenderId { get; set; }
        public string? SenderUsername { get; set; }

        public List<string> RecipientIds { get; set; }
        public List<string>? RecipientUsernames { get; set; }

        public string Content { get; set; }
        public DateTime? DateRead { get; set; } = new DateTime();
        public string? MessageSent { get; set; } = DateTime.Now.ToShortTimeString();

    }
}