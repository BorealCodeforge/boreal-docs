# Config Reference

Every option in `config.lua` for both resources, with its default and what it
does. Edit `config.lua` directly (it stays open under escrow), or use the in-game
editor where available.

!!! note "Lua gotcha"
    `0` is **truthy** in Lua. A value of `0` is a valid setting (e.g. `gpsDelayInside = 0`
    means "live"). Don't assume `0` disables an option — check the description.

---

## Boreal Core — `config.lua`

| Option | Default | Description |
|---|---|---|
| `Config.Framework` | `"ESX"` | `"ESX"` or `"QBCore"`. Core uses a manual setting (no auto-detect). |
| `Config.Language` | `"en"` | `"en"` or `"de"` — switches the dashboard UI. |
| `Config.PoliceJobs` | `{ "police", "sheriff" }` | Jobs treated as police; shared with all addons. |
| `Config.UseAcePermission` | `false` | `false` = anyone can open `/boreal_core` (dev). `true` = ACE only (live). |
| `Config.AcePermission` | `"command.boreal_core"` | ACE object checked when `UseAcePermission = true`. |
| `Config.Debug` | `false` | Extra console prints. |
| `Config.Dashboard.title` | `"Boreal Codeforge - Core"` | Brand text in the dashboard header (language-independent). |
| `Config.Locales` | — | `dashboard_subtitle` and `chat_suggestion` per language. Editable. |

```cfg
# Live server: lock the dashboard to admins
add_ace group.admin command.boreal_core allow
```

---

## Payphone Robbery — `config.lua`

### General

| Option | Default | Description |
|---|---|---|
| `Config.Framework` | `"auto"` | `"auto"`, `"ESX"` or `"QBCore"`. Auto detects `es_extended` / `qb-core`. |
| `Config.Language` | `"en"` | `"en"` / `"de"` — switches **all** texts (Lua + NUI/editor). |
| `Config.Ui.Title` | `"Payphone Robbery"` | NUI title. |
| `Config.MinimumPolice` | `2` | Minimum police online to start a job. |
| `Config.PoliceJobs` | `{ "police", "sheriff" }` | Jobs treated as police. |
| `Config.Debug` | `false` | Skips the police check, extra prints. **Off for production.** |
| `Config.DebugBypassItems` | `false` | Skips item requirement/removal (testing). **Off for production.** |

### Integrations

| Option | Default | Description |
|---|---|---|
| `Config.Integrations.Notify` | `"auto"` | `auto`, `ox_lib`, `esx`, `qbcore`, `native`. |
| `Config.Integrations.Progressbar` | `"auto"` | `auto`, `ox_lib`, `qbcore`, `wait`. |
| `Config.Integrations.StoreSource` | `"config"` | `config`, or `boreal_store_robbery` if that addon is owned. |

### Admin & logging

| Option | Default | Description |
|---|---|---|
| `Config.Admin.Mode` | `"ace"` | `ace`, `group`, `disabled` — how `/pr_settings` access is checked. |
| `Config.Admin.AcePermission` | `"payphone.admin"` | ACE object for the editor. |
| `Config.Admin.Groups` | `{ "admin", "god" }` | Groups allowed when `Mode = "group"`. |
| `Config.Logging.Enabled` | `false` | Discord webhook logging. |
| `Config.Logging.Webhook` | `""` | Webhook URL (leave empty if unused). |
| `Config.Logging.Username` | `"Boreal Payphone Robbery"` | Webhook bot name. |
| `Config.Logging.Color` | `3447003` | Embed colour (decimal). |

```cfg
# Editor access for admins
add_ace group.admin payphone.admin allow
```

### Money

| Option | Default | Description |
|---|---|---|
| `Config.Money.ESXBlackMoneyAccount` | `"black_money"` | ESX dirty-money account. |
| `Config.Money.QBBlackMoneyMode` | `"cash"` | `cash` or `item`. |
| `Config.Money.QBBlackMoneyAccount` | `"cash"` | QB account used when mode = cash. |
| `Config.Money.QBBlackMoneyItem` | `"markedbills"` | QB item used when mode = item. |
| `Config.Police.RequireQBDuty` | `true` | QBCore: require on-duty for police logic. |

