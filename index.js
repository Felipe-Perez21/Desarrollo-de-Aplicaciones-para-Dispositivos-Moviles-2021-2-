var firebaseConfig = {
    apiKey: "AIzaSyCUtGBpsJjU6lZU2Dfx5V6pkjpy_0KXY-k",
    authDomain: "primer-intento-firebasebd.firebaseapp.com",
    databaseURL: "https://primer-intento-firebasebd-default-rtdb.firebaseio.com",
    projectId: "primer-intento-firebasebd",
    storageBucket: "primer-intento-firebasebd.appspot.com",
    messagingSenderId: "375922114809",
    appId: "1:375922114809:web:cca83baaa69b833604a228"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
    document.getElementById("Input6").value = 'selecciona';
}

function createR() {
    document.getElementById("Input1").disabled = false;
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


        //console.log(alumno);

        firebase.database().ref('Tareas/' + id).update(tarea).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");


    } else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;
    //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es


    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Tareas').push().key;
    //data[`Tareas/${key}`] = tarea;
    //firebase.database().ref().update(data).then(() => {
    //  alert('Agregado exitosamente');
    //})
}

function read() {
    document.getElementById("Table1").innerHTML = '';

    var ref = firebase.database().ref('Tareas');
    /**   
       ref.on('value', function(snapshot) {
            snapshot.forEach(row=>{
                printRow(row.val());
            })
        });
     */

    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

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
    firebase.database().ref('Tareas/' + id).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id) {
    var ref = firebase.database().ref('Tareas/' + id);
    ref.on('value', function(snapshot) {
        updateR(snapshot.val());
    });
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

    var ref = firebase.database().ref("Tareas");
    ref.orderByChild("materia").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

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