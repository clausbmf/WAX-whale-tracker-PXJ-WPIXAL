/**
 * Fetch all PXJ & WPIXAL outgoing transfers from pixeljourney account
 * Usage: node wax-pxj-transfers.js
 */

const BASE_URL = 'https://wax.eosrio.io/v2/history';
const ACCOUNT = 'pixeljourney';
const PAGE_SIZE = 100;

async function fetchPage(skip) {
  const url = `${BASE_URL}/get_actions?account=${ACCOUNT}&filter=${ACCOUNT}%3Atransfer&sort=desc&limit=${PAGE_SIZE}&skip=${skip}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const outgoing = [];
  let skip = 0;
  let total = null;

  console.log(`Fetching transfers for ${ACCOUNT}...\n`);

  while (true) {
    const data = await fetchPage(skip);

    if (total === null) {
      total = data.total?.value ?? 0;
      console.log(`Total actions on chain: ${total}\n`);
    }

    if (!data.actions || data.actions.length === 0) break;

    for (const action of data.actions) {
      const d = action.act?.data ?? {};
      const symbol = d.symbol ?? (d.quantity ?? '').split(' ')[1] ?? '';

      // Only PXJ or WPIXAL outgoing from pixeljourney
      if (
        d.from === ACCOUNT &&
        (symbol === 'PXJ' || symbol === 'WPIXAL')
      ) {
        outgoing.push({
          timestamp: action['@timestamp'] ?? action.timestamp,
          trx_id: action.trx_id,
          from: d.from,
          to: d.to,
          quantity: d.quantity,
          memo: d.memo ?? '',
        });
      }
    }

    skip += data.actions.length;
    process.stdout.write(`  Scanned ${skip} / ${total} actions, found ${outgoing.length} outgoing...\r`);

    if (skip >= total) break;
  }

  console.log(`\n\nFound ${outgoing.length} outgoing PXJ/WPIXAL transfers from ${ACCOUNT}:\n`);

  if (outgoing.length === 0) {
    console.log('No outgoing transfers found.');
    return;
  }

  // Print table
  console.log('Timestamp'.padEnd(26) + 'To'.padEnd(20) + 'Quantity'.padEnd(30) + 'Memo');
  console.log('-'.repeat(100));
  for (const tx of outgoing) {
    console.log(
      (tx.timestamp ?? '').padEnd(26) +
      (tx.to ?? '').padEnd(20) +
      (tx.quantity ?? '').padEnd(30) +
      (tx.memo ?? '')
    );
  }

  // Summary
  const pxjTotal = outgoing
    .filter(t => (t.quantity ?? '').includes('PXJ') && !(t.quantity ?? '').includes('WPIXAL'))
    .reduce((sum, t) => sum + parseFloat(t.quantity), 0);

  const wpixalTotal = outgoing
    .filter(t => (t.quantity ?? '').includes('WPIXAL'))
    .reduce((sum, t) => sum + parseFloat(t.quantity), 0);

  console.log('\n--- Summary ---');
  console.log(`PXJ sent:    ${pxjTotal.toFixed(8)}`);
  console.log(`WPIXAL sent: ${wpixalTotal.toFixed(8)}`);
  console.log(`Total txs:   ${outgoing.length}`);
}

main().catch(console.error);
