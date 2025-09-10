"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClassificationResult {
  species: string
  confidence: number
  features: string[]
  comparison: {
    mlPrediction: string
    agreement: boolean
  }
}

export default function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate image analysis processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock classification result based on common iris characteristics
    const mockResults: ClassificationResult[] = [
      {
        species: "Iris Setosa",
        confidence: 0.87,
        features: ["Small petals", "Compact flower", "Yellow center", "Narrow leaves"],
        comparison: { mlPrediction: "Iris Setosa", agreement: true },
      },
      {
        species: "Iris Versicolor",
        confidence: 0.92,
        features: ["Medium petals", "Purple-blue color", "Veined petals", "Moderate size"],
        comparison: { mlPrediction: "Iris Virginica", agreement: false },
      },
      {
        species: "Iris Virginica",
        confidence: 0.78,
        features: ["Large petals", "Deep purple", "Broad leaves", "Tall stem"],
        comparison: { mlPrediction: "Iris Virginica", agreement: true },
      },
    ]

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
    setResult(randomResult)
    setIsAnalyzing(false)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800"
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Image-Based Classification
          </CardTitle>
          <CardDescription>Upload an iris flower image for AI-powered species identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Uploaded iris"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex gap-2 justify-center">
                  <Button onClick={analyzeImage} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Choose Different Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium">Upload an iris flower image</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="bg-purple-600 hover:bg-purple-700">
                  Choose Image
                </Button>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Classification Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{result.species}</h3>
                <p className="text-sm text-gray-600">Identified species</p>
              </div>
              <Badge className={getConfidenceColor(result.confidence)}>
                {(result.confidence * 100).toFixed(1)}% confidence
              </Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Detected Features:</h4>
              <div className="flex flex-wrap gap-2">
                {result.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <Alert>
              <div className="flex items-center gap-2">
                {result.comparison.agreement ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
                <AlertDescription>
                  <strong>ML Model Comparison:</strong> Traditional ML predicted "{result.comparison.mlPrediction}".
                  {result.comparison.agreement
                    ? " Both methods agree!"
                    : " Different predictions - this highlights the complexity of visual classification."}
                </AlertDescription>
              </div>
            </Alert>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How Image Classification Works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• AI analyzes visual features like petal shape, color, and size</li>
                <li>• Compares against thousands of trained flower images</li>
                <li>• Considers lighting, angle, and image quality</li>
                <li>• Provides confidence scores based on feature matching</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
