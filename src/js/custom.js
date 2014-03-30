/*

TO DO:
1- Canviar estructura checkboxes (estructura + agafar be els valors) --> FET
2- Fer que funcioni filtrar per decada, idioma, etc.
3- Ajuntar tots els filtres
4- Externalitzar la funció per crear el llistat de series

*/


var fbRef = "https://pelisvo.firebaseio.com/";


function filtrarChecked() {
	
	// Borrar llista series (per després tornar-la a escriure filtrada)
	var div = document.getElementById('mostrar-series');
	while( div.hasChildNodes() ){
   	div.removeChild(div.lastChild);
	}
	
	// Agafar valors
	var cbarray = document.getElementsByTagName("input");
	var filtres = {
	"buscador_rapid": [],
	"buscador_genere": [],
	"buscador_idiomes": [],
	"buscador_decada": []
	};

	
	for (var i = 1; i < cbarray.length; i++) {
		if (cbarray[i].name == "buscador_rapid" && cbarray[i].checked) {
			filtres.buscador_rapid.push(cbarray[i].value);
		} else if (cbarray[i].name == "buscador_genere" && cbarray[i].checked) {
			filtres.buscador_genere.push(cbarray[i].value);
		} else if (cbarray[i].name == "buscador_idiomes" && cbarray[i].checked) {
			filtres.buscador_idiomes.push(cbarray[i].value);
		} else if (cbarray[i].name == "buscador_decada" && cbarray[i].checked) {
			filtres.buscador_decada.push(cbarray[i].value);
		}
	}
	
	console.log(filtres);
	
	//Filtrar per genere
	//cercaPerGenere(filtres.buscador_genere);

	
}

function cercaPerGenere(generesFiltre) {
    console.log("Cerca per genères: ", generesFiltre);
    var matching = {};
    var serie, generesSerie;
    var seriesRef = new Firebase(fbRef).child("series");
    seriesRef.on('value', function(snapshot) {
      if(snapshot.val() !== null) {
        snapshot.forEach(function(csnap) {
          console.log(csnap.name(), csnap.val());
          serie = csnap.val();
          generesSerie = serie.generes.split(",");
          $.each(generesSerie, function(i) { generesSerie[i] = generesSerie[i].trim(); });
          $.each(generesFiltre, function(index, item) {
            if (generesSerie.indexOf(item) != -1 &&
               !matching.hasOwnProperty(csnap.name())) {
                console.log("Matching! Serie " + serie.titol_es + " genere " + item);
              	matching[csnap.name()] = serie;
            }
          });
          
      	});
      }
    });
    console.log(matching);
   filtratPerGeneres(matching);
    // ja les tens, ara has de tornar a actualitzar la vista
    // per això és important separar les consultes al back-end de la manipulació del DOM
    // ara podries aprofitar gran part de vistaLlistaSeries si ho treus en una funció externa
    
    // no serà fàcil ajuntar tots els filtres de diversos conceptes (any, idioma).
}


function filtratPerGeneres(matching){

	var div = document.getElementById('mostrar-series');
   var llista = document.createElement("ul");
   llista.className = "llista-resultats-item";
   div.appendChild(llista);
   
	for (var atribut in matching){
		var objSerie = matching[atribut];
      
      // Cada serie és un <li>
				var serie = document.createElement("li");
				serie.className = "caixa-serie-item";
				llista.appendChild(serie);
				
					// Div de la caratula
					var divCaratula = document.createElement("div");
					divCaratula.className = "llista-resultats-caratula";
					serie.appendChild(divCaratula);
				
					// Caratula enllaç <a>
					var aCaratula = document.createElement("a");
					aCaratula.className = "pull-left";
					aCaratula.href = "";
					divCaratula.appendChild(aCaratula);
						
					// Imatge caratula <img>
					var imgCaratula = document.createElement("img");
					imgCaratula.className = "caratula-llista";
					imgCaratula.src = objSerie.caratula;
					aCaratula.appendChild(imgCaratula);
					
					// Div gran informació
					var divGranInfo = document.createElement("div");
					divGranInfo.className = "llista-contenidor-item";
					serie.appendChild(divGranInfo);
					
					// Títol <a>
					var aTitol = document.createElement("a");
					aTitol.className = "llista-titol";
					aTitol.href = "";
					var titol_es = document.createTextNode(objSerie.titol_es);
					aTitol.appendChild(titol_es);
					divGranInfo.appendChild(aTitol);
					
					// Div info basica segona linia
					var divInfoBasica = document.createElement("div");
					divInfoBasica.className = "llista-info-basica";
					
					// No esta acabat. Falten els espais en blanc <&nbsp;>
					var segonaLinia = document.createTextNode(objSerie.any_estrena+" | "+objSerie.puntuacio_global+" | "+objSerie.generes);
					divInfoBasica.appendChild(segonaLinia);
					divGranInfo.appendChild(divInfoBasica);
						
						//Div sinopsis
						var divSinopsis = document.createElement("div");
						divSinopsis.className = "llista-sinopsis";
						var textSinopsis = document.createTextNode(objSerie.sinopsis);
						divSinopsis.appendChild(textSinopsis);
            divGranInfo.appendChild(divSinopsis);
						
						//Div info extra ultima linia
						var divInfoExtra = document.createElement("div");
						divInfoExtra.className = "llista-info-extra";
						var ultimaLinia = document.createTextNode("Temporades: "+objSerie.temporades+" | Capítols totals: "+objSerie.capitols_totals+" | Durada: "+objSerie.durada_episodis+" min.");
						divInfoExtra.appendChild(ultimaLinia);
					divGranInfo.appendChild(divInfoExtra);
		
		
		
	}
	
}


