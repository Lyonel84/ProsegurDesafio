using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class DetalleProductos:Entity
    {

        public int IdTienda { get; set; }
        public int IdProductos { get; set; }
        public int IdMaterial { get; set; }
    }
}
