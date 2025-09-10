import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flower, BarChart3, Camera, Calculator, Info } from "lucide-react"
import { MeasurementForm } from "@/components/measurement-form"
import { SpeciesInfo } from "@/components/species-info"
import { AnalysisDashboard } from "@/components/analysis-dashboard"
import ImageClassifier from "@/components/image-classifier"
import EnvironmentalPredictor from "@/components/environmental-predictor"
import IrisChatbot from "@/components/iris-chatbot"
import MultiSpeciesClassifier from "@/components/multi-species-classifier"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flower className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-balance">Iris Flower Classification System</h1>
          </div>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Advanced machine learning system for flower identification with medicinal insights and environmental
            recommendations
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="classify" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="classify" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Classify
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="species" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Species Info
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classify" className="space-y-6">
            <MeasurementForm />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AnalysisDashboard />
          </TabsContent>

          <TabsContent value="species" className="space-y-6">
            <SpeciesInfo />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <ImageClassifier />
            <EnvironmentalPredictor />
            <IrisChatbot />
            <MultiSpeciesClassifier />
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-muted-foreground">Flower Species</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">150+</div>
            <div className="text-sm text-muted-foreground">Training Samples</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">6</div>
            <div className="text-sm text-muted-foreground">Features</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">95%+</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
