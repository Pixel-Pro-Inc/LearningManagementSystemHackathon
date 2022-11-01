using System.Globalization;
using API.Application.Extensions;
using CompressedStaticFiles;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices(_config);

            services.AddControllers();
            services.AddCors();
            services.AddCompressedStaticFiles();

            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline. It's chronologically sensitive so you can't just put anything any how
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.IsStaging())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseHsts();

            app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseCompressedStaticFiles();//app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}