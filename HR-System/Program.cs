using HR.API;
using HR.BLL.Interfaces;
using HR.BLL.Services;
using HR.DAL.DatabaseContext;
using HR.DAL.Entities.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IJobService, JobService>();
builder.Services.AddTransient<IJwtService, JwtService>();
// Generic repository registration (IRepositories namespace)
builder.Services.AddScoped(typeof(HR.DAL.IRepositories.IGenericRepository<>), typeof(HR.DAL.Repositories.GenericRepository<>));
// Specific repositories
builder.Services.AddScoped<HR.DAL.IRepositories.IJobRepository, HR.DAL.Repositories.JobRepository>();
builder.Services.AddScoped<HR.DAL.IRepositories.IApplicationRepository, HR.DAL.Repositories.ApplicationRepository>();
builder.Services.AddScoped<HR.DAL.IRepositories.IApplicantRepository, HR.DAL.Repositories.ApplicantRepository>();
// Job repository
builder.Services.AddScoped<HR.DAL.Repositories.IJobRepository, HR.DAL.Repositories.JobRepository>();

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ProducesAttribute("application/json"));
    options.Filters.Add(new ConsumesAttribute("application/json"));
   /* var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));*/
});
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter JWT token like: Bearer {your token}"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});


builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options => {
 options.Password.RequiredLength = 5;
 options.Password.RequireNonAlphanumeric = false;
 options.Password.RequireUppercase = false;
 options.Password.RequireLowercase = true;
 options.Password.RequireDigit = true;
})
 .AddEntityFrameworkStores<ApplicationDbContext>()
 .AddDefaultTokenProviders()
 .AddUserStore<UserStore<ApplicationUser, ApplicationRole, ApplicationDbContext, Guid>>()
 .AddRoleStore<RoleStore<ApplicationRole, ApplicationDbContext, Guid>>()
 ;
//JWT
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
 .AddJwtBearer(options => {
     options.TokenValidationParameters = new TokenValidationParameters()
     {
         ValidateAudience = true,
         ValidAudience = builder.Configuration["Jwt:Audience"],
         ValidateIssuer = true,
         ValidIssuer = builder.Configuration["Jwt:Issuer"],
         ValidateLifetime = true,
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
     };
 });

builder.Services.AddAuthorization(options => {
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHsts();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
// Seed Data ??? ?
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var userManager = services
        .GetRequiredService<UserManager<ApplicationUser>>();

    var roleManager = services
        .GetRequiredService<RoleManager<ApplicationRole>>();

    await Seeder.SeedAsync(userManager, roleManager);
}
app.Run();
