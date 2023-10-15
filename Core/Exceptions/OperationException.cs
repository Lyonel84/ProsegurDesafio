using Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions
{
    public class OperationException : GenericException<OperationException>
    {
        private bool isCustomException;
        public bool IsCustomException { get { return isCustomException; } }
        public OperationException(string message)
            : base(message, false)
        {
            isCustomException = true;
        }
    }
}
