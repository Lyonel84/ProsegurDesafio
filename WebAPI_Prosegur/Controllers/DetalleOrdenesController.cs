using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/DetalleOrdenes")]
    public class DetalleOrdenesController : ControllerBase
    {
        private readonly IDetalleOrdenesRepository repository;
        private readonly IProductosRepository repositoryProductos;
        private readonly IOrdenesRepository repositoryOrdenes;
        public DetalleOrdenesController(IDetalleOrdenesRepository repository, IOrdenesRepository repositoryOrdenes, IProductosRepository repositoryProductos)
        {
            this.repository = repository;
            this.repositoryProductos = repositoryProductos;
            this.repositoryOrdenes = repositoryOrdenes;
        }

        [HttpGet]
        public async Task<ProcessResult<List<DetalleOrdenes>>> Get()
        {

            ProcessResult<List<DetalleOrdenes>> result = new ProcessResult<List<DetalleOrdenes>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleOrdenes>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<DetalleOrdenes>> GetListadoById(int Id)
        {

            ProcessResult<DetalleOrdenes> result = new ProcessResult<DetalleOrdenes>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleOrdenes>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<DetalleOrdenes>> Post(DetalleOrdenesDto Item)
        {

            ProcessResult<DetalleOrdenes> result = new ProcessResult<DetalleOrdenes>();
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
                result.Exception = new CoreLayerException<DetalleOrdenes>(ex);
            }
            return result;
        }

        [HttpPost("ListarDetalleByOrden")]

        public async Task<ProcessResult<List<DtoDetalleOrdenes>>> ListarDetalleByOrden([FromBody] ComandaDto filtro)
        {
            ProcessResult<List<DtoDetalleOrdenes>> result = new ProcessResult<List<DtoDetalleOrdenes>>();
            try
            {
                var lisOrdenes = await repository.GetListado();

                if (lisOrdenes == null)
                {

                    result.IsSuccess = false;
                    result.Exception = new OperationException("Los datos ingresados coinciden con un Detalle de Orden existente");
                }
                else
                {
                    List<DtoDetalleOrdenes> list = new List<DtoDetalleOrdenes>();
                    DtoDetalleOrdenes detalleOrdenesDto;
                    foreach (var item in lisOrdenes.Where<DetalleOrdenes>(x => x.IdOrden == filtro.IdOrden).ToList())
                    {
                        var oproducto = await repositoryProductos.GetListadoById(item.IdProducto);
                        detalleOrdenesDto = new DtoDetalleOrdenes
                        {
                            Id = item.Id,
                            IdProducto= item.IdProducto,
                            NameProducto = oproducto.Name,
                            Precio = oproducto.Precio,
                            Cantidad = item.Cantidad

                        };
                        list.Add(detalleOrdenesDto);

                    }

                    result.IsSuccess = true;
                    result.Result = list;
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleOrdenes>(ex);
            }
            return result;
        }
        [HttpPost("ListarDetalleOrdenes")]

        public async Task<ProcessResult<List<OrdenesComandaDto>>> ListarDetalleOrdenes([FromBody] ComandaDto filtro)
        {
            ProcessResult<List<OrdenesComandaDto>> result = new ProcessResult<List<OrdenesComandaDto>>();
            try
            {
                var lisOrdenes = await repository.GetListado();
                var listaProductos = await repositoryProductos.GetListado();

                if (lisOrdenes == null)
                {

                    result.IsSuccess = false;
                    result.Exception = new OperationException("Los datos ingresados coinciden con un Detalle de Orden existente");
                }
                else
                {
                    List<OrdenesComandaDto> list = new List<OrdenesComandaDto>();
                    OrdenesComandaDto detalleOrdenesDto;
                    foreach (var item in lisOrdenes.Where<DetalleOrdenes>(x => x.IdOrden == filtro.IdOrden).ToList())
                    {
                        var oOrden = await repositoryOrdenes.GetListadoById(item.IdOrden);
                        detalleOrdenesDto = new OrdenesComandaDto
                        {
                            Id = item.Id,
                            IdOrden = item.IdOrden,
                            Cliente = oOrden == null ? "" : oOrden.Cliente,
                            NombreItems = listaProductos.Where<Productos>(x => x.Id == item.IdProducto).First().Name,
                            Cantidad = item.Cantidad

                        };
                        list.Add(detalleOrdenesDto);

                    }

                    result.IsSuccess = true;
                    result.Result = list;
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<DetalleOrdenes>(ex);
            }
            return result;
        }
        [HttpPost("Delete")]
        public async Task<ProcessResult<bool>> Delete(DeleteDto item)
        {
            ProcessResult<bool> result = new ProcessResult<bool>();
            try
            {
                var LisDetalle = await repository.GetListadoById(item.Id);
                if (LisDetalle == null)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("No se encontro un detalle");

                }
                else
                {
                    await this.repository.DeleteAsync<DetalleOrdenes>(item.Id, item.Usuario);
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
    }
}
