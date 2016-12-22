<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# cordova-plugin-dialogs

Ce plugin permet d'accéder à certains éléments d'interface utilisateur native de dialogue via un global `navigator.notification` objet.

Bien que l'objet est attaché à la portée globale `navigator` , il n'est pas disponible jusqu'après la `deviceready` événement.

    document.addEventListener (« deviceready », onDeviceReady, false) ;
    function onDeviceReady() {console.log(navigator.notification);}
    

## Installation

    Cordova plugin ajouter cordova-plugin-dialogs
    

## Méthodes

*   `navigator.notification.alert`
*   `navigator.notification.confirm`
*   `navigator.notification.prompt`
*   `navigator.notification.beep`

## navigator.notification.alert

Affiche une boîte de dialogue ou d'alerte personnalisé. La plupart des implémentations de Cordova utilisent une boîte de dialogue natives pour cette fonctionnalité, mais certaines plates-formes du navigateur `alert` fonction, qui est généralement moins personnalisable.

    Navigator.notification.Alert (message, alertCallback, [title], [buttonName])
    

*   **message**: message de la boîte de dialogue. *(String)*

*   **alertCallback**: callback à appeler lorsque la boîte de dialogue d'alerte est rejetée. *(Fonction)*

*   **titre**: titre de la boîte de dialogue. *(String)* (Facultatif, par défaut`Alert`)

*   **buttonName**: nom du bouton. *(String)* (Facultatif, par défaut`OK`)

### Exemple

    function alertDismissed() {/ / faire quelque chose} navigator.notification.alert ('Vous êtes le gagnant!', / / message alertDismissed, / / rappel « Game Over », / / titre « Done » / / buttonName) ;
    

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 et 8
*   Windows 8
*   Windows

### Windows Phone 7 et 8 Quirks

*   Il n'y a aucune boîte de dialogue d'alerte intégrée au navigateur, mais vous pouvez en lier une pour appeler `alert()` dans le scope global:
    
        window.alert = navigator.notification.alert;
        

*   Les deux appels `alert` et `confirm` sont non-blocants, leurs résultats ne sont disponibles que de façon asynchrone.

### Firefox OS Quirks :

Les deux indigènes bloquant `window.alert()` et non-bloquante `navigator.notification.alert()` sont disponibles.

### BlackBerry 10 Quirks

`navigator.notification.alert('text', callback, 'title', 'text')`paramètre callback est passé numéro 1.

## navigator.notification.confirm

Affiche une boîte de dialogue de confirmation personnalisable.

    Navigator.notification.Confirm (message, confirmCallback, [title], [buttonLabels])
    

*   **message**: message de la boîte de dialogue. *(String)*

*   **confirmCallback**: callback à appeler avec l'index du bouton pressé (1, 2 ou 3) ou lorsque la boîte de dialogue est fermée sans qu'un bouton ne soit pressé (0). *(Fonction)*

*   **titre**: titre de dialogue. *(String)* (Facultatif, par défaut`Confirm`)

*   **buttonLabels**: tableau de chaînes spécifiant les étiquettes des boutons. *(Array)* (Optionnel, par défaut, [ `OK,Cancel` ])

### confirmCallback

Le `confirmCallback` s'exécute lorsque l'utilisateur appuie sur un bouton dans la boîte de dialogue de confirmation.

Le rappel prend l'argument `buttonIndex` *(nombre)*, qui est l'index du bouton activé. Notez que l'index utilise base d'indexation, la valeur est `1` , `2` , `3` , etc..

### Exemple

    function onConfirm(buttonIndex) {alert (« Vous bouton sélectionné » + buttonIndex);}
    
    Navigator.notification.Confirm ('Vous êtes le gagnant!', / / message onConfirm, / / rappel d'invoquer avec l'index du bouton enfoncé « Game Over », / / title ['redémarrer', « Exit »] / / buttonLabels) ;
    

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Paciarelli
*   Windows Phone 7 et 8
*   Windows 8
*   Windows

### Windows Phone 7 et 8 Quirks

*   Il n'y a aucune fonction intégrée au navigateur pour `window.confirm`, mais vous pouvez en lier une en affectant:
    
        window.confirm = navigator.notification.confirm ;
        

