"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Thermometer, Droplets, Sun, MapPin, Leaf, TrendingUp } from "lucide-react"

interface EnvironmentalData {
  temperature: number // °C
  humidity: number // %
  rainfall: number // mm/year
  soilPH: number
  sunlightHours: number // hours/day
  windSpeed: number // km/h
  elevation: number // meters
}

interface SuitabilityScore {
  species: string
  score: number
  factors: {
    temperature: number
    moisture: number
    soil: number
    light: number
  }
  recommendations: string[]
  challenges: string[]
}

const speciesRequirements = {
  setosa: {
    name: "Iris Setosa",
    optimal: {
      temperature: { min: -5, max: 15, ideal: 5 },
      humidity: { min: 60, max: 90, ideal: 75 },
      rainfall: { min: 400, max: 1200, ideal: 800 },
      soilPH: { min: 5.5, max: 7.0, ideal: 6.2 },
      sunlight: { min: 4, max: 8, ideal: 6 },
      elevation: { min: 0, max: 2000, ideal: 500 },
    },
    color: "blue",
  },
  versicolor: {
    name: "Iris Versicolor",
    optimal: {
      temperature: { min: 5, max: 25, ideal: 15 },
      humidity: { min: 50, max: 80, ideal: 65 },
      rainfall: { min: 600, max: 1400, ideal: 1000 },
      soilPH: { min: 6.0, max: 7.5, ideal: 6.8 },
      sunlight: { min: 5, max: 9, ideal: 7 },
      elevation: { min: 0, max: 1500, ideal: 300 },
    },
    color: "green",
  },
  virginica: {
    name: "Iris Virginica",
    optimal: {
      temperature: { min: 10, max: 30, ideal: 20 },
      humidity: { min: 60, max: 95, ideal: 80 },
      rainfall: { min: 800, max: 2000, ideal: 1200 },
      soilPH: { min: 5.0, max: 6.5, ideal: 5.8 },
      sunlight: { min: 6, max: 10, ideal: 8 },
      elevation: { min: 0, max: 500, ideal: 100 },
    },
    color: "purple",
  },
}

