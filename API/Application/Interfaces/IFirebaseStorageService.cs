namespace API.Application.Interfaces
{
    public interface IFirebaseStorageService
    {
        /// <summary>
        /// Returns the url for the stored file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public Task<string> StoreFile(string base64, string fileName);

        public Task DeleteFile(string fileName);
    }
}
