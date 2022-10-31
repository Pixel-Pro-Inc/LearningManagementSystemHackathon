using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Core.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string messageChannel { get; set; }

        public string senderId { get; set; }
        public string senderUsername { get; set; }
        public User sender { get; set; }
        public List<string> recipientIds { get; set; }
        public List<string> recipientUsernames { get; set; }
        public List<User> recipients { get; set; }

        public string content { get; set; }
        public DateTime dateRead { get; set; } = DateTime.Now;
        public string messageSent { get; set; } = DateTime.Now.ToShortTimeString();

    }
}
