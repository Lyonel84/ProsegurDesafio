
var Tiendas = function () {
    return {

        baseInicial: function () {


            Tiendas.ParameterGlobal = { esNuevo: null, id: null, nombre: null };

        },

        loadGrid: function () {
            var gridResult = $("#grvResult").DataTable({
                dom: 'Bfrtip',
                "searching": false,
                "ordering": false,
                paging: true,
                pagingType: "simple",
                destroy: true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                columns: [
                    { "data": "id" },
                    { "data": "name" },
                    { "data": "nameProvincia" },
                    {
                        data: null, render: function (data, type, row, meta) {
                            return '<a class="icon-container" onclick = "Tiendas.FormEdit(' + data.id + ')" href="#"> <span class="ti-shopping-cart"></span> <span class="icon-name"></a>';
                        }
                    },
                ],
                columnDefs: [
                    { width: '5%', targets: 0 },
                    { width: '50%', targets: 1 },
                    { width: '40%', targets: 2 },
                    { width: '5%', targets: 3 },

                ]
            });

            $.ajax({
                type: 'GET',
                url: 'https://localhost:7297/api/Tiendas',
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {
                    gridResult.clear().draw();
                    gridResult.rows.add(data.result).draw();
                    $("#divHead").hide();
                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Tiendas.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                },
            });

        },

        FormEdit: function (id) {
            $.ajax({

                type: 'GET',
                url: 'https://localhost:7297/api/Tiendas/'+id,
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                success: function (data) {

                    if (data.isSuccess) {
                        window.location = "/Home/Index?idtienda=" + id + "&name=" + data.result.name + "&impuesto=" + data.result.impuesto;
                        $("#divHead").show();
                      
                    }
                    else {
                        Tiendas.ModalAlert(data.message);
                    }

                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Tiendas.ModalAlert("Ocurrió un error al Aprobar o Rechazar. Contacte con su administrador.")
                },
            });
           
        },

        ModalAlert: function (title, body) {
            $('#alertTitle').html(title);
            $('#alertBody').html(body);
            $('#modal-alert').modal('show');
        },

        ConfirmDelete: function (title, body) {
            $('#alertTitleDelete').html(title);
            $('#alertBodyDelete').html(body);
            $('#confirm-delete').modal('show');
        }
    }
}();

$(document).ready(function () {
    Tiendas.baseInicial();
    Tiendas.loadGrid();
});
