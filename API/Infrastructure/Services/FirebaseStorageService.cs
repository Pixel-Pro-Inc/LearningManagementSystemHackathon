using API.Application.Interfaces;
using Firebase.Storage;

namespace API.Infrastructure.Services
{
    public class FirebaseStorageService : IFirebaseStorageService
    {
        private readonly string Bucket = Environment.GetEnvironmentVariable("Firebase_Storage_Bucket");
        public async Task DeleteFile(string fileName)
        {
            try
            {
                await new FirebaseStorage(Bucket, new FirebaseStorageOptions()).Child("Files").Child(fileName).DeleteAsync();
            }
            catch (Exception ex)
            {
                Exception e = ex;
            }
        }

        public async Task<string> StoreFile(string base64, string fileName)
        {
            string b = Bucket;

            int n = base64.IndexOf("base64,");

            base64 = base64.Remove(0, n + 7);
            var bytes = Convert.FromBase64String(base64);

            var stream = new MemoryStream(bytes);

            try
            {
                var downloadUrl = await new FirebaseStorage(Bucket, new FirebaseStorageOptions()).Child("Files").Child(fileName).PutAsync(stream);
                return downloadUrl;
            }
            catch (Exception ex)
            {
                Exception e = ex;
                return null;
            }
        }
    }
}
