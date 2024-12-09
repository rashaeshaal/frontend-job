export interface Job {
  id: number;
  title: string;
  description: string;
  salary_min: number;
  salary_max: number;
  industry: string;
  role: string; // role name
  
}


  export interface JobResponse {
    jobs: Job[];
  }

  interface RoleResponse {
  roles: { id: number; name: string }[];
}
  
  