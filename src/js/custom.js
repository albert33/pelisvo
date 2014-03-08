var fbBaseURL = "https://pelisvo.firebaseio.com/",
	fireBaseRef = new Firebase(fbBaseURL);


// TODO:
function creaBuscador(firebaseChildPath, targetID) {
	// childRef = fireBaseRef.child(firebaseChildPath)
	// itera sobre la info i afegeix al DOM

	// Potser no cal. es podria separar en dues funcions, de connexió i de DOM
}


function recollirBuscadorGeneres() {

	var generesRef = new Firebase('https://pelisvo.firebaseio.com/generes/');
   generesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	alert('La taula generes no existeix.');
      } else {

      	var llista = snapshot.val();
         var div = document.getElementById('buscador_genere');

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

function recollirBuscadorRapid() {

	var generesRef = new Firebase('https://pelisvo.firebaseio.com/buscador_rapid/');
   generesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	alert('La taula buscador_rapid no existeix.');
      } else {

      	var llista = snapshot.val();
         var div = document.getElementById('buscador_rapid');

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

function recollirBuscadorIdiomes() {

	var generesRef = new Firebase('https://pelisvo.firebaseio.com/idiomes/');
   generesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	alert('La taula idiomes no existeix.');
      } else {

      	var llista = snapshot.val();
         var div = document.getElementById('buscador_idiomes');

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

function recollirBuscadorAnys() {

	var generesRef = new Firebase('https://pelisvo.firebaseio.com/buscador_decada/');
   generesRef.on('value', function(snapshot) {
   	if(snapshot.val() === null) {
      	alert('La taula buscador_decada no existeix.');
      } else {

      	var llista = snapshot.val();
         var div = document.getElementById('buscador_decada');

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

$( document ).ready(function() {
	recollirBuscadorGeneres();
	recollirBuscadorRapid();
	recollirBuscadorIdiomes();
	recollirBuscadorAnys();
	searchBoxListener ();
	var buscadors = [
		{ url: "buscador_decada", domID: "decada" },
		{ url: "buscador_generes", domID: "busc_generes" },
		{ url: "buscador_pepito", domID: "pepitodom" }
	];
	// iterar sobre array i cridar la funcio
	//creaBuscador(fbBaseURL + buscadors[i].url, buscadors[i].domID);
});