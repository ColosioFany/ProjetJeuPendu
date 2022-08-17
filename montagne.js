const LETTRE_PROPOSEE = document.getElementById("lettreProposee");
const MOT_PROPOSE = document.getElementById("motPropose"); 
const SEND_LETTRE = document.getElementById("sendLettreProposee");
const SEND_MOT = document.getElementById("sendMotPropose");
const MOT_A_DEVINER = document.getElementById("motADeviner");
const LETTRE_DEJA_PROPOSEE = document.getElementById("lettreDejaProposee"); 
const BOUTON = document.getElementById("div"); 

let compteurFaute = 0; 

var monCanvas=document.getElementById("canvas1");
var ctx = monCanvas.getContext("2d");
ctx.lineWidth="5";
ctx.strokeStyle="#000000";

ctx.beginPath(); 
ctx.moveTo(50, 20);
ctx.lineTo(50, 200);
ctx.moveTo(50, 30);
ctx.lineTo(200, 20);
ctx.stroke();


const FOUND_WORD = document.getElementById("foundWord");

let lettresPropEnsemble = " "; 
let place = 0;

let motChoisi = choixAleatoireDuMot();
let motCache = "";
console.log(motChoisi);
for(let i = 0; i < motChoisi.length; i++){
    motCache += "_";
}
MOT_A_DEVINER.innerHTML = motCache;


SEND_LETTRE.addEventListener("click", () =>{
    //console.log(LETTRE_PROPOSEE)
    rechercheLettreDansMot(LETTRE_PROPOSEE.value[0]);
    LETTRE_PROPOSEE.value = "";
});

SEND_MOT.addEventListener("click", () =>{
    //console.log(motChoisi);
    console.log(MOT_PROPOSE.value); 
    if(MOT_PROPOSE.value == motChoisi)
    {
        MOT_A_DEVINER.innerHTML = motChoisi;
        FOUND_WORD.innerHTML = "GAGNÉ";
        MOT_PROPOSE.value = "";
    }
});


/********************************************************* */

function rechercheLettreDansMot(parametre_lettre){
    place = 0; 
    for(let i = 0; i < motChoisi.length; i++){
        if(parametre_lettre == motChoisi[i]){
            motCache = remplaceLettre(i, parametre_lettre, motCache);
            
            place = 1; 
        }
    }
    if(place == 0)
    {
        compteurFaute++; 

        lettresPropEnsemble = lettresPropEnsemble + " " + LETTRE_PROPOSEE.value;
        LETTRE_DEJA_PROPOSEE.innerHTML = 'Lettres déjà proposée : ' + lettresPropEnsemble;  
        console.log('mauvaise lettre');

        if(compteurFaute == 1)
        {
            ctx.fillStyle="#000000"
            ctx.moveTo(200, 20);
            ctx.arc(200, 30, 10, 0,  2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
        if(compteurFaute == 2)
        {
            ctx.moveTo(200, 20); 
            ctx.lineTo(200, 100); 
            ctx.stroke(); 
        }
        if(compteurFaute == 3)
        {
            ctx.moveTo(200, 50); 
            ctx.lineTo(150, 70); 
            ctx.stroke(); 
        }
        if(compteurFaute == 4)
        {
            ctx.moveTo(200, 50); 
            ctx.lineTo(250, 70); 
            ctx.stroke(); 
        }
        if(compteurFaute == 5)
        {
            ctx.moveTo(200, 98); 
            ctx.lineTo(160, 120); 
            ctx.stroke();
        }
        if(compteurFaute == 6)
        {
            ctx.moveTo(200, 98); 
            ctx.lineTo(240, 120); 
            ctx.stroke(); 
        }

        
    }
    if(compteurFaute == 6)
    {
        console.log(motChoisi); 
        MOT_A_DEVINER.innerHTML = motChoisi;
        FOUND_WORD.innerHTML = "PERDU, le mot était: " + motChoisi;
        BOUTON.innerHTML = " "; 
    }
    
    MOT_A_DEVINER.innerHTML = motCache;
    if(motCache == motChoisi){
        FOUND_WORD.innerHTML = "GAGNÉ";
    }
}

/*************************************************************** */

function remplaceLettre(parametre_positionLettre, parametre_lettre, parametre_motCache){
    let motCacheRevele = "";
    for(let i = 0; i < parametre_motCache.length; i++){
        if(parametre_positionLettre == i){
            motCacheRevele += parametre_lettre;
        } else{
            motCacheRevele += parametre_motCache[i];
        }
    }
    return motCacheRevele;
}

/*Cette fonction tirera un mot aléatoirement à partir du tableau
"listeMot" et le retournera*/
function choixAleatoireDuMot(){
    let listeMot = [
        "neige",
        "grelon",
        "blanc",
        "froid",
        "ski",
        "bonhomme",
        "luge",
        "chalet",
        "fondue",
        "raclette",
        "tartiflette",
        "telesiege",
        "spa",
    ]
    return listeMot[Math.floor(Math.random() * listeMot.length)]
}
