using API.Core.Entities;

namespace API.Application.Interfaces
{
    public interface IAccountService
    {
        public Task<User> GetUser(string organizationId);
    }
}
