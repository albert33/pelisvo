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

function vistaLlistaSeries() {

	var seriesRef = new Firebase('https://pelisvo.firebaseio.com/series/');
   seriesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	console.log('La taula series no existeix.');
      } else {
			
      	var div = document.getElementById('caixa-resultats-series');
         var llista = document.createElement("ul");
         llista.className = "llista-resultats-item";
         div.appendChild(llista);
         
         // Var conté id's de les series
         var idSeries = [];

			snapshot.forEach(function(childSnapshot) {
				var idSerie = childSnapshot.name();
				idSeries.push(idSerie);
			});
			
			for (var i=0; i<idSeries.length; i++){
				// To do: crear un <li> per a cada serie
				
				var serieRef = new Firebase('https://pelisvo.firebaseio.com/series/'+idSeries[i]);
				var atributs = {};
				serieRef.on('value', function(snapshot) {
			   	if(snapshot.val() === null) {
			      	console.log('La taula series no existeix.');
			      } else {
			      
			      	snapshot.forEach(function(childSnapshot) {
							var atribut = childSnapshot.name();
							var valor = childSnapshot.val();
							
							console.log(atribut+" : "+valor);
							//atributs.push(atribut,valor);
						});
			      
			      }
   			});
					
			}
			
			
			
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