### Payphone & robbery (`Config.Payphone`)

| Option | Default | Description |
|---|---|---|
| `enabled` | `true` | Master switch for the payphone interaction. |
| `cooldown` | `3600` | Seconds between calls (3600 = 60 min). |
| `interactDist` | `2.0` | ox_target distance. |
| `models` | phonebox props | Payphone prop models that get the target. |
| `cost` | `5000` | Cost per call (from bank). |
| `dialCode` | `"3114"` | Number to start a job. |
| `cancelCode` | `"0000"` | Number to cancel. |
| `image` | `"telefonzelle2.png"` | NUI background image. |
| `packTime` | `30` | Seconds the clerk takes to pack the bag. |
| `killThreshold` | `0.6` | Below this fill %, killing the clerk = no loot. |
| `headstartTime` | `15` | Seconds of head start before cops are alerted (at 100%). |
| `bagItem` | `"leere_tuete"` | Required item (empty bag). |
| `rewardItem` | `"tuete_schwarzgeld"` | Item the player receives. |
| `minFleeDistance` | `450` | Min distance from the store (m) before delivery. |
| `fleeTimer` | `60` | Seconds outside the radius before delivery is allowed. |
| `maxFleeTime` | `1800` | Max flee time (s); after this the job auto-completes. |
| `gpsDelayInside` | `0` | GPS update interval inside the radius (ms, `0` = live). |
| `gpsDelayOutside` | `5000` | GPS update interval outside (ms). |

### Threat system (`Config.ThreatSystem`)

| Option | Default | Description |
|---|---|---|
| `aimDistance` | `5.0` | Distance to aim at the clerk. |
| `panicRate` | `0.08` | Panic added per tick when **not** aimed at. |
| `calmRate` | `0.05` | Panic removed per tick when aimed at. |
| `panicThreshold` | `1.0` | Panic value that triggers the alarm. |
| `panicStart` | `0.0` | Starting panic value. |

### Dispatch (`Config.Dispatch`)

| Option | Default | Description |
|---|---|---|
| `maxResponseTeam` | `4` | Max cops per operation. |
| `inviteTimeout` | `60` | Seconds before the invite expires (then it moves to the late-join inbox). |
| `staticBlip` / `gpsBlip` / `lastKnownBlip` / `suspiciousBlip` | — | Blip sprite/colour/scale/flash/name. |

### Fence (`Config.Fence`)

| Option | Default | Description |
|---|---|---|
| `enabled` | `true` | Enable the fence NPC. |
| `coords` / `heading` / `pedModel` | — | Fallback fence position & ped. |
| `interactDist` | `2.5` | ox_target distance. |
| `sellItem` | `"tuete_schwarzgeld"` | Item sold to the fence. |
| `sellPriceMin` / `sellPriceMax` | `4500` / `8500` | Dirty-money payout range (full hundreds). |
| `sellDuration` | `5` | Progressbar duration (s). |
| `schedule.startHour`…`endMinute` | `19:00`–`23:59` | Time window the fence is visible. |
| `blipEnabled` | `false` | Show a fence blip on the map. |

### Trash search (`Config.TrashSearch`)

| Option | Default | Description |
|---|---|---|
| `enabled` | `true` | Enable searching bins. |
| `cooldown` | `1800` | Cooldown per bin (s). |
| `searchDuration` | `5` | Animation duration (s). |
| `chanceNothing` / `chanceBag` / `chanceCash` | `70` / `20` / `10` | Loot chances (must sum ≤ 100). |
| `bagItem` | `"leere_tuete"` | Bag item found. |
| `cashMin` / `cashMax` | `50` / `100` | Cash range ($). |

### Other

| Option | Default | Description |
|---|---|---|
| `Config.Bust.distance` / `duration` | `2.5` / `3` | Cop "check suspect" range & progressbar. |
| `Config.QuestTracker.title` | `"KASSENRAUB"` | Quest-tracker title (overridden by locale at runtime). |
| `Config.QuestTracker.titleColor` | `"#e0912b"` | Quest-tracker accent (Boreal orange). |
| `Config.FallbackStores` | 7 stores | Stores used when no external store resource is present. |
| `Config.Locales` | — | All gameplay/UI strings (DE/EN). Editable. |
