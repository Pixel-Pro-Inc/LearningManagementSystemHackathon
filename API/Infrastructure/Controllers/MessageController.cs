using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Infrastructure.Controllers
{
    public class MessageController : BaseApiController
    {
        private readonly IMessageService _messageService;
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost("send")]
        public async Task SendMessage(MessageDto messageDto)
        {
            await _messageService.SendMessage(messageDto);
        }

        [HttpPost("getmessages")]
        public async Task<ActionResult<List<Message>>> GetMessages(GetMessagesDto getMessagesDto)
        {
            return await _messageService.GetMessages(getMessagesDto);
        }
        [HttpPost("getchannelid")]
        public async Task<ActionResult<ChannelIdDto>> GetChannel(GetMessagesDto getMessagesDto)
        {
            return await _messageService.GetChannelId(getMessagesDto);
        }

        [HttpGet("closechannelid/{channelId}")]
        public async Task CloseChannel(string channelId)
        {
            await _messageService.CloseChannelId(channelId);
        }
    }
}
