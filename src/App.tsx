import { useState } from 'react'
import { Camera, Upload, ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'

type Screen = 'home' | 'camera' | 'gallery'
type Category = 'clothes' | 'eyewear' | 'makeup'

const categories = [
  {
    id: 'clothes' as const,
    name: 'Clothing',
    icon: '👕',
    color: 'from-purple-400 to-purple-600',
    description: 'Try on shirts, dresses & more'
  },
  {
    id: 'eyewear' as const,
    name: 'Eyewear',
    icon: '👓',
    color: 'from-orange-400 to-orange-600',
    description: 'Sunglasses & prescription frames'
  },
  {
    id: 'makeup' as const,
    name: 'Makeup',
    icon: '💄',
    color: 'from-pink-400 to-purple-600',
    description: 'Lipstick, eyeshadow & more'
  }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)

  const startCamera = () => {
    setCurrentScreen('camera')
    setIsStreaming(true)
  }

  const goHome = () => {
    setCurrentScreen('home')
    setIsStreaming(false)
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {currentScreen !== 'home' && (
            <button
              onClick={goHome}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          <div className="flex items-center gap-3 mx-auto">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">✨</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-orange-600 bg-clip-text text-transparent">
              TryLoom
            </h1>
          </div>
          
          {currentScreen !== 'home' && <div className="w-20" />}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-6">
        {currentScreen === 'home' && (
          <HomeScreen 
            onStartCamera={startCamera}
            onSelectCategory={(category) => {
              setSelectedCategory(category)
              setCurrentScreen('gallery')
            }}
          />
        )}
        
        {currentScreen === 'camera' && (
          <CameraScreen isStreaming={isStreaming} />
        )}
        
        {currentScreen === 'gallery' && selectedCategory && (
          <GalleryScreen 
            category={selectedCategory}
            onStartCamera={startCamera}
          />
        )}
      </main>
    </div>
  )
}

// Home Screen Component
function HomeScreen({ 
  onStartCamera, 
  onSelectCategory 
}: { 
  onStartCamera: () => void
  onSelectCategory: (category: Category) => void 
}) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fadeIn">
        <h2 className="text-6xl font-bold text-gray-900 mb-6 animate-slideUp">
          Try Before You Buy
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the future of shopping with our AI-powered virtual try-on technology
        </p>
        
        {/* Quick Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={onStartCamera}
            className="group bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
          >
            <Camera className="w-5 h-5 group-hover:animate-pulse" />
            Start Camera
          </button>
          <button className="group border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-2xl backdrop-blur-sm flex items-center gap-3 transition-all duration-300 transform hover:scale-105">
            <Upload className="w-5 h-5 group-hover:animate-bounce" />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="group p-8 cursor-pointer backdrop-blur-sm bg-white/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl transform hover:scale-105 hover:-translate-y-2"
            onClick={() => onSelectCategory(category.id)}
            style={{
              animationDelay: `${index * 150}ms`,
              animation: 'slideUp 0.6s ease-out forwards'
            }}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
              <span className="text-white text-2xl">{category.icon}</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Camera Screen Component
function CameraScreen({ isStreaming }: { isStreaming: boolean }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  const items = ['Classic Sunglasses', 'Designer Frames', 'Sport Glasses']

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-fadeIn">
        {/* Camera Feed */}
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
          {isStreaming ? (
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
              {/* Simulated camera feed with person */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="text-8xl animate-pulse">👤</div>
                  {selectedItem && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                      👓
                    </div>
                  )}
                </div>
              </div>
              
              {/* AR Overlay Effect */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="w-8 h-8 border-l-2 border-t-2 border-purple-400 animate-pulse"></div>
                <div className="w-8 h-8 border-r-2 border-t-2 border-purple-400 animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="w-8 h-8 border-l-2 border-b-2 border-purple-400 animate-pulse"></div>
                <div className="w-8 h-8 border-r-2 border-b-2 border-purple-400 animate-pulse"></div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  {isRecording ? 'RECORDING' : 'LIVE'}
                </div>
              </div>

              {/* Selected item overlay */}
              {selectedItem && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    Trying on: {selectedItem}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Camera will appear here</p>
            </div>
          )}
        </div>

        {/* Item Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select an item to try on:</h3>
          <div className="flex gap-3 flex-wrap">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedItem(item)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedItem === item
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button className="flex items-center gap-2 border-2 border-purple-200 hover:bg-purple-50 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
            📸 Capture
          </button>
          <button className="flex items-center gap-2 border-2 border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

// Gallery Screen Component  
function GalleryScreen({ 
  category, 
  onStartCamera 
}: { 
  category: Category
  onStartCamera: () => void 
}) {
  const categoryInfo = categories.find(c => c.id === category)!
  
  const items = [
    'Classic Sunglasses', 'Designer Frames', 'Sport Glasses',
    'Vintage Style', 'Modern Clear', 'Cat Eye Frames',
    'Aviator Glasses', 'Round Frames'
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className={`w-20 h-20 bg-gradient-to-br ${categoryInfo.color} rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse`}>
          <span className="text-white text-3xl">{categoryInfo.icon}</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {categoryInfo.name} Collection
        </h2>
        <p className="text-lg text-gray-600">
          {categoryInfo.description}
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {items.map((item, index) => (
          <div
            key={item}
            className="group p-4 cursor-pointer backdrop-blur-sm bg-white/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl transform hover:scale-105 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideUp 0.6s ease-out forwards'
            }}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform">
                {categoryInfo.icon}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{item}</h3>
            <button 
              onClick={onStartCamera}
              className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105"
            >
              Try On
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App