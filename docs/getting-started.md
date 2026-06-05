# Getting Started

This page covers everything common to all Boreal Codeforge resources. For
resource-specific details, see the dedicated pages.

## Requirements

- A FiveM server with **OneSync** enabled
- **ESX Legacy** or **QBCore**
- `ox_target` (for resources that use world interactions, e.g. Payphone Robbery)
- Optional: `ox_lib` (nicer notifications & progress bars)

## Installation (general)

1. Unzip the resource into your `resources` folder (keep the folder name).
2. Add it to your `server.cfg`:
   ```cfg
   ensure boreal_core
   ensure boreal_payphone_robbery
   ```
   > Load **`boreal_core` before** the addon resources.
3. Open `config.lua` and set your options (framework is auto-detected on the addons).
4. Restart the server (or `ensure` the resource).

## Language (EN / DE)

Every resource is fully bilingual. Set the language in `config.lua`:

```lua
Config.Language = "en" -- "en" or "de"
```

This switches **all** texts: notifications, UI, quest tracker and editors.

## Asset Escrow

All resources ship ready for **Cfx.re Asset Escrow**. The `fxmanifest.lua`
already lists the files that stay **open and editable** (config, locale, readme,
install templates, runtime data). The core logic and UI are encrypted — you do
not need to select anything manually at upload.

> You can always edit `config.lua` and the locale inside it.

## Updating

1. Download the latest version from your Tebex purchase.
2. **Back up your `config.lua`** (and `settings.json` if you used the in-game editor).
3. Replace the resource files, then restore your config.
4. Restart the resource.

## Support

- Open a ticket in our Discord.
- Please include: framework (ESX/QBCore), server artifact version, the console
  error, and your relevant `config.lua` values.
