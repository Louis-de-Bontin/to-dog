import { ImageResponse } from 'next/og'
import { readBrandLogoDataUri } from '@/lib/read-brand-logo'

export const runtime = 'nodejs'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const src = await readBrandLogoDataUri()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5E6D3',
          borderRadius: '40px',
          padding: '8',
        }}
      >
        <img alt="" src={src} height={164} width={164} />
      </div>
    ),
    { ...size }
  )
}
