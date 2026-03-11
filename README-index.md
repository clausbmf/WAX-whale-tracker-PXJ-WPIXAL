# Pixel Journey NFT Transfers — index.html

A single-file browser dashboard that displays **NFT transfer history** from the `swap.taco` account for the `pixeljourney` WAX collection, using the AtomicAssets API.

No installation or server required — just open the file in a browser.

---

## Requirements

- A modern web browser (Chrome, Firefox, Edge)
- Internet connection

---

## Usage

1. Navigate to the folder containing `index.html`
2. Double-click `index.html` to open it in your browser

The dashboard will automatically load the latest transfers on startup.

---

## Features

### Live Data
- Fetches real-time NFT transfer data from the AtomicAssets API
- Auto-refreshes every **60 seconds**
- Manual refresh via the **↻ Refresh** button

### Stats Bar
Displays at-a-glance summary for the current page:

| Stat              | Description                              |
|-------------------|------------------------------------------|
| Total Transfers   | Number of transfers shown on this page   |
| NFTs Moved        | Total number of NFT assets transferred   |
| Big Rewards       | Transfers containing 3 or more NFTs      |
| Unique Recipients | Number of distinct receiving accounts    |
| Last Transfer     | Time of the most recent transfer         |

### Filters
Narrow down results using the controls bar:

| Filter      | Description                                      |
|-------------|--------------------------------------------------|
| Limit       | Number of results per page (25, 50, or 100)      |
| Order       | Sort by newest first or oldest first             |
| Template ID | Filter by a specific NFT template ID             |
| Recipient   | Filter by a specific WAX account name            |

Click **Apply** to run the filtered query, or **Clear** to reset all filters.

### Transfer Cards
Each transfer is displayed as a card showing:
- **Sender** and **Recipient** accounts
- **Timestamp** and time ago (e.g. "5m ago")
- **Memo** attached to the transfer (if any)
- **NFT assets** included in the transfer, each showing:
  - Asset name and ID
  - Schema name
  - Template ID
  - Tier/Rarity (if available)
- Link to the full transaction on **WaxBlock Explorer**
- "⭐ Big Reward" badge for transfers with 3+ NFTs

### Pagination
Navigate through results using the **← Prev** and **Next →** buttons.

---

## Example View

```
┌─────────────────────────────────────────────────────┐
│  🎮 Pixel Journey NFT Transfers          ● ↻ Refresh │
├─────────────────────────────────────────────────────┤
│  Total: 50 │ NFTs: 87 │ Big: 5 │ Recipients: 42     │
├─────────────────────────────────────────────────────┤
│  ⭐ Big Reward                                        │
│  swap.taco → someaccount.wam          3m ago        │
│  💬 pixeljourney reward                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Hero #1  │ │ Sword #2 │ │ Map #3   │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  Tx: a1b2c3d4...                                    │
└─────────────────────────────────────────────────────┘
```

---

## Data Source

| Field       | Value                                      |
|-------------|--------------------------------------------|
| API         | `https://wax.api.atomicassets.io/atomicassets/v1` |
| Collection  | `pixeljourney`                             |
| Sender      | `swap.taco`                                |
| Explorer    | `https://waxblock.io`                      |

---

## Notes

- All data is fetched live from the AtomicAssets public API
- No data is stored locally — the page is read-only
- The query time (in milliseconds) is displayed in the controls bar after each fetch
- Works entirely in the browser — no Node.js or server needed
