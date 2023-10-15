var ManagementId = 0;
var validator;
var UploadeFileName;
var form = document.getElementById('ManagementForm');
var fileName = "";

$(document).ready(function () {
    LoadData()
});

function LoadData() {
    $('#ManagementTable').DataTable({
        paging: true,
        "responsive": true,
        "ordering": true,
        bDestroy: true,
        "dom":
            "<'row'" +
            "<'col-sm-12 d-flex align-items-center justify-content-end'f>" +
            ">" +

            "<'table-responsive'tr>" +

            "<'row'" +
            "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'li>" +
            "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
            ">",
        "ajax": {
            "url": '/Management/getDate',
            "type": "GET",
            "datatype": "json",

            "dataSrc": function (json) {
                return json.aaData;
            },
        },
        "columns": [
            {
                "data": "brand",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,
                render: function (data, type, row) {
                    return '<td><a href="javascript:void();" onclick="EditById(\'' + row.brand + '\')">' + row.brand + '</a></td>';
                }
            },
            {
                "data": "modelName",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,

            },
            {
                "data": "description",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,

            },
            {
                "data": "feacture",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,

            },
            {
                "data": "price",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,

            },
            {
                "data": "dom",
                "autoWidth": true,
                "sortable": true,
                "searchable": true,

            },
            {
                "data": "image", // Make sure this matches your JSON data property
                "autoWidth": true,
                "sortable": true,
                "searchable": true,
                "render": function (data, type, full) {
                    // Use a relative path to your image resource
                    debugger
                    var url = '../assets/image/' + data;
                    /*console.log(datas);*/
                    return '<img src="' + url + '" style="height:100px;width:100px;">';
                }
            },




            //{
            //    "data": "image",
            //    "autoWidth": true,
            //    "sortable": true,
            //    "searchable": true,
            //    "render": function (data, type, full, meta) { 
            //        debugger

            //        //var currentfolder = 'file:///C:/Users/Admin/Desktop/bhatar%20WFH/CarManagement/CarManagement/Resources/files/IMG_7693.JPG';
            //        return '<img src="C:/Users/Admin/Desktop/bhatar WFH/CarManagement/CarManagement/Resources/files/IMG_7690.JPG" style="height:100px;width:100px;">';``
            //    }
            //},
            {
                data: "id",
                searchable: false,
                sortable: false,
                render: function (data, type, row) {
                    return '<td class="text-end"><a  onclick="EditById(\'' + row.id + '\')" class="btn btn-sm btn-white text-success me-2"><i class="fa fa-edit" style="color:green"></i> Edit</a><a onclick="DeleteById(\'' + row.id + '\')"  class="btn btn-sm btn-white text-danger"><i class="fa fa-trash" style="color:red"></i>Delete</a></td>';
                }
            }
        ]
    });
}
$(document).on('click', '#btnNew', function () {

    $('#addTypeModal').modal('show');
    $("#txtBrandname").val("");
    $("#txtModalname").val("");
    CKEDITOR.instances['txtdesc'].setData("");
    CKEDITOR.instances['txtFeacture'].setData("");
    $("#txtprice").val("");
    $("#txtDOM").val("");
    $("#txtImage").val("");
    $("#addTypeModal #btnSubmit").text('Save');
    $("#addTypeModal .TypeTitle").text('Add New Management Data');
    $("#txtId").val(0);
    $('#ManagementForm').trigger("reset");
})

function DeleteById(id) {
    ManagementId = id;
    $("#ConfirmDeleteModal").modal("show");
}
$(document).on('click', '#btnDelete', function () {
    $.ajax({
        url: '/Management/Delete/' + ManagementId,
        type: 'GET',
        success: function (data) {
            $("#LoadingModel").hide();
            if (data.aaData == "1") {
                alert("Data has been deleted successfully");
                LoadData();
                $("#ConfirmDeleteModal").modal('hide');
            }
            else {
                alert("Error occured");
                $("#ConfirmDeleteModal").modal('hide');
            }
        },
        error: function (err) {
            alert('An error has occured!!!');
        }
    });
})

