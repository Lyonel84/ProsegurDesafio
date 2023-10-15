using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class MateriaPrima:Entity
    {
        
        public string Name { get; set; }

        public int Cantidad { get; set; }
    }
}
