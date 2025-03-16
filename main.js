function analyzeText() { 
    let text = document.getElementById("inputText").value.trim(); 

    if (text === "") { 
        document.getElementById("output").innerHTML = "Please enter text."; 
        return; 
    }

    document.getElementById("output").innerHTML = "Processing: " + text; 

    let exclusionaryWords = { 
        "guys": { 
            alternatives: ["everyone", "folks", "team"], 
            reason: "Can be non-inclusive when addressing a mixed-gender group."
        },
        "crazy": { 
            alternatives: ["wild", "intense", "chaotic"], 
            reason: "Can be stigmatizing to mental health."
        },
        "normal": { 
            alternatives: ["typical", "standard", "common"], 
            reason: "Implies other conditions are abnormal, which can be exclusionary."
        }  
    };

    let flaggedWords = new Set(); 
    let modifiedText = text; 

    for (let word in exclusionaryWords) {
        let regex = new RegExp(`\\b${word}\\b[!?."]?`, "gi");

        if (regex.test(text)) {
            let suggestions = exclusionaryWords[word].alternatives.join(', ');
            let explanation = exclusionaryWords[word].reason;

            flaggedWords.add(`${word} → ${suggestions} (Reason: ${explanation})`);

            // Highlight flagged words
            modifiedText = modifiedText.replaceAll(regex, (match) => {
                return `<mark title="${explanation} Consider using: ${suggestions}">${match}</mark>`;
            });
        }
    }

    let flaggedWordsArray = Array.from(flaggedWords);

    let outputMessage = flaggedWordsArray.length > 0 
        ? `Processing: <br>${modifiedText} <br><br> ⚠️ Consider revising: <br>` + flaggedWordsArray.join("<br>") 
        : "No ethical concerns detected.";

    document.getElementById("output").innerHTML = outputMessage;
    document.getElementById("clearButton").style.display = "inline-block"; 
}

function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("clearButton").style.display = "none"; 
}
