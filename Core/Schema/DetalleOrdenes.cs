using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class DetalleOrdenes:Entity
    {
        public int IdOrden { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }

    }
}
