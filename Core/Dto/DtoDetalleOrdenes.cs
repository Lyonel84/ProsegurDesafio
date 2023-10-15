using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class DtoDetalleOrdenes
    {
        public int Id { get; set; }
        public int IdProducto { get; set; }
        public string NameProducto { get; set; }
        public int Cantidad { get; set; }
        public double Precio { get; set; }
    }
}
