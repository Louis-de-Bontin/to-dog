import { ImageResponse } from 'next/og'
import { readBrandLogoDataUri } from '@/lib/read-brand-logo'

export const runtime = 'nodejs'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default async function Icon() {
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
          borderRadius: '10px',
          padding: '0',
        }}
      >
        <img alt="" src={src} height={48} width={48} />
      </div>
    ),
    { ...size }
  )
}
