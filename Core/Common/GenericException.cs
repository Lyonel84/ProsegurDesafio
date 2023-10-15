using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public class GenericException<T> : IGenericException
        where T : class
    {
        // private static readonly ILog log = LogManager.GetLogger(typeof(T));

        public string Message { get; set; }
        private System.Exception ex;
        protected GenericException(string message, System.Exception e)
        {
            this.ex = e;
            while (e != null)
            {
                message += ("\n" + e.Message);
                e = e.InnerException;
            }
            this.Message = message;
            //log.Error(message, e);
        }

        protected GenericException(System.Exception e)
        {
            this.ex = e;
            this.Message = "";
            while (e != null)
            {
                this.Message += ("\n" + e.Message);
                e = e.InnerException;
            }
            //log.Error("Error : " + typeof(T).Name + " , see more detail.(view innerException)", e);
        }

        protected GenericException(string message, bool hasLog = true)
        {
            this.Message = message;
            //if (hasLog)
            //  log.Error(message);
        }
    }
}
