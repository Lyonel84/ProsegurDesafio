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
    public class ProvinciasRepository : CommandRepository, IProvinciasRepository
    {
        public readonly AppDbContext _dbContext;

        public ProvinciasRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> ValidaExist(int? id, string nombre)
        {
            var result = false;

            if (id.HasValue)
            {
                result = await this.FindAsync<Provincias>(e => e.Id != id.Value && e.Estado == true && e.Name.ToUpper() == nombre.ToUpper()).AnyAsync();
            }
            else
            {
                result = await this.FindAsync<Provincias>(e => e.Name.ToUpper() == nombre.ToUpper() && e.Estado == true).AnyAsync();
            }

            return result;
        }

        public async Task<List<Provincias>> GetListado()
        {
            return await this.FindAsync<Provincias>(e => e.Estado == true).ToListAsync();
        }
        public async Task<Provincias> GetListadoById(int id)
        {

            return await this.FindOneAsync<Provincias>(e => e.Estado == true && e.Id == id);

        }
    }
}