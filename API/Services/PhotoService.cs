using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings> config)
        {
           var account = new Account(
            config.Value.CloudName,
            config.Value.APIKey,
            config.Value.APISecret
           );

           _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> Upload(IFormFile file)
        {
            var result = new ImageUploadResult();
            if(file.Length>0){
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams{
                    File=new FileDescription(file.FileName,stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                result = await _cloudinary.UploadAsync(uploadParams);
            }
            return result;
        }
        public async Task<DeletionResult> Delete(string publicId)
        {
            var delParam = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(delParam);
            return result;
        }

        
    }
}