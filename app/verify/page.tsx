'use client'
import { useState } from 'react'
import { Upload, CheckCircle, XCircle, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function VerifyWastePage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failure'>('idle')
  const [verificationResult, setVerificationResult] = useState<{
    wasteType: string;
    quantity: string;
    confidence: number;
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setVerificationStatus('verifying')
    
    // Simulating AI verification process
    setTimeout(() => {
      // This is where you would integrate with Galadriel or your AI service
      const mockResult = {
        wasteType: 'Plastic',
        quantity: '2.5 kg',
        confidence: 0.92
      }
      setVerificationResult(mockResult)
      setVerificationStatus('success')
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Verify Waste Collection</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Collection Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <div className="relative w-full h-64">
                <Image
                  src={preview}
                  alt="Waste collection preview"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={!file || verificationStatus === 'verifying'}
          >
            {verificationStatus === 'verifying' ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Verifying...
              </>
            ) : (
              'Verify Collection'
            )}
          </Button>
        </form>

        {verificationStatus === 'success' && verificationResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-medium text-green-800">Verification Successful</h3>
            </div>
            <div className="mt-2 text-sm text-green-700">
              <p>Waste Type: {verificationResult.wasteType}</p>
              <p>Quantity: {verificationResult.quantity}</p>
              <p>Confidence: {(verificationResult.confidence * 100).toFixed(2)}%</p>
            </div>
          </div>
        )}

        {verificationStatus === 'failure' && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium text-red-800">Verification Failed</h3>
            </div>
            <p className="mt-2 text-sm text-red-700">
              Please try uploading a different image or contact support if the issue persists.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}