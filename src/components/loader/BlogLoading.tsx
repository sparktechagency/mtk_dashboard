

export default function BlogLoading() {
  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className=" space-y-6">
        {/* Header */}
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>

        {/* Title and Category Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Title Field */}
          <div className="space-y-2">
            <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
            <div className="h-12 w-full animate-pulse rounded-md border bg-gray-100"></div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-12 w-full animate-pulse rounded-md border bg-gray-100"></div>
          </div>
        </div>

        {/* Blog Image Section */}
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="flex h-36 w-full animate-pulse flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 md:h-36">
            {/* Upload Icon Placeholder */}
            <div className="mb-4 h-8 w-12 animate-pulse rounded bg-gray-200"></div>
            {/* Upload Text Placeholders */}
            <div className="mb-2 h-4 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 rounded-t-md border border-b-0 bg-gray-50 p-2">
            {/* Toolbar buttons */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
            ))}
          </div>

          {/* Text Editor Area */}
          <div className="h-48 w-full animate-pulse rounded-b-md border bg-gray-50 md:h-64"></div>
        </div>

        {/* Footer Stats */}
        <div className="flex justify-end">
          <div className="h-3 w-48 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Create Blog Button */}
        <div className="h-8 w-full animate-pulse rounded-md bg-gray-300 md:h-10"></div>
      </div>
    </div>
  )
}
