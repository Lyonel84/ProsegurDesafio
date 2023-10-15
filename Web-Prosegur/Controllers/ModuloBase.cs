using Microsoft.AspNetCore.Mvc;

namespace Web_Prosegur.Controllers
{
    public class ModuloBase : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
