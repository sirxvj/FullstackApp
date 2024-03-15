using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(RequestDelegate next,IHostEnvironment env,ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context){
            try{
                await _next(context);
            }
            catch(Exception ex){
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()?
                    new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace):
                    new ApiException(context.Response.StatusCode,"Internal Server Error");

                await context.Response.WriteAsync(JsonSerializer.Serialize(response,
                    new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}
                ));
            }
        }  
    }
}