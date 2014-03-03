function recollirBuscadorGeneres() {
        
        //Creem una referència a la llista de generes de firebase
        var generesRef = new Firebase('https://pelisvo.firebaseio.com/generes/');
        generesRef.on('value', function(snapshot) {
          if(snapshot.val() === null) {
            // Si no existeix "la taula" generes, avisa
            alert('La taula generes no existeix.');
          } else {
            //Guardem en un array tots els generes
            var llista = snapshot.val();
            
            // Localitzem el el div dins del qual s'haurà de crear la llista
            var div = document.getElementById('buscador_genere');
            
            var listElement = document.createElement("ul");
            listElement.className = "llista-items";
            div.appendChild(listElement);

            // Set up a loop that goes through the items in listItems one at a time
            var numberOfListItems = llista.length;
           
            for( var i =  0 ; i < numberOfListItems ; i++){
            
              // create a <li> for each one.
              var listItem = document.createElement("li");
              listItem.className = "caixa-item";
              
              // add the item text
              listItem.innerHTML = llista[i];
             
              // add listItem to the listElement
              listElement.appendChild(listItem);
            }
            
          }
        });
        
}

function recollirBuscadorRapid() {
	
	//Creem una referència a la llista de generes de firebase
        var generesRef = new Firebase('https://pelisvo.firebaseio.com/buscador_rapid/');
        generesRef.on('value', function(snapshot) {
          if(snapshot.val() === null) {
            // Si no existeix "la taula" generes, avisa
            alert('La taula buscador_rapid no existeix.');
          } else {
            //Guardem en un array tots els generes
            var llista = snapshot.val();
            
            // Localitzem el el div dins del qual s'haurà de crear la llista
            var div = document.getElementById('buscador_rapid');
            
            var listElement = document.createElement("ul");
            listElement.className = "llista-items";
            div.appendChild(listElement);

            // Set up a loop that goes through the items in listItems one at a time
            var numberOfListItems = llista.length;
           
            for( var i =  0 ; i < numberOfListItems ; i++){
            
              // create a <li> for each one.
              var listItem = document.createElement("li");
              listItem.className = "caixa-item";
              
              // add the item text
              listItem.innerHTML = llista[i];
             
              // add listItem to the listElement
              listElement.appendChild(listItem);
            }
            
          }
        });
	
}

function recollirBuscadorIdiomes() {
	
	//Creem una referència a la llista de generes de firebase
        var generesRef = new Firebase('https://pelisvo.firebaseio.com/idiomes/');
        generesRef.on('value', function(snapshot) {
          if(snapshot.val() === null) {
            // Si no existeix "la taula" generes, avisa
            alert('La taula idiomes no existeix.');
          } else {
            //Guardem en un array tots els generes
            var llista = snapshot.val();
            
            // Localitzem el el div dins del qual s'haurà de crear la llista
            var div = document.getElementById('buscador_idiomes');
            
            var listElement = document.createElement("ul");
            listElement.className = "llista-items";
            div.appendChild(listElement);

            // Set up a loop that goes through the items in listItems one at a time
            var numberOfListItems = llista.length;
           
            for( var i =  0 ; i < numberOfListItems ; i++){
            
              // create a <li> for each one.
              var listItem = document.createElement("li");
              listItem.className = "caixa-item";
              
              // add the item text
              listItem.innerHTML = llista[i];
             
              // add listItem to the listElement
              listElement.appendChild(listItem);
            }
            
          }
        });
	
}

function recollirBuscadorAnys() {
	
	//Creem una referència a la llista de generes de firebase
        var generesRef = new Firebase('https://pelisvo.firebaseio.com/buscador_decada/');
        generesRef.on('value', function(snapshot) {
          if(snapshot.val() === null) {
            // Si no existeix "la taula" generes, avisa
            alert('La taula buscador_decada no existeix.');
          } else {
            //Guardem en un array tots els generes
            var llista = snapshot.val();
            
            // Localitzem el el div dins del qual s'haurà de crear la llista
            var div = document.getElementById('buscador_decada');
            
            var listElement = document.createElement("ul");
            listElement.className = "llista-items";
            div.appendChild(listElement);

            // Set up a loop that goes through the items in listItems one at a time
            var numberOfListItems = llista.length;
           
            for( var i =  0 ; i < numberOfListItems ; i++){
            
              // create a <li> for each one.
              var listItem = document.createElement("li");
              listItem.className = "caixa-item";
              
              // add the item text
              listItem.innerHTML = llista[i];
             
              // add listItem to the listElement
              listElement.appendChild(listItem);
            }
            
          }
        });
	
}