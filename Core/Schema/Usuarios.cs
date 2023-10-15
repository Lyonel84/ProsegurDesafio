using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class Usuarios :Entity
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public int IdRol { get; set; }
    }

    public class Jwt
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }

      
    }
}
