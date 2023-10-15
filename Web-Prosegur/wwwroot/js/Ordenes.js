
var Ordenes = function () {
    return {

        baseInicial: function () {


            Ordenes.ParameterGlobal = { esNuevo: null, id: null, idProducto: null, iddet: null, listaiddetelim: null, idestadoproceso: null };
            Ordenes.ParameterGlobal.iddet = 0;
            listaiddetelim = [];

            $(document).on('click', '#btnRegistrar', function (e) {
                Ordenes.ParameterGlobal.idestadoproceso = 1;
                Ordenes.AjaxRegister();
            });

            $(document).on('click', '#btnImprimirComanda', function (e) {
                Ordenes.ParameterGlobal.idestadoproceso = 2;
                Ordenes.AjaxRegister();
            });

            $(document).on('click', '#btnFacturar', function (e) {
                Ordenes.ParameterGlobal.idestadoproceso = 3;
                Ordenes.AjaxRegister();
            });
            if ($('#idrol').val() == 3) {
                $('.btnnuevo').hide();
            }
            $(document).on('click', '.btnnuevo', function (e) {
                $('#txtNumPedido').prop('readonly', true);
                $('#txtName').prop('readonly', false);
                Ordenes.ClearForm();
                Ordenes.FormRegister();
            });
            $(document).on('click', '.btnbuscar', function (e) {
                Ordenes.loadGrid($("#cliente").val());
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
            $("#slcProductos").change(function () {
                if ($("#slcProductos").val() == 0) {
                    $("#txtPrecio").val('');
                }
                {
                    Ordenes.ParameterGlobal.idProducto = $("#slcProductos").val();
                    Ordenes.loadProductoById();
                }
            });
            $(document).on('click', '#btnAgregarProducto', function (e) {

                if ($("#slcProductos").val() == 0) {
                    Ordenes.ModalAlert("Aviso", "Seleccione un Producto.")
                }
                else {
                    if ($("#grvResultProducto tbody tr").length == 0) {
                        var fila = '<tr id="grvResultProducto' + $("#slcProductos").val() + '" class="odd"><td style="display: none">' + Ordenes.ParameterGlobal.iddet + '</td><td>' + $("#slcProductos").val() + '</td><td>' + $('select[id=slcProductos] option:selected').text() + '</td><td>' + $("#txtCantidad").val() + '</td><td>' + $("#txtPrecio").val() + '</td><td> <a class="icon-container" id="btnEliminarProducto"  onclick = "Ordenes.DeleteProducto(' + $("#slcProductos").val() + ')" href="#"> <span class="ti-trash"></span> <span class="icon-name"></a> </td></tr>';
                        $('#grvResultProducto tbody').append(fila);

                        $("#txtSubTotal").val(parseFloat($("#txtCantidad").val()) * parseFloat($("#txtPrecio").val()));
                        $("#txtImpuesto").val((parseFloat($("#impuesto").val()) * parseFloat($("#txtSubTotal").val())) / 100);
                        $("#txtTotal").val(parseFloat($("#txtSubTotal").val()) + parseFloat($("#txtImpuesto").val()));
                    }
                    else {
                        var existe = false;
                        $("#grvResultProducto tbody tr").each(function () {
                            var valorid = "grvResultProducto" + $("#slcProductos").val();
                            if ($(this).attr("id") == valorid) {
                                existe = true;
                            }
                        });

                        if (existe) {
                            Ordenes.ModalAlert("Aviso", "Producto ya ingresada")
                        }
                        else {
                            var fila = '<tr id="grvResultProducto' + $("#slcProductos").val() + '" class="odd"><td style="display: none">' + Ordenes.ParameterGlobal.iddet + '</td><td>' + $("#slcProductos").val() + '</td><td>' + $('select[id=slcProductos] option:selected').text() + '</td><td>' + $("#txtCantidad").val() + '</td><td>' + $("#txtPrecio").val() + '</td><td> <a class="icon-container " id="btnEliminarProducto"  onclick = "Ordenes.DeleteProducto(' + $("#slcProductos").val() + ')" href="#"> <span class="ti-trash"></span> <span class="icon-name"></a> </td></tr>';
                            $('#grvResultProducto tbody').append(fila);

                            $("#txtSubTotal").val(parseFloat($("#txtSubTotal").val()) + (parseFloat($("#txtCantidad").val()) * parseFloat($("#txtPrecio").val())));
                            $("#txtImpuesto").val((parseFloat($("#impuesto").val()) * parseFloat($("#txtSubTotal").val())) / 100);
                            $("#txtTotal").val(parseFloat($("#txtSubTotal").val()) + parseFloat($("#txtImpuesto").val()));
                        }
                    }
                    $("#txtPrecio").val("");
                    $("#txtCantidad").val("");
                    $("#slcProductos").val(0);
                }

            });

        },
        DeleteProductoFinal: function (data) {

            $.ajax({
                type: 'POST',
                url: 'https://localhost:7297/api/detalleordenes/Delete',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                success: function (data) {
                    if (data != null && data.result) {

                    }
                    else {
                        Ordenes.ModalAlert("Aviso", data.exception.message);
                    }
                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ordenes.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                },
            });
        },
        DeleteProducto: function (id) {
            var numsubtotal = 0;
            $("#grvResultProducto tbody tr").each(function () {


                var iddet = $(this).children().eq(0).text();
                var valorid = "grvResultProducto" + id;
                if ($(this).attr("id") == valorid) {
                    if (iddet != 0) {
                        var data = {
                            Id: iddet,
                            Usuario: "Admin"
                        };
                        listaiddetelim.push(data);
                    }
                    $("#grvResultProducto" + id).remove();
                }
                else {
                    numsubtotal = numsubtotal + (parseFloat($(this).children().eq(3).text()) * parseFloat($(this).children().eq(4).text()));
                }
            });
            $("#txtSubTotal").val(numsubtotal);
            $("#txtImpuesto").val((parseFloat($("#impuesto").val()) * parseFloat($("#txtSubTotal").val())) / 100);
            $("#txtTotal").val(parseFloat($("#txtSubTotal").val()) + parseFloat($("#txtImpuesto").val()));
        },
        FormRegister: function () {

            Ordenes.ParameterGlobal.esNuevo = true;
            $("#btnRegistrar").html("Registrar")
            $("#modalRegister").modal('show');
        },

        FormEdit: function (data) {
            Ordenes.ParameterGlobal.esNuevo = false;
            $("#btnRegistrar").html("Actualizar")
            Ordenes.ParameterGlobal.id = data;
            Ordenes.ParameterGlobal.idestadoproceso = 1;

            $.ajax({
                type: 'GET',
                url: 'https://localhost:7297/api/Ordenes/' + Ordenes.ParameterGlobal.id,
                contentType: "application/json; charset=utf-8",
                //data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {
                    if (data != null) {
                        Ordenes.LoadEdit(data.result);
                        $("#modalRegister").modal('show');
                    }
                },
                complete: function (e) {

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ordenes.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                },
            });
        },


        Delete: function (id) {
            Ordenes.ConfirmDelete("Orden Pedido", "¿ Desea confirmar la eliminación de la Orden ?");

            $('#confirm-delete').on('click', '.btn-Delete', function (e) {
                var $modalDiv = $(e.delegateTarget);
                var data = {
                    Id: id,
                    Usuario: "Admin"
                };
                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7297/api/Ordenes/Delete',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result) {
                            $modalDiv.modal('hide');
                            Ordenes.ModalAlert("Aviso", "Eliminado satisfactoriamente.")
                            Ordenes.loadGrid($("#cliente").val());

                        }
                        else {
                            $modalDiv.modal('hide');
                            Ordenes.ModalAlert("Aviso", data.exception.message);
                        }
                    },
                    complete: function (e) {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $modalDiv.modal('hide');
                        Ordenes.ModalAlert("Error", "Ocurrió un error. Contacte con su administrador.")
                    },
                });
            });
        },


        AjaxRegister: function () {

            if (Ordenes.ValidaCampos()) {

                listaiddetelim.forEach(function (data, index) {
                    Ordenes.DeleteProductoFinal(data);
                });

                var objRequest =
                {
                    "id": Ordenes.ParameterGlobal.id == null ? 0 : Ordenes.ParameterGlobal.id,
                    cliente: $("#txtName").val(),
                    UsuarioReg: "Admin",
                    UsuarioMod: "Admin",
                    IdTienda: $("#idtienda").val(),
                    IdUsuario: $("#idusuario").val(),
                    EstadoOrden: Ordenes.ParameterGlobal.idestadoproceso,
                    SubTotal: $("#txtSubTotal").val(),
                    Impuesto: $("#txtImpuesto").val(),
                    Total: $("#txtTotal").val()
                };
                var listadetalle = [];

                $("#grvResultProducto tbody tr").each(function () {
                    Ordenes.ParameterGlobal.iddet = $(this).children().eq(0).text();
                    var idproducto = $(this).children().eq(1).text();
                    var cantidad = $(this).children().eq(3).text();
                    var datadet = {
                        "id": Ordenes.ParameterGlobal.iddet == null ? 0 : Ordenes.ParameterGlobal.iddet,
                        "idOrden": Ordenes.ParameterGlobal.id == null ? 0 : Ordenes.ParameterGlobal.id,
                        "idProducto": idproducto,
                        "cantidad": cantidad,
                        "usuarioReg": "Admin",
                        "usuarioMod": "Admin"

                    };
                    listadetalle.push(datadet);
                });

                var data = {
                    "id": Ordenes.ParameterGlobal.id == null ? 0 : Ordenes.ParameterGlobal.id,
                    "ordenes": objRequest,
                    "listaDetalle": listadetalle
                };

                $.ajax({
                    type: 'POST',
                    url: 'https://localhost:7297/api/Ordenes',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result) {
                            if (Ordenes.ParameterGlobal.esNuevo) {
                                Ordenes.ModalAlert("Aviso", "Registrado satisfactoriamente.")
                            }
                            else {
                                Ordenes.ModalAlert("Aviso", "Actualizado satisfactoriamente.")
                            }

                            $("#modalRegister").modal('hide');
                            Ordenes.loadGrid($("#cliente").val());
                            Ordenes.ClearForm();
                            Ordenes.ParameterGlobal.esNuevo = null;
                        }
                        else {
                            $("#modalRegister").modal('hide');
                            Ordenes.ModalAlert("Aviso", data.exception.message);
                        }
                    },
                    complete: function (e) {

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        Ordenes.ModalAlert("Error", "Ocurrió un error al registrar. Contacte con su administrador.")
                    },
                });
            }
        },


        loadGrid: function (cliente) {
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
                    { "data": "cliente" },
                    { "data": "cantidad" },
                    { "data": "subTotal" },
                    { "data": "impuesto" },
                    { "data": "total" },
                    { "data": "nameEstado" },
                    {
                        data: null, render: function (data, type, row, meta) {
                            if (data.estado == 3) {
                                return '<a class="icon-container" onclick = "Ordenes.FormEdit(' + data.id + ')" href="#"> <span class="ti-pencil"></span> <span class="icon-name"></a>';

                            }
                            else {
                                return '<a class="icon-container" onclick = "Ordenes.FormEdit(' + data.id + ')" href="#"> <span class="ti-pencil"></span> <span class="icon-name"></a> <a class="icon-container" onclick = "Ordenes.Delete(' + data.id + ')" href="#"> <span class="ti-trash"></span> <span class="icon-name"></a>';

                            }
                            

                        }
                    },
                ],
                columnDefs: [
                    { width: '5%', targets: 0 },
                    { width: '30%', targets: 1 },
                    { width: '10%', targets: 2 },
                    { width: '10%', targets: 3 },
                    { width: '10%', targets: 4 },
                    { width: '10%', targets: 5 },
                    { width: '20%', targets: 6 },
                    { width: '5%', targets: 7 },

                ]
            });
            var data = {
                "idusuario": $("#idrol").val()==4? $("#idusuario").val():0,
                "idtienda": $("#idtienda").val(),
                "cliente": cliente
            };
            $.ajax({
                type: 'POST',
                url: 'https://localhost:7297/api/ordenes/listaordenes',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
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
                    Ordenes.ModalAlert("Error", "Ocurrió un error al Cargar. Contacte con su administrador.")
                },
            });

        },

        loadProductoById: function () {

            $.ajax({
                type: 'GET',
                url: 'https://localhost:7297/api/productos/' + Ordenes.ParameterGlobal.idProducto,
                contentType: "application/json; charset=utf-8",
                // data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {

                    $("#txtPrecio").val(data.result.precio);
                    Ordenes.ParameterGlobal.idProducto = null;
                },
                complete: function (e) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ordenes.ModalAlert("Error", "Ocurrió un error al obtener Producto. Contacte con su administrador.")
                },
            });
        },
        loadProductos: function () {
            var data = {
                "idTienda": $("#idtienda").val()
            };
            $.ajax({
                type: 'POST',
                url: 'https://localhost:7297/api/productos/ProductosHabilitados',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {

                    $("#slcProductos").empty();
                    $("#slcProductos").append("<option value='0'>Seleccione</option>");
                    //console.log(data)
                    $.each(data.result, function (i, result) {
                        $("#slcProductos").append($('<option>', {
                            value: result.id,
                            text: result.name
                        }));
                    });
                },
                complete: function (e) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ordenes.ModalAlert("Error", "Ocurrió un error al obtener Productos. Contacte con su administrador.")
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
            if ($("#grvResultProducto tbody tr").length == 0) {
                message += ' - Ingrese productos al pedido <br/>';
                esValido = false;
            }
            if (!esValido) {
                Ordenes.ModalAlert("Advertencia", message)
            }

            return esValido;
        },

        LoadEdit: function (data) {
            $('#txtNumPedido').prop('readonly', true);
            $('#txtName').prop('readonly', true);
            $("#txtNumPedido").val(data.id);
            $("#txtName").val(data.cliente);
            $("#txtSubTotal").val(data.subTotal);
            $("#txtImpuesto").val(data.impuesto);
            $("#txtTotal").val(data.total);
            var estadoeliminar = false;
            if ($('#idrol').val() == 4 && data.estadoOrden == 1) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').show();
                $('#btnAgregarProducto').show();
                estadoeliminar = true;
            }
            else if ($('#idrol').val() == 4 && (data.estadoOrden == 3 || data.estadoOrden == 2)) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').hide();
                $('#btnAgregarProducto').hide();
                estadoeliminar = false;
            }
            if ($('#idrol').val() == 3 && (data.estadoOrden == 1 || data.estadoOrden == 2)) {
                $('#btnImprimirComanda').show();
                $('#btnFacturar').hide();
                $('#btnRegistrar').hide();
                $('#btnAgregarProducto').hide();
                estadoeliminar = false;
            }
            else if ($('#idrol').val() == 3 && data.estadoOrden == 3) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').hide();
                $('#btnAgregarProducto').hide();
                estadoeliminar = false;
            }
            if ($('#idrol').val() == 2 && data.estadoOrden == 2) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').show();
                $('#btnRegistrar').hide();
                $('#btnAgregarProducto').hide();
                estadoeliminar = false;
            }
            else if ($('#idrol').val() == 2 && data.estadoOrden == 1) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').show();
                $('#btnAgregarProducto').show();
                estadoeliminar = true;
            }
            else if ($('#idrol').val() == 2 && data.estadoOrden == 3) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').hide();
                $('#btnAgregarProducto').hide();
                estadoeliminar = false;
            }
            var data = {
                "IdOrden": data.id
            };
            $.ajax({
                type: 'POST',
                url: 'https://localhost:7297/api/detalleordenes/ListarDetalleByOrden',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                crossDomain: true,
                dataType: "json",
                async: true,
                success: function (data) {

                    $('#grvResultProducto tbody').html('');
                    $.each(data.result, function (i, result) {

                        var fila = '<tr id="grvResultProducto' + result.idProducto + '" class="odd"><td style="display: none">' + result.id + '</td><td>' + result.idProducto + '</td><td>' + result.nameProducto + '</td><td>' + result.cantidad + '</td><td>' + result.precio + '</td><td>';
                        if (estadoeliminar) {
                            fila += '<a class="icon-container " id="btnEliminarProducto"  onclick = "Ordenes.DeleteProducto(' + result.idProducto + ')" href="#"> <span class="ti-trash"></span> <span class="icon-name"></a> </td></tr>';
                        }
                        else {
                            fila += '</td></tr>';
                        }
                        $('#grvResultProducto tbody').append(fila);
                    });
                },
                complete: function (e) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ordenes.ModalAlert("Error", "Ocurrió un error al obtener detalle orden. Contacte con su administrador.")
                },
            });
        },

        ClearForm: function () {
            $("#txtNumPedido").val("");
            $("#txtName").val("");
            $("#txtPrecio").val("");
            $("#txtCantidad").val("");
            $("#slcProductos").val(0);
            $('#grvResultProducto tbody').html('');
            $("#txtSubTotal").val("");
            $("#txtImpuesto").val("");
            $("#txtTotal").val("");
            Ordenes.ParameterGlobal.id = null;
            Ordenes.ParameterGlobal.iddet = 0;
            if ($('#idrol').val() == 4 || $('#idrol').val() == 2) {
                $('#btnImprimirComanda').hide();
                $('#btnFacturar').hide();
                $('#btnRegistrar').show();
                $('#btnAgregarProducto').show();
                estadoeliminar = true;
            }
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
    Ordenes.baseInicial();
    Ordenes.loadGrid("");
    Ordenes.loadProductos();
});
