"use client"

import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"


const JobDetailsPage = () => {
  // In a real app, you would fetch job details based on the ID

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link to="/job-posts" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Job Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <div className="text-2xl font-bold">CHASE</div>
              <div className="text-blue-500">🔵</div>
            </div>

            <div className="space-y-2">
              <div className="flex">
                <div className="w-24 text-gray-500">Company</div>
                <div className="font-medium">: Chase II</div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Status</div>
                <div className="font-medium">
                  : <span className="status-badge status-active">Active</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Published</div>
                <div className="font-medium">: Feb 3, 2024</div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Last Date</div>
                <div className="font-medium text-red-500">: Mar 31, 2024</div>
              </div>
            </div>
          </div>

          {/* Job Position Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div className="flex">
                <div className="w-24 text-gray-500">Job Position</div>
                <div className="font-medium">: Web Developer</div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Location</div>
                <div className="font-medium">: /H No./H No./ City</div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Website</div>
                <div className="font-medium">: Chase II.COM</div>
              </div>
              <div className="flex">
                <div className="w-24 text-gray-500">Salary</div>
                <div className="font-medium">: $20k/Monthly</div>
              </div>
            </div>
          </div>

          {/* Job Status Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div className="text-gray-700 font-medium">Job Status</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Full Time
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Remote
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>8
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  Day Shift
                </li>
              </ul>

              <div className="mt-4">
                <div className="text-gray-700 font-medium mb-2">Skills & Expertise</div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">HTML</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">Leadership Skill</span>
                </div>
              </div>

              <div className="flex mt-2">
                <div className="w-24 text-gray-500">Vacancy</div>
                <div className="font-medium">: 3</div>
              </div>

              <div className="flex">
                <div className="w-24 text-gray-500">Area</div>
                <div className="font-medium">: Area location</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Job Requirements */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Job Requirement</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Education</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Bachelor of Science (BSc) in Computer Science & Engineering</li>
                  <li>B.Sc Engineering in CSE/EEE/ETE/ Telecom from any recognized university</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Experience</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>At least 8 years</li>
                  <li>The applicants should have experience in the following business areas:</li>
                  <li>Web & IT Enabled Service</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Additional Requirements</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Age 35 to 40 years</li>
                  <li>The age limit may be relaxed for the highly experienced and competent candidates.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Responsibilities</h2>

            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Manage software development</li>
              <li>Develop software modules</li>
              <li>Troubleshoot bugs and devise solutions to the problems</li>
              <li>Ensure quick resolution of challenges and issues arising from technical aspects</li>
            </ul>

            <h2 className="text-lg font-medium mt-6 mb-4">Compensation & Other Benefits</h2>

            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Higher initial pay may be offered to deserving candidates.</li>
              <li>Candidates may indicate their expected salary in the application form.</li>
              <li>Provident Fund, Gratuity and other benefits as per the University rules/ practice.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
          <h2 className="text-lg font-medium mb-4">Company Details</h2>

          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra nunc nibh, consectetur eu ac in. Sed
            viverra nunc dignissim, eget tortor tincidunt dui. Nullam tincidunt in odio dui. Donec commodo vitae dui
            est. Donec in ex orci nisi. eget Morbi sit eu et.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Sed faucibus quis elit nec facilisis quis elit. Vestibulum vitae tincidunt diam arcu, dolor adipiscing
            Nullam nunc et. Vestibulum vitae tincidunt diam arcu, dolor adipiscing Nullam nunc et.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Hello, this Employer Create a Job post. If this accounts have no problem, You can You can Accept this post.
          </div>
          <div className="flex gap-2">
            <button>Report</button>
            <button>Activate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage;