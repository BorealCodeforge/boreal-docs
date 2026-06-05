# Erste Schritte

Diese Seite deckt alles ab, was für alle Boreal-Codeforge-Resourcen gilt. Für
Resource-spezifische Details siehe die jeweiligen Seiten.

## Voraussetzungen

- FiveM-Server mit aktiviertem **OneSync**
- **ESX Legacy** oder **QBCore**
- `ox_target` (für Resourcen mit Welt-Interaktionen, z. B. Payphone Robbery)
- Optional: `ox_lib` (schönere Notifications & Progressbars)

## Installation (allgemein)

1. Resource in den `resources`-Ordner entpacken (Ordnernamen beibehalten).
2. In die `server.cfg` eintragen:
   ```cfg
   ensure boreal_core
   ensure boreal_payphone_robbery
   ```
   > `boreal_core` **vor** den Addon-Resourcen laden.
3. `config.lua` öffnen und einstellen (Framework wird bei den Addons automatisch erkannt).
4. Server neu starten (oder Resource `ensure`n).

## Sprache (EN / DE)

Jede Resource ist vollständig zweisprachig. Sprache in der `config.lua` setzen:

```lua
Config.Language = "en" -- "en" oder "de"
```

Das schaltet **alle** Texte um: Notifications, UI, Quest-Tracker und Editoren.

## Asset Escrow

Alle Resourcen sind **Cfx.re-Asset-Escrow-fähig** ausgeliefert. Die
`fxmanifest.lua` listet bereits die Dateien, die **offen/editierbar** bleiben
(Config, Locale, Readme, Install-Templates, Laufzeitdaten). Kernlogik und UI
werden verschlüsselt — beim Upload musst du nichts manuell auswählen.

> Die `config.lua` und die darin enthaltene Locale kannst du jederzeit bearbeiten.

## Aktualisieren

1. Neueste Version über deinen Tebex-Kauf herunterladen.
2. **`config.lua` sichern** (und `settings.json`, falls du den In-Game-Editor genutzt hast).
3. Resource-Dateien ersetzen, dann deine Config zurückspielen.
4. Resource neu starten.

## Support

- Eröffne ein Ticket in unserem [Discord](https://discord.com/invite/QA7nnEF2Wr).
- Bitte angeben: Framework (ESX/QBCore), Server-Artifact-Version, die
  Konsolen-Fehlermeldung und die relevanten `config.lua`-Werte.

## Links

- 🛒 [Tebex Store](https://boreal-codeforge.tebex.io)
- 💬 [Support-Discord](https://discord.com/invite/QA7nnEF2Wr)
- ▶️ [YouTube](https://www.youtube.com/@BorealCodeforge-FiveMScripts)
