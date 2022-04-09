// var jsonData;
// var tempData;
// var longestWordLen = 2;
// var shortestWordLen = 1;


// function addWordsToJson(){
//     var textarea = document.getElementById("addWords");
//     //console.log(textarea.value);
//     var words = textarea.value;
//     var words_input_list = words.split("\n");
//     console.log(words_input_list);
    
//     longestWordLen = 0;
//     for(w=0; w < words_input_list.length; w++){
//         if(words_input_list[w].length >= longestWordLen){
//             longestWordLen = words_input_list[w].length;
//         }
//     }
//     console.log(longestWordLen);


//     //HARD CODED VALUE - Can be removed later!
//     longestWordLen = 10;
//     //shortestWordLen = 2;


//     var dict_words = {};
//     for(l=1; l <= longestWordLen; l++){
//         var wordsArr = [];
//         for(w=0; w < words_input_list.length; w++){
//             if(words_input_list[w].length == l){
//                 wordsArr.push(words_input_list[w]);
//             }
//         }
//         dict_words[l] = wordsArr;
//     }
//     console.log(dict_words);

    
//     fetch('https://raw.githubusercontent.com/rupareltech5veer/Codle/main/dictWords.json', {
//         mode: 'cors',
//         method: 'GET',
//         // headers: {
//         // 'Content-Type': 'application/json',
//         // },
//         //body: JSON.stringify(dict_words), // turn the JS object literal into a JSON string
//     })
//     .then(res => res.json())
//     .then(function(data){
//         console.log("Yo it is the data: ", data);
//         //jsonData = data;
//         tempData = Object.assign({}, data);
//         jsonData = Object.assign({}, data);

//         //writeToJson(dict_words, jsonData);
//         writeToJson(dict_words, tempData);
//     })
//     .catch(err => {
//         console.error(err);
//     });




//     // fetch("https://github.com/rupareltech5veer/Codle/blob/main/dictWords.json")
//     // .then(response => {
//     //     return response.json();
//     // })
//     // .then(jsondata => console.log(jsondata));


//     // var fs = require('fs');
//     // var fileName = 'dict_words.json';
//     // var file = require(fileName);
//     // for(l=1; l < longestWordLen; l++){
//     //     for(w=0; w < words_input_list; w++){
//     //         file.key = l;
//     //         fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
//     //             if (err) return console.log(err);
//     //             console.log(JSON.stringify(file));
//     //             console.log('writing to ' + fileName);
//     //         });
//     //     }
//     // }










// }

// function writeToJson(dict_words, jsonData){
//     var dict_words_keys = Object.keys(dict_words);
//     var jsonData_keys = Object.keys(jsonData);
//     console.log("INFO TO CHECK: ");
//     console.log(dict_words_keys);
//     console.log(jsonData_keys);

//     for(i=0; i < dict_words_keys.length; i++){
//         console.log("Key = ", dict_words_keys[i], ", Len Of keys = ", dict_words_keys.length);
        
//         if(jsonData_keys.indexOf(dict_words_keys[i]) != -1){
//         //if(jsonData_keys.indexOf(i+1) != -1){
            
//             var temp_jsonData_values = jsonData[dict_words_keys[i]];
//             var temp_dict_words_values = dict_words[dict_words_keys[i]];
//             temp_jsonData_values = temp_jsonData_values.map(tempVal => tempVal.toLowerCase());
//             temp_dict_words_values = temp_dict_words_values.map(tempVal1 => tempVal1.toLowerCase());
//             if(temp_dict_words_values.length > 0){
//                 console.log("Value is here",temp_jsonData_values,temp_dict_words_values);
                
//                 if(temp_jsonData_values.length > 0){
//                     //console.log("jsonData HAs WORDS");

//                     //MAKE ALL THE VALUES LOWERCASE
//                     // for(c=0; c < temp_jsonData_values.length; c++){
//                     //     temp_jsonData_values[c] = temp_jsonData_values[c].toLowerCase();
//                     // }

//                     //console.log("All values to lowercase!!");
//                     for(j=0; j < temp_dict_words_values.length; j++){
//                         if(temp_jsonData_values.indexOf(temp_dict_words_values[j]) == -1){
//                             //console.log("new value alert!");
//                             temp_jsonData_values.push(temp_dict_words_values[j]);
//                         }
//                     }
//                     jsonData[dict_words_keys[i]] = temp_jsonData_values;
//                 }
//                 else{
//                     //console.log("blank words list alert!");
//                     jsonData[dict_words_keys[i]] = dict_words[dict_words_keys[i]];
//                 }
//             }
//         }
//         else{
//             //console.log("Key is not here");
//             jsonData[dict_words_keys[i]] = dict_words[dict_words_keys[i]];
//         }
        
//     }

//     console.log("Final Data To Send: ", jsonData);

    

//     // fetch('http://raw.githubusercontent.com/rupareltech5veer/Codle/main/dictWords.json', {
//     //     mode: 'cors',
//     //     method: 'POST',
//     //     //cache: 'no-cache',
//     //     headers: {
//     //         //'Accept': 'application/json, text/plain, */*',
//     //         'Content-Type': 'application/json',
//     //         'Access-Control-Allow-Origin': 'http://localhost:5000',
//     //         //'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     //         //'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
//     //     },
//     //     body: JSON.stringify(jsonData), // turn the JS object literal into a JSON string
//     // })
//     fetch('https://raw.githubusercontent.com/rupareltech5veer/Codle/main/dictWords.json', {
//         method: 'POST',
//         body: JSON.stringify({1: ["a", "b", "c", "d", "e"]}), // turn the JS object literal into a JSON string
//     })
//     .then(res => console.log("SUCESS!!! : ", res))
//     .catch(err => {
//         console.error(err);
//     });

// }








// document.getElementById("submit").addEventListener("click", (event)=> {
//     console.log("clicked");
//     addWordsToJson();
// });
