# Boreal Codeforge - Core

A lightweight admin dashboard and framework that ties the Boreal robbery
resources together: addon registry, player progression and shared helpers.

## What it does

- **Admin dashboard** (`/boreal_core`) — installed Boreal addons appear here automatically.
- **Player progression** — reputation, progress and cooldowns, saved server-side.
- **Cross-addon global cooldowns** — players can't spam multiple robberies at once.
- **Shared exports** — player, money, item and police helpers for addons.

## Requirements

- FiveM server with OneSync
- ESX Legacy **or** QBCore

## Installation

1. Put `boreal_core` into your `resources` folder.
2. In `server.cfg`, ensure it **before** the addon resources:
   ```cfg
   ensure boreal_core
   ```
3. Set your framework in `config.lua` (Core uses a manual setting):
   ```lua
   Config.Framework = "ESX" -- "ESX" or "QBCore"
   ```

## Configuration (`config.lua`)

| Option | Description |
|---|---|
| `Config.Framework` | `"ESX"` or `"QBCore"` |
| `Config.Language` | `"en"` or `"de"` (dashboard language) |
| `Config.PoliceJobs` | Jobs treated as police (shared by all addons) |
| `Config.UseAcePermission` | `false` = anyone can open the dashboard (dev), `true` = ACE only |
| `Config.AcePermission` | ACE object checked when `UseAcePermission = true` |
| `Config.Dashboard.title` | Dashboard header text |

## The dashboard

Open it in-game with:

```
/boreal_core
```

For a live server, restrict access:

```lua
Config.UseAcePermission = true
Config.AcePermission    = "command.boreal_core"
```
```cfg
add_ace group.admin command.boreal_core allow
```

## Addons & player data

- Compatible Boreal addons **register themselves automatically** when both
  resources run — in any start order.
- Player data is stored in the `playerdata/` folder (one JSON per player). Keep
  this folder; it must stay writable.
- Building your own addon? The integration/export API is available for
  developers — contact us.

## Troubleshooting

- **Dashboard won't open** → with `UseAcePermission = true`, make sure your
  player has the ACE (`add_ace ... command.boreal_core allow`). Set it to
  `false` to test.
- **Addon not showing** → ensure both resources are started and check the
  console for a "registered" line.
