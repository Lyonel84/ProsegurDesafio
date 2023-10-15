using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class OrdenDto
    {
        public int Id { get; set; }
        public int IdUsuario { get; set; }
        public int IdTienda { get; set; }
        public string Cliente { get; set; }
        public string NameEstado { get; set; }
        public int Estado { get; set; }
        public int Cantidad { get; set; }
        public double SubTotal { get; set; }
        public double Impuesto { get; set; }
        public double Total { get; set; }
    }
}

