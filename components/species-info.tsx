"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flower, Droplets, Sun, Thermometer, Leaf, Pill } from "lucide-react"
import MedicinalDatabase from "./medicinal-database"

const speciesData = {
  setosa: {
    scientific_name: "Iris setosa",
    common_names: ["Bristle-pointed Iris", "Blue Flag"],
    characteristics: [
      "Smallest petals among the three species",
      "Most distinct and easily separable",
      "Typically found in cooler climates",
    ],
    habitat: "Arctic and subarctic regions, wetlands",
    medicinal_uses: [
      "Traditional use for treating wounds",
      "Anti-inflammatory properties",
      "Used in folk medicine for skin conditions",
    ],
    growing_conditions: {
      soil: "Moist, well-drained soil",
      sunlight: "Full sun to partial shade",
      temperature: "Cold hardy, prefers cooler temperatures",
      water: "Regular watering, tolerates wet conditions",
    },
    color: "blue",
  },
  versicolor: {
    scientific_name: "Iris versicolor",
    common_names: ["Blue Flag Iris", "Harlequin Blueflag"],
    characteristics: [
      "Medium-sized petals and sepals",
      "Purple-blue flowers with yellow markings",
      "Most common in temperate regions",
    ],
    habitat: "Wetlands, marshes, pond edges",
    medicinal_uses: [
      "Historically used as a cathartic",
      "Traditional treatment for digestive issues",
      "Used in homeopathic preparations",
    ],
    growing_conditions: {
      soil: "Wet to moist soil, tolerates clay",
      sunlight: "Full sun to partial shade",
      temperature: "Moderate temperatures, frost tolerant",
      water: "Prefers consistently moist to wet conditions",
    },
    color: "green",
  },
  virginica: {
    scientific_name: "Iris virginica",
    common_names: ["Virginia Iris", "Southern Blue Flag"],
    characteristics: [
      "Largest petals and sepals",
      "Tall growing with blue to purple flowers",
      "Most variable in measurements",
    ],
    habitat: "Wetlands, swamps, coastal areas",
    medicinal_uses: [
      "Root used in traditional medicine",
      "Anti-inflammatory and antiseptic properties",
      "Historical use for treating rheumatism",
    ],
    growing_conditions: {
      soil: "Moist to wet, acidic soil",
      sunlight: "Full sun to partial shade",
      temperature: "Warm temperate climates",
      water: "High water requirements, bog conditions",
    },
    color: "purple",
  },
}

export function SpeciesInfo() {
  const getSpeciesColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "purple":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Iris Species Information</h2>
        <p className="text-muted-foreground">
          Learn about the three Iris species, their characteristics, and growing requirements
        </p>
      </div>

      <Tabs defaultValue="species" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="species" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            Species Guide
          </TabsTrigger>
          <TabsTrigger value="medicinal" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Medicinal Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="species" className="space-y-4">
          <Tabs defaultValue="setosa" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setosa">Iris Setosa</TabsTrigger>
              <TabsTrigger value="versicolor">Iris Versicolor</TabsTrigger>
              <TabsTrigger value="virginica">Iris Virginica</TabsTrigger>
            </TabsList>

            {Object.entries(speciesData).map(([key, species]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Flower className="h-6 w-6" />
                        {species.scientific_name}
                      </CardTitle>
                      <Badge className={getSpeciesColor(species.color)}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription>Common names: {species.common_names.join(", ")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Characteristics</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {species.characteristics.map((char, index) => (
                          <li key={index}>{char}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Natural Habitat</h4>
                      <p className="text-sm">{species.habitat}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Medicinal Uses</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {species.medicinal_uses.map((use, index) => (
                          <li key={index}>{use}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: This information is for educational purposes only. Consult healthcare professionals before
                        using any plant medicinally.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Growing Conditions</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Leaf className="h-4 w-4 mt-0.5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Soil</p>
                            <p className="text-xs text-muted-foreground">{species.growing_conditions.soil}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sun className="h-4 w-4 mt-0.5 text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium">Sunlight</p>
                            <p className="text-xs text-muted-foreground">{species.growing_conditions.sunlight}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Thermometer className="h-4 w-4 mt-0.5 text-red-600" />
                          <div>
                            <p className="text-sm font-medium">Temperature</p>
                            <p className="text-xs text-muted-foreground">{species.growing_conditions.temperature}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Droplets className="h-4 w-4 mt-0.5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">Water</p>
                            <p className="text-xs text-muted-foreground">{species.growing_conditions.water}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="medicinal" className="space-y-4">
          <MedicinalDatabase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
