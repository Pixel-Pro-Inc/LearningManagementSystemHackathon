using API.Application.Interfaces;
using API.Core.Entities;

namespace API.Infrastructure.Services
{
    public class AccountService: IAccountService
    {
        private readonly IFirebaseService _firebaseService;

        public AccountService(IFirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        public async Task<User> GetUser(string organizationId)
        {
            var collection = await _firebaseService.GetData<User>("Account");

            object user = null;

            if (collection != null && collection.Count != 0)
            {
                var result = collection.Where(u => u.OrganizationId == organizationId).ToList();

                if (result.Count > 0)
                    user = result[0];
            }
                 

            return user == null? null: (User)user;
        }
    }
}
