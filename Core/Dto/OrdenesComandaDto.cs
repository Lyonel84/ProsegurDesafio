using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class OrdenesComandaDto
    {
        public int Id { get; set; }
        public int IdOrden { get; set; }
        public string Cliente { get; set; }
        public string NombreItems { get; set; }
        public int Cantidad { get; set; }
    }
}
