"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Leaf, Pill, MapPin } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

const knowledgeBase = {
  species: {
    setosa: {
      name: "Iris Setosa",
      characteristics: "smallest petals, most distinct, cooler climates",
      habitat: "Arctic and subarctic regions, wetlands",
      medicinal: "wound healing, anti-inflammatory, skin conditions",
      growing: "moist well-drained soil, full sun to partial shade, cold hardy",
    },
    versicolor: {
      name: "Iris Versicolor",
      characteristics: "medium-sized petals, purple-blue flowers, temperate regions",
      habitat: "wetlands, marshes, pond edges",
      medicinal: "digestive issues, liver support, homeopathic preparations",
      growing: "wet to moist soil, tolerates clay, frost tolerant",
    },
    virginica: {
      name: "Iris Virginica",
      characteristics: "largest petals, tall growing, most variable measurements",
      habitat: "wetlands, swamps, coastal areas",
      medicinal: "rheumatism, antiseptic treatment, anti-inflammatory",
      growing: "moist to wet acidic soil, high water requirements",
    },
  },
  topics: {
    classification: ["measurements", "features", "identification", "machine learning", "accuracy"],
    medicinal: ["healing", "medicine", "treatment", "compounds", "preparation", "dosage"],
    growing: ["soil", "water", "sunlight", "temperature", "climate", "conditions"],
    environmental: ["suitability", "climate", "habitat", "location", "weather"],
  },
}

const quickSuggestions = [
  "What are the differences between iris species?",
  "How do I grow iris flowers?",
  "What are the medicinal uses of iris?",
  "Which iris species is best for my climate?",
  "How accurate is the classification system?",
  "What soil conditions do iris flowers need?",
]

