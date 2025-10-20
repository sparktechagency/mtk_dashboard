import { FaSearch } from "react-icons/fa"
import type { IMeta } from "../../types/global.type"
import { X } from "lucide-react"

interface TProps {
  meta: IMeta
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const UserListHeader = ({meta, searchQuery, setSearchQuery}: TProps) => {

  return (
    <div className="p-3 sm:p-4">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Title and Total Section */}
        <div className="flex justify-between sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
         <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">User List</h1>
           <div className="flex items-center">
             <span className="text-sm sm:text-base text-gray-600">Total:</span>
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
                {meta?.total || 0}
              </span>
            </div>
        </div>

        {/* Search Section */}
        <div className="relative w-full sm:w-64 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
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
      </div>
    </div>
  )
}

export default UserListHeader;
