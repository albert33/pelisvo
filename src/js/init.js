$( document ).ready(function() {
	
	// Iniciar els buscadors
	var buscadors = [
		{fbURL: "generes", divID: "buscador_genere"},
		{fbURL: "buscador_rapid", divID: "buscador_rapid"},
		{fbURL: "idiomes", divID: "buscador_idiomes"},
		{fbURL: "buscador_decada", divID: "buscador_decada"}
	];
	
	for (var i=0; i<buscadors.length; i++){
		generarBuscadors(baseRef + buscadors[i].fbURL , buscadors[i].divID);
	}
	
	
});