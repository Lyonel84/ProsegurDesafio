using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Roles")]
    public class RolesController : ControllerBase
    {
        private readonly IRolesRepository repository;

        public RolesController(IRolesRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ProcessResult<List<Roles>>> Get()
        {

            ProcessResult<List<Roles>> result = new ProcessResult<List<Roles>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Roles>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<Roles>> GetListadoById(int Id)
        {

            ProcessResult<Roles> result = new ProcessResult<Roles>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Roles>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Roles>> Post(RolesDto Item)
        {

            ProcessResult<Roles> result = new ProcessResult<Roles>();
            try
            {
                if (Item != null)
                {
                    if (!await repository.ValidaExist(Item.Id, Item.obj.Name))
                    {
                        if (Item.Id==0)
                        {
                            result.Result = await repository.AddAsync(Item.obj);
                        }
                        else
                        {
                            result.Result = await repository.UpdateAsync(Item.obj);
                        }
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.IsSuccess = false;
                        result.Exception = new OperationException("Los datos ingresados coinciden con un Usuario existente");
                    }

                }

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Roles>(ex);
            }
            return result;
        }
    }
}