*   Les appels à `alert` et `confirm` sont non-bloquants, donc le résultat est seulement disponible de façon asynchrone.

### Bizarreries de Windows

*   Sur Windows8/8.1, il n'est pas possible d'ajouter plus de trois boutons à MessageDialog instance.

*   Sur Windows Phone 8.1, il n'est pas possible d'établir le dialogue avec plus de deux boutons.

### Firefox OS Quirks :

Les deux indigènes bloquant `window.confirm()` et non-bloquante `navigator.notification.confirm()` sont disponibles.

## navigator.notification.prompt

Affiche une boîte de dialogue natif qui est plus personnalisable que le navigateur `prompt` fonction.

    Navigator.notification.prompt (message, promptCallback, [title], [buttonLabels], [defaultText])
    

*   **message**: message de la boîte de dialogue. *(String)*

*   **promptCallback**: rappel d'invoquer avec l'index du bouton pressé (1, 2 ou 3) ou lorsque la boîte de dialogue est fermée sans une presse de bouton (0). *(Fonction)*

*   **titre**: titre *(String)* (facultatif, la valeur par défaut de dialogue`Prompt`)

*   **buttonLabels**: tableau de chaînes spécifiant les bouton *(Array)* (facultatif, par défaut, les étiquettes`["OK","Cancel"]`)

*   **defaultText**: zone de texte par défaut entrée valeur ( `String` ) (en option, par défaut : chaîne vide)

### promptCallback

Le `promptCallback` s'exécute lorsque l'utilisateur appuie sur un bouton dans la boîte de dialogue d'invite. Le `results` objet passé au rappel contient les propriétés suivantes :

*   **buttonIndex**: l'index du bouton activé. *(Nombre)* Notez que l'index utilise base d'indexation, la valeur est `1` , `2` , `3` , etc..

*   **entrée 1**: le texte entré dans la boîte de dialogue d'invite. *(String)*

### Exemple

    function onPrompt(results) {alert (« Vous avez sélectionné le numéro du bouton » + results.buttonIndex + « et saisi » + results.input1);}
    
    Navigator.notification.prompt ('Veuillez saisir votre nom', / / message onPrompt, / / rappel à appeler « Registration », / / title ['Ok', 'Exit'], / / buttonLabels « Jane Doe » / / defaultText) ;
    

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   Firefox OS
*   iOS
*   Windows Phone 7 et 8
*   Windows 8
*   Windows

### Quirks Android

*   Android prend en charge un maximum de trois boutons et ignore plus que cela.

*   Sur Android 3.0 et versions ultérieures, les boutons sont affichés dans l'ordre inverse pour les appareils qui utilisent le thème Holo.

### Bizarreries de Windows

*   Sous Windows, dialogue d'invite est basé sur html en raison de l'absence de ces api native.

### Firefox OS Quirks :

Les deux indigènes bloquant `window.prompt()` et non-bloquante `navigator.notification.prompt()` sont disponibles.

## navigator.notification.beep

Le dispositif joue un bip sonore.

    Navigator.notification.Beep(Times) ;
    

*   **temps**: le nombre de fois répéter le bip. *(Nombre)*

### Exemple

    Deux bips !
    Navigator.notification.Beep(2) ;
    

### Plates-formes prises en charge

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   iOS
*   Paciarelli
*   Windows Phone 7 et 8
*   Windows 8

### Amazon Fire OS Quirks

*   Amazon Fire OS joue la valeur par défaut le **Son de Notification** spécifié sous le panneau **d'affichage des réglages/& Sound** .

### Quirks Android

*   Android joue la **sonnerie de Notification** spécifié sous le panneau des **réglages/son et affichage** de valeur par défaut.

### Windows Phone 7 et 8 Quirks

*   S'appuie sur un fichier générique bip de la distribution de Cordova.

### Bizarreries de paciarelli

*   Paciarelli implémente les bips en lisant un fichier audio via les médias API.

*   Le fichier sonore doit être court, doit se trouver dans un `sounds` sous-répertoire du répertoire racine de l'application et doit être nommé`beep.wav`.