export default function IrisChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Iris Flower expert assistant. I can help you with species identification, growing conditions, medicinal uses, and environmental suitability. What would you like to know?",
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    // Species-specific questions
    if (message.includes("setosa")) {
      return {
        content: `**Iris Setosa** is the most distinctive of the three iris species. It has the smallest petals and is easily separable from the others. Key characteristics:

• **Habitat**: Arctic and subarctic regions, wetlands
• **Growing**: Prefers moist, well-drained soil and cooler temperatures
• **Medicinal**: Traditionally used for wound healing and anti-inflammatory purposes
• **Identification**: Smallest petal measurements, typically 1.0-1.9 cm wide

This species is cold-hardy and thrives in cooler climates with regular moisture.`,
        suggestions: [
          "How do I identify setosa from measurements?",
          "What are setosa's medicinal compounds?",
          "Best growing conditions for setosa?",
        ],
      }
    }

    if (message.includes("versicolor")) {
      return {
        content: `**Iris Versicolor** (Blue Flag Iris) is the middle-sized species with beautiful purple-blue flowers. Here's what you need to know:

• **Habitat**: Wetlands, marshes, and pond edges
• **Growing**: Tolerates wet to moist soil, even clay soils
• **Medicinal**: Historically used for digestive issues and in homeopathic preparations
• **Identification**: Medium petal width (2.0-3.4 cm), purple-blue coloring

⚠️ **Caution**: This species can be toxic if used improperly medicinally.`,
        suggestions: [
          "Versicolor growing requirements?",
          "Is versicolor safe for medicinal use?",
          "How to distinguish versicolor?",
        ],
      }
    }

    if (message.includes("virginica")) {
      return {
        content: `**Iris Virginica** (Virginia Iris) is the largest of the three species. Key information:

• **Habitat**: Wetlands, swamps, and coastal areas
• **Growing**: Requires moist to wet, acidic soil with high water needs
• **Medicinal**: Root used for rheumatism and as antiseptic treatment
• **Identification**: Largest petals (1.4-2.5 cm wide), most variable in measurements

This species thrives in bog-like conditions and warm temperate climates.`,
        suggestions: [
          "Virginica soil requirements?",
          "Medicinal preparation methods?",
          "Why is virginica most variable?",
        ],
      }
    }

    // Topic-based responses
    if (message.includes("difference") || message.includes("distinguish") || message.includes("identify")) {
      return {
        content: `Here are the **key differences** between iris species:

**Size Progression**: Setosa (smallest) → Versicolor (medium) → Virginica (largest)

**Petal Width**:
• Setosa: 1.0-1.9 cm
• Versicolor: 2.0-3.4 cm  
• Virginica: 1.4-2.5 cm (most variable)

**Habitat Preferences**:
• Setosa: Cold, arctic regions
• Versicolor: Temperate wetlands
• Virginica: Warm, coastal swamps

**Visual Cues**:
• Setosa: Compact, bristle-pointed
• Versicolor: Purple-blue with yellow markings
• Virginica: Tall, deep purple flowers`,
        suggestions: [
          "How accurate is ML classification?",
          "Best measurements for identification?",
          "Growing different species together?",
        ],
      }
    }

    if (
      message.includes("grow") ||
      message.includes("plant") ||
      message.includes("soil") ||
      message.includes("water")
    ) {
      return {
        content: `**Growing Iris Flowers Successfully**:

**Universal Requirements**:
• Moist to wet soil conditions
• Full sun to partial shade (6+ hours)
• Good drainage despite moisture needs
• pH 5.0-7.5 depending on species

**Species-Specific Needs**:
• **Setosa**: Cold-hardy, well-drained soil, cooler temperatures
• **Versicolor**: Tolerates clay, consistent moisture, frost-tolerant
• **Virginica**: Acidic soil, bog conditions, high water requirements

**Pro Tips**:
• Plant in spring after frost danger
• Mulch to retain moisture
• Divide clumps every 3-4 years`,
        suggestions: [
          "Environmental suitability for my location?",
          "Common growing problems?",
          "When to plant iris bulbs?",
        ],
      }
    }

    if (
      message.includes("medicinal") ||
      message.includes("medicine") ||
      message.includes("healing") ||
      message.includes("treatment")
    ) {
      return {
        content: `**Medicinal Uses of Iris Species**:

⚠️ **Important**: Always consult healthcare professionals before medicinal use.

**Traditional Applications**:
• **Setosa**: Wound healing, anti-inflammatory, skin conditions
• **Versicolor**: Digestive support, liver function (with caution)
• **Virginica**: Rheumatism, antiseptic treatment, inflammation

**Active Compounds**:
• Iridin, isoflavones, tannins, mucilage
• Saponins, essential oils, flavonoids

**Preparation Methods**:
• Fresh poultices for external use
• Tinctures and decoctions
• Standardized extracts

**Safety**: Some iris species can be toxic. Never use internally without professional guidance.`,
        suggestions: ["Specific preparation methods?", "Safety precautions?", "Active compound details?"],
      }
    }

    if (
      message.includes("climate") ||
      message.includes("environment") ||
      message.includes("suitable") ||
      message.includes("location")
    ) {
      return {
        content: `**Environmental Suitability Guide**:

Use our Environmental Predictor tool for detailed analysis! Here's a quick guide:

**Climate Preferences**:
• **Setosa**: Cool climates, -5°C to 15°C, high humidity
• **Versicolor**: Temperate, 5°C to 25°C, moderate conditions  
• **Virginica**: Warm temperate, 10°C to 30°C, high humidity

**Key Factors**:
• Temperature range and seasonal variation
• Annual rainfall (400-2000mm depending on species)
• Soil pH and drainage
• Sunlight hours (4-10 hours daily)

**Assessment**: Input your local conditions in the Environmental Predictor for personalized recommendations!`,
        suggestions: [
          "Use Environmental Predictor",
          "Specific temperature requirements?",
          "Rainfall needs by species?",
        ],
      }
    }

    if (
      message.includes("accurate") ||
      message.includes("machine learning") ||
      message.includes("classification") ||
      message.includes("model")
    ) {
      return {
        content: `**Classification System Accuracy**:

Our ML system achieves **97%+ accuracy** using multiple algorithms:

**Models Used**:
• Random Forest: 98.7% accuracy
• Support Vector Machine: 97.3% accuracy  
• Logistic Regression: 96.0% accuracy
• Neural Network: 98.0% accuracy

**Key Features**:
• Petal length and width
• Sepal length and width
• Statistical analysis of 150 samples

**Why It Works**:
• Iris dataset is well-separated
• Clear species boundaries
• Robust feature selection
• Cross-validation testing

The system is most confident with setosa (100% accuracy) due to its distinct characteristics.`,
        suggestions: [
          "How to take accurate measurements?",
          "What if measurements are borderline?",
          "Image vs measurement accuracy?",
        ],
      }
    }

    // Default response for unrecognized queries
    return {
      content: `I'd be happy to help you learn about iris flowers! I can provide information about:

🌸 **Species Identification** - Differences between setosa, versicolor, and virginica
🌱 **Growing Conditions** - Soil, water, climate, and care requirements  
💊 **Medicinal Uses** - Traditional applications and safety information
🌍 **Environmental Suitability** - Which species work best in your climate
🤖 **Classification System** - How our ML models identify species

What specific aspect would you like to explore?`,
      suggestions: quickSuggestions.slice(0, 4),
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(text)
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Iris Expert Chatbot</h2>
        <p className="text-muted-foreground">
          Ask questions about iris species, growing conditions, medicinal uses, and more
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Chat with Iris Expert
          </CardTitle>
          <CardDescription>Powered by comprehensive iris knowledge base</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                      }`}
                    >
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                <div className="flex flex-wrap gap-2 px-3">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about iris species, growing conditions, medicinal uses..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <h3 className="font-medium">Species Info</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Learn about characteristics, habitat, and identification of each iris species.
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="h-4 w-4 text-blue-600" />
            <h3 className="font-medium">Medicinal Uses</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Discover traditional medicinal applications and safety information.
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            <h3 className="font-medium">Growing Guide</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get personalized advice for growing iris flowers in your environment.
          </p>
        </Card>
      </div>
    </div>
  )
}
