import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const LOGO_FILE = 'margaux-brand-logo.png'

export async function readBrandLogoDataUri(): Promise<string> {
  const buf = await readFile(join(process.cwd(), 'public', LOGO_FILE))
  return `data:image/png;base64,${Buffer.from(buf).toString('base64')}`
}
