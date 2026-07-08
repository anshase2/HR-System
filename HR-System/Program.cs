using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HR.DAL.Entities.Identity;
using HR.BLL.Services;
using HR.BLL.Interfaces;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient<IAuthService, AuthService>();

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ProducesAttribute("application/json"));
    options.Filters.Add(new ConsumesAttribute("application/json"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "api.xml"));
    });


builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options => {
 options.Password.RequiredLength = 5;
 options.Password.RequireNonAlphanumeric = false;
 options.Password.RequireUppercase = false;
 options.Password.RequireLowercase = true;
 options.Password.RequireDigit = true;
})
 //.AddEntityFrameworkStores<ApplicationDbContext>()
 .AddDefaultTokenProviders()
// .AddUserStore<UserStore<ApplicationUser, ApplicationRole, ApplicationDbContext, Guid>>()
 //.AddRoleStore<RoleStore<ApplicationRole, ApplicationDbContext, Guid>>()
 ;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHsts();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
