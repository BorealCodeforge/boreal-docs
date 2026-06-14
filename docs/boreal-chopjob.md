# Boreal Chop Job

Steal vehicles, shake off the police GPS and chop them for parts — a full
vehicle-theft job with three difficulty tiers, hacking minigames, a part-by-part
dismantling system, a fence, an informant mechanic, group play and a police
dispatch with late-join. ESX & QBCore.

## How it plays

1. Talk to the **contractor** (boss) and pick a **difficulty** — Beginner,
   Advanced or Pro.
2. A **search area** is marked on your map. Find the target vehicle inside it.
3. **Hotwire** the car (lockpick + minigame). On higher tiers a **GPS tracker**
   goes live and the police can see you.
4. **Hack** the GPS to go dark (minigame). Passengers can hack too — bring an
   accomplice.
5. Bring the car to the **chop location**. Choose: hand it in **safely** for a
   quick payout, or **dismantle** it part-by-part for the full reward + bonus loot.
6. Sell the parts to the **fence** (open only during its time window), then
   **report back to the contractor** for your money. Payout scales with the
   vehicle's condition.

## Requirements

- OneSync, ESX Legacy or QBCore, `oxmysql`
- `ox_target` (used for the dismantling interaction)
- Optional: `ox_lib`, and **Boreal Codeforge - Core** (in-game editor, progression & global cooldown)

## Installation

1. Put `boreal_chopjob` into `resources` and `ensure` it (after `boreal_core` if used).
2. Start the server once — the **database tables are created automatically**
   (`Config.Database.AutoCreate`).
3. Add the **items** — or let the script **auto-insert** them on ESX
   (`Config.Items.AutoInsert`). See below.
4. Configure `config.lua` (or use the in-game editor with Core).

## Items

The job uses **tool items** to perform the work and **part items** as loot:

| Tool | Default name | Used for |
|---|---|---|
| Lockpick | `autodietrich` | Hotwiring (all tiers) |
| Hacking Tool | `hackingtool` | GPS hack (Advanced) |
| Hacking Laptop | `hackinglaptop` | GPS hack (Pro) |
| Toolkit | `werkzeugset` | Dismantling (Pro) |

Loot/part items (sold at the fence): `hochwertige_karosserieteile`,
`hochwertige_felgen`, `hochwertige_fahrzeugelektronik`.

!!! info "Auto-insert & SQL included"
    On **ESX** the items can be inserted automatically into the `items` table
    (`Config.Items.AutoInsert = true`). For **ox_inventory** / **QBCore** add the
    entries from the bundled `install/` files (`ox_inventory_items.txt`,
    `qb_items.txt`). Provide your own item images in your inventory's image folder.

**Reuse existing items instead:** point the names in `Config.Items.List`,
`Config.DismantleItems` and `Config.SellableItems` at items you already have.

## Difficulty tiers

| Tier | GPS tracker | Tools needed | Reward |
|---|---|---|---|
| **Beginner** | Expires on its own | Lockpick | Lowest |
| **Advanced** | Live — hack with Hacking Tool | Lockpick + Hacking Tool | Medium |
| **Pro** | Live — hack with Laptop, then dismantle | Lockpick + Laptop + Toolkit | Highest |

Each tier's vehicle pool, rewards, timers and minigame difficulty are defined in
`Config.Difficulties`.

## Customization (branding & images)

The dashboard logo is **open and editable** (escrow-ignored) — replace the file
to rebrand the UI:

- `html/logo.png` — logo shown in the dashboard header (keep the same filename, PNG recommended), then restart.

## Configuration overview (`config.lua`)

| Section | Key options |
|---|---|
| **General** | `Config.Language` (`de`/`en`), `Config.Framework` (auto), `Config.JobTimeout`, `Config.UseGlobalCooldown`, `Config.AllowCoopHack` |
| **Config.Admin** | `Mode` (auto/ace/group/disabled), `AcePermission`, `Groups` |
| **Config.Database** | `AutoCreate` (auto-create tables) |
| **Config.Items** | `AutoInsert`, `List` (tool items) |
| **Config.Integrations** | `Notify`, `Progressbar` (auto-detect ox_lib/ESX/QB) |
| **Config.Logging** | Discord webhook (or Boreal Core logging) |
| **Config.Difficulties** | per-tier vehicles, rewards, timers, minigames |
| **Config.HotwireSystem / MinigameDefaults** | hotwire & minigame tuning |
| **Config.ChopParts / DismantleItems / BonusParts** | dismantling parts & loot |
| **Config.SellableItems / BuyerSystem** | fence prices & opening window |
| **Config.VehicleCondition** | how damage scales the payout |
| **Config.InformantSystem** | informant spawn, bribe & police intel |
| **Config.DeliverySystem** | hand-in / report flow & deadline |
| **Config.PoliceJobs / MinimumPolice / PoliceResponseTeam / PoliceConfiscation** | police side |
| **Config.GroupSystem** | co-op group size & invites |
| **Config.AntiDespawn** | vehicle-gone handling (see below) |
| **Config.UnlockSystem** | progression-gated difficulties |

## Police experience

- A **dispatch invite** goes out to free officers (team slots + countdown).
- Press **F11** to toggle the cursor and accept/decline.
- **Late-join inbox:** missed or declined calls move to a small inbox panel —
  officers can still **join later** while slots are free.
- Static report blip → **live GPS** while the tracker is active. Officers can
  **confiscate** the vehicle within range, which fails the job.

## Vehicle persistence (Anti-Despawn)

While a job runs the chop vehicle is watched. If you simply stream it out (walk
too far), it is protected and re-resolved when you return — the job continues. If
the vehicle is **truly removed** (`/dv`, admin tool, another resource), the job
ends cleanly instead of respawning it (`Config.AntiDespawn`). A server-side
`Config.JobTimeout` is the final safety net for any orphaned job.

## In-game editor (`/cj_creator`)

With **Boreal Core** running, admins can configure NPCs, chop locations, vehicle
spawns and most settings **live** — no restart needed:

```
/cj_creator
```

Requires the ACE permission `chopjob.admin`:

```cfg
add_ace group.admin chopjob.admin allow
```

> Without Boreal Core the editor is disabled — configure via `config.lua` instead.
> `Config.Admin.Mode = "auto"` also accepts your framework's admin group, so the
> editor works out of the box for most setups.

## Troubleshooting

- **`/cj_creator` does nothing / editor empty** → Boreal Core must be running and
  you need admin rights (`chopjob.admin` ACE, framework admin group, or set
  `Config.Admin.Mode`).
- **Items not inserted** → on ESX set `Config.Items.AutoInsert = true` and restart;
  for ox/QB import the files in `install/`. Existing items are never overwritten.
- **"Not enough police online"** → raise/lower `Config.MinimumPolice`.
- **Fence NPC not there** → it only appears during its `Config.BuyerSystem` time window.
- **Vehicle respawned after `/dv`** → expected only if `Config.AntiDespawn` is set
  to keep the vehicle; the default ends the job on real removal.
- **Editor change not applied live** → make sure you're on the latest version.
