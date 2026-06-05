# FAQ

Häufige Fragen zu den Boreal-Codeforge-Resourcen.

## Allgemein

??? question "Welche Frameworks werden unterstützt?"
    ESX Legacy und QBCore. Payphone Robbery erkennt das Framework automatisch;
    Boreal Core nutzt die manuelle Einstellung `Config.Framework`.

??? question "Brauche ich Boreal Core für die anderen Scripte?"
    Nein — jedes Raub-Script läuft eigenständig über die `config.lua`. Boreal Core
    ist optional, aber empfohlen: es bringt das **Admin-Dashboard**, die
    **In-Game-Editoren**, Spieler-Fortschritt und gemeinsame Cooldowns.

??? question "Sind die Scripte escrow-geschützt?"
    Ja, sie werden Cfx.re-Asset-Escrow-ready ausgeliefert. `config.lua`, Locale,
    Readme und Install-Templates bleiben **offen und editierbar**; Kernlogik und UI
    sind verschlüsselt. Beim Upload musst du nichts manuell auswählen.

??? question "Kann ich die Sprache ändern?"
    Ja. `Config.Language = "en"` oder `"de"` in der `config.lua` setzen. Das
    schaltet **alles** um — Notifications, UI, Quest-Tracker und Editoren.
    Standard ist Englisch.

??? question "Sind Abhängigkeiten enthalten?"
    Du brauchst OneSync, `ox_target` und ESX oder QBCore. `ox_lib` ist optional
    (schönere Notifications/Progressbars). Diese sind kostenlos und nicht enthalten.

## Installation

??? question "Welche Ladereihenfolge?"
    `ensure boreal_core` **vor** allen Addon-Resourcen (z. B.
    `boreal_payphone_robbery`). Ansonsten ist die Reihenfolge egal — Addons
    registrieren sich selbst.

??? question "Beim Upload kommt \"unexpected symbol near '['\"."
    Die Item-Snippets im `install/`-Ordner sind **Templates**, kein lauffähiges
    Lua. Sie enden auf `.txt`, damit Escrow sie nicht kompiliert. Inhalt in deine
    Inventar-Dateien kopieren — nicht `ensure`n.

??? question "Wo füge ich die Items hinzu?"
    Templates liegen im `install/`-Ordner: SQL für ESX, `qb_items.txt` für QBCore,
    `items.txt` für ox_inventory. Die Item-Bilder zusätzlich in den Bilder-Ordner
    deines Inventars kopieren.

## Nutzung & Berechtigungen

??? question "`/pr_settings` (der Editor) tut nichts."
    Zwei Voraussetzungen: **Boreal Core muss laufen**, und dein Spieler braucht die
    `payphone.admin`-ACE:
    ```cfg
    add_ace group.admin payphone.admin allow
    ```
    Ohne Boreal Core ist der Editor bewusst deaktiviert — dann über `config.lua` einstellen.

??? question "Dashboard / Editor öffnet nicht, obwohl ich Admin bin."
    `IsPlayerAceAllowed` muss für deinen Identifier wirklich greifen. Stelle sicher,
    dass die `add_ace`-Zeile in der `server.cfg` steht und deine Gruppe stimmt. Zum
    Testen `UseAcePermission = false` setzen, dann wieder aktivieren.

??? question "Ein Raub startet nicht — \"Kein Laden verfügbar\"."
    Es sind nicht genug Polizisten online. `Config.MinimumPolice` senken oder mehr
    Cops in den Dienst holen.

## Gameplay

??? question "Der Verkäufer stirbt und ich bekomme keine Beute."
    Tötest du den Verkäufer unter `killThreshold` (Standard 60 % eingepackt), gibt
    es keine Beute und die Cops werden alarmiert. Halte ihn ruhig (anvisieren),
    während er packt.

??? question "Der Hehler ist nicht da."
    Der Hehler ist nur in seinem Zeitfenster sichtbar (`Config.Fence.schedule`,
    Standard 19:00–23:59). Passe die Stunden an, wenn er immer offen sein soll.

??? question "Beim Verkauf an den Hehler wird das Item nicht abgezogen."
    Schalte **Debug** und **Debug Bypass Items** in der `config.lua` AUS — das sind
    Test-Optionen, die die Item-Logik überspringen.

## Support & Lizenz

??? question "Wie bekomme ich Support?"
    Eröffne ein Ticket in unserem Discord. Gib an: Framework,
    Server-Artifact-Version, die Konsolen-Fehlermeldung und die relevanten
    `config.lua`-Werte.

??? question "Darf ich das auf mehreren Servern nutzen?"
    Jeder Kauf ist gemäß den Tebex-/Cfx-Bedingungen lizenziert. Prüfe die Lizenz
    des Produkts oder frag uns, bevor du auf mehreren Servern deployst.

??? question "Wird es Updates geben?"
    Ja. Updates kommen über deinen Tebex-Kauf. Sichere vorher deine `config.lua`
    (und `settings.json`, falls du den Editor genutzt hast).
