import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) return ''

  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''

  return (first + last).toUpperCase()
}

export function generateUsername(name: string): string {
  if (!name) return ''

  const nameParts = name.trim().toLowerCase().split(' ')
  const first = nameParts[0]
  const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
  const randomNum = Math.floor(100 + Math.random() * 900) // Gera número entre 100 e 999

  return `${first}.${last}${randomNum}`
}
