const fromText = document.querySelector(".form-text");
const toText = document.querySelector(".to-text");
const exChangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const TranslateBtn = document.getElementById('translateBtn');
const icons = document.querySelectorAll(".icons i");


// Language selection and default language 
selectTag.forEach((every , id)=>{
    for(const country_code in countries){
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        }
        if(id == 1 && country_code == "bn-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        every.insertAdjacentHTML("beforeend" , option);
    };
});

// Language exchange click button 
exChangeIcon.addEventListener("click" , ()=>{
    let tempText = fromText.value;
    let tempLangu = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLangu;
    fromText.value = toText.value;
    toText.value = tempText;
});

// Translation and api working 
TranslateBtn.addEventListener("click" , ()=>{
    let text = fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder" , "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
    .then(res=>res.json())
    .then(data=>{
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder" , "Translating...");
    });
});


// Copy text and Speaking 
icons.forEach((each)=>{
    each.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let uttrence;
            if(target.id == "from"){
                uttrence = new SpeechSynthesisUtterance(fromText.value);
                uttrence.lang = selectTag[0].value;
            }else{
                uttrence = new SpeechSynthesisUtterance(toText.value);
                uttrence.lang = selectTag[1].value;
            }
            speechSynthesis.speak(uttrence);
        }
    })
})