function uncheckAll() {

	var cbarray = document.getElementsByTagName("input");
   
   for(var i = 0; i < cbarray.length; i++){
		cbarray[i].checked = false;
	}   
  
}

function crearBuscadors(fbURL, divID) {
	var buscadorRef = new Firebase(fbURL);
   buscadorRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	console.log('La referencia no existeix.');
      } else {
      	var llista = snapshot.val();
         var div = document.getElementById(divID);

         var listElement = document.createElement("ul");
         listElement.className = "llista-items";
         div.appendChild(listElement);

         var numberOfListItems = llista.length;

         for( var i =  0 ; i < numberOfListItems ; i++){
         	
				var checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.name = divID;
				checkbox.value = llista[i];
				
				var label = document.createElement('label');
				label.className = "labelItem";
				label.appendChild(document.createTextNode(llista[i]));
				
         	var listItem = document.createElement("li");
           	listItem.className = "caixa-item";
           	
           	listItem.appendChild(checkbox);
           	listItem.appendChild(label);
         
				listElement.appendChild(listItem);
         }

      }
   });
}

function vistaLlistaSeries(fbURL) {

	var seriesRef = new Firebase(fbURL);
   seriesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	console.log('La taula series no existeix.');
      } else {
			
      	var div = document.getElementById('mostrar-series');
         var llista = document.createElement("ul");
         llista.className = "llista-resultats-item";
         div.appendChild(llista);
         
        

			snapshot.forEach(function(childSnapshot) {
				var idSerie = childSnapshot.name();
				var objSerie = childSnapshot.val();
				
				// Cada serie és un <li>
				var serie = document.createElement("li");
				serie.className = "caixa-serie-item";
				llista.appendChild(serie);
				
					// Div de la caratula
					var divCaratula = document.createElement("div");
					divCaratula.className = "llista-resultats-caratula";
					serie.appendChild(divCaratula);
				
					// Caratula enllaç <a>
					var aCaratula = document.createElement("a");
					aCaratula.className = "pull-left";
					aCaratula.href = "";
					divCaratula.appendChild(aCaratula);
						
					// Imatge caratula <img>
					var imgCaratula = document.createElement("img");
					imgCaratula.className = "caratula-llista";
					imgCaratula.src = objSerie.caratula;
					aCaratula.appendChild(imgCaratula);
					
					// Div gran informació
					var divGranInfo = document.createElement("div");
					divGranInfo.className = "llista-contenidor-item";
					serie.appendChild(divGranInfo);
					
					// Títol <a>
					var aTitol = document.createElement("a");
					aTitol.className = "llista-titol";
					aTitol.href = "";
					var titol_es = document.createTextNode(objSerie.titol_es);
					aTitol.appendChild(titol_es);
					divGranInfo.appendChild(aTitol);
					
					// Div info basica segona linia
					var divInfoBasica = document.createElement("div");
					divInfoBasica.className = "llista-info-basica";
					
					// No esta acabat. Falten els espais en blanc <&nbsp;>
					var segonaLinia = document.createTextNode(objSerie.any_estrena+" | "+objSerie.puntuacio_global+" | "+objSerie.generes);
					divInfoBasica.appendChild(segonaLinia);
					divGranInfo.appendChild(divInfoBasica);
						
						//Div sinopsis
						var divSinopsis = document.createElement("div");
						divSinopsis.className = "llista-sinopsis";
						var textSinopsis = document.createTextNode(objSerie.sinopsis);
						divSinopsis.appendChild(textSinopsis);
            divGranInfo.appendChild(divSinopsis);
						
						//Div info extra ultima linia
						var divInfoExtra = document.createElement("div");
						divInfoExtra.className = "llista-info-extra";
						var ultimaLinia = document.createTextNode("Temporades: "+objSerie.temporades+" | Capítols totals: "+objSerie.capitols_totals+" | Durada: "+objSerie.durada_episodis+" min.");
						divInfoExtra.appendChild(ultimaLinia);
					divGranInfo.appendChild(divInfoExtra);
						
			});
				
      }
   });

}

function searchBoxListener () {
	$('#search-button-custom').on("keypress", gestionaCampDeCerca);
}

function gestionaCampDeCerca (evt) {

		if (evt && evt.which === 13) {
			evt.preventDefault();
			console.log($(this).val());
			// TODO: agafar el text, enviar-lo a FB i
			// agafar resultats, omplir la pagina.
			// o be fer un redirect o be fer un asyncron.
			$(this).val("");

			// subfuncions
		}

}