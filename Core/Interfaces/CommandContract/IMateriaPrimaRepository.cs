using Core.Common;
using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.CommandContract
{
    public interface IMateriaPrimaRepository : ICommandRepository
    {
        Task<List<MateriaPrima>> GetListado();
        Task<MateriaPrima> GetListadoById(int id);
        Task<bool> ValidaExist(int? id, string nombre);
    }
}
