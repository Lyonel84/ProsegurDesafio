using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/MateriaPrima")]
    public class MateriaPrimaController : ControllerBase
    {
        private readonly IMateriaPrimaRepository repository;
        private readonly IDetalleProductosRepository repositoryDet;

        public MateriaPrimaController(IMateriaPrimaRepository repository, IDetalleProductosRepository repositoryDet)
        {
            this.repository = repository;
            this.repositoryDet = repositoryDet;
        }

        [HttpGet]
        public async Task<ProcessResult<List<MateriaPrima>>> Get()
        {

            ProcessResult<List<MateriaPrima>> result = new ProcessResult<List<MateriaPrima>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<MateriaPrima>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<MateriaPrima>> GetListadoById(int Id)
        {

            ProcessResult<MateriaPrima> result = new ProcessResult<MateriaPrima>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<MateriaPrima>(ex);
            }
            return result;
        }
        [HttpPost("Delete")]
        public async Task<ProcessResult<bool>> Delete(DeleteDto item)
        {
            ProcessResult<bool> result = new ProcessResult<bool>();
            try
            {
                var LisDetallePro = await repositoryDet.GetListado();
                LisDetallePro = LisDetallePro.Where<DetalleProductos>(x=>x.IdMaterial == item.Id).ToList();
                if (LisDetallePro.Count>0)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("La Materia Prima esta asignada a una o más Productos");

                }
                else
                {
                    await this.repository.DeleteAsync<MateriaPrima>(item.Id, item.Usuario);
                    result.Result = true;
                }
               
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<MateriaPrima>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<MateriaPrima>> Post(MateriaPrimaDto Item)
        {

            ProcessResult<MateriaPrima> result = new ProcessResult<MateriaPrima>();
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
                        result.Exception = new OperationException("Los datos ingresados coinciden con un Usuario existente");
                    }

                }

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<MateriaPrima>(ex);
            }
            return result;
        }
    }
}