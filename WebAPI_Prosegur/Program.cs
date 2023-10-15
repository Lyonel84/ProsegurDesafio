using Core.Common;
using Core.Interfaces.CommandContract;
using Infrastucture;
using Infrastucture.Common;
using Infrastucture.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=DbProsegure.db"));
builder.Services.AddScoped<ICommandRepository, CommandRepository>();
builder.Services.AddScoped<IUsuariosRepository, UsuariosRepository>();
builder.Services.AddScoped<ITiendasRepository, TiendasRepository>();
builder.Services.AddScoped<IRolesRepository, RolesRepository>();
builder.Services.AddScoped<IProvinciasRepository, ProvinciasRepository>();
builder.Services.AddScoped<IProductosRepository, ProductosRepository>();
builder.Services.AddScoped<IOrdenesRepository, OrdenesRepository>();
builder.Services.AddScoped<IMateriaPrimaRepository, MateriaPrimaRepository>();
builder.Services.AddScoped<IDetalleProductosRepository, DetalleProductosRepository>();
builder.Services.AddScoped<IDetalleOrdenesRepository, DetalleOrdenesRepository>();
builder.Services.AddScoped<Seguridad>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
