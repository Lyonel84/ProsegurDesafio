using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class Productos:Entity
    {
        public string Name { get; set; }
        public int Tiempo { get; set; }
        public double Precio { get; set; }
    }
}
