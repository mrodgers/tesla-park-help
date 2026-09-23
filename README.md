# Tesla Park — neighbor parking help

A calm, public one-pager that asks neighbors to email a guest parking code so it can appear on a small display in the car.

- **Live:** https://mrodgers.github.io/tesla-park-help/
- **Tone:** Apple-like product page — large type, generous space, one light interactive preview. Not a FAQ card deck.
- **Stack:** static `index.html` + `styles.css` + `app.js` (no build step). GitHub Pages from `main` / root.

## What helpers send
Guest code; the plate from their intro email; valid-through if known. Send to the inbox named in that intro email. Never passwords, portal logins, or apps.

## Privacy (this repo)
**Do not publish the license plate or intake email address here.** Helpers receive both only in the private intro email. The public FAQ must stay free of plate and intake inbox — those live in agent notes / intro templates, not in this site.

## What must never appear here
Plate numbers, intake/junk inbox addresses, private IPs, MAC addresses, mesh/channel keys, portal usernames, firmware, LoRa/Meshtastic, allotment-automation internals, or helper personal emails.

## Local preview
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Operator docs
Private protocol lives in the `tesla-park` firmware/docs repo — not in this public site.
