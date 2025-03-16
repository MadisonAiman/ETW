function analyzeText() { //On click, function runs
    let text = document.getElementById("inputText"). value ; 
    //SELECTS textarea element by its id of "inputText"
    //.value EXTRACTS the actual text the user entered
    //let text STORES the value so we can work with it.
    if (text.trim()=== "") { //.trim() removes any leading or trailing spaces so we don't count just spaces as inputs
    // === checks if the trimmed text is EXACTLY an empty string
    //This prevents analyzing an empty input. 
        document.getElementById("output").innerHTML = "Please enter text. "; //SELECTS the <div> where results will be displayed
        return; //Inner HTML allows us to change the content inside of this div
        //Please enter text is to help as feedback to the user
        //RETURN; stops execution of the function here if the input is empty 
        //Nothing below runs if the input is blank
    }
    document.getElementById("output").innerHTML = "Processing: " + text; //If the text isn't empty, the #output <div> is updated to "proessing: " followed by the user's input. 



    let exclusionaryWords = { //Storing words to flag
        "guys": "everyone, folks, team", //this is an object (a key-value pair collection)
        "crazy": "wild, intense, chaotic", //Each word we want to flag is a key.
        "normal": "typical, standard, common" //The value for each key is a string of suggested alternatives such as "everyone, folks, team"
    };

    let flaggedWords = []; //We have to store the words somewhere so we create an array to store them in ; if they user types "hey, guys", this array will eventurally hold ["guys -> everyone, foks, team"]
    let modifiedText = text; //we make a copy of the text input because we don't modify the original text so we can show both the original and highlighted versions.

    for (let word in exclusionaryWords) { //loops through every key inside of exclusionaryWords
        let regex = new RegExp(`\\b${word}\\b`, "gi");//RegExp stands for Regular Expression and is a matching tool in JS so we can find whole words that match in our text
        //`\\b${word}\\b` -> search for the exact word, where word is replaced with "guys", for example
        //  \\b -> makes sure that whole words only are matchd
        // "gi" g = global (matches all occurrences), i = case-insensitive 
        if (regex.test(text)) { 
            //check if the regex pattern exists inside text; if it is true, it means the word is found in the input
            flaggedWords.push(`${word} → ${exclusionaryWords[word]}`); 
            //We push a new message into flaggedWords, storing the array 
            //
            modifiedText = modifiedText.replace(regex, `<mark>${word}</mark>`);
        } //.replace(regex,...); wraps the flagged word in <mark> to highlight it
    }

    let outputMessage = flaggedWords.length > 0 
        ? `Processing: <br>${modifiedText} <br><br> ⚠️ Consider revising: <br>` + flaggedWords.join("<br>") 
        : "No ethical concerns detected.";
        //If any flagged words exist, show "Processing:", the highlighted text , and consider rivisng with the list of flagged words
    document.getElementById("output").innerHTML = outputMessage;

}

