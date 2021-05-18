'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById("instalbut");
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt){
    deferredInstallPrompt= evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt){
    deferredInstallPrompt.prompt();
    evt.srcElement.setAtribute('hidden', true);
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