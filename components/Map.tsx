'use client'
import { MapPin } from 'lucide-react'

export default function Map() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-gray-600">Map integration coming soon</p>
      </div>
    </div>
  )
}