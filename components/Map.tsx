'use client'
import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

interface WastePoint {
  id: number;
  latitude: number;
  longitude: number;
  location: string;
  description: string;
}

export default function Map() {
  const [wastePoints, setWastePoints] = useState<WastePoint[]>([])
  const [center] = useState<[number, number]>([20.5937, 78.9629]) // India's center

  useEffect(() => {
    const fetchWastePoints = async () => {
      try {
        const response = await fetch('/api/waste-points')
        const data = await response.json()
        setWastePoints(data)
      } catch (error) {
        console.error('Error fetching waste points:', error)
      }
    }

    fetchWastePoints()
  }, [])

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-gray-600">Map integration coming soon</p>
      </div>
    </div>
  )
}