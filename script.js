function Search() {  
        var word = document.getElementById("input").value;
        let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;  
            
        fetch(api)  
          .then(function(response){  
            let data = response.json();  
            return data;
          }) 
          .then(function(data){ 
            // Input
            document.getElementById('word').innerHTML = word;
      
            // If no Definition
            message = data.message;
            if (message){
              alert(message);
            }
      
            // Output
            definition1 = data[0].meanings[0].definitions[0].definition;
            example1 = data[0].meanings[0].definitions[0].example;
            document.getElementById('definition1').innerHTML = "1:" + definition1;
            document.getElementById('example1').innerHTML = "1:" + example1;
      
            // Audio
            voiceUrl = data[0].phonetics[0].audio;
            var audio = document.getElementById('audio');
            var src = document.createAttribute("src");
            src.value = voiceUrl;
            audio.setAttributeNode(src); 
      
            // Additional Definitions
            definition2 = data[0].meanings[1]?.definitions[0]?.definition;
            example2 = data[0].meanings[1]?.definitions[0]?.example;
            if (definition2 != null) {
              document.getElementById('definition2').innerHTML = "2:" + definition2;
              document.getElementById('example2').innerHTML = "2:" + example2;
            }
      
            // Synonyms
            let synonyms = data[0].meanings.flatMap(meaning => meaning.synonyms).filter(Boolean);
            let synonymsList = document.getElementById('synonyms');
            synonymsList.innerHTML = "";
            if (synonyms.length === 0) {
              let li = document.createElement('li');
              li.innerText = "No synonyms found.";
              synonymsList.appendChild(li);
            } else {
              synonyms.forEach(synonym => {
                let li = document.createElement('li');
                li.innerText = synonym;
                li.classList.add('synonyms');
                synonymsList.appendChild(li);
              });
            }
      
            // Antonyms
            let antonyms = data[0].meanings.flatMap(meaning => meaning.antonyms).filter(Boolean);
            let antonymsList = document.getElementById('antonyms');
            antonymsList.innerHTML = "";
            if (antonyms.length === 0) {
              let li = document.createElement('li');
              li.innerText = "No antonyms found.";
              antonymsList.appendChild(li);
            } else {
              antonyms.forEach(antonym => {
                let li = document.createElement('li');
                li.innerText = antonym;
                li.classList.add('antonyms');
                antonymsList.appendChild(li);
              });
            }
          })  
      }
      
