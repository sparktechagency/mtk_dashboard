const CandidateDetail = () =>{
  const candidate = {
    name: "Osman Candidate",
    profile_image: "/images/profile/1751946959674-student.jpeg",
    job_title: ["Front-end Developer"],
    job_seeking: ["Mern Stack", "Front-end"],
    email: "goniosman715149123@gmail.com",
    availability: ["full_time", "part_time", "temporary"],
    phone_number: "02012345678",
    address: "dhaka university, bangladesh",
    skill: ["React", "Node"],
    work_experience: [
      {
        job_title: "Jr. Backend Developer",
        company_name: "Tech Solutions",
        location: "Dhaka",
        start_date: "2025-06-20T00:00:00.000Z",
        currently_work: true,
        details: "This is Description",
        end_date: "2025-08-25T00:00:00.000Z",
      },
      {
        job_title: "Front-end Developer",
        company_name: "bdCalling it LTD",
        location: "Dhaka",
        end_date: "2025-09-25T00:00:00.000Z",
        start_date: "2025-06-10T00:00:00.000Z",
        currently_work: false,
        details: "This is New description",
      },
    ],
    education: "gcse_or_equivalent",
    experience: "1_2_years",
    resume: "https://res.cloudinary.com/dqhbgockh/raw/upload/v1751533157/real_estate/1751533155088-gg.pdf",
    availabil_date: "2025-09-25T00:00:00.000Z",
    details: "<p><strong>You don't know who I am.<br></strong><em>I am a loyal candidate.</em><br><br></p>",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatAvailability = (availability: string[]) => {
    return availability.map((item) => item.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())).join(", ")
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt={candidate.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {candidate.job_title.map((title, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {title}
                  </span>
                ))}
              </div>
              <div className="text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">📧</span>
                  {candidate.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">📱</span>
                  {candidate.phone_number}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">📍</span>
                  {candidate.address}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">📄</span>
                Download Resume
              </a>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <span className="mr-2">💬</span>
                Contact
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: candidate.details }}
              />
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Work Experience</h2>
              <div className="space-y-6">
                {candidate.work_experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-blue-200 last:border-l-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="pb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{exp.job_title}</h3>
                        {exp.currently_work && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1 sm:mt-0">
                            Current Position
                          </span>
                        )}
                      </div>
                      <p className="text-blue-600 font-medium mb-1">{exp.company_name}</p>
                      <p className="text-gray-500 text-sm mb-2">
                        {exp.location} • {formatDate(exp.start_date)} -{" "}
                        {exp.currently_work ? "Present" : formatDate(exp.end_date)}
                      </p>
                      <p className="text-gray-700">{exp.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Job Preferences */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Seeking Positions</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.job_seeking.map((job, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                  <p className="text-sm text-gray-600">{formatAvailability(candidate.availability)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Available From</h4>
                  <p className="text-sm text-gray-600">{formatDate(candidate.availabil_date)}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skill.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Experience */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Education</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {candidate.education.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Experience Level</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {candidate.experience.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <span className="mr-2">⭐</span>
                  Add to Favorites
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <span className="mr-2">📤</span>
                  Share Profile
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <span className="mr-2">📝</span>
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CandidateDetail;