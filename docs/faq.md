# FAQ

Frequently asked questions about Boreal Codeforge resources.

## General

??? question "Which frameworks are supported?"
    ESX Legacy and QBCore. Payphone Robbery auto-detects the framework;
    Boreal Core uses a manual `Config.Framework` setting.

??? question "Do I need Boreal Core to run the other scripts?"
    No — each robbery script runs standalone via `config.lua`. Boreal Core is
    optional but recommended: it adds the **admin dashboard**, the **in-game
    editors**, player progression and shared cooldowns.

??? question "Are the scripts escrow-protected?"
    Yes, they ship Cfx.re Asset Escrow-ready. The `config.lua`, locale, readme
    and install templates stay **open and editable**; core logic and UI are
    encrypted. You don't need to select anything manually on upload.

??? question "Can I change the language?"
    Yes. Set `Config.Language = "en"` or `"de"` in `config.lua`. It switches
    **everything** — notifications, UI, quest tracker and editors. Default is English.

??? question "Are dependencies included?"
    You need OneSync, `ox_target`, and ESX or QBCore. `ox_lib` is optional (nicer
    notifications/progressbars). These are free and not bundled.

## Installation

??? question "What load order should I use?"
    `ensure boreal_core` **before** any addon resources (e.g.
    `boreal_payphone_robbery`). Start order otherwise doesn't matter — addons
    self-register.

??? question "I get \"unexpected symbol near '['\" on upload."
    The item snippets in `install/` are **templates**, not runnable Lua. They end
    in `.txt` so escrow doesn't try to compile them. Copy their contents into your
    inventory's files — don't `ensure` them.

??? question "Where do I add the items?"
    Templates are in the `install/` folder: SQL for ESX, `qb_items.txt` for QBCore,
    `items.txt` for ox_inventory. Copy the item images into your inventory's image folder too.

## Usage & permissions

??? question "`/pr_settings` (the editor) does nothing."
    Two requirements: **Boreal Core must be running**, and your player needs the
    `payphone.admin` ACE:
    ```cfg
    add_ace group.admin payphone.admin allow
    ```
    Without Boreal Core the editor is intentionally disabled — configure via `config.lua`.

??? question "The dashboard / editor won't open even though I'm admin."
    `IsPlayerAceAllowed` must actually resolve for your identifier. Make sure the
    `add_ace` line is in `server.cfg` and your group is correct. Set
    `UseAcePermission = false` to test, then re-enable.

??? question "A robbery won't start — \"No store available\"."
    Not enough police are online. Lower `Config.MinimumPolice` or bring more cops on duty.

## Gameplay

??? question "The clerk dies and I get no loot."
    Killing the clerk below `killThreshold` (default 60% packed) yields no loot and
    alerts the cops. Keep them calm (aim) while they pack.

??? question "The fence isn't there."
    The fence is only visible during its time window (`Config.Fence.schedule`,
    default 19:00–23:59). Adjust the hours if you want it always open.

??? question "The item isn't removed when I sell to the fence."
    Turn **Debug** and **Debug Bypass Items** OFF in `config.lua` — those are test
    options that skip item logic.

## Support & licensing

??? question "How do I get support?"
    Open a ticket in our Discord. Include: framework, server artifact version, the
    console error, and the relevant `config.lua` values.

??? question "Can I use this on multiple servers?"
    Each purchase is licensed per the Tebex/Cfx terms. Check the product's license
    or ask us before deploying to multiple servers.

??? question "Will there be updates?"
    Yes. Updates are delivered through your Tebex purchase. Back up your `config.lua`
    (and `settings.json` if you used the editor) before replacing files.
