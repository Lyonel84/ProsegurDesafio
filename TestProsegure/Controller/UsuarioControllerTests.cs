using Core.Common;
using Core.Dto;
using Core.Interfaces.CommandContract;
using Core.Schema;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using WebAPI_Prosegur.Controllers;

namespace TestProsegure.Controller
{
    public class UsuarioControllerTests
    {
        private readonly IUsuariosRepository repository;
        private readonly Seguridad _seguridad;
        private readonly IRolesRepository repositoryrol;
        private readonly IConfiguration config;
        public UsuarioControllerTests()
        {
            this.repository = A.Fake<IUsuariosRepository>();
            this._seguridad = A.Fake<Seguridad>(); 
            this.repositoryrol = A.Fake<IRolesRepository>();
            this.config = A.Fake<IConfiguration>();
        }
        [Fact]
        public void UsuarioControler_Login_ReturnOK()
        {
            //Arrange
            string Name = "Usuario";
            string Pass = "140514";
            var Usu = A.Fake<Usuarios>();
            var Rol = A.Fake<Roles>();
            var logindto = A.Fake<LoginDTO>();

            logindto.Name = Name;
            logindto.Password = Pass;

            A.CallTo(() => repository.GetListadoByNombre(Name)).Returns(Usu);

            A.CallTo(() => repositoryrol.GetListadoById(Usu.IdRol)).Returns(Rol);
            var controller = new UsuariosController(config, repository, _seguridad, repositoryrol);

            //Act

            var result = controller.Login(logindto);

            //Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public void UsuarioController_Get_ReturnOK() {
            //Arrange

            var ProcUsu = A.Fake<ProcessResult<List<Usuarios>>>();
            A.CallTo(() => repository.GetListado()).Returns(ProcUsu.Result);
            var controller = new UsuariosController(config, repository, _seguridad, repositoryrol);
            //Act
            var result = controller.Get();
            //Assert

            result.Should().NotBeNull();
        }
    }
}
