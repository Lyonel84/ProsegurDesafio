
var MateriaPrima = function () {
    return {

        baseInicial: function () {


            MateriaPrima.ParameterGlobal = { esNuevo: null, id: null, nombre: null };

           $(document).on('click', '#btnRegistrar', function (e) {
                MateriaPrima.AjaxRegister();
            });

            $(document).on('click', '.btnnuevo', function (e) {
                $('#txtName').prop('readonly', false);
                MateriaPrima.FormRegister();
            });

            $("#NombreMaterial").focusin(function () {
                $("#NombreMaterial").attr('maxlength', 100);
            });
            
            $("#txtName").focusin(function () {
                $("#txtName").attr('maxlength', 100);
            });
            $("#txtCantidad").focusin(function () {
                $("#txtCantidad").attr('maxlength', 10);
            });

    

        },

        FormRegister: function () {

            MateriaPrima.ParameterGlobal.esNuevo = true;
            $("#btnRegistrar").html("Registrar")
            $("#modalRegister").modal('show');
        },

        FormEdit: function (data) {
            MateriaPrima.ParameterGlobal.esNuevo = false;
            $("#btnRegistrar").html("Actualizar")
            MateriaPrima.ParameterGlobal.id = data;

            $.ajax({
                type: 'GET',
                url: 'https://localhost:7297/api/MateriaPrima/' + MateriaPrima.ParameterGlobal.id,
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {
                    if (data != null) {
                        MateriaPrima.LoadEdit(data.result);
                        $("#modalRegister").modal('show');
                    }
                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MateriaPrima.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                },
            });
        },


        Delete: function (id) {
            MateriaPrima.ConfirmDelete("Materia Prima", "¿ Desea confirmar la eliminación de la Materia Prima ?");

            $('#confirm-delete').on('click', '.btn-Delete', function (e) {
                var $modalDiv = $(e.delegateTarget);
               var data = {
                    Id: id,
                    Usuario: "Admin"
                };
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7297/api/MateriaPrima/Delete',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result) {
                            $modalDiv.modal('hide');
                                MateriaPrima.ModalAlert("Aviso", "Eliminado satisfactoriamente.")
                                MateriaPrima.loadGrid();
                           
                        }
                        else {
                            $modalDiv.modal('hide');
                            MateriaPrima.ModalAlert("Aviso", data.exception.message);
                        }
                    },
                    complete: function (e) {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $modalDiv.modal('hide');
                        MateriaPrima.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                    },
                });
            });
        },


        AjaxRegister: function () {

            if (MateriaPrima.ValidaCampos()) {
                var objRequest =
                {
                    "id": MateriaPrima.ParameterGlobal.id == null ? 0 : MateriaPrima.ParameterGlobal.id,
                    Name: $("#txtName").val(),
                    Cantidad: $("#txtCantidad").val(),
                    UsuarioReg: "Admin",
                    UsuarioMod: "Admin"
                };
                var data = {
                    "id": MateriaPrima.ParameterGlobal.id == null ? 0 : MateriaPrima.ParameterGlobal.id,
                    "obj": objRequest
                };

                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7297/api/MateriaPrima',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result) {
                            if (MateriaPrima.ParameterGlobal.esNuevo) {
                                MateriaPrima.ModalAlert("Aviso", "Registrado satisfactoriamente.")
                            }
                            else {
                                MateriaPrima.ModalAlert("Aviso", "Actualizado satisfactoriamente.")
                            }

                            $("#modalRegister").modal('hide');
                            MateriaPrima.loadGrid();
                            MateriaPrima.ClearForm();
                            MateriaPrima.ParameterGlobal.esNuevo = null;
                        }
                        else {
                            $("#modalRegister").modal('hide');
                            MateriaPrima.ModalAlert("Aviso", data.exception.message);
                        }
                    },
                    complete: function (e) {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        MateriaPrima.ModalAlert("Error", "Ocurrió un error al registrar. Contacte con su administrador.")
                    },
                });
            }
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
                    { "data": "cantidad" },                   
                    {
                        data: null, render: function (data, type, row, meta) {
                            return '<a class="icon-container" onclick = "MateriaPrima.FormEdit(' + data.id + ')" href="#"> <span class="ti-pencil"></span> <span class="icon-name"></a> <a class="icon-container" onclick = "MateriaPrima.Delete(' + data.id + ')" href="#"> <span class="ti-trash"></span> <span class="icon-name"></a>';
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
                url: 'https://localhost:7297/api/MateriaPrima',
                contentType: "application/json; charset=utf-8",              
                //data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {
                    gridResult.clear().draw();
                    gridResult.rows.add(data.result).draw();
                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MateriaPrima.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                },
            });

        },

        ValidaCampos() {

            var esValido = true;
            var message = '';

            if ($("#txtName").val() == "") {
                message += ' - Ingrese Nombre <br/>';
                esValido = false;
            };
            if ($("#Casntidad").val() == "") {
                message += ' - Ingrese la Cantidad <br/>';
                esValido = false;
            };
            if (!esValido) {
                MateriaPrima.ModalAlert("Advertencia", message)
            }

            return esValido;
        },

        LoadEdit: function (data) {
            $('#txtName').prop('readonly', true);
            $("#txtName").val(data.name);
            $("#txtCantidad").val(data.cantidad);
        },

        ClearForm: function () {
            $("#txtName").val("");
            $("#txtCantidad").val("");
            MateriaPrima.ParameterGlobal.id = null;
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
    MateriaPrima.baseInicial();
    MateriaPrima.loadGrid("");
});
