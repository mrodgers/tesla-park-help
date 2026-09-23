# Tesla Park — neighbor parking help

A calm, public one-pager that asks neighbors to email a guest parking code so it can appear on a small display in the car (plate **EV14E28**).

- **Live:** https://mrodgers.github.io/tesla-park-help/
- **Tone:** Apple-like product page — large type, generous space, one light interactive preview. Not a FAQ card deck.
- **Stack:** static `index.html` + `styles.css` + `app.js` (no build step). GitHub Pages from `main` / root.

## What helpers send
Guest code, plate EV14E28, valid-through if known — to `mrodgers.junk@gmail.com`. Never passwords, portal logins, or apps.

## What must never appear here
Private IPs, MAC addresses, mesh/channel keys, portal usernames, firmware, LoRa/Meshtastic, allotment-automation internals, or helper emails beyond the shared intake address.

## Local preview
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

## Operator docs
Private protocol lives in the `tesla-park` firmware/docs repo — not in this public site.
