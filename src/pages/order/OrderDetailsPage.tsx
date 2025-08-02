"use client"

import { ArrowLeft, Calendar, CreditCard, Package, Truck } from "lucide-react"
import Image from "next/image"

const OrderDetailsPage = () =>{
  // Sample order data based on your structure
  const orderData = {
    _id: "688b2ee68459676776708b99",
    token: "207024",
    totalPrice: 90,
    paymentStatus: "unpaid",
    status: "delivered",
    deliveryAt: null,
    createdAt: "2025-07-31T08:52:54.847Z",
    products: [
      {
        productId: "68836ddb95d774c2e4fb5de9",
        name: "Pokemon",
        price: 40,
        quantity: 1,
        total: 40,
        image: "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753785163/MTK-Ecommerce/erwefh2wyrwxhouotrw2.png",
      },
      {
        productId: "68837329eb7590fe60aa9115",
        name: "Pokemon Three",
        price: 50,
        quantity: 1,
        total: 50,
        image: "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753784983/MTK-Ecommerce/czdw27cgrmufkoixqqns.png",
        colorName: "Gray",
        colorHexCode: "#808080",
      },
    ],
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order #{orderData.token}</h1>
              <p className="text-gray-600 mt-1">Placed on {formatDate(orderData.createdAt)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(orderData.status)}`}>
                {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(orderData.paymentStatus)}`}
              >
                {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Order Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-500">{formatDate(orderData.createdAt)}</p>
                  </div>
                </div>
                {orderData.status === "delivered" && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-500">
                        {orderData.deliveryAt ? formatDate(orderData.deliveryAt) : "Recently delivered"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({orderData.products.length})</h2>
              <div className="space-y-4">
                {orderData.products.map((product, index) => (
                  <div key={product.productId} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                      {product.colorName && (
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 mr-2">Color:</span>
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                            style={{ backgroundColor: product.colorHexCode }}
                          ></div>
                          <span className="text-sm text-gray-600">{product.colorName}</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                          <span className="text-sm text-gray-600">${product.price.toFixed(2)} each</span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span className="text-lg font-semibold text-gray-900">${product.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${orderData.products.reduce((sum, product) => sum + product.total, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">${orderData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order ID</p>
                    <p className="text-sm text-gray-600">{orderData._id}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Date</p>
                    <p className="text-sm text-gray-600">{formatDate(orderData.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Status</p>
                    <p className="text-sm text-gray-600 capitalize">{orderData.paymentStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                  Track Package
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Invoice
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderDetailsPage;