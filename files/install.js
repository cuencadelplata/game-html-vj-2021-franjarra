'use strict';

let deferredInstallPrompt;
const installButton = document.getElementById("instalbut");
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt){
    deferredInstallPrompt= evt;
}
function installPWA(evt){
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choice)=>{
        if(choice.outcome === "accepted"){
            console.log("aceptado")
        }else{
            console.log("no aceptado")
        }
        deferredInstallPrompt = null;
}) 

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt){
    console.log("pong instalado");
}
 
}