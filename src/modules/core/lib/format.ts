export const fmtAddr = (a?: string, l = 4) => (!a || a.length < l * 2) ? (a || '') : `${a.slice(0, l)}...${a.slice(-l)}`
export const fmtTon = (n?: string | number) => {
  const v = typeof n === 'string' ? parseFloat(n) : (n || 0)
  return isNaN(v) ? '0.00' : v.toLocaleString('en', { minFractionDigits: 2, maxFractionDigits: 4 })
}
