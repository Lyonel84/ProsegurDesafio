using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Provincias")]
    public class ProvinciasController : ControllerBase
    {
        private readonly IProvinciasRepository repository;

        public ProvinciasController(IProvinciasRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ProcessResult<List<Provincias>>> Get()
        {

            ProcessResult<List<Provincias>> result = new ProcessResult<List<Provincias>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Provincias>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<Provincias>> GetListadoById(int Id)
        {

            ProcessResult<Provincias> result = new ProcessResult<Provincias>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Provincias>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Provincias>> Post(ProvinciasDto Item)
        {

            ProcessResult<Provincias> result = new ProcessResult<Provincias>();
            try
            {
                if (Item != null)
                {
                    if (!await repository.ValidaExist(Item.Id, Item.obj.Name))
                    {
                        if (Item.Id == 0)
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
                        result.Exception = new OperationException("Los datos ingresados coinciden con un provincia existente");
                    }

                }

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Provincias>(ex);
            }
            return result;
        }
    }
}