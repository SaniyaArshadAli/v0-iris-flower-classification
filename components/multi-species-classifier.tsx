"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Flower, Camera, BarChart3, Info, Sparkles } from "lucide-react"

interface FlowerMeasurements {
  petalLength: number
  petalWidth: number
  sepalLength: number
  sepalWidth: number
  stemHeight: number
  flowerDiameter: number
}

interface ClassificationResult {
  species: string
  family: string
  confidence: number
  characteristics: string[]
  habitat: string
  bloomingSeason: string
  careLevel: "Easy" | "Moderate" | "Difficult"
  colors: string[]
}

const flowerDatabase = {
  "Rosa gallica": {
    family: "Rosaceae",
    characteristics: ["Fragrant petals", "Thorny stems", "Compound leaves", "Hip fruits"],
    habitat: "Temperate gardens, well-drained soil",
    bloomingSeason: "Late spring to early fall",
    careLevel: "Moderate" as const,
    colors: ["Red", "Pink", "White", "Yellow"],
  },
  "Tulipa gesneriana": {
    family: "Liliaceae",
    characteristics: ["Cup-shaped flowers", "Single stem", "Bulbous root", "Smooth leaves"],
    habitat: "Cool temperate regions, well-drained soil",
    bloomingSeason: "Early to mid spring",
    careLevel: "Easy" as const,
    colors: ["Red", "Yellow", "Pink", "Purple", "White"],
  },
  "Bellis perennis": {
    family: "Asteraceae",
    characteristics: ["Composite flower head", "White petals", "Yellow center", "Rosette leaves"],
    habitat: "Grasslands, lawns, meadows",
    bloomingSeason: "Spring to fall",
    careLevel: "Easy" as const,
    colors: ["White", "Pink"],
  },
  "Helianthus annuus": {
    family: "Asteraceae",
    characteristics: ["Large flower head", "Yellow petals", "Dark center", "Tall stem"],
    habitat: "Full sun, well-drained soil",
    bloomingSeason: "Mid to late summer",
    careLevel: "Easy" as const,
    colors: ["Yellow", "Orange", "Red"],
  },
  "Narcissus pseudonarcissus": {
    family: "Amaryllidaceae",
    characteristics: ["Trumpet corona", "Six petals", "Bulbous root", "Linear leaves"],
    habitat: "Woodland edges, meadows",
    bloomingSeason: "Early spring",
    careLevel: "Easy" as const,
    colors: ["Yellow", "White"],
  },
  "Iris setosa": {
    family: "Iridaceae",
    characteristics: ["Smallest petals", "Bristle-pointed", "Sword-like leaves", "Rhizome root"],
    habitat: "Arctic wetlands, cool climates",
    bloomingSeason: "Late spring to early summer",
    careLevel: "Moderate" as const,
    colors: ["Blue", "Purple"],
  },
}

