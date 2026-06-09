# Boreal Payphone Robbery

Ein Ladenraub, der mit einem Anruf an einer Telefonzelle beginnt — mit
dynamischem Verkäufer-Bedrohungs-System, Polizei-Dispatch mit Late-Join, Hehler
und Mülltonnen-Durchsuchen als Nebenaktivität. ESX & QBCore.

## Spielablauf

1. Der Räuber wählt an einer **Telefonzelle** (`ox_target`) den Wahl-Code.
2. Er geht zum zugewiesenen Laden und **bedroht den Verkäufer** mit der Waffe.
3. Eine **Panik-Anzeige** steigt, wenn der Verkäufer nicht ruhig gehalten wird —
   zu früh töten = keine Beute. Ruhig halten, während er die Tüte packt.
4. Der Räuber **flieht** aus dem Fahndungsradius; sobald draußen, startet das
   **Live-GPS** für die Polizei.
5. Die Schwarzgeld-Tüte beim **Hehler** verkaufen (nur im Zeitfenster geöffnet).

## Voraussetzungen

- OneSync, `ox_target`, ESX Legacy oder QBCore
- Optional: `ox_lib` und **Boreal Codeforge - Core** (für In-Game-Editor & Fortschritt)

## Installation

1. `boreal_payphone_robbery` in `resources` legen und `ensure`n (nach `boreal_core`, falls genutzt).
2. Die **Items** hinzufügen (siehe unten).
3. `config.lua` konfigurieren (oder den In-Game-Editor mit Core nutzen).

## Items

Das Script nutzt standardmäßig zwei Items: `leere_tuete` (leere Tüte) und
`tuete_schwarzgeld` (Schwarzgeld-Tüte).

!!! info "Items sind nicht enthalten"
    Die Resource liefert **keine** Item-Definitionen oder -Bilder mit — lege die
    beiden Items in deinem eigenen Inventarsystem an. So behältst du volle
    Kontrolle über Icons, Gewichte und Metadaten.

- **ESX:** zwei benutzbare Items mit diesen Namen in deiner Inventar-/Datenbank anlegen.
- **QBCore:** zwei Einträge in `qb-core/shared/items.lua` ergänzen.
- **ox_inventory:** zwei Einträge in `ox_inventory/data/items.lua` ergänzen.
- Eigene Item-Bilder in den Bilder-Ordner deines Inventars legen.

**Stattdessen vorhandene Items nutzen:** über `Config.Payphone.bagItem` /
`rewardItem` und `Config.Fence.sellItem` auf Items umbiegen, die du schon hast.

## Anpassung (Branding & Bilder)

Die Payphone-UI-Bilder bleiben **offen und editierbar** (escrow-ignored) – so
passt du das Script an dein Server-Branding an. Ein eventuelles Logo steckt in
diesen Bildern – tausch einfach das Bild, um das Branding zu ändern.

- `html/telefonzelle.png` — Telefonzellen-Design **1**
- `html/telefonzelle2.png` — Telefonzellen-Design **2**

**Bestehendes Design austauschen** (am einfachsten):

1. Datei in `html/` durch dein eigenes Bild ersetzen – **gleicher Dateiname** (PNG empfohlen).
2. Design im Spiel über `/pr_settings` → *Telefonzelle → Design* wählen, oder in der `config.lua`:
   ```lua
   Config.Payphone.image = "telefonzelle.png" -- oder "telefonzelle2.png"
   ```
3. Resource neu starten.

**Komplett neues Design** (eigener Dateiname): `mydesign.png` in `html/` legen,
in der `fxmanifest.lua` **sowohl** im `files {}`- als auch im `escrow_ignore`-Block
ergänzen, dann `Config.Payphone.image = "mydesign.png"` setzen.

## Konfigurations-Überblick (`config.lua`)

| Bereich | Wichtige Optionen |
|---|---|
| **Allgemein** | `Config.Language`, `Config.Framework` (auto), `Config.MinimumPolice`, `Config.PoliceJobs` |
| **Config.Payphone** | `cooldown`, `cost`, `dialCode`, `cancelCode`, `image`, `packTime`, `killThreshold`, `headstartTime`, `bagItem`, `rewardItem`, Flucht-Werte (`minFleeDistance`, `fleeTimer`, `maxFleeTime`) |
| **Config.ThreatSystem** | `aimDistance`, `panicRate`, `calmRate`, `panicThreshold` |
| **Config.Dispatch** | `maxResponseTeam`, `inviteTimeout`, Blip-Stile |
| **Config.Fence** | `enabled`, `sellItem`, `sellPriceMin/Max`, `sellDuration`, `schedule` (Zeitfenster) |
| **Config.TrashSearch** | `enabled`, `cooldown`, Chancen (`chanceNothing/Bag/Cash`), `cashMin/Max` |
| **Config.Bust** | Cop-„Verdächtigen kontrollieren" `duration`, `distance` |
| **Config.Money** | ESX/QB-Schwarzgeld-Konto & -Modus |
| **Config.FallbackStores** | Läden, wenn keine externe Store-Resource vorhanden ist |

## Polizei-Erlebnis

- Ein **Dispatch-Invite** geht an freie Beamte (Team-Slots + Countdown).
- **F11** schaltet den Cursor um, um anzunehmen/abzulehnen.
- **Late-Join-Inbox:** Verpasst/ablehnt ein Beamter den Invite, wandert der
  Einsatz in ein kleines Inbox-Panel — er kann **später beitreten**, solange
  Plätze frei sind.
- Statischer Tatort-Blip → **Live-GPS**, sobald der Täter flieht. Beamte können
  in Reichweite „einen Verdächtigen kontrollieren" (Festnahme).

## In-Game-Editor (`/pr_settings`)

Mit laufendem **Boreal Core** können Admins die meisten Optionen live einstellen:

```
/pr_settings
```

Benötigt die ACE-Permission `payphone.admin`:

```cfg
add_ace group.admin payphone.admin allow
```

> Ohne Boreal Core ist der Editor deaktiviert — dann über die `config.lua` konfigurieren.

## Fehlerbehebung

- **`/pr_settings` tut nichts** → Boreal Core muss laufen **und** du brauchst die
  `payphone.admin`-ACE.
- **Item wird beim Hehler nicht abgezogen / kein Item nötig** → **Debug** und
  **Debug Bypass Items** ausschalten (Test-Optionen).
- **Hehler-NPC nicht da** → nur im Zeitfenster `Config.Fence.schedule` sichtbar.
- **„Kein Laden verfügbar"** → nicht genug Polizei online (`Config.MinimumPolice`).
- **Editor speichert falschen/leeren Wert** → sicherstellen, dass du auf der
  neuesten Version bist (1.0.1+).
