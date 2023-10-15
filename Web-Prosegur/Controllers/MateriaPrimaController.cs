using Microsoft.AspNetCore.Mvc;

namespace Web_Prosegur.Controllers
{
    public class MateriaPrimaController : Controller
    {
        public IActionResult Index()
        {
            ViewData["idusuario"] = HttpContext.Session.GetInt32("idUsuario").Value;
            ViewData["usuario"] = HttpContext.Session.GetString("Usuario");
            ViewData["idrol"] = HttpContext.Session.GetInt32("idRol").Value;
            ViewData["rol"] = HttpContext.Session.GetString("Rol"); ;
            ViewData["idTienda"] = HttpContext.Session.GetInt32("idTienda").Value;
            ViewData["Tienda"] = HttpContext.Session.GetString("Tienda");
            ViewData["Impuestos"] = HttpContext.Session.GetString("Impuesto"); ;
            return View();
        }
    }
}
