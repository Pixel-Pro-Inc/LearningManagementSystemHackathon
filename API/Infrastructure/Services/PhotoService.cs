using API.Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService()
        {
            var acc = new Account
                (
                Environment.GetEnvironmentVariable("Cloudinary_CloudName"),
                Environment.GetEnvironmentVariable("Cloudinary_ApiKey"),
                Environment.GetEnvironmentVariable("Cloudinary_ApiSecret")
                );

            _cloudinary = new Cloudinary(acc);
        }
        public async Task<ImageUploadResult> AddAvatarPhotoAsync(string path)
        {
            var uploadResult = new ImageUploadResult();

            int n = path.IndexOf("base64,");

            path = path.Remove(0, n + 7);
            var bytes = Convert.FromBase64String(path);

            FormFile file;

            var myStream = new MemoryStream(bytes);
            file = new FormFile(myStream, 0, myStream.Length, null, "imageName");

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("Avatar", stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);     
            }

            return uploadResult;
        }

        public async Task<ImageUploadResult> AddPhotoAsync(string path)
        {
            var uploadResult = new ImageUploadResult();

            int n = path.IndexOf("base64,");

            path = path.Remove(0, n + 7);
            var bytes = Convert.FromBase64String(path);

            FormFile file;

            var myStream = new MemoryStream(bytes);
            file = new FormFile(myStream, 0, myStream.Length, null, "imageName");

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("UserContent", stream)
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}
