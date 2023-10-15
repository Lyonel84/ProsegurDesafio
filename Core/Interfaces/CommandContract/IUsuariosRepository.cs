using Core.Common;
using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.CommandContract
{
    public interface IUsuariosRepository : ICommandRepository
    {
        Task<List<Usuarios>> GetListado();

        Task<Usuarios> GetListadoById(int Id);

        Task<Usuarios> GetListadoByNombre(string Nombre);

        Task<bool> ValidaExist(int? id, string nombre);
    }
}
