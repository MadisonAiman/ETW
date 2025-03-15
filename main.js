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
}
