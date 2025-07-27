"use client"
import { Check } from "lucide-react"

const PackagesPage = () =>{
  return (
    <>
      <div className="flex-1 overflow-auto bg-white h-full p-4">
        <div className="w-full mx-auto">
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Basic Package */}
            <div className="bg-[#1e2a4a] text-white p-6 rounded-lg">
              <div className="mb-2">Basic</div>
              <div className="text-sm text-gray-300 mb-4">Payment Package</div>
              <div className="text-3xl font-bold text-rose-400">$20</div>
            </div>

            {/* Essential Package */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="mb-2">Essential</div>
              <div className="text-sm text-gray-500 mb-4">Payment Package</div>
              <div className="text-3xl font-bold">$50</div>
            </div>

            {/* Essential Pro Package */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="mb-2">Essential Pro</div>
              <div className="text-sm text-gray-500 mb-4">Payment Package</div>
              <div className="text-3xl font-bold">$100</div>
            </div>
          </div>

          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Data */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-medium mb-4">Primary Data :</h2>

              <div className="space-y-4">
                <div className="flex">
                  <div className="w-32 text-gray-500">Package Type</div>
                  <div className="font-medium">: Payment Package</div>
                </div>

                <div className="flex">
                  <div className="w-32 text-gray-500">Package Name</div>
                  <div className="font-medium">: Basic</div>
                </div>

                <div className="flex">
                  <div className="w-32 text-gray-500">Package Price</div>
                  <div className="font-medium">: $20</div>
                </div>

                <div className="flex">
                  <div className="w-32 text-gray-500">validation</div>
                  <div className="font-medium">: 3 month</div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-medium mb-4">Conditions :</h2>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">This is Feature 1, For User.</span>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">This is Feature 2, For User.</span>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">This is Feature 3, For User.</span>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">This is Feature 4, For User.</span>
                </li>
              </ul>
            </div>

            {/* Package Notice */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-medium mb-4">Package Notice :</h2>

              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra nunc nibh, consectetur eu ac in.
                Sed viverra nunc dignissim, eget tortor tincidunt dui. Nullam tincidunt in odio dui. Donec commodo vitae
                dui est. Donec in ex orci nisi. eget Morbi sit eu et.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Sed faucibus quis elit nec facilisis quis elit. Vestibulum vitae tincidunt diam arcu, dolor adipiscing
                Nullam nunc et.
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <button className="bg-primary px-3 py-1.5 w-[150px] text-white rounded-md">
              Edit
            </button>
            <button className="px-3 py-1.5 w-[150px] text-secondary border border-secondary rounded-md">Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PackagesPage;
