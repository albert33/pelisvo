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

	var seriesRef = new Firebase('https://pelisvo.firebaseio.com/series/s1/');
   seriesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	alert('La taula series no existeix.');
      } else {

      	var div = document.getElementById('caixa-resultats-series');

         var llista = document.createElement("ul");
         llista.className = "llista-resultats-item";
         div.appendChild(llista);

			// Quines series hi han
			snapshot.forEach(function(childSnapshot) {
				var serie = childSnapshot.name();

				var atributsSerieRef = new Firebase('https://pelisvo.firebaseio.com/series/'+serie);
				atributsSerieRef.on('value', function(snapshot) {
	         	if(snapshot.val() === null) {
	         		alert('La serie no existeix.');
	         	} else {

	         		// Atributs de cada serie
	         		snapshot.forEach(function(childSnapshot) {
	         			var nom = snapshot.name();
	         			var valor = snapshot.val();
	         			alert(nom+" : "+valor);
	         		});
					}
        		});
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

