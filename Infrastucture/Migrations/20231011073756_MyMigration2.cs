using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class MyMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DetalleItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdProductos = table.Column<int>(type: "INTEGER", nullable: false),
                    IdMaterial = table.Column<int>(type: "INTEGER", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DetalleOrdenes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdOrden = table.Column<int>(type: "INTEGER", nullable: false),
                    IdItems = table.Column<int>(type: "INTEGER", nullable: false),
                    Cantidad = table.Column<int>(type: "INTEGER", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleOrdenes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Tiempo = table.Column<int>(type: "INTEGER", nullable: false),
                    Precio = table.Column<double>(type: "REAL", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materiales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Cantidad = table.Column<int>(type: "INTEGER", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materiales", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ordenes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IdUsuario = table.Column<int>(type: "INTEGER", nullable: false),
                    IdTienda = table.Column<int>(type: "INTEGER", nullable: false),
                    Cliente = table.Column<string>(type: "TEXT", nullable: false),
                    EstadoOrden = table.Column<int>(type: "INTEGER", nullable: false),
                    SubTotal = table.Column<double>(type: "REAL", nullable: false),
                    Impuesto = table.Column<double>(type: "REAL", nullable: false),
                    Total = table.Column<double>(type: "REAL", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ordenes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Provincias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Impuesto = table.Column<double>(type: "REAL", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provincias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tiendas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    IdProvincia = table.Column<int>(type: "INTEGER", nullable: false),
                    Estado = table.Column<bool>(type: "INTEGER", nullable: false),
                    UsuarioReg = table.Column<string>(type: "TEXT", nullable: false),
                    FechaReg = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UsuarioMod = table.Column<string>(type: "TEXT", nullable: false),
                    FechaMod = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tiendas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetalleItems");

            migrationBuilder.DropTable(
                name: "DetalleOrdenes");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Materiales");

            migrationBuilder.DropTable(
                name: "Ordenes");

            migrationBuilder.DropTable(
                name: "Provincias");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Tiendas");
        }
    }
}
