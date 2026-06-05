# Config-Referenz

Jede Option der `config.lua` beider Resourcen — mit Default und Erklärung.
Bearbeite die `config.lua` direkt (bleibt unter Escrow offen) oder nutze den
In-Game-Editor, wo verfügbar.

!!! note "Lua-Stolperfalle"
    `0` ist in Lua **truthy**. Ein Wert von `0` ist eine gültige Einstellung
    (z. B. `gpsDelayInside = 0` = „live"). `0` deaktiviert also nicht automatisch
    eine Option — siehe Beschreibung.

---

## Boreal Core — `config.lua`

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Framework` | `"ESX"` | `"ESX"` oder `"QBCore"`. Core nutzt eine manuelle Einstellung (keine Auto-Erkennung). |
| `Config.Language` | `"en"` | `"en"` oder `"de"` — schaltet das Dashboard-UI um. |
| `Config.PoliceJobs` | `{ "police", "sheriff" }` | Jobs, die als Polizei gelten; von allen Addons genutzt. |
| `Config.UseAcePermission` | `false` | `false` = jeder darf `/boreal_core` öffnen (Dev). `true` = nur ACE (Live). |
| `Config.AcePermission` | `"command.boreal_core"` | ACE-Objekt bei `UseAcePermission = true`. |
| `Config.Debug` | `false` | Extra-Konsolenausgaben. |
| `Config.Dashboard.title` | `"Boreal Codeforge - Core"` | Markentext im Dashboard-Header (sprachunabhängig). |
| `Config.Locales` | — | `dashboard_subtitle` und `chat_suggestion` je Sprache. Editierbar. |

```cfg
# Live-Server: Dashboard auf Admins beschränken
add_ace group.admin command.boreal_core allow
```

---

## Payphone Robbery — `config.lua`

### Allgemein

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Framework` | `"auto"` | `"auto"`, `"ESX"` oder `"QBCore"`. Auto erkennt `es_extended` / `qb-core`. |
| `Config.Language` | `"en"` | `"en"` / `"de"` — schaltet **alle** Texte um (Lua + NUI/Editor). |
| `Config.Ui.Title` | `"Payphone Robbery"` | NUI-Titel. |
| `Config.MinimumPolice` | `2` | Mindestanzahl Polizei online für Job-Start. |
| `Config.PoliceJobs` | `{ "police", "sheriff" }` | Jobs, die als Polizei gelten. |
| `Config.Debug` | `false` | Überspringt den Polizei-Check, Extra-Prints. **Für Produktion aus.** |
| `Config.DebugBypassItems` | `false` | Überspringt Item-Pflicht/-Abzug (Test). **Für Produktion aus.** |

### Integrationen

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Integrations.Notify` | `"auto"` | `auto`, `ox_lib`, `esx`, `qbcore`, `native`. |
| `Config.Integrations.Progressbar` | `"auto"` | `auto`, `ox_lib`, `qbcore`, `wait`. |
| `Config.Integrations.StoreSource` | `"config"` | `config`, oder `boreal_store_robbery` falls vorhanden. |

### Admin & Logging

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Admin.Mode` | `"ace"` | `ace`, `group`, `disabled` — wie der `/pr_settings`-Zugriff geprüft wird. |
| `Config.Admin.AcePermission` | `"payphone.admin"` | ACE-Objekt für den Editor. |
| `Config.Admin.Groups` | `{ "admin", "god" }` | Erlaubte Gruppen bei `Mode = "group"`. |
| `Config.Logging.Enabled` | `false` | Discord-Webhook-Logging. |
| `Config.Logging.Webhook` | `""` | Webhook-URL (leer lassen, wenn ungenutzt). |
| `Config.Logging.Username` | `"Boreal Payphone Robbery"` | Webhook-Bot-Name. |
| `Config.Logging.Color` | `3447003` | Embed-Farbe (dezimal). |

```cfg
# Editor-Zugriff für Admins
add_ace group.admin payphone.admin allow
```

### Geld

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Money.ESXBlackMoneyAccount` | `"black_money"` | ESX-Schwarzgeld-Konto. |
| `Config.Money.QBBlackMoneyMode` | `"cash"` | `cash` oder `item`. |
| `Config.Money.QBBlackMoneyAccount` | `"cash"` | QB-Konto bei Modus cash. |
| `Config.Money.QBBlackMoneyItem` | `"markedbills"` | QB-Item bei Modus item. |
| `Config.Police.RequireQBDuty` | `true` | QBCore: Dienst-Pflicht für Polizei-Logik. |

### Telefonzelle & Raub (`Config.Payphone`)

| Option | Default | Beschreibung |
|---|---|---|
| `enabled` | `true` | Hauptschalter der Telefonzellen-Interaktion. |
| `cooldown` | `3600` | Sekunden zwischen Anrufen (3600 = 60 Min). |
| `interactDist` | `2.0` | ox_target-Distanz. |
| `models` | Phonebox-Props | Telefonzellen-Models, die das Target bekommen. |
| `cost` | `5000` | Kosten pro Anruf (vom Bankkonto). |
| `dialCode` | `"3114"` | Nummer zum Starten. |
| `cancelCode` | `"0000"` | Nummer zum Abbrechen. |
| `image` | `"telefonzelle2.png"` | NUI-Hintergrundbild. |
| `packTime` | `30` | Sekunden, die der Verkäufer zum Einpacken braucht. |
| `killThreshold` | `0.6` | Unter diesem Füllstand: NPC-Kill = keine Beute. |
| `headstartTime` | `15` | Vorsprung-Sekunden bevor Cops alarmiert werden (bei 100 %). |
| `bagItem` | `"leere_tuete"` | Benötigtes Item (leere Tüte). |
| `rewardItem` | `"tuete_schwarzgeld"` | Item, das der Spieler erhält. |
| `minFleeDistance` | `450` | Mindestabstand zum Laden (m) vor Abgabe. |
| `fleeTimer` | `60` | Sekunden außerhalb des Radius bis Abgabe möglich. |
| `maxFleeTime` | `1800` | Max. Fluchtzeit (s); danach Job automatisch erledigt. |
| `gpsDelayInside` | `0` | GPS-Intervall im Radius (ms, `0` = live). |
| `gpsDelayOutside` | `5000` | GPS-Intervall außerhalb (ms). |

### Bedrohungs-System (`Config.ThreatSystem`)

| Option | Default | Beschreibung |
|---|---|---|
| `aimDistance` | `5.0` | Entfernung zum Anvisieren. |
| `panicRate` | `0.08` | Panik pro Tick, wenn **nicht** anvisiert. |
| `calmRate` | `0.05` | Panik-Abbau pro Tick, wenn anvisiert. |
| `panicThreshold` | `1.0` | Panik-Wert, der den Alarm auslöst. |
| `panicStart` | `0.0` | Start-Panik-Wert. |

### Dispatch (`Config.Dispatch`)

| Option | Default | Beschreibung |
|---|---|---|
| `maxResponseTeam` | `4` | Max. Cops pro Einsatz. |
| `inviteTimeout` | `60` | Sekunden bis der Invite verfällt (dann Late-Join-Inbox). |
| `staticBlip` / `gpsBlip` / `lastKnownBlip` / `suspiciousBlip` | — | Blip-Sprite/Farbe/Größe/Blinken/Name. |

### Hehler (`Config.Fence`)

| Option | Default | Beschreibung |
|---|---|---|
| `enabled` | `true` | Hehler-NPC aktivieren. |
| `coords` / `heading` / `pedModel` | — | Fallback-Position & Ped des Hehlers. |
| `interactDist` | `2.5` | ox_target-Distanz. |
| `sellItem` | `"tuete_schwarzgeld"` | Item, das verkauft wird. |
| `sellPriceMin` / `sellPriceMax` | `4500` / `8500` | Schwarzgeld-Auszahlung (volle Hunderter). |
| `sellDuration` | `5` | Progressbar-Dauer (s). |
| `schedule.startHour`…`endMinute` | `19:00`–`23:59` | Zeitfenster, in dem der Hehler sichtbar ist. |
| `blipEnabled` | `false` | Hehler-Blip auf der Karte. |

### Mülltonnen-Suche (`Config.TrashSearch`)

| Option | Default | Beschreibung |
|---|---|---|
| `enabled` | `true` | Durchsuchen von Tonnen aktivieren. |
| `cooldown` | `1800` | Cooldown pro Tonne (s). |
| `searchDuration` | `5` | Animationsdauer (s). |
| `chanceNothing` / `chanceBag` / `chanceCash` | `70` / `20` / `10` | Loot-Chancen (Summe ≤ 100). |
| `bagItem` | `"leere_tuete"` | Gefundenes Tüten-Item. |
| `cashMin` / `cashMax` | `50` / `100` | Bargeld-Spanne ($). |

### Sonstiges

| Option | Default | Beschreibung |
|---|---|---|
| `Config.Bust.distance` / `duration` | `2.5` / `3` | Cop-„Verdächtigen kontrollieren" Reichweite & Progressbar. |
| `Config.QuestTracker.title` | `"KASSENRAUB"` | Quest-Tracker-Titel (zur Laufzeit von der Locale überschrieben). |
| `Config.QuestTracker.titleColor` | `"#e0912b"` | Quest-Tracker-Akzent (Boreal-Orange). |
| `Config.FallbackStores` | 7 Läden | Läden, wenn keine externe Store-Resource vorhanden ist. |
| `Config.Locales` | — | Alle Gameplay-/UI-Texte (DE/EN). Editierbar. |
