using Castle.Core.Configuration;
using Core.Common;
using Core.Dto;
using Core.Exceptions;
using Core.Interfaces.CommandContract;
using Core.Schema;
using EficazFramework.Validation.Fluent.Rules;
using FluentAssertions;
using Moq;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using WebAPI_Prosegur.Controllers;

namespace TestProjectProsegur
{
    public class OrderControllerTests
    {


        private readonly Mock<IOrdenesRepository> repository;
        private readonly Mock<IDetalleOrdenesRepository> repositoryDo;
        private readonly Mock<IDetalleProductosRepository> repositoryPro;
        private readonly Mock<IMateriaPrimaRepository> repositoryMat;
        public OrderControllerTests()
        {
            this.repository = new Mock<IOrdenesRepository>();
            this.repositoryDo = new Mock<IDetalleOrdenesRepository>();
            this.repositoryPro = new Mock<IDetalleProductosRepository>();
            this.repositoryMat = new Mock<IMateriaPrimaRepository>();
           this.repositoryPro = new Mock<IDetalleProductosRepository>();
        }

        [Fact]
        public async Task OrderController_PostOK_Tests()
        {
            //Arrange

            var fakeOrden  = crearOrden();
            Ordenes OdenReturn = null;
            //
            repository.Setup(x => x.GetListadoById(It.IsAny<int>())).ReturnsAsync(OdenReturn);
            repository.Setup(x => x.AddAsync(It.IsAny<Ordenes>())).ReturnsAsync(fakeOrden.ordenes);
            repository.Setup(x => x.AddAsync(It.IsAny<DetalleOrdenes>())).ReturnsAsync(new DetalleOrdenes());

            var controller = new OrdenController( repository.Object,  repositoryDo.Object,  repositoryPro.Object,  repositoryMat.Object);
            //Act
            var result = await controller.Post(fakeOrden);
            //Assert

            result.Result.Should().BeEquivalentTo(fakeOrden.ordenes);
        }

        [Fact]
        public async Task OrderController_PostNotExistsOrdenes_Tests() {
            var fakeOrden = crearOrden();
            fakeOrden.ordenes = null;
            var expectedMessage = "Ingresar Datos a la Orden de Compra";
            //
            repository.Setup(x => x.GetListadoById(It.IsAny<int>())).ReturnsAsync(new Ordenes());

            var controller = new OrdenController(repository.Object, repositoryDo.Object, repositoryPro.Object, repositoryMat.Object);
            //Act
            var result = await controller.Post(fakeOrden);

             //Assert

            result.Exception.Message.Should().BeEquivalentTo(expectedMessage);

        }
        [Fact]
        public async Task OrderController_PostNotExistsDetalleOrdenes_Tests()
        {
            var fakeOrden = crearOrden();
            fakeOrden.ListaDetalle = null;
            var expectedMessage = "Ingresar Productos a la Orden de Compra";
            //
            repository.Setup(x => x.GetListadoById(It.IsAny<int>())).ReturnsAsync(new Ordenes());

            var controller = new OrdenController(repository.Object, repositoryDo.Object, repositoryPro.Object, repositoryMat.Object);
            //Act
            var result = await controller.Post(fakeOrden);

            //Assert

            result.Exception.Message.Should().BeEquivalentTo(expectedMessage);

        }
        private static OrdenDetalleDto crearOrden()
        {
            var fakeDetalle = new List<DetalleOrdenes>();
            fakeDetalle.Add(new DetalleOrdenes()
            {
                IdOrden = 0,
                IdProducto = 1,
                Cantidad = 3
            });
            fakeDetalle.Add(new DetalleOrdenes()
            {
                IdOrden = 0,
                IdProducto = 2,
                Cantidad = 3
            });


            var fakeOrden = new OrdenDetalleDto
            {
                id = 0,
                ordenes = new Ordenes
                {
                    Id = 10,
                    IdUsuario = 4,
                    IdTienda = 1,
                    Cliente = "Junior",
                    EstadoOrden = 1,
                    SubTotal = 100,
                    Impuesto = 18,
                    Total = 118,
                    UsuarioReg = "Admin",
                    UsuarioMod = ""
                },
                ListaDetalle = fakeDetalle,
            };

            return fakeOrden;
        }
    }
}