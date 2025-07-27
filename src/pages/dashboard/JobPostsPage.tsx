import JobList from "../../components/job/JobList";

const JobPostsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <JobList />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostsPage;
