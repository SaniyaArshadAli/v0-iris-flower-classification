"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Pill, AlertTriangle, BookOpen, Leaf } from "lucide-react"

interface MedicinalUse {
  condition: string
  preparation: string
  dosage: string
  effectiveness: "High" | "Moderate" | "Low"
  evidence: "Traditional" | "Clinical" | "Research"
  precautions: string[]
}

interface MedicinalData {
  species: string
  active_compounds: string[]
  primary_uses: MedicinalUse[]
  contraindications: string[]
  side_effects: string[]
  preparation_methods: string[]
  historical_context: string
}

const medicinalDatabase: Record<string, MedicinalData> = {
  setosa: {
    species: "Iris setosa",
    active_compounds: ["Iridin", "Isoflavones", "Tannins", "Mucilage"],
    primary_uses: [
      {
        condition: "Wound Healing",
        preparation: "Poultice from fresh rhizome",
        dosage: "Apply topically 2-3 times daily",
        effectiveness: "High",
        evidence: "Traditional",
        precautions: ["Clean wound thoroughly", "Monitor for allergic reactions"],
      },
      {
        condition: "Skin Inflammation",
        preparation: "Decoction of dried root",
        dosage: "Wash affected area twice daily",
        effectiveness: "Moderate",
        evidence: "Traditional",
        precautions: ["Patch test before use", "Avoid open wounds"],
      },
      {
        condition: "Joint Pain",
        preparation: "Tincture (1:5 ratio)",
        dosage: "5-10 drops, 3 times daily",
        effectiveness: "Moderate",
        evidence: "Traditional",
        precautions: ["Not for internal use in pregnancy", "Consult healthcare provider"],
      },
    ],
    contraindications: ["Pregnancy", "Breastfeeding", "Kidney disorders"],
    side_effects: ["Skin irritation", "Digestive upset if taken internally", "Allergic reactions"],
    preparation_methods: ["Fresh poultice", "Dried root decoction", "Alcohol tincture", "Oil infusion"],
    historical_context:
      "Used by Arctic indigenous peoples for centuries as a primary wound treatment and anti-inflammatory remedy.",
  },
  versicolor: {
    species: "Iris versicolor",
    active_compounds: ["Irisin", "Resin", "Volatile oils", "Starch"],
    primary_uses: [
      {
        condition: "Digestive Issues",
        preparation: "Root powder in capsules",
        dosage: "250mg, twice daily with meals",
        effectiveness: "Moderate",
        evidence: "Traditional",
        precautions: ["Start with lower dose", "Take with food", "Monitor for nausea"],
      },
      {
        condition: "Liver Support",
        preparation: "Standardized extract",
        dosage: "100mg daily",
        effectiveness: "Low",
        evidence: "Research",
        precautions: ["Regular liver function monitoring", "Avoid with liver disease"],
      },
      {
        condition: "Skin Conditions",
        preparation: "External wash from decoction",
        dosage: "Apply to affected area once daily",
        effectiveness: "Moderate",
        evidence: "Traditional",
        precautions: ["Dilute properly", "Discontinue if irritation occurs"],
      },
    ],
    contraindications: ["Liver disease", "Gallbladder disorders", "Children under 12"],
    side_effects: ["Nausea", "Vomiting", "Diarrhea", "Liver toxicity (rare)"],
    preparation_methods: ["Root powder", "Standardized extract", "Decoction", "Homeopathic dilution"],
    historical_context:
      "Widely used in 19th-century American medicine as a cathartic and liver remedy, though modern use is limited due to toxicity concerns.",
  },
  virginica: {
    species: "Iris virginica",
    active_compounds: ["Iridin glycoside", "Flavonoids", "Saponins", "Essential oils"],
    primary_uses: [
      {
        condition: "Rheumatism",
        preparation: "Root tincture",
        dosage: "10-15 drops, 2-3 times daily",
        effectiveness: "Moderate",
        evidence: "Traditional",
        precautions: ["Not for long-term use", "Monitor for side effects"],
      },
      {
        condition: "Antiseptic Treatment",
        preparation: "Fresh root poultice",
        dosage: "Apply to cleaned wound, change daily",
        effectiveness: "High",
        evidence: "Traditional",
        precautions: ["Use only on external wounds", "Keep wound clean"],
      },
      {
        condition: "Inflammation",
        preparation: "Standardized root extract",
        dosage: "50-100mg daily",
        effectiveness: "Moderate",
        evidence: "Research",
        precautions: ["Consult healthcare provider", "Monitor for allergic reactions"],
      },
    ],
    contraindications: ["Pregnancy", "Nursing mothers", "Autoimmune conditions"],
    side_effects: ["Skin sensitivity", "Gastrointestinal upset", "Allergic dermatitis"],
    preparation_methods: ["Fresh root poultice", "Alcohol tincture", "Standardized extract", "Dried root tea"],
    historical_context:
      "Traditional medicine of southeastern United States, particularly valued by Native American tribes for its antiseptic and anti-inflammatory properties.",
  },
}

export default function MedicinalDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)

  const filteredData = Object.entries(medicinalDatabase).filter(
    ([key, data]) =>
      data.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.primary_uses.some((use) => use.condition.toLowerCase().includes(searchTerm.toLowerCase())) ||
      data.active_compounds.some((compound) => compound.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case "Clinical":
        return "bg-blue-100 text-blue-800"
      case "Research":
        return "bg-purple-100 text-purple-800"
      case "Traditional":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Medicinal Uses Database</h2>
        <p className="text-muted-foreground">
          Comprehensive information about traditional and researched medicinal applications
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Medical Disclaimer:</strong> This information is for educational purposes only. Always consult
          qualified healthcare professionals before using any plant medicinally. Some iris species can be toxic if used
          improperly.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by species, condition, or compound..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setSearchTerm("")} disabled={!searchTerm}>
          Clear
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="uses">Medicinal Uses</TabsTrigger>
          <TabsTrigger value="safety">Safety Info</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {filteredData.map(([key, data]) => (
              <Card key={key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    {data.species}
                  </CardTitle>
                  <CardDescription>{data.historical_context}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Active Compounds</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.active_compounds.map((compound, index) => (
                          <Badge key={index} variant="secondary">
                            {compound}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Primary Conditions Treated</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.primary_uses.map((use, index) => (
                          <Badge key={index} className={getEffectivenessColor(use.effectiveness)}>
                            {use.condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="uses" className="space-y-4">
          {filteredData.map(([key, data]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  {data.species} - Medicinal Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.primary_uses.map((use, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{use.condition}</h4>
                        <div className="flex gap-2">
                          <Badge className={getEffectivenessColor(use.effectiveness)}>{use.effectiveness}</Badge>
                          <Badge className={getEvidenceColor(use.evidence)}>{use.evidence}</Badge>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Preparation:</strong> {use.preparation}
                          </p>
                          <p>
                            <strong>Dosage:</strong> {use.dosage}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Precautions:</strong>
                          </p>
                          <ul className="list-disc list-inside text-xs mt-1">
                            {use.precautions.map((precaution, idx) => (
                              <li key={idx}>{precaution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          {filteredData.map(([key, data]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  {data.species} - Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-red-700">Contraindications</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {data.contraindications.map((contra, index) => (
                        <li key={index}>{contra}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-orange-700">Potential Side Effects</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {data.side_effects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preparation" className="space-y-4">
          {filteredData.map(([key, data]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  {data.species} - Preparation Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.preparation_methods.map((method, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">{method}</h4>
                      <p className="text-sm text-muted-foreground">
                        Traditional preparation method used in herbal medicine practices.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