$(document).on('click', '#btnReset', function () {

    $("#txtBrandname").val("");
    $("#txtModalname").val("");
    CKEDITOR.instances['txtdesc'].setData("");
    CKEDITOR.instances['txtFeacture'].setData("");
    $("#txtprice").val("");
    $("#txtDOM").val("");
    $("#txtImage").val("");
    $("#addTypeModal").modal('hide');
});
function EditById(id) {
    ManagementId = id;
    $("#txtId").val(id);
    var formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: '/Management/getDate',
        dataType: "json",
        type: 'GET',
        data: { id: id },
        success: function (data) {
            if (data.aaData.length > 0) {
                $("#addTypeModal").modal('show');
                $("#txtModalname").val(data.aaData[0].modelName);
                CKEDITOR.instances['txtdesc'].setData(data.aaData[0].description);
                CKEDITOR.instances['txtFeacture'].setData(data.aaData[0].feacture);
                $("#txtprice").val(data.aaData[0].price);
                $("#txtDOM").val(data.aaData[0].dom);
                $("#txtImage").val(null);
                /*$("#txtImage").val(data.aaData[0].image);*/
                $("#addTypeModal #btnSubmit").text('Update');
                $("#addTypeModal .TypeTitle").text('Edit Management');
                var ddlvalue = data.aaData[0].brand;

                setTimeout(function () {
                    $("#ddlBrand").val(ddlvalue);
                }, 500);
            }
        },
        error: function (err) {
            alert('An error has occured!!!');
        }
    });
}


$(document).on('click', '#btnSubmit', function (e) {
    // Prevent default button action
    var desc = CKEDITOR.instances['txtdesc'].getData();
    var feacture = CKEDITOR.instances['txtFeacture'].getData();
    var formData = new FormData();
    if ($("#ddlBrand").val() == "" || $("#txtModalname").val() == "" || desc == "" || feacture == "" || $("#txtDOM").val() == "" || fileName == "") {
        alert('All Field are compulsory');
        return;
    }
    e.preventDefault();
    if ($("#addTypeModal #btnSubmit").text() == "Save") {

        formData.append("Brand", $("#ddlBrand").val())
        formData.append("ModelName", $("#txtModalname").val().trim())
        formData.append("Description", desc)
        formData.append("Feacture", feacture)
        formData.append("Price", $("#txtprice").val().trim())
        formData.append("Dom", $("#txtDOM").val().trim())
        formData.append("Image", fileName)
        $.ajax({
            url: "/Management/create",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {
                if (data.aaData == "1") {
                    alert("Data has been inserted successfully!!");
                    $("#addTypeModal").modal('hide');
                    LoadData();
                }
                else if (data.warning) {

                    alert(data.message);

                }
                else {
                    alert('An error has occured!!!');
                }

            },
            error: function () {
                alert('An error has occured!!!');
            }
        });
    }
    else {
        var formData = new FormData();
        var desc = CKEDITOR.instances['txtdesc'].getData();
        var feacture = CKEDITOR.instances['txtFeacture'].getData();
        formData.append("Id", ManagementId)
        formData.append("Brand", $("#ddlBrand").val())
        formData.append("ModelName", $("#txtModalname").val().trim())
        formData.append("Description", desc)
        formData.append("Feacture", feacture)
        formData.append("Price", $("#txtprice").val().trim())
        formData.append("Dom", $("#txtDOM").val().trim())
        formData.append("Image", fileName)

        $.ajax({
            url: "/Management/Update",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {
                if (data.aaData == "1") {
                    alert("Data has been updated successfully!!");
                    $("#addTypeModal").modal('hide');
                    LoadData();
                }
                else if (data.warning) {

                    alert(data.message);

                }
                else {
                    alert("Error occured");
                    $("#addActitvityTypeModal").modal('hide');
                }
            },
            error: function () {
                alert('An error has occured!!!');
            }
        });
    }
})


var Uploadfile
function upload(excelfile) {
    Uploadfile = excelfile.files[0];

    var a = (excelfile.files[0].size);
    if (a > 2000000) {
        alert('Image size must be less then 5 MB');
        return;
    } else {
        uploadfiles();
    }

}

function uploadfiles() {
    debugger
    if (window.FormData !== undefined) {

        var fileUpload = $("#txtImage").get(0);
        var files = fileUpload.files;

        var fileData = new FormData();
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        $.ajax({
            url: '/Management/Upload',
            type: "POST",
            contentType: false,
            processData: false,
            async: false,
            data: fileData,
            success: function (result) {
                debugger
                UploadeFileName = result.dbPath;
                onlyFilename = UploadeFileName.replace(/^.*[\\\/]/, '');
                fileName = onlyFilename;
                /*$("#UploadedTemplateFilenameAttachmenst").text('Uploaded File: ' + onlyTemplateFilename);*/
                alert("File uploaded Successfully");

                /*toastr.success("File uploaded Successfully");*/
                // if (_isForceFullyUpdate == true) {
                //    _isForceFullyUpdate = false;
                //}
            },
            error: function (err) {

                toastr.error('An error has occured!!!');
            }
        });
    } else {
        toastr.error('An error has occured!!!');
    }
}
