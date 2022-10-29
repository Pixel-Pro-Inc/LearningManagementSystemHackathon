namespace API.Application.Interfaces
{
    public interface IFirebaseService
    {
        public Task StoreData<T>(string path, object thing) where T : class, new();
        public Task DeleteData(string fullpath);
        public Task EditData(string fullpath, object thing);
        public Task<List<T>> GetData<T>(string path) where T : class, new();
    }
}
