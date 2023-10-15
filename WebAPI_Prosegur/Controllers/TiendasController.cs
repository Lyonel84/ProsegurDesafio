using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebAPI_Prosegur.Controllers
{
    [ApiController]
    [Route("api/Tiendas")]
    public class TiendasController : ControllerBase
    {
        private readonly ITiendasRepository repository;
        private readonly IProvinciasRepository repositoryProvincias;

        public TiendasController(ITiendasRepository repository, IProvinciasRepository repositoryProvincias)
        {
            this.repository = repository;
            this.repositoryProvincias = repositoryProvincias;
        }

        [HttpGet]
        public async Task<ProcessResult<List<DtoTiendas>>> Get()
        {

            ProcessResult<List<DtoTiendas>> result = new ProcessResult<List<DtoTiendas>>();
            try
            {
                var  listatiendas = await repository.GetListado();
                List<DtoTiendas> lstTiendas = new List<DtoTiendas>();
                DtoTiendas dtoTiendas;
                foreach (var li in listatiendas)
                { 
                    var itemprovincia = await repositoryProvincias.GetListadoById(li.IdProvincia);
                    dtoTiendas = new DtoTiendas();
                    dtoTiendas.Id = li.Id;
                    dtoTiendas.Name = li.Name;
                    dtoTiendas.IdProvincia = li.IdProvincia;
                    dtoTiendas.NameProvincia = itemprovincia.Name;
                    dtoTiendas.Impuesto = itemprovincia.Impuesto;

                    lstTiendas.Add(dtoTiendas);

                }
                result.Result = lstTiendas;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Tiendas>(ex);
            }
            return result;
        }

        [HttpGet("{Id:int}")]
        public async Task<ProcessResult<DtoTiendas>> GetListadoById(int Id)
        {

            ProcessResult<DtoTiendas> result = new ProcessResult<DtoTiendas>();
            try
            {
                var li = await repository.GetListadoById(Id);
                var itemprovincia = await repositoryProvincias.GetListadoById(li.IdProvincia);               
                DtoTiendas dtoTiendas = new DtoTiendas();
                dtoTiendas.Id = li.Id;
                dtoTiendas.Name = li.Name;
                dtoTiendas.IdProvincia = li.IdProvincia;
                dtoTiendas.NameProvincia = itemprovincia.Name;
                dtoTiendas.Impuesto = itemprovincia.Impuesto;

                result.Result = dtoTiendas;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Exception = new CoreLayerException<Tiendas>(ex);
            }
            return result;
        }

        [HttpPost]
        public async Task<ProcessResult<Tiendas>> Post(TiendasDto Item)
        {

            ProcessResult<Tiendas> result = new ProcessResult<Tiendas>();
            try
            {
                if (Item != null)
                {
                    if (!await repository.ValidaExist(Item.Id, Item.tiendas.Name))
                    {
                        if (Item.Id == 0)
                        {
                            result.Result = await repository.AddAsync(Item.tiendas);
                        }
                        else
                        {
                            result.Result = await repository.UpdateAsync(Item.tiendas);
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
                result.Exception = new CoreLayerException<Tiendas>(ex);
            }
            return result;
        }
    }
}
