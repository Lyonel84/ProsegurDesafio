namespace Web_Prosegur.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdRol { get; set; }
        public string Rol { get; set; }
        public string idTienda { get; set; }
        public string Tienda { get; set; }
        public string Impuesto { get; set; }
    }
}
