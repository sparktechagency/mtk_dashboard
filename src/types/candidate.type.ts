
export type TCandidate = {
  _id: string;
  name: string;
  profile_image: string | null;
  //job_title: string[];
  // job_seeking: string[];
  email: string;
  authId: {
    is_block: boolean
  }
  // phone_number: string;
  // address: string;
  // availability: ("full_time" | "part_time" | "temporary")[];
  // skill: string[];
  // alert_job_type: string[];
  // profile_private: boolean;
  // status: "active" | "inactive";
  // createdAt: string;
  // updatedAt: string;
  // details: string;
  // education:
  //   | "gcse_or_equivalent"
  //   | "a_level_or_equivalent"
  //   | "bachelor"
  //   | "master"
  //   | "phd"
  //   | string;
  // experience:
  //   | "fresher"
  //   | "1_2_years"
  //   | "2_4_years"
  //   | "4_6_years"
  //   | "6_plus_years"
  //   | string;
  // resume: string;
};


export type TCandidataDataSource = {
  key: number;
  serial: number;
   _id: string;
  name: string;
  email: string;
  profile_image: string | null;
  is_block: boolean
}