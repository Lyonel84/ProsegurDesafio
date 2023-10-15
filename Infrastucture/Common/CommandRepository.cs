using Core.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastucture.Common
{
    public class CommandRepository : ICommandRepository
    {
        protected readonly AppDbContext _dbContext;


        public CommandRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<T> AddAsync<T>(T entity) where T : Entity
        {
            entity.Estado = true;
            entity.FechaReg = DateTime.Now;

            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task<T> UpdateAsync<T>(T entity) where T : Entity
        {
            entity.FechaMod = DateTime.Now;
            _dbContext.Entry(entity).State = EntityState.Modified;

            _dbContext.Entry(entity).Property(x => x.UsuarioReg).IsModified = false;
            _dbContext.Entry(entity).Property(x => x.FechaReg).IsModified = false;
            _dbContext.Entry(entity).Property(x => x.Estado).IsModified = false;

            await _dbContext.SaveChangesAsync();
            return entity;
        }


        public async Task DeleteAsync<T>(int id, string codigoempleado) where T : Entity
        {
            T entity = null;

            entity = _dbContext.Set<T>().SingleOrDefaultAsync(e => e.Id == id).Result;

            entity.UsuarioMod = codigoempleado;
            entity.Id = id;
            entity.Estado = false;
            entity.FechaMod = DateTime.Now;
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteendAsync<T>(T entity) where T : Entity
        {
            DbSet<T> entity2 = _dbContext.Set<T>();

            _dbContext.Entry(entity).State = EntityState.Detached;

            entity2.Remove(entity);

            await _dbContext.SaveChangesAsync();
        }

        public Task<T> GetByIdAsync<T>(int id) where T : Entity
        {
            return _dbContext.Set<T>().AsNoTracking().SingleOrDefaultAsync(e => e.Id == id);
        }

        public Task<List<T>> GetAllAsync<T>() where T : Entity
        {
            return this.FindAsync<T>().ToListAsync();
        }

        public Task<T> FindOneAsync<T>(Expression<Func<T, bool>> criteria) where T : Entity
        {
            return this.FindAsync(criteria).SingleOrDefaultAsync();
        }

        protected IQueryable<T> FindAsync<T>(Expression<Func<T, bool>> criteria = null, bool isActivo = true) where T : Entity
        {
            IQueryable<T> query = _dbContext.Set<T>().Where(c => c.Estado == isActivo);

            if (criteria != null)
            {
                query = query.Where(criteria);
            }

            return query;
        }

        public void Dispose()
        {
            if (this._dbContext != null)
            {
                this._dbContext.Dispose();
            }
        }



    }
}
