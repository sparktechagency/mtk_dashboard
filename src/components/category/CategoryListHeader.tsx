"use client"

import { FaSearch } from "react-icons/fa"
import CreateCategoryModal from "../modal/category/CreateCategoryModal"

interface TProps {
  meta?: { total: number }
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const CategoryListHeader = ({ meta, searchQuery, setSearchQuery }: TProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Category List</h1>
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
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full sm:w-64 lg:w-80 pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <CreateCategoryModal/>
        </div>
      </div>
    </div>
  )
}


export default CategoryListHeader;