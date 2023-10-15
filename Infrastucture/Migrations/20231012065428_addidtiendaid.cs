using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastucture.Migrations
{
    /// <inheritdoc />
    public partial class addidtiendaid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdTienda",
                table: "Materiales");

            migrationBuilder.DropColumn(
                name: "IdTienda",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "IdTienda",
                table: "DetalleItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdTienda",
                table: "DetalleItems");

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
    }
}
