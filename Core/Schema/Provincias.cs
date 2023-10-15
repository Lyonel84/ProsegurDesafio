using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Schema
{
    public class Provincias : Entity
    {
        public string Name { get; set; }
        public double Impuesto { get; set; }
    }
}
