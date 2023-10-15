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
    public class OrdenesRepository : CommandRepository, IOrdenesRepository
    {
        public readonly AppDbContext _dbContext;

        public OrdenesRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> ValidaExist(int? id, string cliente)
        {
            var result = false;

            if (id.HasValue)
            {
               var res =  await this.FindAsync<Ordenes>(e => e.Id != id.Value && e.Estado == true && e.Cliente.ToUpper() == cliente.ToUpper()).AnyAsync();
                if (res)
                {

                }
                result = true;
            }
            

            return result;
        }

        public async Task<List<Ordenes>> GetListado()
        {
            return await this.FindAsync<Ordenes>(e => e.Estado == true).ToListAsync();
        }
        public async Task<Ordenes> GetListadoById(int id)
        {

            return await this.FindOneAsync<Ordenes>(e => e.Estado == true && e.Id == id);

        }
        
    }
}