using API.Application.DTO;
using API.Core.Entities;

namespace API.Application.Interfaces
{
    public interface IMessageService
    {
        public Task SendMessage(MessageDto messageDto);

        public Task<List<Message>> GetMessages(GetMessagesDto getMessagesDto);

        public Task<ChannelIdDto> GetChannelId(GetMessagesDto getMessagesDto);

        public Task CloseChannelId(string channelId);
    }
}
