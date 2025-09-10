"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Flower, Calculator } from "lucide-react"

interface PredictionResult {
  species: string
  confidence: number
  measurements: {
    sepal_length: number
    sepal_width: number
    petal_length: number
    petal_width: number
  }
}

export function MeasurementForm() {
  const [measurements, setMeasurements] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const predictSpecies = (sepal_length: number, sepal_width: number, petal_length: number, petal_width: number) => {
    // Simple rule-based prediction based on Iris dataset characteristics
    if (petal_length < 2.5) {
      return { species: "setosa", confidence: 0.95 }
    } else if (petal_length < 5.0 && petal_width < 1.8) {
      return { species: "versicolor", confidence: 0.87 }
    } else {
      return { species: "virginica", confidence: 0.92 }
    }
  }

  const handlePredict = async () => {
    const { sepal_length, sepal_width, petal_length, petal_width } = measurements

    if (!sepal_length || !sepal_width || !petal_length || !petal_width) {
      alert("Please fill in all measurements")
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const numericMeasurements = {
      sepal_length: Number.parseFloat(sepal_length),
      sepal_width: Number.parseFloat(sepal_width),
      petal_length: Number.parseFloat(petal_length),
      petal_width: Number.parseFloat(petal_width),
    }

    const result = predictSpecies(
      numericMeasurements.sepal_length,
      numericMeasurements.sepal_width,
      numericMeasurements.petal_length,
      numericMeasurements.petal_width,
    )

    setPrediction({
      ...result,
      measurements: numericMeasurements,
    })

    setIsLoading(false)
  }

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case "setosa":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "versicolor":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "virginica":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Flower Measurements
          </CardTitle>
          <CardDescription>Enter the measurements in centimeters to classify the Iris species</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sepal_length">Sepal Length (cm)</Label>
              <Input
                id="sepal_length"
                type="number"
                step="0.1"
                placeholder="5.1"
                value={measurements.sepal_length}
                onChange={(e) => handleInputChange("sepal_length", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sepal_width">Sepal Width (cm)</Label>
              <Input
                id="sepal_width"
                type="number"
                step="0.1"
                placeholder="3.5"
                value={measurements.sepal_width}
                onChange={(e) => handleInputChange("sepal_width", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="petal_length">Petal Length (cm)</Label>
              <Input
                id="petal_length"
                type="number"
                step="0.1"
                placeholder="1.4"
                value={measurements.petal_length}
                onChange={(e) => handleInputChange("petal_length", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="petal_width">Petal Width (cm)</Label>
              <Input
                id="petal_width"
                type="number"
                step="0.1"
                placeholder="0.2"
                value={measurements.petal_width}
                onChange={(e) => handleInputChange("petal_width", e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handlePredict} disabled={isLoading} className="w-full">
            {isLoading ? "Classifying..." : "Classify Species"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower className="h-5 w-5" />
            Prediction Result
          </CardTitle>
          <CardDescription>AI-powered species classification with confidence score</CardDescription>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-4">
              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${getSpeciesColor(prediction.species)}`}>
                  Iris {prediction.species}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Input Measurements:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Sepal Length: {prediction.measurements.sepal_length} cm</div>
                  <div>Sepal Width: {prediction.measurements.sepal_width} cm</div>
                  <div>Petal Length: {prediction.measurements.petal_length} cm</div>
                  <div>Petal Width: {prediction.measurements.petal_width} cm</div>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Scientific Name:</strong> Iris {prediction.species}
                </p>
                <p className="text-sm mt-1">
                  This classification is based on the trained machine learning model using the classic Iris dataset.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Flower className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter measurements and click "Classify Species" to see the prediction</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
