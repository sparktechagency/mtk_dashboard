"use client"

import { useState } from "react"

type ISingleProduct = {
  _id: string
  name: string
  categoryId: string
  categoryName: string
  currentPrice: number
  originalPrice: number
  discount: string
  ratings: number
  totalReview: number
  images: string[]
  colors: {
    _id: string
    name: string
    hexCode: string
  }[]
  sizes: {
    _id: string
    size: string
  }[]
  introduction: string
  description: string
  status: "visible" | "hidden"
  stockStatus: "in_stock" | "out_of_stock"
}

// Sample product data
const sampleProduct: ISingleProduct = {
  _id: "1",
  name: "Premium Cotton T-Shirt",
  categoryId: "cat1",
  categoryName: "Clothing",
  currentPrice: 29.99,
  originalPrice: 49.99,
  discount: "40%",
  ratings: 4.5,
  totalReview: 128,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  colors: [
    { _id: "c1", name: "Black", hexCode: "#000000" },
    { _id: "c2", name: "White", hexCode: "#FFFFFF" },
    { _id: "c3", name: "Navy", hexCode: "#1e3a8a" },
    { _id: "c4", name: "Gray", hexCode: "#6b7280" },
  ],
  sizes: [
    { _id: "s1", size: "XS" },
    { _id: "s2", size: "S" },
    { _id: "s3", size: "M" },
    { _id: "s4", size: "L" },
    { _id: "s5", size: "XL" },
  ],
  introduction:
    "Experience ultimate comfort with our premium cotton t-shirt, crafted from 100% organic cotton for a soft, breathable feel that lasts all day.",
  description:
    "This premium cotton t-shirt is designed for those who value both comfort and style. Made from sustainably sourced organic cotton, it features a classic fit that works for any occasion. The fabric is pre-shrunk and colorfast, ensuring your shirt maintains its shape and vibrant color wash after wash. Perfect for layering or wearing on its own, this versatile piece is a must-have addition to any wardrobe.",
  status: "visible",
  stockStatus: "in_stock",
}

type TProps = {
  product: ISingleProduct
}

const ProductDetails = ({ product}: TProps) =>{
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0]._id)
  const [selectedSize, setSelectedSize] = useState("")


  //const product = sampleProduct

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>,
      )
    }

    return stars
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        {/* <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors ${
                  selectedImage === index ? "border-blue-500" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div> */}

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div className="text-sm text-gray-500 uppercase tracking-wide">{product.categoryName}</div>

          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">{renderStars(product.ratings)}</div>
            <span className="text-sm text-gray-600">
              {product.ratings} ({product.totalReview} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.currentPrice}</span>
            {product.originalPrice > product.currentPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {product.discount} OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${product.stockStatus === "in_stock" ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span
              className={`text-sm font-medium ${
                product.stockStatus === "in_stock" ? "text-green-700" : "text-red-700"
              }`}
            >
              {product.stockStatus === "in_stock" ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Introduction */}
          <p className="text-gray-600 leading-relaxed">{product.introduction}</p>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color._id}
                  onClick={() => setSelectedColor(color._id)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color._id ? "border-gray-900 scale-110" : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size._id}
                  onClick={() => setSelectedSize(size._id)}
                  className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                    selectedSize === size._id
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
