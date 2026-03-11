# Pixel Journey Whale Tracker — whale-tracker.html

A single-file browser dashboard that monitors **whale activity** on the WAX blockchain for the Pixel Journey ecosystem. It tracks large token transfers, big NFT movements, and DEX swap activity — all in real time.

No installation or server required. Just open the file in a browser.

---

## Requirements

- A modern web browser (Chrome, Firefox, Edge)
- Internet connection

---

## Usage

1. Navigate to the folder containing `whale-tracker.html`
2. Double-click it to open in your browser
3. Data loads automatically on startup and refreshes every **30 seconds**

---

## What It Monitors

### 🪙 Token Transfers (PXJ & WPIXAL)
- Fetches the latest outgoing transfers from the `pixeljourney` account
- Filters for **PXJ** and **WPIXAL** tokens only
- Highlights transfers that exceed the whale threshold
- Detects when tokens are sent **to a DEX** (swap.alcor or swap.taco)
- Shows sender, recipient, amount, memo, and a link to the transaction on WaxBlock

### 🖼 NFT Transfers
- Fetches the latest NFT transfers sent by `swap.taco` for the `pixeljourney` collection
- Tracks batch transfers (multiple NFTs in one transaction)
- Flags transfers above the NFT whale threshold (e.g. 5+ NFTs in one tx)
- Shows each NFT's name, asset ID, schema, template ID, and tier/rarity
- Marks transfers originating from DEX accounts as "DEX Reward"

### 📊 DEX Activity (Alcor Exchange)
- Fetches recent swap actions from `swap.alcor` via the Hyperion history API
- Filters only swaps involving PXJ or WPIXAL tokens
- Flags large swaps as whale events based on the configured threshold
- Attempts to fetch live market info (price, 24h volume) from the Alcor Exchange API
- Provides a direct link to the trading pair on Alcor Exchange

---

## Features

### 🐋 Whale Ticker
A live scrolling banner at the top of the page shows all detected whale events across all three data sources. Each item is labeled by type (Token, NFT, or DEX) and shows how long ago it occurred.

### Stats Bar
At-a-glance summary updated on every refresh:

| Stat | Description |
|------|-------------|
| Token Whales | Number of PXJ/WPIXAL transfers exceeding the threshold |
| Biggest Token Tx | Largest single token transfer amount seen |
| NFT Whales | Number of NFT batch transfers exceeding the threshold |
| Most NFTs in 1 Tx | Highest number of NFTs moved in a single transfer |
| DEX Whales | Number of swaps exceeding the DEX threshold |
| Last Activity | Time of the most recent event detected |

### Configurable Whale Thresholds
You can set your own thresholds before or during monitoring:

| Setting | Default | Description |
|---------|---------|-------------|
| Token (PXJ) | 1,000,000 | Minimum PXJ/WPIXAL amount to flag as whale |
| NFTs per Tx | 5 | Minimum NFTs in one transfer to flag as whale |
| Swap qty (tokens) | 100,000 | Minimum swap amount to flag as whale |

Click **Apply & Refresh** after changing thresholds to reapply them immediately.

### Auto-Refresh
- Data refreshes automatically every **30 seconds**
- A countdown timer in the header shows when the next refresh will occur
- Use the **↻ Refresh All** button to trigger an immediate refresh at any time

### DEX & Exchange Detection
Transfers to or from known DEX accounts (`swap.alcor`, `swap.taco`) are automatically labeled with a DEX badge so you can spot on-exchange activity at a glance.

### Transaction Links
Every event includes a direct link to the full transaction on **WaxBlock Explorer** (`waxblock.io`).

---

## Data Sources

| Source | API | Used For |
|--------|-----|----------|
| Hyperion | `https://wax.eosrio.io/v2/history` | Token transfers, DEX swaps |
| AtomicAssets | `https://wax.api.atomicassets.io/atomicassets/v1` | NFT transfers |
| Alcor Exchange | `https://wax.alcor.exchange/api` | Market price & volume |

All APIs are public and require no API key.

---

## Whale Indicators

| Badge | Meaning |
|-------|---------|
| 🐋 Whale | Transfer or swap exceeds your configured threshold |
| 📊 DEX | Tokens sent to or from a DEX account |
| 🔀 DEX Reward | NFTs distributed from a DEX/swap account |
| 🐋 Whale Swap | Large swap detected on Alcor |

---

## Notes

- All data is fetched live — nothing is stored locally
- The page is read-only and makes no transactions
- If an API is temporarily unavailable, an error message is shown for that section only — the other sections continue working
- The whale ticker keeps up to 40 recent alerts in memory during your session
- Closing or refreshing the page resets the whale alert history
