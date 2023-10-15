using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using EficazFramework.Resources.Strings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosRepository repository;
        private readonly Seguridad _seguridad;
        private readonly IRolesRepository repositoryrol;
        private readonly IConfiguration _config;

        public UsuariosController(IConfiguration config,IUsuariosRepository repository, Seguridad seguridad, IRolesRepository repositoryrol = null)
        {
            this.repository = repository;
            this._seguridad = seguridad;
            this.repositoryrol = repositoryrol;
            this._config = config;
        }

        [HttpGet]
        public async Task<ProcessResult<List<Usuarios>>> Get()
        {

            ProcessResult<List<Usuarios>> result = new ProcessResult<List<Usuarios>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Usuarios>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<Usuarios>> GetListadoById(int Id)
        {

            ProcessResult<Usuarios> result = new ProcessResult<Usuarios>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Usuarios>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Usuarios>> Post(UsuarioDto Item)
        {

            ProcessResult<Usuarios> result = new ProcessResult<Usuarios>();
            try
            {
                if (Item != null)
                {
                    if (!await repository.ValidaExist(Item.Id,Item.usuarios.Name))
                    {
                        Item.usuarios.Password = _seguridad.GetHash(Item.usuarios.Password);
                        if (Item.Id == 0)
                        {
                            result.Result = await repository.AddAsync(Item.usuarios);
                        }
                        else
                        {
                            result.Result = await repository.UpdateAsync(Item.usuarios);
                        }
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Exception = new OperationException("Los datos ingresados coinciden con un Usuario existente");
                    }
                    
                }
              
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Usuarios>(ex);
            }
            return result;
        }

      
        [HttpPost]
        [Route("Login")]
        public async Task<ProcessResult<UsuarioLoginDto>> Login([FromBody] LoginDTO loginDto)
        {
            ProcessResult<UsuarioLoginDto> result = new ProcessResult<UsuarioLoginDto>();
            try
            {
                var usuario = await repository.GetListadoByNombre(loginDto.Name);
                if (usuario == null)
                {
                    result.Exception.Message = "El Usuario no Existe";
                }
                else if (usuario.Password != _seguridad.GetHash(loginDto.Password))
                {
                    result.Exception.Message = "El Password no coincide con el Usuario";
                }
                else
                {
                    var jwt = _config.GetSection("Jwt").Get<Jwt>();
                    UsuarioLoginDto login = new UsuarioLoginDto();
                    var rol = await repositoryrol.GetListadoById(usuario.IdRol);


                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("id" ,usuario.Id.ToString()),
                        new Claim("Name" ,usuario.Name),
                        new Claim("IdRol" ,usuario.IdRol.ToString()),
                        new Claim("NameRol" ,rol.Name)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                    var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        jwt.Issuer,
                        jwt.Audience,
                        claims,
                        signingCredentials: singIn
                        );

                   login.Name = usuario.Name;
                    login.Password = usuario.Password;
                    login.IdRol = usuario.IdRol;
                    login.NameRol = rol.Name;
                    login.Id = usuario.Id;
                    login.Token = new JwtSecurityTokenHandler().WriteToken(token);
                    result.Result = login;
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Usuarios>(ex);
            }
            return result;

        }
    }
}
