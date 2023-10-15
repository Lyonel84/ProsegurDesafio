using Core.Common;
using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.CommandContract
{
    public  interface IProductosRepository : ICommandRepository
    {
        Task<List<Productos>> GetListado();
        Task<Productos> GetListadoById(int id);
        Task<bool> ValidaExist(int? id, string nombre);
    }
}
