using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Ordenes")]
    public class OrdenController : ControllerBase
    {
        private readonly IOrdenesRepository repository;
        private readonly IDetalleOrdenesRepository repositoryDo;
        private readonly IDetalleProductosRepository repositoryPro;
        private readonly IMateriaPrimaRepository repositoryMat;
        public OrdenController(IOrdenesRepository repository, IDetalleOrdenesRepository repositoryDo, IDetalleProductosRepository repositoryPro, IMateriaPrimaRepository repositoryMat)
        {
            this.repository = repository;
            this.repositoryDo = repositoryDo;
            this.repositoryPro = repositoryPro;
            this.repositoryMat = repositoryMat;
        }

        [HttpGet]
        public async Task<ProcessResult<List<Ordenes>>> Get()
        {

            ProcessResult<List<Ordenes>> result = new ProcessResult<List<Ordenes>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Ordenes>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<Ordenes>> GetListadoById(int Id)
        {

            ProcessResult<Ordenes> result = new ProcessResult<Ordenes>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Ordenes>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Ordenes>> Post(OrdenDetalleDto Item)
        {

            ProcessResult<Ordenes> result = new ProcessResult<Ordenes>();
            try
            {
                List<DetalleOrdenes> listDet = Item.ListaDetalle;
                if (Item.ordenes != null)
                {
                    var listaORdenes = await repository.GetListadoById(Item.id);
                    if (listaORdenes == null)
                    {
                        
                            result.Result = await repository.AddAsync(Item.ordenes);
                      
                    }
                    else
                    {
                        listaORdenes.SubTotal = Item.ordenes.SubTotal; listaORdenes.Total = Item.ordenes.Total;
                        listaORdenes.Impuesto = Item.ordenes.Impuesto;
                        result.Result = await repository.UpdateAsync(listaORdenes);

                    }

                    if (Item.ListaDetalle != null)
                    {
                        foreach (var idet in listDet)
                        {

                            if (idet.Id == 0)
                            {
                                idet.IdOrden = Item.id == 0 ? result.Result.Id : Item.id;
                                await repositoryDo.AddAsync(idet);
                            }
                            else
                            {
                                await repositoryDo.UpdateAsync(idet);
                            }

                            result.IsSuccess = true;
                        }
                    }
                    else { result.IsSuccess = false;
                        result.Exception = new OperationException("Ingresar Productos a la Orden de Compra");
                    }
                   

                }
                else
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("Ingresar Datos a la Orden de Compra");

                }

            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Ordenes>(ex);
            }
            return result;
        }

        [HttpPost("ListaOrdenes")]
        public async Task<ProcessResult<List<OrdenDto>>> ListaOrdenes([FromBody] UsuarioTiendaDto filtro)
        {
            ProcessResult<List<OrdenDto>> result = new ProcessResult<List<OrdenDto>>();
            try
            {
                var lista = await repository.GetListado();
                var listaDetalleOrden = await repositoryDo.GetListado();

                if (lista == null)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("No Existen Items");
                }
                else
                {

                    IEnumerable<Ordenes> listausuario;
                    if (filtro.idusuario == 0 && filtro.cliente == string.Empty)
                    {
                        listausuario = lista.Where<Ordenes>(x => x.IdTienda == filtro.idtienda);
                    }
                    else if (filtro.idusuario == 0 && filtro.cliente != string.Empty)
                    {
                        listausuario = lista.Where<Ordenes>(x => x.Cliente.ToUpper().Contains(filtro.cliente.ToUpper()) && x.IdTienda == filtro.idtienda);
                    }
                    else if (filtro.idusuario != 0 && filtro.cliente == string.Empty)
                    {
                        listausuario = lista.Where<Ordenes>(x => x.IdUsuario == filtro.idusuario && x.IdTienda == filtro.idtienda);
                    }
                    else
                    {
                        listausuario = lista.Where<Ordenes>(x => x.Cliente.ToUpper().Contains(filtro.cliente.ToUpper()) &&  x.IdUsuario == filtro.idusuario && x.IdTienda == filtro.idtienda);
                    }
                    var query = from detalle in listaDetalleOrden
                                join ord in listausuario on detalle.IdOrden equals ord.Id
                                select new { Id = detalle.Id, IdProducto = detalle.IdProducto, IdOrden = detalle.IdOrden };
                    List<DetalleOrdenes> list = new List<DetalleOrdenes>();
                    DetalleOrdenes Item;
                    foreach (var v in query)
                    {
                        Item = new DetalleOrdenes
                        {
                            Id = v.Id,
                            IdProducto = v.IdProducto,
                            IdOrden = v.IdOrden,
                        };

                        list.Add(Item);
                    }

                    List<OrdenDto> list2 = new List<OrdenDto>();
                    OrdenDto Item2;
                    foreach (var it in listausuario)
                    {
                        Item2 = new OrdenDto
                        {

                            Id = it.Id,
                            IdUsuario = it.IdUsuario,
                            IdTienda = it.IdTienda,
                            Cliente = it.Cliente,
                            Estado = it.EstadoOrden,
                            NameEstado = it.EstadoOrden == 1 ? "Registrado" : (it.EstadoOrden == 2 ? "En Proceso": "Finalizado"),
                            Cantidad = list.Where<DetalleOrdenes>(x => x.IdOrden == it.Id).ToList().Count,
                            SubTotal = it.SubTotal,
                            Impuesto = it.Impuesto,
                            Total = it.Total,
                        };

                        list2.Add(Item2);

                    }
                    result.IsSuccess = true;
                    result.Result = list2;

                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Ordenes>(ex);
            }
            return result;
        }

        [HttpPost("ImprimirComanda")]
        public async Task<ProcessResult<Ordenes>> ImprimirComanda([FromBody] OrdenDto itemOrden)
        {
            ProcessResult<Ordenes> result = new ProcessResult<Ordenes>();
            try
            {
                var oOrden = await repository.GetListadoById(itemOrden.Id);
                var listaDetalleOrden = await repositoryDo.GetListado();
                var listaItemsMateriales = await repositoryPro.GetListado();

                listaDetalleOrden = listaDetalleOrden.Where<DetalleOrdenes>(x => x.IdOrden == (oOrden == null ? 0 : oOrden.Id)).ToList();

                if (oOrden == null)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("No Existen la orden");
                }
                else
                {
                    oOrden.EstadoOrden = 2;
                    await repository.UpdateAsync(oOrden);
                    foreach (var item in listaDetalleOrden)
                    {
                        var Listamat = listaItemsMateriales.Where<DetalleProductos>(x => x.IdProductos == item.IdProducto).ToList();
                        foreach (var item2 in Listamat)
                        {
                            var omat = await repositoryMat.GetListadoById(item2.Id);
                            omat.Cantidad -= item.Cantidad;
                            await repositoryMat.UpdateAsync(omat);
                        }

                    }

                    result.IsSuccess = true;
                    result.Result = oOrden;

                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Ordenes>(ex);
            }
            return result;
        }

        [HttpPost("Delete")]
        public async Task<ProcessResult<bool>> Delete(DeleteDto item)
        {
            ProcessResult<bool> result = new ProcessResult<bool>();
            try
            {
                var Lisorden = await repository.GetListadoById(item.Id);
                if (Lisorden == null)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("No se encontro un detalle");

                }
                else
                {
                    var listaDetalle = await repositoryDo.GetListado();
                    listaDetalle = listaDetalle.Where<DetalleOrdenes>(x => x.IdOrden == Lisorden.Id).ToList();
                    if (listaDetalle.Count > 0)
                    {
                        foreach (var item2 in listaDetalle)
                        {
                            await this.repository.DeleteAsync<DetalleOrdenes>(item2.Id, item.Usuario);
                        }
                    }


                    await this.repository.DeleteAsync<Ordenes>(item.Id, item.Usuario);
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