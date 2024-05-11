const fileName = "data.json";

/*
    TODO #1 Geben Sie den Text "Hello world!" auf der Konsole aus.

    1. Verwenden Sie das bereits bekannte console-Objekt, um den Text auszugeben.
    2. Wechseln Sie anschließend in die Kommandozeile und führen Sie den folgenden Befehl aus:
       node ./src/sandbox.js
 */
console.log("Hello world!");

/*
    TODO #2 Konfigurieren Sie npm so, dass Sie die Datei ./src/sandbox.js mit Node über einen Shortcut ausführen können

    1. Wechseln Sie in die Datei package.json. Fügen Sie dort an der Position ein Skript mit Namen "dev" ein, das
       folgendes ausführt:
       node ./src/sandbox.js
    2. Prüfen Sie, ob es funktioniert. Führen Sie den folgenden Befehl aus und kontrollieren Sie, ob der Text ausgegeben
       wird:
       npm run dev
 */

const person = {
    vorname: "Miriam",
    nachname: "Musterfrau"
};

/*
    TODO #3 Schreiben Sie das Objekt "person" im JSON-Format in die Datei data.json.

    1. Nutzen Sie das bereits bekannte JSON-Objekt, um das Javascript-Objekt in einen JSON-String umzuwandeln.
    2. Nutzen Sie das Modul "fs", um den JSON-String in die Datei data.json zu schreiben.
    3. Führen Sie den folgenden Befehl aus und prüfen Sie anschließend, ob die Datei data.json angelegt wurde und die
       Daten enthält:
       npm run dev
 */
const personJson = JSON.stringify(person);
const fs = require("fs");
fs.writeFileSync(fileName, personJson);

/*
    TODO #4 Lesen Sie die Daten aus der Datei data.json ein und geben Sie diese auf der Konsole aus.

    1. Nutzen Sie wieder das Modul "fs" und lesen Sie die Datei data.json aus, falls die Datei existiert. Andernfalls
       geben Sie einen Fehler auf der Konsole aus.
    2. Sofern die Datei existiert hat, erzeugen Sie aus den gelesenen Daten ein das Javascript-Objekt "neuePerson"
       und geben Sie es auf der Konsole aus.
    3. Führen Sie den folgenden Befehl aus und prüfen Sie, ob die Daten korrekt ausgegeben werden:
       npm run dev
    4. Ändern Sie testweise den Dateinamen bei der Prüfung, ob die Datei existiert. Verwenden Sie einen Namen, unter
       dem es keine Datei gibt. Führen Sie dann den folgenden Befehl aus und prüfen Sie, ob der Fehlertext ausgegeben
       wird.
       npm run dev
    5. Machen Sie Schritt 4 rückgängig. Führen Sie nun zu Beginn des Programms eine Konstante für den Dateinamen ein
       und verwenden Sie die Konstante anstatt den Dateinamen im Code.
    6. Löschen Sie die Datei über das Programm, sofern die Datei existiert hat. Verwenden Sie hierzu wieder das Modul
       "fs".
    7. Führen Sie den nachfolgenden Befehl aus und prüfen Sie, ob die Datei nach Ausführung nicht mehr existiert:
       npm run dev

 */
if(fs.existsSync(fileName)) {
    const neuePersonJson = fs.readFileSync("data.json").toString();
    const neuePerson = JSON.parse(neuePersonJson);
    console.log(neuePerson);
    fs.rmSync(fileName);
} else {
    console.error("Datei existiert nicht");
}