export default function EnvironmentalPredictor() {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    temperature: 15,
    humidity: 65,
    rainfall: 800,
    soilPH: 6.5,
    sunlightHours: 6,
    windSpeed: 10,
    elevation: 200,
  })

  const [predictions, setPredictions] = useState<SuitabilityScore[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const calculateSuitability = (
    species: keyof typeof speciesRequirements,
    data: EnvironmentalData,
  ): SuitabilityScore => {
    const req = speciesRequirements[species]

    // Calculate individual factor scores (0-100)
    const tempScore = calculateFactorScore(data.temperature, req.optimal.temperature)
    const moistureScore = Math.min(
      calculateFactorScore(data.humidity, req.optimal.humidity),
      calculateFactorScore(data.rainfall, req.optimal.rainfall),
    )
    const soilScore = calculateFactorScore(data.soilPH, req.optimal.soilPH)
    const lightScore = calculateFactorScore(data.sunlightHours, req.optimal.sunlight)

    // Overall score (weighted average)
    const overallScore = Math.round(tempScore * 0.3 + moistureScore * 0.3 + soilScore * 0.2 + lightScore * 0.2)

    // Generate recommendations and challenges
    const recommendations: string[] = []
    const challenges: string[] = []

    if (tempScore < 70) {
      if (data.temperature < req.optimal.temperature.ideal) {
        recommendations.push("Consider greenhouse cultivation or wait for warmer seasons")
        challenges.push("Temperature too low for optimal growth")
      } else {
        recommendations.push("Provide shade during hottest parts of day")
        challenges.push("Temperature may be too high")
      }
    }

    if (moistureScore < 70) {
      if (data.humidity < req.optimal.humidity.ideal) {
        recommendations.push("Increase humidity with misting or humidity trays")
        challenges.push("Low humidity levels")
      }
      if (data.rainfall < req.optimal.rainfall.ideal) {
        recommendations.push("Supplement with regular watering")
        challenges.push("Insufficient natural rainfall")
      }
    }

    if (soilScore < 70) {
      if (data.soilPH < req.optimal.soilPH.ideal) {
        recommendations.push("Add lime to raise soil pH")
        challenges.push("Soil too acidic")
      } else {
        recommendations.push("Add organic matter to lower soil pH")
        challenges.push("Soil too alkaline")
      }
    }

    if (lightScore < 70) {
      if (data.sunlightHours < req.optimal.sunlight.ideal) {
        recommendations.push("Choose sunnier location or trim surrounding vegetation")
        challenges.push("Insufficient sunlight")
      } else {
        recommendations.push("Provide afternoon shade")
        challenges.push("Too much direct sunlight")
      }
    }

    if (recommendations.length === 0) {
      recommendations.push("Excellent conditions - minimal intervention needed")
    }

    return {
      species: req.name,
      score: overallScore,
      factors: {
        temperature: tempScore,
        moisture: moistureScore,
        soil: soilScore,
        light: lightScore,
      },
      recommendations,
      challenges,
    }
  }

  const calculateFactorScore = (value: number, optimal: { min: number; max: number; ideal: number }): number => {
    if (value >= optimal.min && value <= optimal.max) {
      // Within acceptable range
      const distanceFromIdeal = Math.abs(value - optimal.ideal)
      const maxDistance = Math.max(optimal.ideal - optimal.min, optimal.max - optimal.ideal)
      return Math.round(100 - (distanceFromIdeal / maxDistance) * 30) // Max penalty of 30 points
    } else {
      // Outside acceptable range
      const penalty = value < optimal.min ? (optimal.min - value) / optimal.min : (value - optimal.max) / optimal.max
      return Math.max(0, Math.round(70 - penalty * 70)) // Start at 70, reduce based on how far outside range
    }
  }

  const analyzeSuitability = async () => {
    setIsAnalyzing(true)

    // Simulate analysis time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const results = Object.keys(speciesRequirements)
      .map((species) => calculateSuitability(species as keyof typeof speciesRequirements, environmentalData))
      .sort((a, b) => b.score - a.score)

    setPredictions(results)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Environmental Suitability Predictor</h2>
        <p className="text-muted-foreground">
          Analyze environmental conditions to predict which iris species will thrive in your location
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Environmental Parameters
            </CardTitle>
            <CardDescription>Enter your local environmental conditions for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4" />
                  Average Temperature: {environmentalData.temperature}°C
                </Label>
                <Slider
                  value={[environmentalData.temperature]}
                  onValueChange={(value) => setEnvironmentalData((prev) => ({ ...prev, temperature: value[0] }))}
                  min={-10}
                  max={35}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4" />
                  Humidity: {environmentalData.humidity}%
                </Label>
                <Slider
                  value={[environmentalData.humidity]}
                  onValueChange={(value) => setEnvironmentalData((prev) => ({ ...prev, humidity: value[0] }))}
                  min={20}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4" />
                  Annual Rainfall: {environmentalData.rainfall}mm
                </Label>
                <Slider
                  value={[environmentalData.rainfall]}
                  onValueChange={(value) => setEnvironmentalData((prev) => ({ ...prev, rainfall: value[0] }))}
                  min={200}
                  max={2500}
                  step={50}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4" />
                  Soil pH: {environmentalData.soilPH}
                </Label>
                <Slider
                  value={[environmentalData.soilPH]}
                  onValueChange={(value) => setEnvironmentalData((prev) => ({ ...prev, soilPH: value[0] }))}
                  min={4.0}
                  max={9.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Sun className="h-4 w-4" />
                  Daily Sunlight: {environmentalData.sunlightHours} hours
                </Label>
                <Slider
                  value={[environmentalData.sunlightHours]}
                  onValueChange={(value) => setEnvironmentalData((prev) => ({ ...prev, sunlightHours: value[0] }))}
                  min={2}
                  max={12}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="windSpeed">Wind Speed (km/h)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    value={environmentalData.windSpeed}
                    onChange={(e) => setEnvironmentalData((prev) => ({ ...prev, windSpeed: Number(e.target.value) }))}
                    min={0}
                    max={50}
                  />
                </div>
                <div>
                  <Label htmlFor="elevation">Elevation (m)</Label>
                  <Input
                    id="elevation"
                    type="number"
                    value={environmentalData.elevation}
                    onChange={(e) => setEnvironmentalData((prev) => ({ ...prev, elevation: Number(e.target.value) }))}
                    min={0}
                    max={3000}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={analyzeSuitability}
              disabled={isAnalyzing}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isAnalyzing ? "Analyzing Environment..." : "Analyze Suitability"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Suitability Analysis
            </CardTitle>
            <CardDescription>Species compatibility scores based on your environmental conditions</CardDescription>
          </CardHeader>
          <CardContent>
            {predictions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter environmental parameters and click "Analyze Suitability" to see predictions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{prediction.species}</h3>
                      <Badge className={getScoreBadgeColor(prediction.score)}>{prediction.score}% suitable</Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Temperature</span>
                        <span className={getScoreColor(prediction.factors.temperature)}>
                          {prediction.factors.temperature}%
                        </span>
                      </div>
                      <Progress value={prediction.factors.temperature} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Moisture</span>
                        <span className={getScoreColor(prediction.factors.moisture)}>
                          {prediction.factors.moisture}%
                        </span>
                      </div>
                      <Progress value={prediction.factors.moisture} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Soil</span>
                        <span className={getScoreColor(prediction.factors.soil)}>{prediction.factors.soil}%</span>
                      </div>
                      <Progress value={prediction.factors.soil} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Light</span>
                        <span className={getScoreColor(prediction.factors.light)}>{prediction.factors.light}%</span>
                      </div>
                      <Progress value={prediction.factors.light} className="h-2" />
                    </div>

                    {prediction.challenges.length > 0 && (
                      <Alert className="mb-3">
                        <AlertDescription>
                          <strong>Challenges:</strong> {prediction.challenges.join(", ")}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div>
                      <h4 className="text-sm font-medium mb-1">Recommendations:</h4>
                      <ul className="text-xs text-muted-foreground list-disc list-inside">
                        {prediction.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
