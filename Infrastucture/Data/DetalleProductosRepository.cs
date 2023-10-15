using Core.Interfaces.CommandContract;
using Core.Schema;
using Infrastucture.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Data
{
    public class DetalleProductosRepository : CommandRepository, IDetalleProductosRepository
    {
        public readonly AppDbContext _dbContext;

        public DetalleProductosRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> ValidaExist(int? id)
        {
            var result = false;

            if (id!=0)
            {
                result = await this.FindAsync<DetalleProductos>(e => e.Id != id.Value && e.Estado == true).AnyAsync();
            }
           

            return result;
        }

        public async Task<List<DetalleProductos>> GetListado()
        {
            return await this.FindAsync<DetalleProductos>(e => e.Estado == true).ToListAsync();
        }
        public async Task<DetalleProductos> GetListadoById(int id)
        {

            var item = await this.FindOneAsync<DetalleProductos>(e => e.Estado == true && e.IdMaterial == id);
            return item;

        }
    }
}