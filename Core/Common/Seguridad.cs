using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public class Seguridad
    {
        public string GetHash(string text)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256
                        .ComputeHash(Encoding.UTF8.GetBytes(text));
                return BitConverter
                     .ToString(hashedBytes).ToLower();
            }
        }
    }
}
