export interface BookingData {
  service: string
  serviceTitle: string
  date: string
  time: string
  amount: number
  name: string
  email: string
  phone: string
}

const BOOKING_STORAGE_KEY = 'margaux_booking_confirmation'

export function saveBookingData(data: BookingData): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(data))
}

export function getBookingData(): BookingData | null {
  if (typeof window === 'undefined') return null
  const data = sessionStorage.getItem(BOOKING_STORAGE_KEY)
  if (!data) return null
  try {
    return JSON.parse(data) as BookingData
  } catch {
    return null
  }
}

export function clearBookingData(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(BOOKING_STORAGE_KEY)
}
