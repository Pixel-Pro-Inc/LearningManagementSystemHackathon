using API.Application.Data;
using API.Application.Interfaces;
using Newtonsoft.Json;

namespace API.Infrastructure.Services
{
    public class FirebaseServices : IFirebaseService
    {

        public readonly FirebaseDataContext _firebaseServices;
        public FirebaseServices()
        {
            _firebaseServices = new FirebaseDataContext();
        }

        public async Task StoreData<T>(string path, object thing) where T : class, new()
        {
            string str = JsonConvert.SerializeObject(thing);

            dynamic obj = JsonConvert.DeserializeObject(str);

            var result = await GetData<T>(path);

            obj.Id = result.Count;

            await _firebaseServices.StoreData($"{path}/{result.Count}", obj);
        }
        public Task DeleteData(string fullpath) => _firebaseServices.DeleteData(fullpath);
        public Task EditData(string fullpath, object thing) => _firebaseServices.EditData(fullpath, thing);
        public async Task<List<T>> GetData<T>(string path) where T : class, new()
        {
            var response = await _firebaseServices.GetData<T>(path);

            return response;
        }
    }
}
