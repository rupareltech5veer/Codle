var codeWords = {
    "1": [],
    "2": ["AH", "Uh", "JS", "UI", "UX", "if", "IP", "DB", "OS"],
    "3": ["Dev", "CSS", "CAD", "MVC", "PHP", "GUI", "XML", "ide", "var", "int", "API", "url", "arg", "bug", "key", "CMS", "bit", "end", "for", "IOS", "run"],
    "4": [],
    "5": ["hello", "value", "world", "codle", "swift", "error", "brute", "Mongo", "tuple", "Jimmy", "route", "ninja", "jinja", "Crawl", "token", "model", "cloud", "click", "Cyber", "buggy", "bytes", "digit", "drags", "print", "field", "event", "loops", "https", "input", "pixel", "tools", "users", "while", "Linux", "state", "train", "const", "float", "ascii", "media", "guide", "label", "alpha", "gamma", "delta", "parse", "morse", "codes", "space", "times", "debug", "conda", "files", "flags", "login", "lists", "array", "order", "agile", "block", "build", "chars", "class", "style", "flask", "frame", "front", "enter", "local", "Mongo", "MYSQL", "empty", "param", "point", "react", "ionic", "stack", "async", "Xcode", "shell", "color", "round", "floor", "coder"],
    "6": ["String", "plugin", "Tensor", "slider", "scroll", "widget", "Apache", "junior", "search", "output", "repeat", "neural", "Linter", "double", "deploy", "coding", "define", "sprite", "binary", "devlop", "Jquery", "django", "object", "python", "Script", "Sprint", "syntax", "Bugsee", "server", "domain", "fields"],
    "7": [],
    "8": [],
    "9": [],
    "10": ["programmer"]
}
var colorsInfo = ["deeppink", "green", "grey"];
var colorsRank = ["green", "deeppink", "grey"];
var wordLen = 5;
var correctWord = "hello";
var letterCounter = 0; 
var youWinFlag = false;
var totalGuesses = 6;
var numGuesses = 0;
var invalidPopup = document.getElementById("invalidPopup");
var infoPopup = document.getElementById("infoPopup");
var winLosePopup = document.getElementById("winLosePopup");
var invalidWordFlag = false;
var infoFlag = false;
var gameOverFlag = false;
var youLooseFlag = false;
var bigWordsDict = {};
var minWordLen = 1;
var maxWordLen = 20;
var disableAddMinusFlag = false;

window.onload = function(){
    letterCounter = 0;
    youWinFlag = false;
    youLooseFlag = false;
    invalidWordFlag = false;
    infoFlag = true;
    gameOverFlag = false;
    disableAddMinusFlag = false;
    showPopup();
    getBigData();
    make_sets_blanks();
    invalidPopup.style.display = "none";
    winLosePopup.style.display = "none";
    document.getElementById("minus").style.color = "red";
    document.getElementById("add").style.color = "red";
    correctWord = randWordSelect();
    
    ///////////////////Remove/comment this hardcoded value below/////////////////
    //correctWord = "cyber";
}

function getBigData(){
    fetch('https://raw.githubusercontent.com/rupareltech5veer/Codle/main/dictWords.json', {
        mode: 'cors',
        method: 'GET',
        // headers: {
        // 'Content-Type': 'application/json',
        // },
        //body: JSON.stringify(dict_words), // turn the JS object literal into a JSON string
    })
    .then(res => res.json())
    .then(function(data){
        //console.log("Yo it is the data: ", data);
        bigWordsDict = Object.assign({}, data);
    })
    .catch(err => {
        console.error(err);
    });
}

