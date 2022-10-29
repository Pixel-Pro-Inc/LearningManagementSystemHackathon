using API.Application.Helpers;
using API.Application.Interfaces;
using API.Infrastructure.Services;

namespace API.Application.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IExcelService, ExcelService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IFirebaseService, FirebaseServices>();

            return services;
        }
    }
}
