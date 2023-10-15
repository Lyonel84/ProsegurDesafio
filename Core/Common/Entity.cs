using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public abstract class BaseEntity
    {
        public List<BaseDomainEvent> Events = new List<BaseDomainEvent>();
    }
    public abstract class Entity : BaseEntity
    {
        public Entity()
        {

        }
        [Key]
        public int Id { get; set; }
        public bool Estado { get; set; }
        public string UsuarioReg { get; set; }
        public DateTime? FechaReg { get; set; }
        public string UsuarioMod { get; set; }
        public DateTime? FechaMod { get; set; }

    }
}
