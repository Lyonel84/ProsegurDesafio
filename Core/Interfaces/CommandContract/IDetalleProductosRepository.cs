using Core.Common;
using Core.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.CommandContract
{
    public  interface IDetalleProductosRepository : ICommandRepository
    {
        Task<List<DetalleProductos>> GetListado();
        Task<DetalleProductos> GetListadoById(int id);
        Task<bool> ValidaExist(int? id);
    }
}
