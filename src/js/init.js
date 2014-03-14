$( document ).ready(function() {
	
	searchBoxListener ();
	
	var buscadors = [
		{ url: "buscador_rapid", domID: "buscador_rapid" },
		{ url: "generes", domID: "buscador_genere" },
		{ url: "idiomes", domID: "buscador_idiomes" },
		{ url: "buscador_decada", domID: "buscador_decada" }
	];
	
	for (var i=0; i<buscadors.length; i++){
		crearBuscadors(fbRef + buscadors[i].url, buscadors[i].domID);
	}
	
	vistaLlistaSeries(fbRef+"series");
	
});