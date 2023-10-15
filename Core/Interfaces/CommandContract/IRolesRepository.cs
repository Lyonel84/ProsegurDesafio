using Core.Common;
using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.CommandContract
{
    public interface IRolesRepository : ICommandRepository
    {
        Task<List<Roles>> GetListado();
        Task<Roles> GetListadoById(int id);
        Task<bool> ValidaExist(int? id, string nombre);
    }
}
