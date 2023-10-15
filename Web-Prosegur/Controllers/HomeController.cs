using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Security.Claims;
using Web_Prosegur.Models;

namespace Web_Prosegur.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int idtienda, string name, string impuesto)
        {
            HttpContext.Session.SetInt32("idTienda", idtienda);
            HttpContext.Session.SetString("Tienda", name);
            HttpContext.Session.SetString("Impuesto", impuesto);
            ViewData["idTienda"] = HttpContext.Session.GetInt32("idTienda").Value;
            ViewData["Tienda"] = HttpContext.Session.GetString("Tienda");
            ViewData["Impuesto"] = HttpContext.Session.GetString("Impuesto");
            ViewData["idusuario"] = HttpContext.Session.GetInt32("idUsuario").Value;
            ViewData["usuario"] = HttpContext.Session.GetString("Usuario");
            ViewData["idrol"] = HttpContext.Session.GetInt32("idRol").Value;
            ViewData["rol"] = HttpContext.Session.GetString("Rol"); ;

            var Claims = new List<Claim>() {
                    new Claim(ClaimTypes.Name,  HttpContext.Session.GetString("Usuario")),
                    new Claim(ClaimTypes.NameIdentifier , HttpContext.Session.GetInt32("idUsuario").Value.ToString()),
                    new Claim(ClaimTypes.Role, HttpContext.Session.GetString("Rol")),
                    new Claim("idRol" , HttpContext.Session.GetInt32("idRol").Value.ToString()),
                    new Claim("idTienda" , HttpContext.Session.GetInt32("idTienda").Value.ToString()),
                    new Claim("Tienda", HttpContext.Session.GetString("Tienda").ToString()),
                    new Claim("Impuesto", HttpContext.Session.GetString("Impuesto").ToString())
        };

            var CalimIdentity = new ClaimsIdentity(Claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var userPrincipal = new ClaimsPrincipal(CalimIdentity);

            HttpContext.SignInAsync(userPrincipal);
            return View();
        }
        public IActionResult Tiendas(int idusuario, string name, string rol, int idrol)
        {
            HttpContext.Session.SetInt32("idRol", idrol);
            HttpContext.Session.SetString("Rol", rol);
            HttpContext.Session.SetString("Usuario", name);
            HttpContext.Session.SetInt32("idUsuario", idusuario);
            ViewData["idusuario"] = HttpContext.Session.GetInt32("idUsuario").Value;
            ViewData["usuario"] = HttpContext.Session.GetString("Usuario");
            ViewData["idrol"] = HttpContext.Session.GetInt32("idRol").Value;
            ViewData["rol"] = HttpContext.Session.GetString("Rol");

            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}