"use client"

import { FaSearch } from "react-icons/fa"

interface TProps {
  meta?: { total: number }
  searchQuery: string
  setSearchQuery: (query: string) => void
  navigate: (path: string) => void
}

const ProductListHeader = ({ meta, searchQuery, setSearchQuery, navigate }: TProps) => {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Product List</h1>
                  <div className="flex items-center">
                      <span className="text-sm sm:text-base text-gray-600">Total:</span>
                      <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
                          {meta?.total || 0}
                      </span>
                  </div>
              </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full sm:w-64 lg:w-80 pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate("/add-product")}
            className="inline-flex items-center justify-center px-4 py-2 text-md font-medium text-white bg-primary hover:bg-primary/70 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 transition-all duration-200 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Add New Product</span>
            <span className="sm:hidden">Add New</span>
          </button>
        </div>
      </div>
    </div>
  )
}


export default ProductListHeader;