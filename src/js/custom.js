var fbRef = "https://pelisvo.firebaseio.com/";

function recollirTotesSeries(callback) {

	var matching = {};
   var serie;
   var seriesRef = new Firebase(fbRef).child("series");
   seriesRef.on('value', function(snapshot) {
     if(snapshot.val() !== null) {
       snapshot.forEach(function(csnap) {
         serie = csnap.val();
         matching[csnap.name()] = serie;
     	});
     	if (!$.isEmptyObject(matching) && callback && $.isFunction(callback)) {
     	   // you can use call or apply:
     	   // http://stackoverflow.com/questions/1986896/what-is-the-difference-between-call-and-apply
         callback.call(window, matching);
     	}
     }
   });
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
	
	// Filtrar combinant els filtres
	comboFiltres(filtres.buscador_decada,filtres.buscador_genere,filtres.buscador_idiomes);
	
}

function comboFiltres (decadaFiltre,generesFiltre,idiomaFiltre){
	var matching = {};
   var serie, decadaSerie,genereSerie,idiomaSerie;
   var seriesRef = new Firebase(fbRef).child("series");
   seriesRef.on('value', function(snapshot) {
     if(snapshot.val() !== null) {
       snapshot.forEach(function(csnap) {
         serie = csnap.val();
         decadaSerie = serie.any_estrena;
         idiomaSerie = serie.idioma;
         generesSerie = serie.generes.split(",");
         $.each(generesSerie, function(i) { generesSerie[i] = generesSerie[i].trim(); });
         
         // 0- FILTRES PER SEPARAT
         // 0.1) Només generes
         if (generesFiltre.length > 0 && decadaFiltre.length == 0 && idiomaFiltre.length == 0){
         	$.each(generesFiltre, function(index, item) {
	            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
	              	matching[csnap.name()] = serie;
	            }
	          });
	      // 0.2) Només idiomes
         } else if (generesFiltre.length == 0 && decadaFiltre.length == 0 && idiomaFiltre.length > 0) {
         	$.each(idiomaFiltre, function(index, item) {
	            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
	              	matching[csnap.name()] = serie;
	            }
	          });
	      // 0.3) Només decades
         } else if (generesFiltre.length == 0 && decadaFiltre.length > 0 && idiomaFiltre.length == 0){
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
	      // 1- GENERE + DECADA
         } else if (generesFiltre.length > 0 && decadaFiltre.length > 0 && idiomaFiltre.length == 0){
         	// 1.1) 1 genere + 1 decada  &&  1.4) 2 generes + 2 decades
				if ( (generesFiltre.length == 1 && decadaFiltre.length == 1) || (generesFiltre.length >= 2 && decadaFiltre.length >= 2) ){
					if ( (decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969)){
		         	$.each(generesFiltre, function(index, item) {
			            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979) ){
		         	$.each(generesFiltre, function(index, item) {
			            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989) ){
		         	$.each(generesFiltre, function(index, item) {
			            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999)){
		         	$.each(generesFiltre, function(index, item) {
			            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("Actual (>2000)") != -1) && decadaSerie>=2000){
		         	$.each(generesFiltre, function(index, item) {
			            if (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         }
		      // 1.2) 2 generes + 1 decada  &&  1.3) 1 genere + 2 decades
				} else if ( (generesFiltre.length >= 2 && decadaFiltre.length == 1) || (generesFiltre.length == 1 && decadaFiltre.length >= 2) ){
					$.each(generesFiltre, function(index, item) {
		            if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) &&  ((decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969)) ) {
		              	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979)) ){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989)) ){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) &&((decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999))){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("Actual (>2000)") != -1) && (decadaSerie>=2000)) ){
		            	matching[csnap.name()] = serie;
		            }
		          });	
				} 
			// 2- DECADA + IDIOMA
			} else if (generesFiltre.length == 0 && decadaFiltre.length > 0 && idiomaFiltre.length > 0){
				// 2.1) 1 idioma + 1 decada  &&  2.2) 2 idiomes + 1 decada  &&  2.3) 1 idioma + 2 decades  && 2.4) 2 idiomes + 2 decades
				if ( (decadaFiltre.length == 1 && idiomaFiltre.length == 1) || (decadaFiltre.length == 1 && idiomaFiltre.length >= 2) || (decadaFiltre.length >= 2 && idiomaFiltre.length == 1) || (decadaFiltre.length >= 2 && idiomaFiltre.length >= 2) ){
					if ( (decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969)){
		         	$.each(idiomaFiltre, function(index, item) {
			            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979) ){
		         	$.each(idiomaFiltre, function(index, item) {
			            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989) ){
		         	$.each(idiomaFiltre, function(index, item) {
			            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999)){
		         	$.each(idiomaFiltre, function(index, item) {
			            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("Actual (>2000)") != -1) && decadaSerie>=2000){
		         	$.each(idiomaFiltre, function(index, item) {
			            if (idiomaSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         }
				}
			// 3- GENERE + IDIOMA
			} else if (generesFiltre.length > 0 && decadaFiltre.length == 0 && idiomaFiltre.length > 0){
				// 3.1) 1 genere + 1 idioma  &&  3.2) 2 generes + 1 idioma
				if ( (generesFiltre.length == 1 && idiomaFiltre.length == 1) || (generesFiltre.length >= 2 && idiomaFiltre.length == 1) ) {
	         	$.each(generesFiltre, function(index, item) {
		            if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && (idiomaSerie == idiomaFiltre) ) {
		              	matching[csnap.name()] = serie;
		            }
		          });
		      // 3.3) 1 genere + 2 idiomes  &&  3.4) 2 generes + 2 idiomes
				} else if ( (generesFiltre.length == 1 && idiomaFiltre.length >= 2) || (generesFiltre.length >= 2 && idiomaFiltre.length >= 2) ){
					$.each(generesFiltre, function(index, item) {
		            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
		              	matching[csnap.name()] = serie;
		            }
		          });
				}
			// 4- GENERE + IDIOMA + DECADA
			} else if (generesFiltre.length > 0 && decadaFiltre.length > 0 && idiomaFiltre.length > 0){		
				//	4.1)	1 genere + 1 idioma + 1 any  &&  4.2)	2 generes + 1 idioma + 1 any  &&  4.4) 1 genere + 1 idioma + 2 anys  &&  4.6) 2 generes + 1 idioma + 2 anys
				if ( (generesFiltre.length == 1 && decadaFiltre.length == 1 && idiomaFiltre.length == 1) || (generesFiltre.length >= 2 && decadaFiltre.length == 1 && idiomaFiltre.length == 1) || (generesFiltre.length == 1 && decadaFiltre.length >= 2 && idiomaFiltre.length == 1) || (generesFiltre.length >= 2 && decadaFiltre.length >= 2 && idiomaFiltre.length == 1) ){
					$.each(generesFiltre, function(index, item) {
		            if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) &&  ((decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969)) && (idiomaSerie == idiomaFiltre) ) {
		              	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979)) && (idiomaSerie == idiomaFiltre) ){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989)) && (idiomaSerie == idiomaFiltre) ){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) &&((decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999)) && (idiomaSerie == idiomaFiltre) ){
		            	matching[csnap.name()] = serie;
		            } else if ( (generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name())) && ((decadaFiltre.indexOf("Actual (>2000)") != -1) && (decadaSerie>=2000)) && (idiomaSerie == idiomaFiltre) ){
		            	matching[csnap.name()] = serie;
		            }
		          });
				//	4.3)	1 genere + 2 idiomes + 1 any  &&  4.5) 2 generes + 2 idiomes + 1 any  &&  4.7) 1 genere + 2 idiomes + 2 anys  &&  4.8) 2 generes + 2 idiomes + 2 anys
				} else if ( (generesFiltre.length == 1 && decadaFiltre.length == 1 && idiomaFiltre.length >= 2) && (generesFiltre.length >= 2 && decadaFiltre.length == 1 && idiomaFiltre.length >= 2) || (generesFiltre.length == 1 && decadaFiltre.length >= 2 && idiomaFiltre.length >= 2) || (generesFiltre.length >= 2 && decadaFiltre.length >= 2 && idiomaFiltre.length >= 2) ){
					if ( (decadaFiltre.indexOf("60s") != -1) && (decadaSerie>=1960 && decadaSerie<=1969)){
		         	$.each(generesFiltre, function(index, item) {
			            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("70s") != -1) && (decadaSerie>=1970 && decadaSerie<=1979) ){
		         	$.each(generesFiltre, function(index, item) {
			            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("80s") != -1) && (decadaSerie>=1980 && decadaSerie<=1989) ){
		         	$.each(generesFiltre, function(index, item) {
			            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("90s") != -1) && (decadaSerie>=1990 && decadaSerie<=1999) ){
		         	$.each(generesFiltre, function(index, item) {
			            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } else if ( (decadaFiltre.indexOf("Actual (>2000)") != -1) && decadaSerie>=2000){
		         	$.each(generesFiltre, function(index, item) {
			            if ( generesSerie.indexOf(item) != -1 && !matching.hasOwnProperty(csnap.name()) ) {
			              	matching[csnap.name()] = serie;
			            }
			          });
		         } 	
				}
			}   
     	});
     }
   });

	console.log(matching);
	vistaLlistaSeries(matching);
	
}

