function splitCSVLine(line) {
  const out = [], re = /\s*(?:"([^"]*)"|([^",]*))\s*(,|$)/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    out.push(m[1] ?? m[2]);
    if (m[3] !== ',') break;
  }
  return out;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]).map((s) => s.trim().toLowerCase());
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    if (cols.length === 0) continue;
    const o = {};
    headers.forEach((h, idx) => (o[h] = cols[idx] ?? ''));
    out.push(o);
  }
  return out;
}

module.exports = { splitCSVLine, parseCSV };
