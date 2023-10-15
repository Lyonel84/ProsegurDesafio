using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dto
{
    public class DtoTiendas
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int IdProvincia { get; set; }
        public string NameProvincia { get; set; }
        public double Impuesto { get; set; }
    }
}
