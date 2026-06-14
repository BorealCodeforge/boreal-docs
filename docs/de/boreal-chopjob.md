# Boreal Chop Job

Stiehl Fahrzeuge, schüttle das Polizei-GPS ab und zerlege sie in Einzelteile —
ein vollständiger Fahrzeugdiebstahl-Job mit drei Schwierigkeitsstufen,
Hacking-Minispielen, einem teilebasierten Demontage-System, einem Hehler, einem
Informanten-Mechanik, Gruppenspiel und einer Polizei-Einsatzmeldung mit
Late-Join. ESX & QBCore.

## Spielablauf

1. Sprich mit dem **Auftraggeber** (Boss) und wähle eine **Schwierigkeit** —
   Anfänger, Fortgeschritten oder Profi.
2. Ein **Suchgebiet** wird auf deiner Karte markiert. Finde dort das Zielfahrzeug.
3. **Schließe das Auto kurz** (Autodietrich + Minispiel). Auf höheren Stufen geht
   ein **GPS-Tracker** live und die Polizei sieht dich.
4. **Hacke** das GPS, um unsichtbar zu werden (Minispiel). Auch Beifahrer können
   hacken — hol dir einen Komplizen.
5. Bring das Auto zum **Chop-Standort**. Wähle: **sicher abgeben** für eine
   schnelle Auszahlung, oder **zerlegen** für die volle Belohnung + Bonusteile.
6. Verkaufe die Teile beim **Hehler** (nur innerhalb seines Zeitfensters
   geöffnet) und **erstatte dem Auftraggeber Bericht** für dein Geld. Die
   Auszahlung richtet sich nach dem Fahrzeugzustand.

## Voraussetzungen

- OneSync, ESX Legacy oder QBCore, `oxmysql`
- `ox_target` (für die Demontage-Interaktion)
- Optional: `ox_lib` und **Boreal Codeforge - Core** (In-Game-Editor, Progression & globaler Cooldown)

## Installation

1. Lege `boreal_chopjob` in `resources` und `ensure` es (nach `boreal_core`, falls genutzt).
2. Starte den Server einmal — die **Datenbanktabellen werden automatisch erstellt**
   (`Config.Database.AutoCreate`).
3. Füge die **Items** hinzu — oder lass sie auf ESX **automatisch einfügen**
   (`Config.Items.AutoInsert`). Siehe unten.
4. Konfiguriere `config.lua` (oder nutze den In-Game-Editor mit Core).

## Items

Der Job nutzt **Werkzeug-Items** für die Arbeit und **Teile-Items** als Loot:

| Werkzeug | Standard-Name | Wofür |
|---|---|---|
| Autodietrich | `autodietrich` | Kurzschließen (alle Stufen) |
| Hacking-Tool | `hackingtool` | GPS-Hack (Fortgeschritten) |
| Hacking-Laptop | `hackinglaptop` | GPS-Hack (Profi) |
| Werkzeugset | `werkzeugset` | Demontage (Profi) |

Loot-/Teile-Items (Verkauf beim Hehler): `hochwertige_karosserieteile`,
`hochwertige_felgen`, `hochwertige_fahrzeugelektronik`.

!!! info "Auto-Insert & SQL enthalten"
    Auf **ESX** können die Items automatisch in die `items`-Tabelle eingefügt
    werden (`Config.Items.AutoInsert = true`). Für **ox_inventory** / **QBCore**
    nutze die mitgelieferten `install/`-Dateien (`ox_inventory_items.txt`,
    `qb_items.txt`). Eigene Item-Bilder kommen in den Image-Ordner deines Inventars.

**Bestehende Items wiederverwenden:** verweise die Namen in `Config.Items.List`,
`Config.DismantleItems` und `Config.SellableItems` auf Items, die du schon hast.

## Schwierigkeitsstufen

| Stufe | GPS-Tracker | Benötigte Werkzeuge | Belohnung |
|---|---|---|---|
| **Anfänger** | Erlischt von selbst | Autodietrich | Niedrig |
| **Fortgeschritten** | Live — hacken mit Hacking-Tool | Autodietrich + Hacking-Tool | Mittel |
| **Profi** | Live — hacken mit Laptop, dann zerlegen | Autodietrich + Laptop + Werkzeugset | Höchste |

Fahrzeug-Pool, Belohnungen, Timer und Minispiel-Schwierigkeit jeder Stufe werden
in `Config.Difficulties` definiert.

## Anpassung (Branding & Bilder)

Das Dashboard-Logo ist **offen und bearbeitbar** (escrow-ignoriert) — tausche die
Datei, um die UI zu rebranden:

- `html/logo.png` — Logo im Dashboard-Header (gleichen Dateinamen behalten, PNG empfohlen), danach Resource neu starten.

## Konfigurations-Überblick (`config.lua`)

