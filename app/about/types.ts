export interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  schoolName: string;
  schoolDegree: string;
  department: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  skillName: string;
  skillLevel: number;
  skillDescription: string;
}

export interface AboutData {
  id: string;
  name: string;
  location: string;
  status: string;
  email: string;
  aboutSelf: string;
  experiences: Experience[];
  education: Education[];
  goal: string;
  skills: Skill[];
  jobTitle: string;
  currentCompany: string;
}
