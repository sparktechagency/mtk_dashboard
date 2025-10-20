import { X, RefreshCw } from "lucide-react"
import { FaSearch } from "react-icons/fa"

interface OrderListHeaderProps {
  meta?: { total: number }
  status: string
  setStatus: (status: string) => void
  setCurrentPage: (page: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onRefresh?: () => void;
  isFetching?:boolean
}

const OrderListHeader = ({
  meta,
  status,
  setStatus,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  onRefresh,
  isFetching
}: OrderListHeaderProps) => {
  return (
    <div className="p-4 sm:p-4 bg-white">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        {/* Title and Total */}
        <div className="flex justify-between space-y-2 sm:flex-row items-center sm:space-y-0 sm:space-x-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Order List</h1>
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-gray-600">Total:</span>
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
              {meta?.total || 0}
            </span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          {/* Filter Dropdown */}
          <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Status:</label>
            <select
              className="w-full sm:w-auto min-w-[140px] px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isFetching}
              className={`w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2`}
              title="Refresh orders"
            >
              <RefreshCw className={`h-4 w-4 sm:h-6 sm:w-6 ${isFetching && 'animate-spin'}`} />
              <span className="sm:hidden">Refresh</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderListHeader
