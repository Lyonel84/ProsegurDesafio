using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/DetalleProductos")]
    public class DetalleProductosController : ControllerBase
    {
        private readonly IDetalleProductosRepository repository;

        public DetalleProductosController(IDetalleProductosRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ProcessResult<List<DetalleProductos>>> Get()
        {

            ProcessResult<List<DetalleProductos>> result = new ProcessResult<List<DetalleProductos>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleProductos>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<DetalleProductos>> GetListadoById(int Id)
        {

            ProcessResult<DetalleProductos> result = new ProcessResult<DetalleProductos>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleProductos>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<DetalleProductos>> Post(DetalleProductosDto Item)
        {

            ProcessResult<DetalleProductos> result = new ProcessResult<DetalleProductos>();
            try
            {
                if (Item != null)
                {
                    if (!await repository.ValidaExist(Item.Id))
                    {
                        result.Result = await repository.AddAsync(Item.obj);
                    }
                    else
                    {
                        result.Result = await repository.UpdateAsync(Item.obj);
                    }
                    result.IsSuccess = true;
                }

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleProductos>(ex);
            }
            return result;
        }
    }
}