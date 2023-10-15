$(document).ready(function () {
    $(document).on('click', '.btncerraralert', function (e) {
        $('#modal-alert').modal('hide');
    });
    $(document).on('click', '.btncerrardelete', function (e) {
        $('#confirm-delete').modal('hide');
    });
    $(document).on('click', '.btncerrarregister', function (e) {
        $('#modalRegister').modal('hide');
    });
    menu();
});

function menu() {
    var idrol = $("#idrol").val();

    if (idrol == 1) {
        $("#item1").show();
        $("#item3").show();
        $("#item4").show();
        $("#item5").show();
        $("#item6").show();
        $("#item7").show();
    }
    else if (idrol == 2) {
        $("#item1").show();
        $("#item3").show();
        $("#item4").show();
    }
    else if (idrol == 3) {
        $("#item1").show();
    }
    else {
        $("#item1").show();
    }
}