import subscriber from "../../assets/images/subscriber.png";
import SubscriberJobPostsTable from "../../components/subscriber/SubscriberJobPostsTable";

const SubscriberDetailsPage = () => {
  return (
    <div className="bg-white min-h-full p-4 md:p-4 rounded-md">
      <div className="mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">Company Profile</h1>
        <p className="text-gray-500 mt-1">
          View and manage company details and subscriptions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold">About Subscriber</h2>
          </div>
          <div>
            <div className="flex gap-6">
              <div className="w-2/3 bg-[#E9EBEF] rounded-md flex gap-4">
                <div className="flex justify-center md:justify-center w-2/5 items-center">
                  <div className="w-40 h-40 relative flex justify-center">
                    <img
                      src={subscriber}
                      alt="Chase Logo"
                      className="object-contain w-40 h-40"
                    />
                  </div>
                </div>
                <div className="space-y-4 p-2 w-3/5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Company Name:</div>
                    <div>Chase S</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Email:</div>
                    <div>Chase01@gmail.com</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Phone:</div>
                    <div>+10000000</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Country:</div>
                    <div>UK</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Location:</div>
                    <div>H No / B No / Area / City / Country</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 bg-[#E9EBEF] p-4 w-1/3 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Company Category:</div>
                  <div>IT</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Company Service:</div>
                  <div>
                    Web Development, Mobile App Development, UI/UX Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#E9EBEF] rounded-lg border border-gray-200 shadow-sm md:col-span-1">
            <div className="p-6">
              <div className="text-center">
                <div className="text-lg font-medium">Basic</div>
                <div className="text-gray-500 text-sm">Payment Package</div>
                <div className="text-3xl font-bold mt-4">$20</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg md:col-span-2">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-[#E9EBEF] p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Company Name:</div>
                    <div>Chase II</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Package:</div>
                    <div>Basic</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Package Price:</div>
                    <div>$20</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Date form:</div>
                    <div>Dec 30, 2024 5:30</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-500">Status:</div>
                    <div>
                      <span className="bg-green-100 text-green-800 rounded-md px-2 py-1 text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-[#E9EBEF] p-4 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>Tier 1 Feature 1 for user</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>Tier 1 Feature 2 for user</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>Tier 1 Feature 3 for user</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>Tier 1 Feature 4 for user</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">All Job Posts</h2>
          </div>
          <div className="p-4">
            <SubscriberJobPostsTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberDetailsPage;
