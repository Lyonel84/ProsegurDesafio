
using Infrastucture.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace Infrastucture.Data
{
    public class UsuariosRepository : CommandRepository, IUsuariosRepository
    {
        public readonly AppDbContext _dbContext;

        public UsuariosRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> ValidaExist(int? id, string nombre)
        {
            var result = false;

            if (id.HasValue)
            {
                result = await this.FindAsync<Usuarios>(e => e.Id != id.Value && e.Estado == true && e.Name.ToUpper() == nombre.ToUpper()).AnyAsync();
            }
            else
            {
                result = await this.FindAsync<Usuarios>(e => e.Name.ToUpper() == nombre.ToUpper() && e.Estado == true).AnyAsync();
            }

            return result;
        }
        public async Task<List<Usuarios>> GetListado()
        {
           return  await this.FindAsync<Usuarios>(e => e.Estado == true).ToListAsync();
        }
        public async Task<Usuarios> GetListadoById(int Id)
        {

            return await this.FindOneAsync<Usuarios>(e => e.Estado == true && e.Id == Id);

        }

        public async Task<Usuarios> GetListadoByNombre(string Nombre)
        {

            return await this.FindOneAsync<Usuarios>(e => e.Estado == true && e.Name == Nombre);

        }

    }
}
