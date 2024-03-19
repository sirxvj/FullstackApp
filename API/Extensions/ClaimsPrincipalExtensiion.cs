using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensiion
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }
}