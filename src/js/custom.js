var fbRef = "https://pelisvo.firebaseio.com/";

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
         	var listItem = document.createElement("li");
           	listItem.className = "caixa-item";
           	listItem.innerHTML = llista[i];
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

