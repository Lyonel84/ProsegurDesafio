using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Productos")]
    public class ProductosController : ControllerBase
    {
        private readonly IProductosRepository repository;
        private readonly IDetalleProductosRepository repositoryDetalleProductos;
            private readonly IMateriaPrimaRepository repositoryMateriales;

        public ProductosController(IProductosRepository repository, IDetalleProductosRepository repositoryDetalleProductos, IMateriaPrimaRepository repositoryMateriales)
        {
            this.repository = repository;
            this.repositoryDetalleProductos = repositoryDetalleProductos;
            this.repositoryMateriales = repositoryMateriales;
        }

        [HttpGet]
        public async Task<ProcessResult<List<Productos>>> Get()
        {

            ProcessResult<List<Productos>> result = new ProcessResult<List<Productos>>();
            try
            {
                result.Result = await repository.GetListado();
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Productos>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<Productos>> GetListadoById(int Id)
        {

            ProcessResult<Productos> result = new ProcessResult<Productos>();
            try
            {
                result.Result = await repository.GetListadoById(Id);
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Productos>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Productos>> Post(ProductosDto Item)
        {

            ProcessResult<Productos> result = new ProcessResult<Productos>();
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
                result.Exception = new CoreLayerException<Productos>(ex);
            }
            return result;
        }


        [HttpPost("{ProductosHabilitados}")]
        public async Task<ProcessResult<List<Productos>>> ProductosHabilitados(FiltroById filtro)
        {
            ProcessResult<List<Productos>> result = new ProcessResult<List<Productos>>();
            try
            {
                var lista = await repository.GetListado();
                var listaDetalle = await repositoryDetalleProductos.GetListado();
                listaDetalle = listaDetalle.Where<DetalleProductos>(x=> x.IdTienda == filtro.Id).ToList();
                var listaMateriales = await repositoryMateriales.GetListado();
                var listamaterialescero = listaMateriales.Where<MateriaPrima>(x => x.Cantidad == 0).ToList();
                if (lista == null)
                {
                    result.IsSuccess = false;
                    result.Exception = new OperationException("Los productos no existente");
                }
                else
                {
                    var queryitems = from detalle in listaDetalle
                                     join mat in listamaterialescero on detalle.IdMaterial equals mat.Id
                                     select new { Id = detalle.IdProductos };
                    List<Productos> listitem = new List<Productos>();
                    Productos Item;
                    foreach (var v in queryitems)
                    {
                        if (listitem.Where<Productos>(x => x.Id == v.Id).ToList().Count == 0)
                        {
                            Item = new Productos
                            {
                                Id = v.Id
                            };

                            listitem.Add(Item);
                        }

                    }
                    List<Productos> listitem2 = new List<Productos>();
                    Productos Item2;
                    foreach (var it in lista)
                    {
                        if (listitem.Where<Productos>(x => x.Id == it.Id).ToList().Count == 0)
                        {
                            Item2 = new Productos
                            {

                                Id = it.Id,
                                Name = it.Name,
                                Tiempo = it.Tiempo,
                                Precio = it.Precio,
                            };

                            listitem2.Add(Item2);
                        }
                    }
                    result.IsSuccess = true;
                    result.Result = listitem2;

                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Productos>(ex);
            }
            return result;
        }

    }
}