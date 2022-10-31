using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using PusherServer;

namespace API.Infrastructure.Services
{
    public class MessageService: IMessageService
    {
        private readonly IFirebaseService _firebaseService;
        private readonly IAccountService _accountService;
        public MessageService(IFirebaseService firebaseService, IAccountService accountService)
        {
            _firebaseService = firebaseService;
            _accountService = accountService;
        }

        public async Task CloseChannelId(string channelId)
        {
            var channels = await _firebaseService.GetData<ChannelIdDto>("MessageChannel");
            var result = channels.Where(c => c.ChannelId == channelId).ToList();

            await _firebaseService.DeleteData("MessageChannel/" + result[0].Id);
        }

        public async Task<ChannelIdDto> GetChannelId(GetMessagesDto getMessagesDto)
        {
            var channels = await _firebaseService.GetData<ChannelIdDto>("MessageChannel");

            if (channels.Count == 0)
                return null;

            var relevantChannel = new List<ChannelIdDto>();

            foreach (var channel in channels)
            {
                bool add = true;

                foreach (var participant in channel.ParticipantsIds)
                {
                    if (!getMessagesDto.ParticipantsIds.Contains(participant))
                    {
                        add = false;
                        break;
                    }
                }

                if (add)
                    relevantChannel.Add(channel);
            }

            if (relevantChannel.Count == 0)
                return null;

            return relevantChannel[0];
        }

        public async Task<List<Message>> GetMessages(GetMessagesDto getMessagesDto)
        {
            var messages = await _firebaseService.GetData<Message>("Message");

            var relevantMessages = new List<Message>();

            foreach (var message in messages)
            {
                bool add = true;

                var participants = new List<string>();
                participants.AddRange(message.recipientIds);
                participants.Add(message.senderId);

                foreach (var participant in participants)
                {
                    if (!getMessagesDto.ParticipantsIds.Contains(participant))
                    {
                        add = false;
                        break;
                    }
                }

                if (add && !relevantMessages.Contains(message))
                    relevantMessages.Add(message);
            }

            return relevantMessages;
        }

        public async Task SendMessage(MessageDto messageDto)
        {
            var options = new PusherOptions
            {
                Cluster = "us2",
                Encrypted = true
            };

            var pusher = new Pusher(
              "1499136",
              "50543c871b4d08fed31e",
              "b68a6236c1894e31d62b",
              options);

            List<User> recipients = new List<User>();
            List<string> recipientUsernames = new List<string>();
            var users = await _accountService.GetUsers();

            foreach (var user in users)
            {
                if (messageDto.RecipientIds.Contains(user.OrganizationId))
                {
                    recipients.Add(user);
                    recipientUsernames.Add(user.GetFullName());
                }
            }

            Message message = new Message()
            {
                content = messageDto.Content,
                messageChannel = messageDto.MessageChannel,
                recipients = recipients,
                recipientIds = messageDto.RecipientIds,
                recipientUsernames = recipientUsernames,
                sender = users.Where(u => u.OrganizationId == messageDto.SenderId).ToList()[0],
                senderId = messageDto.SenderId,
                senderUsername = users.Where(u => u.OrganizationId == messageDto.SenderId).ToList()[0].GetFullName(),
            };

            //Send Message
            var result = await pusher.TriggerAsync(
              $"{messageDto.MessageChannel}",
              "message",
              message);

            //Save To Firebase

            await _firebaseService.StoreData<Message>("Message", message);

            List<string> participantIds = new List<string>();
            participantIds.AddRange(messageDto.RecipientIds);
            participantIds.Add(messageDto.SenderId);

            await _firebaseService.StoreData<ChannelIdDto>("MessageChannel", new ChannelIdDto()
            {
                ChannelId = messageDto.MessageChannel,
                ParticipantsIds = participantIds
            });
        }
    }
}
