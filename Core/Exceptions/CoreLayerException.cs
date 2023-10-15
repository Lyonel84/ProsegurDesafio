using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions
{
    public class CoreLayerException<T> : GenericException<T>
     where T : class
    {
        public CoreLayerException(string message, Exception e) : base(message, e) { }
        public CoreLayerException(Exception e) : base(e) { }
        public CoreLayerException(string message)
            : base(message)
        {
        }
    }
}
