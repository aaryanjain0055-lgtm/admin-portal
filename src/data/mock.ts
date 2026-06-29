export const MOCK_DASHBOARD_STATS = {
  totalRevenue: 245340.5,
  revenueChange: "+12.5%",
  totalCandidates: 14532,
  candidatesChange: "+4.3%",
  openJobs: 245,
  jobsChange: "-2.1%",
  interviewsScheduled: 128,
  interviewsChange: "+14.2%",
};

export const MOCK_REVENUE_DATA = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
  { name: "Aug", revenue: 4490, expenses: 3100 },
  { name: "Sep", revenue: 5490, expenses: 2100 },
  { name: "Oct", revenue: 6490, expenses: 3100 },
  { name: "Nov", revenue: 7490, expenses: 4100 },
  { name: "Dec", revenue: 8490, expenses: 5100 },
];

export const MOCK_HIRING_TRENDS = [
  { name: "Engineering", hired: 120, open: 45 },
  { name: "Design", hired: 45, open: 12 },
  { name: "Product", hired: 35, open: 8 },
  { name: "Marketing", hired: 60, open: 20 },
  { name: "Sales", hired: 150, open: 55 },
];

export type Candidate = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Screening" | "Interviewing" | "Offered" | "Hired" | "Rejected";
  atsScore: number;
  appliedDate: string;
  department: string;
  experience: string;
};

const statuses: Candidate["status"][] = ["Screening", "Interviewing", "Offered", "Hired", "Rejected"];
const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "HR"];
const roles = ["Frontend Engineer", "Backend Engineer", "Product Manager", "UX Designer", "Sales Executive", "Marketing Manager"];

export const MOCK_CANDIDATES: Candidate[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `CAN-${1000 + i}`,
  name: `Candidate ${i + 1}`,
  email: `candidate${i + 1}@example.com`,
  role: roles[Math.floor(Math.random() * roles.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
  atsScore: Math.floor(Math.random() * 40) + 60,
  appliedDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  department: departments[Math.floor(Math.random() * departments.length)],
  experience: `${Math.floor(Math.random() * 10) + 1} years`,
}));

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type Job = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  status: "Open" | "Closed" | "Draft";
  applicants: number;
  postedDate: string;
};

export const MOCK_JOBS: Job[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `JOB-${2000 + i}`,
  title: roles[Math.floor(Math.random() * roles.length)],
  department: departments[Math.floor(Math.random() * departments.length)],
  type: ["Full-time", "Contract", "Part-time"][Math.floor(Math.random() * 3)],
  location: ["Remote", "New York, NY", "San Francisco, CA", "London, UK", "Berlin, DE"][Math.floor(Math.random() * 5)],
  status: ["Open", "Closed", "Draft"][Math.floor(Math.random() * 3)] as Job["status"],
  applicants: Math.floor(Math.random() * 200),
  postedDate: new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString().split('T')[0],
}));

export type Company = {
  id: string;
  name: string;
  industry: string;
  employees: string;
  location: string;
  status: "Active" | "Pending" | "Inactive";
};

export const MOCK_COMPANIES: Company[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `COMP-${3000 + i}`,
  name: `Enterprise Tech ${i + 1}`,
  industry: ["Software", "Fintech", "Healthcare", "E-commerce"][Math.floor(Math.random() * 4)],
  employees: ["1-50", "51-200", "201-500", "501-1000", "1000+"][Math.floor(Math.random() * 5)],
  location: ["San Francisco, CA", "New York, NY", "Austin, TX", "London, UK"][Math.floor(Math.random() * 4)],
  status: ["Active", "Pending", "Inactive"][Math.floor(Math.random() * 3)] as Company["status"],
}));

export type Interview = {
  id: string;
  candidateName: string;
  role: string;
  interviewer: string;
  date: string;
  time: string;
  type: "Technical" | "HR" | "Culture Fit" | "Final";
  status: "Scheduled" | "Completed" | "Cancelled";
};

export const MOCK_INTERVIEWS: Interview[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `INT-${4000 + i}`,
  candidateName: `Candidate ${Math.floor(Math.random() * 100) + 1}`,
  role: roles[Math.floor(Math.random() * roles.length)],
  interviewer: `Interviewer ${Math.floor(Math.random() * 20) + 1}`,
  date: new Date(Date.now() + Math.floor(Math.random() * 5000000000)).toISOString().split('T')[0],
  time: `${Math.floor(Math.random() * 8) + 9}:00 AM`,
  type: ["Technical", "HR", "Culture Fit", "Final"][Math.floor(Math.random() * 4)] as Interview["type"],
  status: ["Scheduled", "Completed", "Cancelled"][Math.floor(Math.random() * 3)] as Interview["status"],
}));

