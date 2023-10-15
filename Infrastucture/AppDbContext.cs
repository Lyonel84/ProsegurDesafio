using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Core.Schema;
using Core.Common;

namespace Infrastucture
{
    public class AppDbContext : DbContext
    {
        private readonly Seguridad _seguridad;
        public AppDbContext(DbContextOptions options, Seguridad seguridad) : base(options)
        {
            this._seguridad = seguridad;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
       
        }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Provincias> Provincias { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Tiendas> Tiendas { get; set; }
        public DbSet<Productos> Items { get; set; }
        public DbSet<MateriaPrima> Materiales { get; set; }
        public DbSet<DetalleProductos> DetalleItems { get; set; }
        public DbSet<Ordenes> Ordenes { get; set; }
        public DbSet<DetalleOrdenes> DetalleOrdenes { get; set; }
    }
}