| Sektion | Wichtige Optionen |
|---|---|
| **Allgemein** | `Config.Language` (`de`/`en`), `Config.Framework` (auto), `Config.JobTimeout`, `Config.UseGlobalCooldown`, `Config.AllowCoopHack` |
| **Config.Admin** | `Mode` (auto/ace/group/disabled), `AcePermission`, `Groups` |
| **Config.Database** | `AutoCreate` (Tabellen automatisch anlegen) |
| **Config.Items** | `AutoInsert`, `List` (Werkzeug-Items) |
| **Config.Integrations** | `Notify`, `Progressbar` (Auto-Erkennung ox_lib/ESX/QB) |
| **Config.Logging** | Discord-Webhook (oder Boreal-Core-Logging) |
| **Config.Difficulties** | Fahrzeuge, Belohnungen, Timer, Minispiele pro Stufe |
| **Config.HotwireSystem / MinigameDefaults** | Kurzschließen & Minispiel-Tuning |
| **Config.ChopParts / DismantleItems / BonusParts** | Demontage-Teile & Loot |
| **Config.SellableItems / BuyerSystem** | Hehler-Preise & Öffnungszeitfenster |
| **Config.VehicleCondition** | wie Schaden die Auszahlung beeinflusst |
| **Config.InformantSystem** | Informant-Spawn, Bestechung & Polizei-Intel |
| **Config.DeliverySystem** | Abgabe-/Bericht-Ablauf & Deadline |
| **Config.PoliceJobs / MinimumPolice / PoliceResponseTeam / PoliceConfiscation** | Polizei-Seite |
| **Config.GroupSystem** | Koop-Gruppengröße & Einladungen |
| **Config.AntiDespawn** | Umgang mit verschwundenem Fahrzeug (siehe unten) |
| **Config.UnlockSystem** | progressionsgesperrte Schwierigkeiten |

## Polizei-Erlebnis

- Eine **Einsatzmeldung** geht an freie Beamte (Team-Slots + Countdown).
- Drücke **F11**, um den Cursor umzuschalten und anzunehmen/abzulehnen.
- **Late-Join-Posteingang:** verpasste oder abgelehnte Einsätze wandern in ein
  kleines Inbox-Panel — Beamte können **später beitreten**, solange Slots frei sind.
- Statischer Melde-Blip → **Live-GPS**, solange der Tracker aktiv ist. Beamte
  können das Fahrzeug in Reichweite **beschlagnahmen**, was den Job scheitern lässt.

## Fahrzeug-Persistenz (Anti-Despawn)

Während eines Jobs wird das Chop-Fahrzeug überwacht. Streamst du es nur weg
(läufst zu weit), wird es geschützt und bei der Rückkehr wieder aufgelöst — der
Job läuft weiter. Wird das Fahrzeug **wirklich entfernt** (`/dv`, Admin-Tool,
andere Resource), endet der Job sauber, statt es neu zu spawnen
(`Config.AntiDespawn`). Ein serverseitiges `Config.JobTimeout` ist das letzte
Sicherheitsnetz für verwaiste Jobs.

## In-Game-Editor (`/cj_creator`)

Mit laufendem **Boreal Core** können Admins NPCs, Chop-Standorte,
Fahrzeug-Spawns und die meisten Einstellungen **live** konfigurieren — ohne
Neustart:

```
/cj_creator
```

Benötigt die ACE-Berechtigung `chopjob.admin`:

```cfg
add_ace group.admin chopjob.admin allow
```

> Ohne Boreal Core ist der Editor deaktiviert — konfiguriere dann über `config.lua`.
> `Config.Admin.Mode = "auto"` akzeptiert auch die Admin-Gruppe deines Frameworks,
> sodass der Editor bei den meisten Setups out-of-the-box funktioniert.

## Fehlerbehebung

- **`/cj_creator` tut nichts / Editor leer** → Boreal Core muss laufen und du
  brauchst Admin-Rechte (`chopjob.admin`-ACE, Framework-Admin-Gruppe, oder
  `Config.Admin.Mode` setzen).
- **Items nicht eingefügt** → auf ESX `Config.Items.AutoInsert = true` setzen und
  neu starten; für ox/QB die Dateien in `install/` importieren. Bestehende Items
  werden nie überschrieben.
- **"Nicht genug Polizisten online"** → `Config.MinimumPolice` anpassen.
- **Hehler-NPC nicht da** → er erscheint nur im Zeitfenster von `Config.BuyerSystem`.
- **Fahrzeug nach `/dv` respawnt** → nur erwartet, wenn `Config.AntiDespawn` das
  Fahrzeug behalten soll; standardmäßig endet der Job bei echter Entfernung.
- **Editor-Änderung greift nicht live** → stelle sicher, dass du auf der neuesten Version bist.
