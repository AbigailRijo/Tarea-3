var botonGuardar = document.getElementById('btn');
var botonAgregar = document.getElementById('botoncito');
var botonCancelar = document.getElementById('btnCancelar');
var quizasMaestros = localStorage.getItem('maestros');
var estado = 1;
var index;
var pokemones1 = [];
var y= 0;
var tbody1 = document.querySelector('#tablaAgregarPokemones tbody');



function Maestro(cedula,nombre,apellido, experiencia, pokemones){  
 
    this.cedula = cedula;
	this.nombre = nombre;
	this.apellido = apellido;
	this.experiencia = experiencia;
    this.pokemones = pokemones;  
}

function Pokemon(nombre, nivel, experiencia) {
   this.nombrePokemon = nombre;
    this.nivelPokemon = nivel;
    this.experienciaPokemon = experiencia;
}


if (quizasMaestros) {

	maestros = JSON.parse(quizasMaestros);
}
else {
 maestros= [];
}

llenarTabla();

botonGuardar.addEventListener('click', insertarMaestro);


function insertarMaestro(){

if (estado !== 1) {

	modificar();
}
else if(document.querySelector('#txtCedula ').value == "" || document.querySelector('#txtNombre').value == "" || document.querySelector('#txtApellido').value == ""){
 alert("llene todos los campos");
	
}
else{

	var cedula = document.querySelector('#txtCedula ').value;
	var nombre = document.querySelector('#txtNombre').value;
	var apellido = document.querySelector('#txtApellido').value;
	var experiencia = 0;

    var tbody2 = document.querySelectorAll('#tablaAgregarPokemones tbody tr');
     

    for (var i = 0; i < tbody2.length; i++) {

    	
    if (document.querySelector('#txtNombrePokemon'+i+'').value == "" || document.querySelector('#txtNivelPokemon'+i+'').value == "" || document.querySelector('#txtExperienciaPokemon'+i+'').value == "") {		
     
}
else{
    var nombrePokemon= document.querySelector('#txtNombrePokemon'+i+'').value;
	var nivelPokemon = document.querySelector('#txtNivelPokemon'+i+'').value;
	var experienciaPokemon = parseInt(document.querySelector('#txtExperienciaPokemon'+i+'').value);
     
    experiencia = experiencia + experienciaPokemon;

	var pokemones= new Pokemon(nombrePokemon, nivelPokemon, experienciaPokemon);
    pokemones1.push(pokemones);
}
}


    var maestro = new Maestro(cedula,nombre,apellido, experiencia, pokemones1);



    maestros.push(maestro);
    console.log(maestros);

    localStorage.setItem('maestros', JSON.stringify(maestros));    

llenarTabla();
pokemones1= [];
tbody1.innerHTML = '';

y= 0;

}
}

function llenarTabla() {
	// body...
	var tbody = document.querySelector('#tabla3 tbody');

	tbody.innerHTML = '';
    
    for (var i = 0; i < maestros.length; i++) {

    	var fila= document.createElement('tr');
    	var celdaCedula= new dce('td');
    	var celdaNombre= new dce('td');
    	var celdaApellido= new dce('td');
    	var celdaExperiencia= new dce('td');
    	var celdaNoPokemon= new dce('td');
    	var celdaAction= new dce('td');

    	celdaCedula.innerHTML= maestros[i].cedula;
    	celdaNombre.innerHTML= maestros[i].nombre;
    	celdaApellido.innerHTML= maestros[i].apellido;
    	celdaExperiencia.innerHTML= maestros[i].experiencia;
    	celdaNoPokemon.innerHTML= maestros[i].pokemones.length;
        
        celdaAction.innerHTML= "<img src='edit.png' onClick= 'llenarFormularios("+i+")'' class='btnEdit' alt='Edit" + i + "'/>&nbsp &nbsp<img src='delete.png'  onClick='eliminar("+i+")'' class='btnDelete'/>"   	

    	fila.appendChild(celdaCedula);
    	fila.appendChild(celdaNombre);
    	fila.appendChild(celdaApellido);
    	fila.appendChild(celdaExperiencia);
        fila.appendChild(celdaNoPokemon);
        fila.appendChild(celdaAction);

    	tbody.appendChild(fila);
       	
    	 }
         LimpiarColumnas();
}

botonAgregar.addEventListener('click', agregarColumnaPokemones);

