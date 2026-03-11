# wax-pxj-transfers.js

A Node.js CLI script that fetches all outgoing **PXJ** and **WPIXAL** token transfers from the `pixeljourney` WAX blockchain account, using the Hyperion History API.

---

## Requirements

- [Node.js](https://nodejs.org) v14 or higher
- Internet connection

Check your Node.js version:
```bash
node --version
```

---

## Installation

No dependencies or `npm install` needed. Just download the script and run it.

---

## Usage

1. Open a terminal and navigate to the folder containing the script:

```bash
cd path/to/folder
```

2. Run the script:

```bash
node wax-pxj-transfers.js
```

---

## What It Does

- Connects to the WAX Hyperion API (`wax.eosrio.io`)
- Scans **all on-chain actions** for the `pixeljourney` account
- Filters for outgoing transfers of the `PXJ` and `WPIXAL` tokens
- Prints a full table of results and a summary

---

## Example Output

```
Fetching transfers for pixeljourney...

Total actions on chain: 5000

  Scanned 500 / 5000 actions, found 12 outgoing...

Found 12 outgoing PXJ/WPIXAL transfers from pixeljourney:

Timestamp                 To                  Quantity                      Memo
----------------------------------------------------------------------------------------------------
2024-01-15T10:30:00.000Z  someaccount         100.00000000 PXJ              reward
2024-01-14T08:15:00.000Z  anotheraccount      50.00000000 WPIXAL            airdrop
...

--- Summary ---
PXJ sent:    1500.00000000
WPIXAL sent: 200.00000000
Total txs:   12
```

---

## Output Columns

| Column      | Description                              |
|-------------|------------------------------------------|
| Timestamp   | Date and time of the transfer (UTC)      |
| To          | WAX account that received the tokens     |
| Quantity    | Amount and token symbol sent             |
| Memo        | Optional message attached to the transfer|

---

## Notes

- The script scans pages of 100 actions at a time. If the account has many thousands of actions, it may take a few minutes to complete.
- Only **outgoing** transfers (where `from` = `pixeljourney`) are included.
- The script does not write any files — all output is printed to the terminal.

---

## Configuration

You can edit the top of the script to change the target account or page size:

```js
const BASE_URL = 'https://wax.eosrio.io/v2/history'; // Hyperion API endpoint
const ACCOUNT  = 'pixeljourney';                      // WAX account to scan
const PAGE_SIZE = 100;                                // Actions per request
```

---

## Tokens

| Token   | Description                        |
|---------|------------------------------------|
| PXJ     | Pixel Journey primary token        |
| WPIXAL  | Wrapped PIXAL token                |
