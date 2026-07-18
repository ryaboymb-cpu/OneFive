// Шифрование мнемоники PIN-кодом через Web Crypto API (PBKDF2 + AES-GCM)
const encoder = new TextEncoder()

export async function encryptMnemonic(mnemonic: string[], pin: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(pin, salt)
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(mnemonic.join(' ')))
  
  const buf = new Uint8Array(salt.length + iv.length + ct.byteLength)
  buf.set(salt, 0)
  buf.set(iv, salt.length)
  buf.set(new Uint8Array(ct), salt.length + iv.length)
  
  return btoa(String.fromCharCode(...buf))
}

export async function decryptMnemonic(payload: string, pin: string): Promise<string[]> {
  const raw = Uint8Array.from(atob(payload), c => c.charCodeAt(0))
  const salt = raw.slice(0, 16)
  const iv = raw.slice(16, 28)
  const ct = raw.slice(28)
  const key = await deriveKey(pin, salt)
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return new TextDecoder().decode(pt).split(' ')
}

async function deriveKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', encoder.encode(pin), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
    }