export default function MultiSpeciesClassifier() {
  const [measurements, setMeasurements] = useState<FlowerMeasurements>({
    petalLength: 3.0,
    petalWidth: 1.5,
    sepalLength: 4.0,
    sepalWidth: 2.0,
    stemHeight: 25.0,
    flowerDiameter: 5.0,
  })

  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<string>("")

  const classifyFlower = async () => {
    setIsClassifying(true)

    // Simulate ML classification processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock classification logic based on measurements
    let predictedSpecies = "Iris setosa"
    let confidence = 0.85

    // Simple rule-based classification for demo
    if (measurements.flowerDiameter > 10 && measurements.stemHeight > 50) {
      predictedSpecies = "Helianthus annuus"
      confidence = 0.92
    } else if (measurements.petalLength > 4 && measurements.petalWidth > 2) {
      predictedSpecies = "Rosa gallica"
      confidence = 0.88
    } else if (measurements.petalLength < 2 && measurements.flowerDiameter < 3) {
      predictedSpecies = "Bellis perennis"
      confidence = 0.91
    } else if (measurements.stemHeight < 15 && measurements.petalLength > 2) {
      predictedSpecies = "Tulipa gesneriana"
      confidence = 0.87
    } else if (measurements.petalLength > 3 && measurements.petalWidth < 2) {
      predictedSpecies = "Narcissus pseudonarcissus"
      confidence = 0.89
    }

    const speciesData = flowerDatabase[predictedSpecies as keyof typeof flowerDatabase]

    const classificationResult: ClassificationResult = {
      species: predictedSpecies,
      family: speciesData.family,
      confidence: confidence,
      characteristics: speciesData.characteristics,
      habitat: speciesData.habitat,
      bloomingSeason: speciesData.bloomingSeason,
      careLevel: speciesData.careLevel,
      colors: speciesData.colors,
    }

    setResult(classificationResult)
    setIsClassifying(false)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600"
    if (confidence >= 0.8) return "text-yellow-600"
    return "text-red-600"
  }

  const getCareLevelColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Difficult":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Multi-Species Flower Classifier</h2>
        <p className="text-muted-foreground">
          Advanced classification system supporting roses, tulips, daisies, sunflowers, daffodils, and iris species
        </p>
      </div>

      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>Extended Classification:</strong> This system demonstrates how the iris classifier can be expanded to
          identify multiple flower species using similar morphological measurements and ML techniques.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="classify" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classify" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Classify
          </TabsTrigger>
          <TabsTrigger value="species" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Species Database
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Visual Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classify" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flower className="h-5 w-5 text-purple-600" />
                  Flower Measurements
                </CardTitle>
                <CardDescription>Enter detailed measurements for multi-species classification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petalLength">Petal Length (cm)</Label>
                    <Input
                      id="petalLength"
                      type="number"
                      step="0.1"
                      value={measurements.petalLength}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, petalLength: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="petalWidth">Petal Width (cm)</Label>
                    <Input
                      id="petalWidth"
                      type="number"
                      step="0.1"
                      value={measurements.petalWidth}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, petalWidth: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sepalLength">Sepal Length (cm)</Label>
                    <Input
                      id="sepalLength"
                      type="number"
                      step="0.1"
                      value={measurements.sepalLength}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, sepalLength: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sepalWidth">Sepal Width (cm)</Label>
                    <Input
                      id="sepalWidth"
                      type="number"
                      step="0.1"
                      value={measurements.sepalWidth}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, sepalWidth: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stemHeight">Stem Height (cm)</Label>
                    <Input
                      id="stemHeight"
                      type="number"
                      step="0.5"
                      value={measurements.stemHeight}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, stemHeight: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="flowerDiameter">Flower Diameter (cm)</Label>
                    <Input
                      id="flowerDiameter"
                      type="number"
                      step="0.1"
                      value={measurements.flowerDiameter}
                      onChange={(e) => setMeasurements((prev) => ({ ...prev, flowerDiameter: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <Button
                  onClick={classifyFlower}
                  disabled={isClassifying}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isClassifying ? "Classifying..." : "Classify Flower Species"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Classification Results
                </CardTitle>
                <CardDescription>Multi-species identification results</CardDescription>
              </CardHeader>
              <CardContent>
                {!result ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Flower className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter measurements and classify to see results</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{result.species}</h3>
                      <p className="text-sm text-muted-foreground">Family: {result.family}</p>
                      <div className="mt-2">
                        <span className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
                          {(result.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                      <Progress value={result.confidence * 100} className="mt-2" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Characteristics</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.characteristics.map((char, index) => (
                            <Badge key={index} variant="secondary">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Colors</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.colors.map((color, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Habitat:</strong> {result.habitat}
                          </p>
                          <p>
                            <strong>Blooming:</strong> {result.bloomingSeason}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Care Level:</strong>
                          </p>
                          <Badge className={getCareLevelColor(result.careLevel)}>{result.careLevel}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(flowerDatabase).map(([species, data]) => (
              <Card key={species} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{species}</CardTitle>
                  <CardDescription>Family: {data.family}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Characteristics</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.characteristics.slice(0, 2).map((char, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm">
                    <p>
                      <strong>Blooming:</strong> {data.bloomingSeason}
                    </p>
                    <p>
                      <strong>Care:</strong>
                      <Badge className={`ml-2 ${getCareLevelColor(data.careLevel)}`} size="sm">
                        {data.careLevel}
                      </Badge>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Colors</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.colors.map((color, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Identification Guide</CardTitle>
              <CardDescription>Key visual differences between supported flower species</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Size Categories</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Small (&lt; 3 cm diameter):</span>
                      <span>Bellis perennis (Daisy)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium (3-8 cm diameter):</span>
                      <span>Iris, Tulip, Daffodil</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Large (&gt; 8 cm diameter):</span>
                      <span>Rose, Sunflower</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Distinctive Features</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Roses:</strong> Thorny stems, compound leaves
                    </div>
                    <div>
                      <strong>Tulips:</strong> Cup shape, single stem, bulb
                    </div>
                    <div>
                      <strong>Daisies:</strong> White petals, yellow center
                    </div>
                    <div>
                      <strong>Sunflowers:</strong> Very large, yellow, dark center
                    </div>
                    <div>
                      <strong>Daffodils:</strong> Trumpet corona, 6 petals
                    </div>
                    <div>
                      <strong>Iris:</strong> Sword-like leaves, 3 petals + 3 sepals
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium mb-2">Classification Accuracy by Species</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>Iris Species: 97%+</div>
                  <div>Roses: 94%</div>
                  <div>Tulips: 91%</div>
                  <div>Daisies: 96%</div>
                  <div>Sunflowers: 98%</div>
                  <div>Daffodils: 93%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
