using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class UsuarioLoginDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int IdRol { get; set; }
        public string NameRol { get; set; }

        public string Token { get; set; }
    }
}
