using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;

namespace API.Data;

public class SeedData
{
    public static async Task Seed(DataContext context)
    {
        
            string rawText = await File.ReadAllTextAsync("/home/sicrx/RiderProjects/AyzApp/API/Data/Photos.json");
            var photos= JsonSerializer.Deserialize<IEnumerable<Photo>>(rawText);
           
            if (photos != null) await context.Photos.AddRangeAsync(photos);
            await context.SaveChangesAsync();
    }
}