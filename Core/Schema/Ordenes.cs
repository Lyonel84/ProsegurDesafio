using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class Ordenes: Entity
    {
        public int IdUsuario { get; set; }
        public int IdTienda { get; set; }
        public string Cliente { get; set; }
        public int EstadoOrden { get; set; }
        public double SubTotal { get; set; }
        public double Impuesto { get; set; }
        public double Total { get; set; }
    }
}