function uncheckAll() {

	// Borrar checkboxes
	var cbarray = document.getElementsByTagName("input");
   
   for(var i = 0; i < cbarray.length; i++){
		cbarray[i].checked = false;
	}   
	
	// Borrar les series que ja estaven, i crear una nova amb totes
	var div = document.getElementById('mostrar-series');
	while( div.hasChildNodes() ){
   	div.removeChild(div.lastChild);
	}
	
  recollirTotesSeries(vistaLlistaSeries);
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
	
}

function searchBoxListener () {
	$('#search-button-custom').on("keypress", gestionaCampDeCerca);
}

function gestionaCampDeCerca (evt) {

		if (evt && evt.which === 13) {
			evt.preventDefault();

			serieCercada($(this).val());
			
			$(this).val("");
		}

}

function serieCercada(titolCerca) {

	//Recollir totes les series
	var matching = {};
	var titol = titolCerca.toLowerCase();
   var serie, titolSerieES, titolSerieVO;
   var seriesRef = new Firebase(fbRef).child("series");
   seriesRef.on('value', function(snapshot) {
     if(snapshot.val() !== null) {
       snapshot.forEach(function(csnap) {
         serie = csnap.val();
         titolSerieES = serie.titol_es.toLowerCase();
         titolSerieVO = serie.titol_original.toLowerCase();
         
         //Comparar argument del camp de cerca amb els titols de les series
         if ( (titolSerieES.indexOf(titol) != -1) || (titolSerieVO.indexOf(titol) != -1) ){
         	matching[csnap.name()] = serie;
         }
         
       });
     }
   });
	
	//Borrar llista de series per reescriure-la amb la serie cercada
	var div = document.getElementById('mostrar-series');
	while( div.hasChildNodes() ){
   	div.removeChild(div.lastChild);
	}
	
   vistaLlistaSeries(matching);
	
}