function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
    document.getElementById("Input6").value = 'selecciona';
}

function createR() {

    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombreTitulo = document.getElementById("Input2").value;
    var fecha_de_entrega = document.getElementById("Input3").value;
    var materia = document.getElementById("Input4").value;
    var importancia = document.getElementById("Input6").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var tarea = {
            id, //matricula:id
            nombreTitulo,
            fecha_de_entrega,
            materia,
            importancia,
        }

        var lista_tareas = JSON.parse(localStorage.getItem("Tareas"));

        if (lista_tareas == null) {
            var lista_tareas = [];
        }

        const  existe  = lista_tareas.some(element => element.id == id);

        if (!existe || document.getElementById("Input1").disabled == true) {

            if (document.getElementById("Input1").disabled == true) {
                var lista_tareas = lista_tareas.filter(tarea => tarea.id != id);

            }

            lista_tareas.push(tarea);
            var temporal = lista_tareas.sort((a, b) => a.id - b.id);
            localStorage.setItem("Tareas", JSON.stringify(temporal));

            read();
            swal("Listo!", "Agregado correctamente", "success");
            resetFields();


        } else {
            swal("Error", "Ya existe ese id de alumno", "warning");
        }

    } else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;

}

function read() {
    document.getElementById("Table1").innerHTML = '';


    const lista_tareas = JSON.parse(localStorage.getItem("Tareas"));


    if (lista_tareas) {
        lista_tareas.forEach((tarea) => printRow(tarea));
    }
}


function printRow(tarea) {

    if (tarea != null) {
        var table = document.getElementById("Table1");

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell7 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);


        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = tarea.id;
        cell2.innerHTML = tarea.nombreTitulo;
        cell3.innerHTML = tarea.fecha_de_entrega;
        cell4.innerHTML = tarea.materia;
        cell7.innerHTML = tarea.importancia;
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${tarea.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + tarea.id + ')">Modificar</button>';

    }
}

function deleteR(id) {
    const lista_tareas = JSON.parse(localStorage.getItem("Tareas"));
    var temporal = lista_tareas.filter(tarea => tarea.id != id);
    localStorage.setItem("Tareas", JSON.stringify(temporal));

    if (temporal.length == 0) {
        localStorage.removeItem("Tareas");
    }

    read();

}

function seekR(id) {

    const lista_tareas = JSON.parse(localStorage.getItem("Tareas"));
    var tarea = lista_tareas.filter(tarea => tarea.id == id);
    updateR(tarea[0]);
    //console.log(alumno[0]);
}

function updateR(tarea) {
    if (tarea != null) {
        document.getElementById("Input1").value = tarea.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = tarea.nombreTitulo;
        document.getElementById("Input3").value = tarea.fecha_de_entrega;
        document.getElementById("Input4").value = tarea.materia;
        document.getElementById("Input6").value = tarea.importancia;
    }
}


//Para consulta de carrera
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input5").value;

    const lista_tareas = JSON.parse(localStorage.getItem("Tareas"));
    var taream = lista_tareas.filter(tarea => tarea.materia == c);
    if (taream) {
        taream.forEach((tarea) => printRowQ(tarea));
    }
    //console.log(alumnosC)

}


function printRowQ(tarea) {

    var table = document.getElementById("Table2");

    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);


    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = tarea.id;
    cell2.innerHTML = tarea.nombreTitulo;
    cell3.innerHTML = tarea.fecha_de_entrega;
    cell4.innerHTML = tarea.materia;
    cell5.innerHTML = tarea.importancia;

}