using System.Text.Json;
using API;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Mvc;

[assembly:ApiController]
var builder = WebApplication.CreateBuilder(args);

ConfigureServices.Configure(builder);
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(options=>{
    options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();


app.Run();

