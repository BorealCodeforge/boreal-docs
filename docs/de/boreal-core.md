# Boreal Codeforge - Core

Ein schlankes Admin-Dashboard und Framework, das die Boreal-Raub-Resourcen
verbindet: Addon-Registry, Spieler-Fortschritt und gemeinsame Helfer.

## Was es macht

- **Admin-Dashboard** (`/boreal_core`) — installierte Boreal-Addons erscheinen hier automatisch.
- **Spieler-Fortschritt** — Reputation, Progress und Cooldowns, server-seitig gespeichert.
- **Übergreifende Cooldowns** — Spieler können nicht mehrere Raube gleichzeitig spammen.
- **Shared Exports** — Player-, Geld-, Item- und Polizei-Helfer für Addons.

## Voraussetzungen

- FiveM-Server mit OneSync
- ESX Legacy **oder** QBCore

## Installation

1. `boreal_core` in den `resources`-Ordner legen.
2. In der `server.cfg` **vor** den Addon-Resourcen ensuren:
   ```cfg
   ensure boreal_core
   ```
3. Framework in der `config.lua` setzen (Core nutzt eine manuelle Einstellung):
   ```lua
   Config.Framework = "ESX" -- "ESX" oder "QBCore"
   ```

## Konfiguration (`config.lua`)

| Option | Beschreibung |
|---|---|
| `Config.Framework` | `"ESX"` oder `"QBCore"` |
| `Config.Language` | `"en"` oder `"de"` (Dashboard-Sprache) |
| `Config.PoliceJobs` | Jobs, die als Polizei gelten (von allen Addons genutzt) |
| `Config.UseAcePermission` | `false` = jeder darf das Dashboard öffnen (Dev), `true` = nur ACE |
| `Config.AcePermission` | ACE-Objekt, das bei `UseAcePermission = true` geprüft wird |
| `Config.Dashboard.title` | Header-Text des Dashboards |

## Das Dashboard

Im Spiel öffnen mit:

```
/boreal_core
```

Für einen Live-Server den Zugriff einschränken:

```lua
Config.UseAcePermission = true
Config.AcePermission    = "command.boreal_core"
```
```cfg
add_ace group.admin command.boreal_core allow
```

## Addons & Spielerdaten

- Kompatible Boreal-Addons **registrieren sich automatisch**, sobald beide
  Resourcen laufen — in beliebiger Startreihenfolge.
- Spielerdaten liegen im Ordner `playerdata/` (eine JSON pro Spieler). Diesen
  Ordner behalten; er muss beschreibbar bleiben.
- Eigenes Addon bauen? Die Integrations-/Export-API gibt's für Entwickler —
  melde dich bei uns.

## Fehlerbehebung

- **Dashboard öffnet nicht** → bei `UseAcePermission = true` sicherstellen, dass
  dein Spieler die ACE hat (`add_ace ... command.boreal_core allow`). Zum Testen
  auf `false` setzen.
- **Addon erscheint nicht** → beide Resourcen gestartet? Konsole auf eine
  „registered"-Zeile prüfen.
