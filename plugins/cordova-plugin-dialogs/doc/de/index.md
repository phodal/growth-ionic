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

Dieses Plugin ermöglicht den Zugriff auf einige native Dialog-UI-Elemente über eine globale `navigator.notification`-Objekt.

Obwohl das Objekt mit der globalen Gültigkeitsbereich `navigator` verbunden ist, steht es nicht bis nach dem `Deviceready`-Ereignis.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.notification);
    }
    

## Installation

    cordova plugin add cordova-plugin-dialogs
    

## Methoden

*   `navigator.notification.alert`
*   `navigator.notification.confirm`
*   `navigator.notification.prompt`
*   `navigator.notification.beep`

## navigator.notification.alert

Zeigt eine benutzerdefinierte Warnung oder Dialogfeld Feld. Die meisten Implementierungen von Cordova ein native Dialogfeld für dieses Feature verwenden, jedoch einige Plattformen des Browsers-`alert`-Funktion, die in der Regel weniger anpassbar ist.

    navigator.notification.alert(message, alertCallback, [title], [buttonName])
    

*   **Nachricht**: Dialogfeld Nachricht. *(String)*

*   **AlertCallback**: Callback aufgerufen wird, wenn Warnungs-Dialogfeld geschlossen wird. *(Funktion)*

*   **Titel**: Dialog "Titel". *(String)* (Optional, Standard ist`Alert`)

*   **ButtonName**: Name der Schaltfläche. *(String)* (Optional, Standard ist`OK`)

### Beispiel

    function alertDismissed() {
        // do something
    }
    
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    

### Unterstützte Plattformen

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 und 8
*   Windows 8
*   Windows

### Windows Phone 7 und 8 Eigenarten

*   Es gibt keine eingebaute Datenbanksuchroutine-Warnung, aber Sie können binden, wie folgt zu nennen `alert()` im globalen Gültigkeitsbereich:
    
        window.alert = navigator.notification.alert;
        

*   Beide `alert` und `confirm` sind nicht blockierende Aufrufe, die Ergebnisse davon nur asynchron sind.

### Firefox OS Macken:

Native blockierenden `window.alert()` und nicht-blockierende `navigator.notification.alert()` zur Verfügung.

### BlackBerry 10 Macken

`navigator.notification.alert ('Text', Rückruf, 'Titel', 'Text')` Callback-Parameter wird die Zahl 1 übergeben.

## navigator.notification.confirm

Zeigt das Dialogfeld anpassbare Bestätigung.

    navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
    

*   **Nachricht**: Dialogfeld Nachricht. *(String)*

*   **ConfirmCallback**: Callback aufgerufen wird, mit Index gedrückt (1, 2 oder 3) oder wenn das Dialogfeld geschlossen wird, ohne einen Tastendruck (0). *(Funktion)*

*   **Titel**: Dialog "Titel". *(String)* (Optional, Standard ist`Confirm`)

*   **ButtonLabels**: Array von Zeichenfolgen, die Schaltflächenbezeichnungen angeben. *(Array)* (Optional, Standard ist [ `OK,Cancel` ])

### confirmCallback

Die `confirmCallback` wird ausgeführt, wenn der Benutzer eine der Schaltflächen im Dialogfeld zur Bestätigung drückt.

Der Rückruf dauert das Argument `buttonIndex` *(Anzahl)*, die der Index der Schaltfläche gedrückt ist. Beachten Sie, dass der Index 1-basierte Indizierung, sodass der Wert `1`, `2`, `3` usw. ist.

### Beispiel

    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );
    

### Unterstützte Plattformen

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   Firefox OS
*   iOS
*   Tizen
*   Windows Phone 7 und 8
*   Windows 8
*   Windows

### Windows Phone 7 und 8 Eigenarten

*   Es gibt keine integrierte Browser-Funktion für `window.confirm` , aber Sie können es binden, indem Sie zuweisen:
    
        window.confirm = navigator.notification.confirm;
        