function agregarColumnaPokemones(){
    // body...
    
       

        var fila1= new dce('tr');
        var celdaNombrePokemon= new dce('td');
        var celdaNivelPokemon= new dce('td');
        var celdaExperienciaPolemon= new dce('td');
        var celdaAction1= new dce('td');
     
        

        celdaNombrePokemon.innerHTML="<input type='text' id='txtNombrePokemon"+y+"'>";
        celdaNivelPokemon.innerHTML="<input type='text' id='txtNivelPokemon"+y+"'>";
        celdaExperienciaPolemon.innerHTML="<input type='text' id='txtExperienciaPokemon"+y+"'>";
        celdaAction1.innerHTML= "<input type='button' id='bton' name='Eliminar' value='x' onClick = eliminarPokemon(this)>";

        fila1.appendChild(celdaNombrePokemon);
        fila1.appendChild(celdaNivelPokemon);
        fila1.appendChild(celdaExperienciaPolemon);
        fila1.appendChild(celdaAction1);

        tbody1.appendChild(fila1);

        y= y + 1;
}

function eliminar(indice) {
	// body...
     maestros.splice(indice, 1);
     localStorage.setItem('maestros', JSON.stringify(maestros));

     llenarTabla();
}

function llenarFormularios(indice){
   
    index= indice;
	var maestros1= maestros[indice];
//body
	 document.querySelector('#txtCedula').value = maestros1.cedula;
	 document.querySelector('#txtNombre').value = maestros1.nombre;
	 document.querySelector('#txtApellido').value= maestros1.apellido;
	 document.querySelector('#txtExperiencia').value = maestros1.experiencia;
	
	 	for (var i = 0; i < maestros1.pokemones.length; i++) {
	 		agregarColumnaPokemones();
	 	}

	 	for (var i = 0; i < maestros1.pokemones.length; i++) {

	 	     document.querySelector('#txtNombrePokemon'+i+'').value = maestros1.pokemones[i].nombrePokemon;
             document.querySelector('#txtNivelPokemon'+i+'').value = maestros1.pokemones[i].nivelPokemon;
	         document.querySelector('#txtExperienciaPokemon'+i+'').value = maestros1.pokemones[i].experienciaPokemon;	 		
        }

 estado= 2;
}

function modificar() {
	// body...

 if(document.querySelector('#txtCedula ').value == "" || document.querySelector('#txtNombre').value == "" || document.querySelector('#txtApellido').value == ""){
 alert("llene todos los campos");
	
}
else{
    var cedula = document.querySelector('#txtCedula ').value;
	var nombre = document.querySelector('#txtNombre').value;
	var apellido = document.querySelector('#txtApellido').value;
	var experiencia = 0;

    var tbody2 = document.querySelectorAll('#tablaAgregarPokemones tbody tr');  

    for (var i = 0; i < tbody2.length; i++) {

    if (document.querySelector('#txtNombrePokemon'+i+'').value == "" || document.querySelector('#txtNivelPokemon'+i+'').value == "" || document.querySelector('#txtExperienciaPokemon'+i+'').value == "") {		
     
}
else{ 	
    		
    var nombrePokemon= document.querySelector('#txtNombrePokemon'+i+'').value;
	var nivelPokemon = document.querySelector('#txtNivelPokemon'+i+'').value;
	var experienciaPokemon = parseInt(document.querySelector('#txtExperienciaPokemon'+i+'').value);
     
    experiencia = experiencia + experienciaPokemon;

	var pokemones= new Pokemon(nombrePokemon, nivelPokemon, experienciaPokemon);
    pokemones1.push(pokemones);
}
}
    var maestro = new Maestro(cedula,nombre,apellido, experiencia, pokemones1);



    maestros[index] = (maestro);
    console.log(maestros);

    localStorage.setItem('maestros', JSON.stringify(maestros));    

pokemones1= [];
  y = 0;
    llenarTabla();
}
}

function eliminarPokemon(varInput) {
	// body...

 tbody1.removeChild( varInput.parentNode.parentNode); 
     
}

function dce(html){

var dc = document.createElement(html);
return dc;
}

botonCancelar.addEventListener('click', LimpiarColumnas);

function LimpiarColumnas() {
    // body...
    tbody1.innerHTML = '';
        document.querySelector('#txtCedula').value = '';
        document.querySelector('#txtNombre').value = '';
        document.querySelector('#txtApellido').value = '';
        document.querySelector('#txtExperiencia').value = '';
        document.querySelector('#txtCedula').focus();

    estado = 1;
}