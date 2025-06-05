import { useState, useRef } from 'react'
import { Camera, Upload, ArrowLeft, Play, Pause, RotateCcw, Image, X } from 'lucide-react'

type Screen = 'home' | 'camera' | 'gallery'
type Category = 'clothes' | 'eyewear' | 'makeup'

interface Product {
  id: string
  name: string
  image: string
  price: string
  category: Category
}

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

const products: Product[] = [
  // Clothing
  { id: '1', name: 'Classic White Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', price: '$89', category: 'clothes' },
  { id: '2', name: 'Vintage Denim Jacket', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop', price: '$125', category: 'clothes' },
  { id: '3', name: 'Summer Floral Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', price: '$95', category: 'clothes' },
  { id: '4', name: 'Casual Navy Sweater', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop', price: '$79', category: 'clothes' },
  { id: '5', name: 'Elegant Black Blazer', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', price: '$149', category: 'clothes' },
  { id: '6', name: 'Cozy Knit Cardigan', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop', price: '$89', category: 'clothes' },
  
  // Eyewear
  { id: '7', name: 'Classic Aviators', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', price: '$199', category: 'eyewear' },
  { id: '8', name: 'Round Vintage Frames', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop', price: '$159', category: 'eyewear' },
  { id: '9', name: 'Cat Eye Sunglasses', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop', price: '$179', category: 'eyewear' },
  { id: '10', name: 'Designer Sports Frames', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop', price: '$229', category: 'eyewear' },
  { id: '11', name: 'Clear Fashion Glasses', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop', price: '$89', category: 'eyewear' },
  { id: '12', name: 'Oversized Chic Frames', image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400&h=400&fit=crop', price: '$149', category: 'eyewear' },
  
  // Makeup
  { id: '13', name: 'Ruby Red Lipstick', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop', price: '$28', category: 'makeup' },
  { id: '14', name: 'Nude Matte Collection', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop', price: '$45', category: 'makeup' },
  { id: '15', name: 'Golden Eyeshadow Palette', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop', price: '$52', category: 'makeup' },
  { id: '16', name: 'Natural Glow Foundation', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', price: '$38', category: 'makeup' },
  { id: '17', name: 'Bold Eyeliner Set', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop', price: '$32', category: 'makeup' },
  { id: '18', name: 'Blush & Highlight Duo', image: 'https://images.unsplash.com/photo-1583241800792-9c0fca8e9ca2?w=400&h=400&fit=crop', price: '$42', category: 'makeup' }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = () => {
    setCurrentScreen('camera')
    setIsStreaming(true)
  }

  const handleImageUpload = () => {
    setShowImageUpload(true)
  }

  const goHome = () => {
    setCurrentScreen('home')
    setIsStreaming(false)
    setSelectedCategory(null)
    setUploadedImage(null)
    setShowImageUpload(false)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setCurrentScreen('camera')
        setIsStreaming(false)
        setShowImageUpload(false)
      }
      reader.readAsDataURL(file)
    }
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
            onImageUpload={handleImageUpload}
            onSelectCategory={(category) => {
              setSelectedCategory(category)
              setCurrentScreen('gallery')
            }}
          />
        )}
        
        {currentScreen === 'camera' && (
          <CameraScreen 
            isStreaming={isStreaming} 
            uploadedImage={uploadedImage}
            selectedCategory={selectedCategory}
          />
        )}
        
        {currentScreen === 'gallery' && selectedCategory && (
          <GalleryScreen 
            category={selectedCategory}
            onStartCamera={startCamera}
          />
        )}
      </main>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUploadModal 
          onClose={() => setShowImageUpload(false)}
          onFileSelect={handleFileSelect}
          onSampleSelect={(imageUrl) => {
            setUploadedImage(imageUrl)
            setCurrentScreen('camera')
            setIsStreaming(false)
            setShowImageUpload(false)
          }}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  )
}

// Home Screen Component
function HomeScreen({ 
  onStartCamera, 
  onImageUpload,
  onSelectCategory 
}: { 
  onStartCamera: () => void
  onImageUpload: () => void
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
          <button 
            onClick={onImageUpload}
            className="group border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-2xl backdrop-blur-sm flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
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
function CameraScreen({ 
  isStreaming, 
  uploadedImage,
  selectedCategory 
}: { 
  isStreaming: boolean
  uploadedImage: string | null
  selectedCategory: Category | null
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  const availableProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory).slice(0, 6)
    : products.slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-fadeIn">
        {/* Camera Feed */}
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
          {uploadedImage ? (
            <div className="relative w-full h-full">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-full object-cover rounded-2xl"
              />
              {selectedProduct && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm">
                    Trying on: {selectedProduct.name}
                  </div>
                </div>
              )}
            </div>
          ) : isStreaming ? (
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
              {/* Simulated camera feed with person */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="text-8xl animate-pulse">👤</div>
                  {selectedProduct && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                      {categories.find(c => c.id === selectedProduct.category)?.icon || '✨'}
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
              {selectedProduct && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                    Trying on: {selectedProduct.name} - {selectedProduct.price}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Camera will appear here</p>
              <p className="text-sm">Or upload an image to try products</p>
            </div>
          )}
        </div>

        {/* Product Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select a product to try on:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {availableProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedProduct?.id === product.id
                    ? 'ring-4 ring-purple-500 shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="aspect-square relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-medium text-sm text-gray-900 mb-1 truncate">{product.name}</h4>
                  <p className="text-sm text-purple-600 font-semibold">{product.price}</p>
                </div>
              </div>
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
  const categoryProducts = products.filter(p => p.category === category)

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

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {categoryProducts.map((product, index) => (
          <div
            key={product.id}
            className="group cursor-pointer backdrop-blur-sm bg-white/70 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideUp 0.6s ease-out forwards'
            }}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{product.name}</h3>
              <p className="text-lg font-bold text-purple-600 mb-3">{product.price}</p>
              <button 
                onClick={onStartCamera}
                className="w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105"
              >
                Try On
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Image Upload Modal Component
function ImageUploadModal({ 
  onClose, 
  onFileSelect, 
  onSampleSelect,
  fileInputRef 
}: {
  onClose: () => void
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSampleSelect: (imageUrl: string) => void
  fileInputRef: React.RefObject<HTMLInputElement>
}) {
  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const sampleImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&face'
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Choose Photo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Upload from Gallery */}
          <button
            onClick={handleGalleryClick}
            className="w-full p-4 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Image className="w-6 h-6 text-purple-500" />
            <span className="text-lg font-medium text-gray-700">Upload from Gallery</span>
          </button>

          {/* Sample Images */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Or try with sample photos:</p>
            <div className="grid grid-cols-2 gap-3">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onSampleSelect(image)}
                  className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img 
                    src={image} 
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default App