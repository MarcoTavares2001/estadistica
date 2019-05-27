//----------------------Datos no agrupados---------------------//
//Boton para agregar datos no agrupados dependiendo del valor propuesto
document.getElementById("input-datos-add").addEventListener("click", function(){
  if(document.getElementById("input-datos-muestra").value <= 1){
    alert ("Ingrese un numero mayor que 1");
    return false;
  }
  var cont = -1,
  val = 0,
  columnas = Math.ceil(document.getElementById("input-datos-muestra").value/5);
  document.querySelector("#input-datos-table > tbody").innerHTML = " ";
  for (var j = 0; j < columnas; j++) {
    document.querySelector("#input-datos-table > tbody").insertAdjacentHTML("beforeend", "<tr class='tr"+j+"'></tr>");
    for (var i = 0; i < document.getElementById("input-datos-muestra").value; i++) {
      if (i < 5 && cont < document.getElementById("input-datos-muestra").value-1) {
        cont++;
        document.querySelector("#input-datos-table > tbody > .tr"+j+"").insertAdjacentHTML("beforeend", "<td><input type='number' class='dnat "+cont+"'></td>");
      }
    }
  }
  document.getElementById("operaciones").innerHTML = " ";
  document.getElementById("input-datos-ejecutar").style.display = "block";
});

