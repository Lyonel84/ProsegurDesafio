using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common
{
    public interface ICommandRepository
    {
        Task<T> AddAsync<T>(T entity) where T : Entity;
        Task<T> UpdateAsync<T>(T entity) where T : Entity;
        Task DeleteAsync<T>(int id, string codigoempleado) where T : Entity;
        Task<T> GetByIdAsync<T>(int id) where T : Entity;
        Task<List<T>> GetAllAsync<T>() where T : Entity;
        Task<T> FindOneAsync<T>(Expression<Func<T, bool>> criteria) where T : Entity;
        Task DeleteendAsync<T>(T entity) where T : Entity;



    }
}
