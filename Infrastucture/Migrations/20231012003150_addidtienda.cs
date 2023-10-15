using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class addidtienda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdItems",
                table: "DetalleOrdenes",
                newName: "IdProducto");

            migrationBuilder.AddColumn<int>(
                name: "IdTienda",
                table: "Materiales",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdTienda",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdTienda",
                table: "Materiales");

            migrationBuilder.DropColumn(
                name: "IdTienda",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "IdProducto",
                table: "DetalleOrdenes",
                newName: "IdItems");
        }
    }
}