//Boton de input-datos-ejecutar con las operaciones que se requieren
document.getElementById("input-datos-ejecutar").addEventListener("click", function(){
    document.getElementById("operaciones").innerHTML = " ";
  var media_aritmetica = 0,
      media_geometrica = 1,
      cont = 0,
      media_armonica = 0,
      rango = 0,
      desviacion_media = 0,
      desviacion_tipica = 0,
      array_dna = [],
      numero_de_clases = "",
      amplitud_de_clase = "";

  for (var i = 0; i < document.getElementsByClassName("dnat").length; i++) {
    if (document.getElementsByClassName("dnat")[i].value !== " ") {
      //----------------------Array---------------------//
      array_dna.push(parseFloat(document.getElementsByClassName("dnat")[i].value));
      //----------------------Media Aritmetica---------------------//
      media_aritmetica = media_aritmetica + parseFloat(document.getElementsByClassName("dnat")[i].value);
      //----------------------Media Geometrica---------------------//
      media_geometrica = media_geometrica * parseFloat(document.getElementsByClassName("dnat")[i].value);
      //----------------------Media Armonica---------------------//
      media_armonica = media_armonica + (1 / parseFloat(document.getElementsByClassName("dnat")[i].value));
      cont++;
    }
  }

  media_aritmetica = media_aritmetica/cont;
  media_geometrica = Math.exp(Math.log(media_geometrica) / cont);
  media_armonica = cont/media_armonica;
  //----------------------Rango---------------------//
  rango = Math.max.apply(null, array_dna) - Math.min.apply(null, array_dna);
  //----------------------Desviacion media---------------------//
  for (var i = 0; i < document.getElementsByClassName("dnat").length; i++) {
    if (document.getElementsByClassName("dnat")[i].value !== " ") {
      desviacion_media = desviacion_media + Math.abs(parseFloat(document.getElementsByClassName("dnat")[i].value) - media_aritmetica);
    }
  }
  desviacion_media = desviacion_media/cont;
  //----------------------Desviacion tipica y varianza---------------------//
  for (var i = 0; i < document.getElementsByClassName("dnat").length; i++) {
    if (document.getElementsByClassName("dnat")[i].value !== " ") {
      desviacion_tipica = desviacion_tipica + Math.pow(parseFloat(document.getElementsByClassName("dnat")[i].value), 2);
    }
  }
  desviacion_tipica = Math.sqrt((desviacion_tipica/cont) +  Math.pow(media_aritmetica, 2));

  numero_de_clases  = Math.ceil(1 + 3.322 * Math.log10(array_dna.length));
  amplitud_de_clase = rango / numero_de_clases;
  amplitud_de_clase = parseFloat(amplitud_de_clase.toFixed(2));

  if (document.getElementById("da_radio").checked) {
    array_dna = array_dna.sort();

    document.getElementById("operaciones").insertAdjacentHTML("beforeend",
    "<table class='operaciones-datos frecuencias'>"+
      "<thead>"+
        "<tr>"+
          "<th>Clases</th>"+
          "<th>f</th>"+
          "<th>Fronteras</th>"+
          "<th>M</th>"+
          "<th>Fr</th>"+
          "<th> F< </th>"+
          "<th> Fr< </th>"+
          "<th> F>  </th>"+
          "<th> Fr> </th>"+
        "</tr>"+
      "</thead>"+
      "<tbody>"+
      "</tbody>"+
    "</table>");

    console.log(array_dna);

    var num_desp =  Math.min.apply(null, array_dna),
        num_ant = Math.min.apply(null, array_dna),
        frecuencia_menosque = 0,
        frecuencia_masque = array_dna.length,
        frecuencia = 0,
        clase_type = "";

    for (var i = 0; i < numero_de_clases; i++) {
      frecuencia = 0;
      num_desp = num_desp + amplitud_de_clase;
      num_ant = num_desp - amplitud_de_clase;
      console.log(num_ant, num_desp)

      for (var j = 0; j < array_dna.length; j++) {
        console.log(array_dna[j] >= num_ant);
        if (array_dna[j] >= num_ant && array_dna[j] < num_desp) {
          frecuencia++;
          frecuencia_menosque++;
          clase_type = "["+num_ant.toFixed(2)+" - "+num_desp.toFixed(2)+")"
        }else if(array_dna[j] >= num_ant && array_dna[j] <= num_desp && i == (numero_de_clases - 1)){
          frecuencia++;
          frecuencia_menosque++;
          clase_type = "["+num_ant.toFixed(2)+" - "+num_desp.toFixed(2)+"]";
        }
      }

      marca_clase = (num_ant + num_desp) / 2;
      frecuencia_masque = frecuencia_masque - frecuencia;

      document.querySelector(".frecuencias > tbody").insertAdjacentHTML("beforeend",
      "<tr>"+
        "<td>"+clase_type+"</td>"+
        "<td>"+frecuencia+"</td>"+
        "<td>"+(num_ant.toFixed(2) - .05)+" - "+(num_desp.toFixed(2) - .05)+"</td>"+
        "<td>"+marca_clase.toFixed(2)+"</td>"+
        "<td>"+(frecuencia / array_dna.length).toFixed(2)+"</td>"+
        "<td>"+frecuencia_menosque+"</td>"+
        "<td>"+(frecuencia_menosque / array_dna.length).toFixed(2)+"</td>"+
        "<td>"+(frecuencia_masque)+"</td>"+
        "<td>"+(frecuencia_masque / array_dna.length).toFixed(2)+"</td>"+
      "</tr>");
    }
  }


  document.getElementById("operaciones").insertAdjacentHTML("beforeend",
    "<table class='operaciones-datos'>"+
      "<thead>"+
        "<tr>"+
          "<th>Nombre</th>"+
          "<th>Resultado</th>"+
        "</tr>"+
      "</thead>"+
      "<tbody>"+
        "<tr>"+
          "<td>Numero de Clases</td>"+
          "<td>"+numero_de_clases+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Rango</td>"+
          "<td>"+rango+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Amplitud de clase</td>"+
          "<td>"+amplitud_de_clase+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Media aritmetica</td>"+
          "<td>"+media_aritmetica+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Media geometrica</td>"+
          "<td>"+media_geometrica+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Media armonica</td>"+
          "<td>"+media_armonica+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Desviacion media</td>"+
          "<td>"+desviacion_media+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Desviacion tipica</td>"+
          "<td>"+desviacion_tipica+"</td>"+
        "</tr>"+
        "<tr>"+
          "<td>Varianza</td>"+
          "<td>"+Math.pow(desviacion_tipica, 2)+"</td>"+
        "</tr>"+
      "</tbody>"+
    "</table>");
});
