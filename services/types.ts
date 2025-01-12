export interface Education {
  schoolName: string;
  schoolDegree: string;
  department: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  skillName: string;
  skillLevel: number;
  skillDescription: string;
}

export interface PersonalInfo {
  id: string;
  name: string;
  location: string;
  status: string;
  email: string;
  aboutSelf: string;
  goal: string;
}

export interface About {
  id: string;
  name: string;
  email: string;
  experinces: Experience[];
  education: Education[];
  jobTitle: string;
  status: string;
  currentCompany: string;
  goal: string;
  aboutSelf: string;
  skills: Skill[];
  location: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
