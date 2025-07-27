"use client"

import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import CandidateDetail from "../../components/CandidateDetail/CandidateDetail"


const CandidateDetailsPage = () => {
  // In a real app, you would fetch job details based on the ID

  return (
    <div className="bg-gray-100 min-h-full p-4">
      <div className="bg-white mx-auto p-6">
        <div className="mb-4">
          <Link to="/job-posts" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Job Posts
          </Link>
        </div>
      <CandidateDetail/>
      </div>
    </div>
  )
}

export default CandidateDetailsPage;