using CloudinaryDotNet.Actions;

namespace API.Application.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddAvatarPhotoAsync(string path);
        Task<ImageUploadResult> AddPhotoAsync(string path);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
