/*

TO DO:
1- Canviar estructura checkboxes (estructura + agafar be els valors) --> FET
2- Fer que funcioni filtrar per genere --> FET
3- Fer que funcioni filtrar per idioma --> FET
4- Fer que funcioni filtrar per buscador rapid (ordre alfabetic i per puntuació)
5- Fer que funcioni filtrar per decada --> FET
6- Ajuntar tots els filtres
7- Externalitzar la funció per crear el llistat de series --> FET

*/


var fbRef = "https://pelisvo.firebaseio.com/";

function recollirTotesSeries(){

	var matching = {};
   var serie;
   var seriesRef = new Firebase(fbRef).child("series");
   seriesRef.on('value', function(snapshot) {
     if(snapshot.val() !== null) {
       snapshot.forEach(function(csnap) {
         serie = csnap.val();
         matching[csnap.name()] = serie;
         
     	});
     }
   });
   
	return matching;
}

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
	
	// Filtrar per genere
	cercaPerGenere(filtres.buscador_genere);
	// Filtrar per idiomes
	cercaPerIdioma(filtres.buscador_idiomes);
	// Filtrar per decada
	cercaPerDecada(filtres.buscador_decada);

	
}

function cercaPerDecada(decadaFiltre) {
	console.log("Cerca per decada: "+decadaFiltre);
	var matching = {};
    var serie, decadaSerie;
    var seriesRef = new Firebase(fbRef).child("series");
    seriesRef.on('value', function(snapshot) {
      if(snapshot.val() !== null) {
        snapshot.forEach(function(csnap) {
          //console.log(csnap.name(), csnap.val());
          serie = csnap.val();
          decadaSerie = serie.any_estrena;
          if ( (decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969) ){
          	matching[csnap.name()] = serie;
          } else if ( (decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979) ){
          	matching[csnap.name()] = serie;
          } else if ( (decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989) ){
          	matching[csnap.name()] = serie;
          } else if ( (decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999) ){
          	matching[csnap.name()] = serie;
          } else if ( (decadaFiltre.indexOf("Actual (>2000)") != -1) && decadaSerie>=2000){
          	matching[csnap.name()] = serie;
          }
      	});
      }
    });
    //console.log(matching);
    vistaLlistaSeries(matching);
	
}

function cercaPerGenere(generesFiltre) {
    console.log("Cerca per genères: ", generesFiltre);
    var matching = {};
    var serie, generesSerie;
    var seriesRef = new Firebase(fbRef).child("series");
    seriesRef.on('value', function(snapshot) {
      if(snapshot.val() !== null) {
        snapshot.forEach(function(csnap) {
          //console.log(csnap.name(), csnap.val());
          serie = csnap.val();
          generesSerie = serie.generes.split(",");
          $.each(generesSerie, function(i) { generesSerie[i] = generesSerie[i].trim(); });
          $.each(generesFiltre, function(index, item) {
            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
                //console.log("Matching! Serie " + serie.titol_es + " genere " + item);
              	matching[csnap.name()] = serie;
            }
          });
          
      	});
      }
    });
    //console.log(matching);
    vistaLlistaSeries(matching);
    
}

function cercaPerIdioma(idiomaFiltre) {
	console.log("Cerca per idioma: "+idiomaFiltre);
	var matching = {};
    var serie, idiomaSerie;
    var seriesRef = new Firebase(fbRef).child("series");
    seriesRef.on('value', function(snapshot) {
      if(snapshot.val() !== null) {
        snapshot.forEach(function(csnap) {
          //console.log(csnap.name(), csnap.val());
          serie = csnap.val();
          idiomaSerie = serie.idioma.split(",");
          $.each(idiomaSerie, function(i) { idiomaSerie[i] = idiomaSerie[i].trim(); });
          $.each(idiomaFiltre, function(index, item) {
            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
                //console.log("Matching! Serie " + serie.titol_es + " genere " + item);
              	matching[csnap.name()] = serie;
            }
          });
          
      	});
      }
    });
    //console.log(matching);
    vistaLlistaSeries(matching);
	
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
      	llista.sort();
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

function vistaLlistaSeries(matching) {

	console.log("DINS DE LA FUNCIÓ");
	console.log(matching);
	
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
	
	console.log("DESPRES DEL BUCLE");

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