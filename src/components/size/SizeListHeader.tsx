"use client"
import CreateSizeModal from "../modal/size/CreateSizeModal"


const SizeListHeader = () => {
    return (
        <div className="p-4 bg-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Size List</h1>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <CreateSizeModal />
                </div>
            </div>
        </div>
    )
}


export default SizeListHeader;