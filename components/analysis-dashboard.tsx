"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Target, TrendingUp, Database } from "lucide-react"

export function AnalysisDashboard() {
  const modelResults = [
    {
      name: "Logistic Regression",
      accuracy: 0.9778,
      precision: 0.9778,
      recall: 0.9778,
      status: "best",
    },
    {
      name: "K-Nearest Neighbors",
      accuracy: 0.9556,
      precision: 0.9556,
      recall: 0.9556,
      status: "good",
    },
    {
      name: "Decision Tree",
      accuracy: 0.9333,
      precision: 0.9333,
      recall: 0.9333,
      status: "good",
    },
  ]

  const datasetStats = {
    total_samples: 150,
    features: 4,
    species: 3,
    train_samples: 105,
    test_samples: 45,
  }

  const featureImportance = [
    { feature: "Petal Length", importance: 0.45 },
    { feature: "Petal Width", importance: 0.38 },
    { feature: "Sepal Length", importance: 0.12 },
    { feature: "Sepal Width", importance: 0.05 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">ML Analysis Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of the Iris classification models and dataset insights
        </p>
      </div>

      {/* Dataset Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Dataset Overview
          </CardTitle>
          <CardDescription>Key statistics about the Iris dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{datasetStats.total_samples}</div>
              <div className="text-sm text-muted-foreground">Total Samples</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{datasetStats.features}</div>
              <div className="text-sm text-muted-foreground">Features</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{datasetStats.species}</div>
              <div className="text-sm text-muted-foreground">Species</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{datasetStats.train_samples}</div>
              <div className="text-sm text-muted-foreground">Training</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{datasetStats.test_samples}</div>
              <div className="text-sm text-muted-foreground">Testing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Model Performance Comparison
          </CardTitle>
          <CardDescription>Accuracy, precision, and recall scores for different algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modelResults.map((model, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">{model.name}</h4>
                    <p className="text-sm text-muted-foreground">Machine Learning Algorithm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="font-semibold">{(model.accuracy * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="font-semibold">{(model.precision * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Recall</div>
                    <div className="font-semibold">{(model.recall * 100).toFixed(1)}%</div>
                  </div>
                  {model.status === "best" && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Best Model
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Feature Importance
          </CardTitle>
          <CardDescription>Which measurements are most important for classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{feature.feature}</span>
                  <span className="text-muted-foreground">{(feature.importance * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${feature.importance * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Key Insight:</strong> Petal measurements (length and width) are significantly more important than
              sepal measurements for distinguishing between Iris species, accounting for over 80% of the classification
              decision.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
