# Boreal Payphone Robbery

A store robbery that starts with a call from a payphone — with a dynamic clerk
threat system, a police dispatch with late-join, a fence and a trash-search
side activity. ESX & QBCore.

## How it plays

1. The robber dials a **payphone** (`ox_target`) and enters the dial code.
2. They head to the assigned store and **threaten the clerk** at gunpoint.
3. A **panic meter** rises if the clerk isn't kept calm — killing too early means
   no loot. Keep them calm while they pack the bag.
4. The robber **flees** the search radius; once outside, **live GPS** tracking
   starts for the police.
5. Sell the dirty-money bag to the **fence** (open only during its time window).

## Requirements

- OneSync, `ox_target`, ESX Legacy or QBCore
- Optional: `ox_lib`, and **Boreal Codeforge - Core** (for the in-game editor & progression)

## Installation

1. Put `boreal_payphone_robbery` into `resources` and `ensure` it (after `boreal_core` if used).
2. Add the **items** (see below).
3. Configure `config.lua` (or use the in-game editor with Core).

## Items

The script uses two items by default: `leere_tuete` (empty bag) and
`tuete_schwarzgeld` (dirty-money bag).

!!! info "Items are not bundled"
    The resource does **not** ship item definitions or images — add the two items
    to your own inventory system. This keeps you in full control of icons, weights
    and metadata.

- **ESX:** add two usable items with these names to your inventory/database.
- **QBCore:** add two entries to `qb-core/shared/items.lua`.
- **ox_inventory:** add two entries to `ox_inventory/data/items.lua`.
- Provide your own item images in your inventory's image folder.

**Reuse existing items instead:** rename them via `Config.Payphone.bagItem` /
`rewardItem` and `Config.Fence.sellItem` to point at items you already have.

## Configuration overview (`config.lua`)

| Section | Key options |
|---|---|
| **General** | `Config.Language`, `Config.Framework` (auto), `Config.MinimumPolice`, `Config.PoliceJobs` |
| **Config.Payphone** | `cooldown`, `cost`, `dialCode`, `cancelCode`, `image`, `packTime`, `killThreshold`, `headstartTime`, `bagItem`, `rewardItem`, flee settings (`minFleeDistance`, `fleeTimer`, `maxFleeTime`) |
| **Config.ThreatSystem** | `aimDistance`, `panicRate`, `calmRate`, `panicThreshold` |
| **Config.Dispatch** | `maxResponseTeam`, `inviteTimeout`, blip styles |
| **Config.Fence** | `enabled`, `sellItem`, `sellPriceMin/Max`, `sellDuration`, `schedule` (time window) |
| **Config.TrashSearch** | `enabled`, `cooldown`, chances (`chanceNothing/Bag/Cash`), `cashMin/Max` |
| **Config.Bust** | cop "check suspect" `duration`, `distance` |
| **Config.Money** | ESX/QB black-money account & mode |
| **Config.FallbackStores** | stores used when no external store resource is present |

## Police experience

- A **dispatch invite** goes out to free officers (team slots + countdown).
- Press **F11** to toggle the cursor and accept/decline.
- **Late-join inbox:** if an officer misses or declines the invite, the call
  moves to a small inbox panel — they can still **join later** while slots are free.
- Static crime-scene blip → **live GPS** once the suspect flees. Officers can
  "check a suspect" (bust) within range.

## In-game editor (`/pr_settings`)

With **Boreal Core** running, admins can configure most options live:

```
/pr_settings
```

Requires the ACE permission `payphone.admin`:

```cfg
add_ace group.admin payphone.admin allow
```

> Without Boreal Core the editor is disabled — configure via `config.lua` instead.

## Troubleshooting

- **`/pr_settings` does nothing** → Boreal Core must be running **and** you need
  the `payphone.admin` ACE.
- **Item not removed at the fence / no item required** → turn **Debug** and
  **Debug Bypass Items** OFF (test options).
- **Fence NPC not there** → it's only visible during its `Config.Fence.schedule`
  time window.
- **"No store available"** → not enough police online (`Config.MinimumPolice`).
- **Editor saved a wrong/blank value** → make sure you're on the latest version
  (1.0.1+).
