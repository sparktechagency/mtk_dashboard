"use client";

import { useState } from "react";
import ProfileLoading from "../../components/loader/ProfileLoading";
import ProfileForm from "../../components/Profile/ProfileForm"
import ProfilePic from "../../components/Profile/ProfilePic";
import { useGetMeQuery } from "../../redux/features/admin/adminApi";
import { useAppSelector } from "../../redux/hooks/hooks";

const ProfilePage = () => {
  const [file, setFile] = useState<File | null>(null)
  const { isLoading, isError } = useGetMeQuery(undefined);
  const { admin } = useAppSelector((state) => state.admin);

  if (isLoading) {
    return <ProfileLoading />
  }

  if (!isLoading && !isError) {


    return (
      <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Profile</h1>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <ProfilePic setFile={setFile}/>
                {/* <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 overflow-hidden">
                  <img src="/placeholder.svg?height=112&width=112" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -top-1 -right-1 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button> */}
              </div>
            </div>

            <ProfileForm admin={admin} file={file}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage;
