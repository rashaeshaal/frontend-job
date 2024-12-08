export interface Job {
    id: number;
    title: string;
    description: string;
    salary_min: number;
    salary_max: number;
    industry: string;
    role: string;
    posted_by: string;
    created_at: string;
  }

  export interface JobResponse {
    jobs: Job[];
  }

  interface RoleResponse {
  roles: { id: number; name: string }[];
}
  
  