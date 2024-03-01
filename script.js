const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');

// creating addeventlistener to the form because it contain button to prevent re-load use preventdefault,form.elements[0] means we are mention the input it is the method without acces the input particularly
form.addEventListener("submit",(e)=>{
e.preventDefault();
getwordInfo(form.elements[0].value);

})
//await is use because it will wait untill full info come
const getwordInfo=async(word)=>{
    try {
        resultDiv.innerHTML="Fetching data..."

const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
const data= await response.json();
const definitions=data[0].meanings[0].definitions[0]
// alert("Word :"+word)
//formate the wa to display in div
resultDiv.innerHTML=`
    <h2 ><strong>Word:</strong>${data[0].word}<h2>
    <p class="partOfspeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition===undefined ?"Not Found" :definitions.definition}<p>
    <p><strong>Example:</strong>${definitions.example===undefined ? "Not Found" : definitions.example}<p>
    <p><strong>Synonyms:</strong></p>


`;
// fetching antonyms
if(definitions.antonyms.length===0){
    resultDiv.innerHTML +=`<span>Not found</span>`
}
else{
    for(let i=0;i<definitions.antonyms.length;i++){
        resultDiv.innerHTML +=`<li >${definitions.antonyms[i]}</li>`
    }
    
}
console.log(data);
// Adding read mre button
resultDiv.innerHTML+=`<div><a href=${data[0].sourceUrls} target=_blank>Read More</a></div>`
} 
catch (error) {
    resultDiv.innerHTML=`<p>Sorry the word could be found</p>`
 
}
}
