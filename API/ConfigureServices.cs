using API.Extensions;
using API.Helpers;

namespace API;

public static class ConfigureServices
{
    public static void Configure(WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var config = builder.Configuration;
        
        
        services.AddApplicationServices(config);
        services.AddIdentityServices(config);

        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        
        services.AddSwaggerGen();
        services.AddControllers();
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                pcc =>
                {
                    pcc.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });
        
    }
}