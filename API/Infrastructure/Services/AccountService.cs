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

        public async Task<User> GetUser(string studentId)
        {
            var collection = await _firebaseService.GetData<User>("Account");

            object user = null;

            if (collection != null && collection.Count != 0)
                 user = collection.Where(u => u.StudentId == studentId).ToList()[0];

            return user == null? null: (User)user;
        }
    }
}
