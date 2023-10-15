using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class OrdenDetalleDto
    {
        public int id { get; set; }
        public Ordenes ordenes { get; set; }

        public List<DetalleOrdenes> ListaDetalle { get; set; }

    }
}