*   Aufrufe von `alert` und `confirm` sind nicht blockierend, so dass das Ergebnis nur asynchron zur Verfügung steht.

### Windows-Eigenheiten

*   Auf Windows8/8.1 kann nicht mehr als drei Schaltflächen MessageDialog-Instanz hinzu.

*   Auf Windows Phone 8.1 ist es nicht möglich, Dialog mit mehr als zwei Knöpfen zeigen.

### Firefox OS Macken:

Native blockierenden `window.confirm()` und nicht-blockierende `navigator.notification.confirm()` zur Verfügung.

## navigator.notification.prompt

Zeigt eine native Dialogfeld, das mehr als `Prompt`-Funktion des Browsers anpassbar ist.

    navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])
    

*   **Nachricht**: Dialogfeld Nachricht. *(String)*

*   **promptCallback**: Callback aufgerufen wird, mit Index gedrückt (1, 2 oder 3) oder wenn das Dialogfeld geschlossen wird, ohne einen Tastendruck (0). *(Funktion)*

*   **title**: Dialog Title *(String)* (Optional, Standard ist `Prompt`)

*   **buttonLabels**: Array von Zeichenfolgen angeben Schaltfläche Etiketten *(Array)* (Optional, Standard ist `["OK", "Abbrechen"]`)

*   **defaultText**: Standard-Textbox Eingabewert (`String`) (Optional, Standard: leere Zeichenfolge)

### promptCallback

Die `promptCallback` wird ausgeführt, wenn der Benutzer eine der Schaltflächen im Eingabedialogfeld drückt. `Des Objekts an den Rückruf übergeben` enthält die folgenden Eigenschaften:

*   **buttonIndex**: der Index der Schaltfläche gedrückt. *(Anzahl)* Beachten Sie, dass der Index 1-basierte Indizierung, sodass der Wert `1`, `2`, `3` usw. ist.

*   **input1**: in Eingabedialogfeld eingegebenen Text. *(String)*

### Beispiel

    function onPrompt(results) {
        alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    }
    
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );
    

### Unterstützte Plattformen

*   Amazon Fire OS
*   Android
*   Firefox OS
*   iOS
*   Windows Phone 7 und 8
*   Windows 8
*   Windows

### Android Eigenarten

*   Android unterstützt maximal drei Schaltflächen und mehr als das ignoriert.

*   Auf Android 3.0 und höher, werden die Schaltflächen in umgekehrter Reihenfolge für Geräte angezeigt, die das Holo-Design verwenden.

### Windows-Eigenheiten

*   Unter Windows ist Prompt Dialogfeld html-basierten mangels solcher native api.

### Firefox OS Macken:

Native blockierenden `window.prompt()` und nicht-blockierende `navigator.notification.prompt()` zur Verfügung.

## navigator.notification.beep

Das Gerät spielt einen Signalton sound.

    navigator.notification.beep(times);
    

*   **times**: die Anzahl der Wiederholungen des Signaltons. *(Anzahl)*

### Beispiel

    // Beep twice!
    navigator.notification.beep(2);
    

### Unterstützte Plattformen

*   Amazon Fire OS
*   Android
*   BlackBerry 10
*   iOS
*   Tizen
*   Windows Phone 7 und 8
*   Windows 8

### Amazon Fire OS Macken

*   Amazon Fire OS spielt die Standardeinstellung **Akustische Benachrichtigung** unter **Einstellungen/Display & Sound** Bereich angegeben.

### Android Eigenarten

*   Android spielt die Standardeinstellung **Benachrichtigung Klingelton** unter **Einstellungen/Sound & Display**-Panel angegeben.

### Windows Phone 7 und 8 Eigenarten

*   Stützt sich auf eine generische Piepton-Datei aus der Cordova-Distribution.

### Tizen Macken

*   Tizen implementiert Signaltöne durch Abspielen einer Audiodatei über die Medien API.

*   Die Beep-Datei muss kurz sein, in einem `sounds`-Unterverzeichnis des Stammverzeichnisses der Anwendung befinden muss und muss den Namen `beep.wav`.