function randWordSelect(){
    var sub_words;
    if(codeWords[wordLen] != null && codeWords[wordLen].length > 0){
        sub_words = codeWords[wordLen];
    }
    else{
        sub_words = bigWordsDict[wordLen];
    }
    //console.log("Sub_words for ",wordLen, " letter words = ",sub_words);
    var randInt = getRandomInt(0, sub_words.length-1);
    ////console.log(randInt);
    ////console.log("NEW CORRECT WORD ==== ", sub_words[randInt]);
    return sub_words[randInt];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRemoveBlanks(operation){
    var wordBoxTitle = document.getElementById("wordBoxTitle");
    var blankBox = document.getElementById("wordBox");
    if(operation == 'add'){
        blankBox.style.cssText = "grid-template-columns: repeat("+wordLen+", 1fr);";
        //blankBox.style.gridTemplateColumns = "repeat("+wordLen+", 1fr);";
        for(s=0; s < totalGuesses; s++){
            var blankElm = document.createElement("input");
            blankElm.type="text";
            blankElm.name="cell"+(s+1)+"."+wordLen;
            blankElm.id="set"+(s+1); 
            blankElm.disabled="true";
            blankElm.style.cssText = "grid-row: "+(s+1)+"; grid-column: "+wordLen+"; width: 50px; height: 50px; text-align: center; font-weight: bold; color: white; background-color: #f0ae07; border: 5px solid black; border-radius: 15px; font-size: 40px;";
            blankBox.appendChild(blankElm);
        }
    }
    else if(operation == 'minus'){
        blankBox.style.cssText = "grid-template-columns: repeat("+wordLen+", 1fr);";
        //console.log("wordlen = "+wordLen);
        for(s=0; s < totalGuesses; s++){
            var cellName = document.getElementsByName("cell"+(s+1)+"."+(wordLen+1));
            //console.log(cellName[0]);
            blankBox.removeChild(cellName[0]);  
        }
    }

    wordBoxTitle.innerHTML = wordLen + " Letter Words";
    correctWord = randWordSelect();
    letterCounter = 0;


    var blanksArr = $("#wordBox :input");
    empty_blanks(blanksArr);
}

function empty_blanks(arr){
    var blanksArr = arr;
    //console.log(blanksArr);
    for(b=0; b < blanksArr.length; b++){
        blanksArr[b].value = " ";
        blanksArr[b].style.backgroundColor = "#f0ae07";
    }
}

function make_sets_blanks(){
    var totalBlanks = 0;
    var wordBoxTitle = document.getElementById("wordBoxTitle");
    var blankBox = document.getElementById("wordBox");
    blankBox.style.cssText = "grid-template-columns: repeat(5, 1fr);";
    for(s=0; s < totalGuesses; s++){
        for(i = 0; i < wordLen; i++){
            ////console.log("Creating!!");
            totalBlanks++;
            var blankElm = document.createElement("input");
            blankElm.type="text";
            blankElm.name="cell"+(s+1)+"."+(i+1);
            blankElm.id="set"+(s+1); 
            blankElm.value=" ";
            blankElm.disabled="true";
            blankElm.style.cssText = "width: 50px; height: 50px; text-align: center; font-weight: bold; color: white; background-color: #f0ae07; border: 5px solid black; border-radius: 15px; font-size: 40px;";
            blankBox.appendChild(blankElm);
        }
    }
    //wordBoxTitle.innerHTML = wordLen + " Letter Words";
}

function fillGuess(e, host){
    //var blankElms = $("[id='blanks']");
    var attrName = '#set'+(numGuesses+1);
    var blankElms = document.querySelectorAll(attrName);
    //console.log("CHECk: ");
    ////console.log(blankElms);
    ////console.log("KEY = ", e.key);
    ////console.log("KEYCODE = ", e.keyCode);
    //console.log("GuessCount = ", letterCounter);
    var char;
    var setAttr = '#set'+(numGuesses+1);
    //var keyboardKeys = "#alphabet";


    if(host == "btnclick"){
        char = e.path[0].innerHTML.toLowerCase();
        if(!youWinFlag){
            for(i=0; i < blankElms.length; i++){
                blankElms[i].style.backgroundColor = "#f0ae07";
            }
        
            if (char == "delete") {
                if(letterCounter - 1 >= 0){
                    blankElms[letterCounter - 1].value = " ";
                    letterCounter -= 1;
                }
                else{
                    ////console.log("CAN'T DELETE ANYMORE!!");
                }       
            }
            else if (char == "enter"){
                if(letterCounter == wordLen){
                    // document.getElementById("minus").style.color = "grey";
                    // document.getElementById("add").style.color = "grey";
                    // disableAddMinusFlag = true;
                    //document.getElementById("minus").disabled = true;
                    //document.getElementById("add").disabled = true;
                    //console.log("ENTER KEY PRESSED");
                    checkGuess(blankElms, setAttr);
                    //checkGuess(blankElms, keyboardKeys);
                }
                else{
                    //console.log("Keep Guessing!!");
                }
            }
            else{
                if(letterCounter < wordLen){
                    if((char.toUpperCase() != char.toLowerCase()) && char.length === 1){
                        blankElms[letterCounter].value = char.toUpperCase();
                        letterCounter++;
                    }
                    else{
                        //console.log("Invalid Letter Input: ", e.key);
                    }   
                } 
                else{
                    //console.log("CAN'T ADD ANYMORE!!");
                }       
            }
        }
        else{
            //$('body').unbind();
            //removeKeyPress();
        }
    }
    else if(host == "keytype"){
        char = e.key;
        if(!youWinFlag){
            for(i=0; i < blankElms.length; i++){
                blankElms[i].style.backgroundColor = "#f0ae07";
            }
        
            if (e.keyCode == 8 || e.keyCode == 46) {
                if(letterCounter - 1 >= 0){
                    blankElms[letterCounter - 1].value = " ";
                    letterCounter -= 1;
                }
                else{
                    ////console.log("CAN'T DELETE ANYMORE!!");
                }       
            }
            else if (e.keyCode == 13){
                if(letterCounter == wordLen){
                    // document.getElementById("minus").style.color = "grey";
                    // document.getElementById("add").style.color = "grey";
                    // disableAddMinusFlag = true;
                    //document.getElementById("minus").disabled = true;
                    //document.getElementById("add").disabled = true;
                    //console.log("ENTER KEY PRESSED");
                    checkGuess(blankElms, setAttr);
                    //checkGuess(blankElms, keyboardKeys);
                }
                else{
                    //console.log("Keep Guessing!!");
                }
            }
            else{
                if(letterCounter < wordLen){
                    if((char.toUpperCase() != char.toLowerCase()) && char.length === 1){
                        blankElms[letterCounter].value = char.toUpperCase();
                        letterCounter++;
                    }
                    else{
                        //console.log("Invalid Letter Input: ", e.key);
                    }   
                } 
                else{
                    //console.log("CAN'T ADD ANYMORE!!");
                }       
            }
        }
        else{
            //$('body').unbind();
            //removeKeyPress();
        }
    }

}

function showPopup(){
    if(infoFlag){
        //console.log("I am coming here!");
        infoPopup.style.display = "block";
        var infoTitle = document.getElementById("infoTitle");
        infoTitle.style.textDecoration = "underline";
        var diffColors = $("[id='diffColor']");
        for(c=0; c < diffColors.length; c++){
            diffColors[c].style.backgroundColor = colorsInfo[c];
            $(diffColors[c]).css("border", "5px solid black");
        }
        var blankBox = document.getElementById("wordBox");
        var blankBox2 = $(".contentWrapper");
        var bbheight;
        setTimeout(() => {
            bbheight = blankBox2[0].offsetHeight;
            //console.log("Check Prop: ", blankBox2);
            //console.log("Check Height: ", blankBox);
            //console.log("THE HEIGHT OF THE GUESSES BOX IS ", bbheight);
            //console.log("Original Height = ", infoPopup.style.offsetHeight, " . New Height = ", bbheight);
            infoPopup.style.height = (bbheight+10)+"px";
        }, 50);
        // bbheight = blankBox2.height();
        // //console.log("Check Prop: ", blankBox2);
        // //console.log("Check Height: ", blankBox);
        // //console.log("THE HEIGHT OF THE GUESSES BOX IS ", bbheight);
        // //console.log("Original Height = ", infoPopup.style.offsetHeight, " . New Height = ", bbheight);
        // infoPopup.style.height = bbheight+"px";

    }
    else{
        var fadeOutTime = 1.5;
        infoPopup.style.animation="fadeOutPopup " + fadeOutTime + "s ease-in-out forwards";
        setTimeout(function(){
            infoPopup.style.display = "none";    
        }, (fadeOutTime*1000)+500);
        
    }
    if(invalidWordFlag){
        invalidPopup.style.cssText = "display: block; position: absolute; font-size: 20px; text-align: center; background-color: black; color: white; padding: 10px; justify-self: center; width: fit-content; height: fit-content; top: -5%;";
        invalidPopup.innerHTML = "INVALID WORD - " + "NOT PART OF CODLE DICTIONARY!!";
        setTimeout(function(){
            invalidPopup.style.display = "none";
        }, 2000);
    }
    if(youWinFlag){
        if(gameOverFlag){
            var fadeOutTime = 1;
            winLosePopup.style.animation="fadeOutPopup " + fadeOutTime + "s ease-in-out forwards";
            setTimeout(function(){
                winLosePopup.style.display = "none";    
            }, (fadeOutTime*1000)+500);
        }
        else{
            //console.log("WINNING WINNING!!!!!!!!!!!!!!!!!!!!!");
            confettiBoom(); 
            winLosePopup.style.display = "block";
            var winText = document.getElementById("winMsg");
            winText.innerHTML = "YOU WIN!!";
            var winWord = document.getElementById("winWord");
            winWord.innerHTML = "THE WORD IS "+ correctWord.toUpperCase();
        }
    }
    if(youLooseFlag){
        if(gameOverFlag){
            var fadeOutTime = 1;
            winLosePopup.style.animation="fadeOutPopup " + fadeOutTime + "s ease-in-out forwards";
            setTimeout(function(){
                winLosePopup.style.display = "none";    
            }, (fadeOutTime*1000)+500);
        }
        else{
            winLosePopup.style.display = "block";
            winLosePopup.style.backgroundColor = "#8b0000";
            var winText = document.getElementById("winMsg");
            winText.innerHTML = "YOU LOOSE!!";
            var winWord = document.getElementById("winWord");
            winWord.innerHTML = "THE WORD IS "+ correctWord.toUpperCase();
        }
    }
}

function checkGuess(guess_list, ccAttr){
    //console.log("YAY I GUESSED SOMETHING!!");
    var guessWord = "";
    for(g=0; g < guess_list.length; g++){
        guessWord += guess_list[g].value;
    }    
    //console.log("Word Guessed = ", guessWord);
    findWord(guessWord.toLowerCase(), ccAttr);
}

function findWord(word, attrName){
    // var attrName = '#set'+(numGuesses+1);
    // var guessElms = document.querySelectorAll(attrName);
    // var keyboardKeys = document.querySelectorAll("#alphabet");

    var guessElms = document.querySelectorAll(attrName);
    var sub_words_list = codeWords[wordLen]; 
    
    //console.log("HERE LOOK: ", guessElms);
    //console.log("Correct word = ", correctWord, " vs Guess = ",word);

    sub_words_list = bigWordsDict[wordLen];
    word = word.toLowerCase();
    correctWord = correctWord.toLowerCase();
    invalidWordFlag = false;
    for(i=0; i < guessElms.length; i++){
        guessElms[i].style.backgroundColor = "red";
    }
    if((word == correctWord) || ((word.indexOf(correctWord)) != -1)){
        //console.log("YOU WIN");
        for(i=0; i < guessElms.length; i++){
            guessElms[i].style.backgroundColor = "green";
        }
        keyboardColorCode(guessElms);
        youWinFlag = true;
        showPopup();
    }
    else{
        for(w=0; w < sub_words_list.length; w++){
            if(word == sub_words_list[w].toLowerCase()){
                document.getElementById("minus").style.color = "grey";
                document.getElementById("add").style.color = "grey";
                disableAddMinusFlag = true;

                //console.log("Word is there!!");
                // for(i=0; i < guessElms.length; i++){
                //     guessElms[i].style.backgroundColor = "blue";
                // }
                //console.log("LOOKIE LOOKIE MY COOKIE!!! ", guessElms);
                guessCompare(word, guessElms);
                keyboardColorCode(guessElms);
                
                if((numGuesses+1) >= totalGuesses){
                    youLooseFlag = true;
                    showPopup();
                }
                numGuesses++;
                letterCounter = 0;
                //console.log("Guessed words till now = ", numGuesses);
                return;
            }
        }
        invalidWordFlag = true;
        showPopup();
        //alert("INVALID WORD - " + word.toUpperCase() + " - NOT PART OF CODLE DICTIONARY!!");
    }
}
function getAllIndexes(word, val) {
    var indexes = [];
    for(i = 0; i < word.length; i++)
        if (word.charAt(i) === val)
            indexes.push(i);
    return indexes;
}
function guessCompare(guess, blanks_list){
    var correctGuess = correctWord.toLowerCase();
    //console.log("Comparing: ", guess , " to ", correctGuess, " and putting it in ", blanks_list);
    var dupliLetters = [];
    var dupliCounts = [];
    for(c=0; c < guess.length; c++){
        if(correctGuess.indexOf(guess.charAt(c)) != -1){
            //console.log(guess.charAt(c), " is in the actual word!");
            if(dupliLetters.indexOf(guess.charAt(c)) == -1){
                //console.log("Not Part Of Duplicate Yet");
                dupliLetters.push(guess.charAt(c));
                var cgList = getAllIndexes(correctGuess, guess.charAt(c));
                //console.log("I am pushing 1 less than the length of this array: ", cgList);
                dupliCounts.push(cgList.length - 1);
                if(guess.charAt(c) == correctGuess.charAt(c)){
                    //console.log("Same Spot!!");
                    blanks_list[c].style.backgroundColor = "green";    
                }
                else{
                    //console.log("Wrong Spot!!");
                    blanks_list[c].style.backgroundColor = "deeppink";
                }
            }
            else{
                var dupliIndex = dupliLetters.indexOf(guess.charAt(c)) ;
                //console.log(guess.charAt(c), " is already part of dupliLetters at position ", dupliIndex);
                //console.log("Duplicates Count is = ",dupliCounts[dupliIndex]);
                if(dupliCounts[dupliIndex] > 0){
                    //console.log("We can Still match the duplis");
                    if(guess.charAt(c) == correctGuess.charAt(c)){
                        //console.log("Same Spot!!");
                        blanks_list[c].style.backgroundColor = "green";    
                    }
                    else{
                        //console.log("Wrong Spot!!");
                        blanks_list[c].style.backgroundColor = "deeppink";
                    }
                    dupliCounts[dupliIndex] -= 1;
                }
                else{
                    //console.log("Sorry No more duplis left");
                    blanks_list[c].style.backgroundColor = "grey";
                }
            }
        }
        else{
            //console.log("Sorry the letter ", guess.charAt(c), " is Not a Part of the actual word!");
            blanks_list[c].style.backgroundColor = "grey";
        }
    }
}
function confettiBoom(){
    //console.log("making confetti");
    var confettiHolder = document.getElementById("confettiHolder");
    var confettiGif = document.createElement("img");
    confettiGif.src = "confettiPNG.gif";
    confettiGif.id = "confettiGif";
    //console.log(confettiGif);
    confettiGif.style.cssText = "display: block; position: absolute; z-index: 20; width: 100%; height: 75%; top: 0; bottom: 0; margin: auto; background-color: transparent;";
    confettiHolder.appendChild(confettiGif);
    setTimeout(() => {
        var confettiTime = 2;
        confettiGif.style.animation = "confettiOut " + confettiTime + "s ease-in-out forwards";
        setTimeout(function(){
            //confettiGif.style.display = "none";
            confettiHolder.removeChild(confettiGif);
        }, (confettiTime*1000)-500);
    }, 1000);
}
function keyboardColorCode(guessElms){
    var keyboardKeys = document.querySelectorAll("#alphabet");
    //console.log("Two lists here are they = ", keyboardKeys, " ; ",guessElms);
    for(k=0; k < keyboardKeys.length; k++){
        for(c=0; c < guessElms.length; c++){
            if(keyboardKeys[k].innerHTML.toUpperCase() == guessElms[c].value.toUpperCase()){
                var matchColor = guessElms[c].style.backgroundColor;
                //console.log("MatchColor = ", matchColor);
                if(colorsRank.indexOf(keyboardKeys[k].style.backgroundColor) != -1){
                    if(colorsRank.indexOf(keyboardKeys[k].style.backgroundColor) > colorsRank.indexOf(matchColor)){
                        keyboardKeys[k].style.backgroundColor = matchColor;
                    }
                }
                else{
                    keyboardKeys[k].style.backgroundColor = matchColor;
                    if(matchColor == "grey"){
                        keyboardKeys[k].innerHTML = " ";
                        keyboardKeys[k].style.pointerEvents = "none";
                    }
                }
            }
        }    
    }

}

//////////////////////Event Listeners////////////////////////

document.body.addEventListener("keyup", (event)=> {
    //console.log("KeyPressed");
    //console.log("CHECK: ", document.querySelectorAll("letter"));
    if(!infoFlag){
        fillGuess(event, "keytype");
    }
});

document.getElementById("infoPopup").addEventListener("click", (event)=> {
    //console.log("clicked");
    infoFlag = false;
    showPopup();
});

// document.querySelectorAll('.letter').forEach(item => {
//     item.addEventListener('click', event => {
//         //console.log("KeyPressed = ", event);
//         if(!infoFlag){
//             fillGuess(event, "btnclick");
//         }
//     })
// });

document.getElementById("winLosePopup").addEventListener("click", (event)=> {
    //console.log("clicked");
    gameOverFlag = true;
    showPopup();
});

document.getElementById("add").addEventListener("click", (event)=> {
    if(!disableAddMinusFlag){
        //console.log("Add Clicked!, ",wordLen);
        if(wordLen+1 <= maxWordLen){
            wordLen++;
            addRemoveBlanks('add');
            if(wordLen+1 > maxWordLen){
                //document.getElementById("add").disabled = true;
                document.getElementById("add").style.color = "grey";
            }
            else{
                //document.getElementById("add").disabled = false;
                document.getElementById("minus").style.color = "red";
                document.getElementById("add").style.color = "red";
            }
            //make_sets_blanks();
        }
    }
});

document.getElementById("minus").addEventListener("click", (event)=> {
    if(!disableAddMinusFlag){
        //console.log("Minus clicked! , ",wordLen);
        if(wordLen-1 >= minWordLen){
            wordLen--;
            addRemoveBlanks('minus');
            if(wordLen-1 < minWordLen){
                //document.getElementById("minus").disabled = true;
                document.getElementById("minus").style.color = "grey";
            }
            else{
                //document.getElementById("minus").disabled = false;
                document.getElementById("add").style.color = "red";
                document.getElementById("minus").style.color = "red";
            }
            // //make_sets_blanks();
        }
    }
});



//////////////////Event Listeners And Their Functions////////////////////

document.querySelectorAll('.letter').forEach(item => {
    item.addEventListener('click', e =>{
        keyboardEvent(e);
    });
    item.addEventListener('touchstart', e =>{
        keyboardEvent(e);
    }); 
});

function keyboardEvent(event){
    //console.log("KeyPressed = ", event);
    event.preventDefault();
    event.stopPropagation();
    if(!infoFlag){
        fillGuess(event, "btnclick");
    }
}







///////////////////////////////////////JUNK CODE WHICH I WILL LATER DELETE//////////////////////////////

    
// $(document).ready(function() { // better to use $(document).ready(function(){
//     $('.List li').on('click touchstart', function() {
//         $('.Div').slideDown('500');
//     });
// });


    // for(c=0; c < guess.length; c++){
    //     if(correctGuess.indexOf(guess.charAt(c)) != -1){
    //         //console.log("Letter is in the word!!");
    //         var cgList = getAllIndexes(correctGuess, guess.charAt(c));
    //         var gList = getAllIndexes(guess, guess.charAt(c));
    //         //console.log("HERE ARE THE MAPPING LISTS:");
    //         //console.log(gList);
    //         //console.log(cgList);    
    //         if(cgList.length == gList.length){
    //             //console.log("SAME!!");
    //             for(m=0; m < gList.length; m++){
    //                 //console.log("mapping: ", gList[m], " to ", cgList[m]);
    //                 if(gList[m] == cgList[m]){
    //                     blanks_list[c].style.backgroundColor = "green";
    //                 }
    //                 else{
    //                     blanks_list[c].style.backgroundColor = "deeppink";
    //                 }
    //             }
    //         }
    //         else if(cgList.length > gList.length){
    //             //console.log("gList is smaller!!");
    //             for(m=0; m < gList.length; m++){
    //                 if(gList[m] == cgList[m]){
    //                     blanks_list[c].style.backgroundColor = "green";
    //                 }
    //                 else{
    //                     blanks_list[c].style.backgroundColor = "deeppink";
    //                 }
    //             }
    //         }
    //         else{
    //             //console.log("cgList is smaller!!");
    //             for(m=0; m < cgList.length; m++){
    //                 if(gList[m] == cgList[m]){
    //                     blanks_list[c].style.backgroundColor = "green";
    //                 }
    //                 else{
    //                     blanks_list[c].style.backgroundColor = "deeppink";
    //                 }
    //             }
    //         }
    //     }
    //     else{
    //         //console.log("GREY COLOR :(");
    //         blanks_list[c].style.backgroundColor = "grey";   
    //     }
    // }



    // for(c=0; c < guess.length; c++){
    //     if(correctGuess.indexOf(guess.charAt(c)) != -1){
    //         if(correctGuess.indexOf(guess.charAt(c)) == guess.indexOf(guess.charAt(c))){
    //             blanks_list[c].style.backgroundColor = "green";                
    //         }
    //         else{
    //             blanks_list[c].style.backgroundColor = "deeppink";
    //         }
    //     }
    //     else{
    //         blanks_list[c].style.backgroundColor = "grey";   
    //     }
    // }


    
// document.body.addEventListener("keyup", fillGuess});

// function removeKeyPress(){
//     document.body.removeEventListener("keyup", (event)=> {
//         //console.log("KeyPressed");
//         fillGuess(event);
//     });
// }

// function event(event){
//     //console.log("KeyPressed");
//     fillGuess(event);    
// }


// fetch("words.json").then(response => {
    //     return response.json();
    // }).then(jsondata => //console.log(jsondata));
    // var jsondata = await fetch("words.json", { mode: "no-cors" }).then((res) => res.json()).then((data) => //console.log(data));
    // //console.log(jsondata);
    //JSON.parse(jsondata);

    // var url = "words.json";         
    // $.getJSON(url, function (data) {
    //     $.each(data, function (key, model) {
    //         //console.log(key);
    //     })
    // });

//     fetch('words.json', {mode: 'no-cors'}).then(function(response) {
//         //console.log(response);
//         JSON.parse(response);
//         //console.log(response);
//   })

    //var wordsDict = JSON.stringify(words);

    //var guessElms =$("[id='blanks']");
