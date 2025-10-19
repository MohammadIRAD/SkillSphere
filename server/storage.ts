import {
  type User,
  type InsertUser,
  type Job,
  type InsertJob,
  type Course,
  type InsertCourse,
  type Competition,
  type InsertCompetition,
  type Portfolio,
  type InsertPortfolio,
  type PartTimeJob,
  type InsertPartTimeJob,
  type Post,
  type InsertPost,
  type Connection,
  type InsertConnection,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  getAllJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  applyToJob(jobId: string, userId: string): Promise<void>;
  getJobsByUser(userId: string): Promise<Job[]>;
  
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  enrollInCourse(courseId: string, userId: string): Promise<void>;
  
  getAllCompetitions(): Promise<Competition[]>;
  getCompetition(id: string): Promise<Competition | undefined>;
  createCompetition(competition: InsertCompetition): Promise<Competition>;
  joinCompetition(competitionId: string, userId: string): Promise<void>;
  
  getPortfolioByUserId(userId: string): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(userId: string, updates: Partial<Portfolio>): Promise<Portfolio>;
  addProjectToPortfolio(userId: string, project: any): Promise<void>;
  
  getAllPartTimeJobs(): Promise<PartTimeJob[]>;
  getPartTimeJob(id: string): Promise<PartTimeJob | undefined>;
  createPartTimeJob(job: InsertPartTimeJob): Promise<PartTimeJob>;
  
  getAllPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  likePost(postId: string, userId: string): Promise<void>;
  
  createConnection(connection: InsertConnection): Promise<Connection>;
  getConnectionsByUser(userId: string): Promise<Connection[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;
  private courses: Map<string, Course>;
  private competitions: Map<string, Competition>;
  private portfolios: Map<string, Portfolio>;
  private partTimeJobs: Map<string, PartTimeJob>;
  private posts: Map<string, Post>;
  private connections: Map<string, Connection>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.courses = new Map();
    this.competitions = new Map();
    this.portfolios = new Map();
    this.partTimeJobs = new Map();
    this.posts = new Map();
    this.connections = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleJobs: Job[] = [
      {
        id: randomUUID(),
        title: "Senior Full Stack Developer",
        description: "We are looking for an experienced Full Stack Developer to join our team. You will work on building scalable web applications using React, Node.js, and MongoDB. The ideal candidate has 5+ years of experience and strong problem-solving skills.",
        company: "TechCorp",
        type: "Full-time",
        location: "Remote",
        budget: 8000,
        skills: ["React", "Node.js", "MongoDB", "TypeScript"],
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Frontend Developer",
        description: "Join our creative team to build beautiful user interfaces. Experience with React and modern CSS frameworks required.",
        company: "DesignHub",
        type: "Contract",
        location: "New York",
        budget: 5000,
        skills: ["React", "Tailwind CSS", "JavaScript"],
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Mobile App Developer",
        description: "Develop cross-platform mobile applications using React Native. Must have experience with iOS and Android deployment.",
        company: "AppWorks",
        type: "Freelance",
        location: "Remote",
        budget: 6000,
        skills: ["React Native", "JavaScript", "Firebase"],
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
    ];

    const sampleCourses: Course[] = [
      {
        id: randomUUID(),
        title: "Complete Web Development Bootcamp",
        description: "Learn full-stack web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and databases.",
        category: "Web Development",
        level: "Beginner",
        instructor: "system",
        instructorName: "Sarah Johnson",
        duration: 40,
        price: 0,
        rating: 48,
        enrolledStudents: [],
        lessons: [
          { id: "1", title: "Introduction to Web Development", duration: 30 },
          { id: "2", title: "HTML Basics", duration: 45 },
          { id: "3", title: "CSS Fundamentals", duration: 60 },
        ],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Advanced React Patterns",
        description: "Master advanced React concepts including hooks, context, performance optimization, and state management patterns.",
        category: "Frontend",
        level: "Advanced",
        instructor: "system",
        instructorName: "Michael Chen",
        duration: 25,
        price: 49,
        rating: 47,
        enrolledStudents: [],
        lessons: [
          { id: "1", title: "Advanced Hooks", duration: 50 },
          { id: "2", title: "Performance Optimization", duration: 45 },
        ],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Data Structures and Algorithms",
        description: "Build a strong foundation in computer science fundamentals. Learn essential data structures and algorithm techniques.",
        category: "Computer Science",
        level: "Intermediate",
        instructor: "system",
        instructorName: "David Williams",
        duration: 35,
        price: 39,
        rating: 49,
        enrolledStudents: [],
        lessons: [
          { id: "1", title: "Arrays and Strings", duration: 40 },
          { id: "2", title: "Linked Lists", duration: 35 },
        ],
        createdAt: new Date(),
      },
    ];

    const sampleCompetitions: Competition[] = [
      {
        id: randomUUID(),
        title: "Algorithm Sprint Challenge",
        description: "Solve 5 algorithmic problems in 2 hours. Test your problem-solving speed and accuracy.",
        difficulty: "Medium",
        category: "Algorithms",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        prize: "$500 Prize Pool",
        participants: [],
        submissions: [],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Build a Landing Page",
        description: "Create a responsive landing page using HTML, CSS, and JavaScript. Best design wins!",
        difficulty: "Easy",
        category: "Frontend",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        prize: "$300 Prize",
        participants: [],
        submissions: [],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Data Science Challenge",
        description: "Analyze a dataset and build a predictive model. Advanced machine learning competition.",
        difficulty: "Hard",
        category: "Data Science",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        prize: "$1000 Grand Prize",
        participants: [],
        submissions: [],
        createdAt: new Date(),
      },
    ];

    const samplePartTimeJobs: PartTimeJob[] = [
      {
        id: randomUUID(),
        title: "Math Tutor Needed",
        description: "Looking for a math tutor for high school students. Flexible hours, 10-15 hours per week.",
        company: "Learning Center",
        type: "Teaching",
        pay: 25,
        location: "Boston, MA",
        distance: "2 miles",
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Delivery Driver",
        description: "Part-time delivery driver needed for local restaurant. Evening shifts available.",
        company: "Quick Eats",
        type: "Delivery",
        pay: 18,
        location: "San Francisco, CA",
        distance: "1.5 miles",
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Retail Associate",
        description: "Join our retail team! Weekend shifts, customer service experience preferred.",
        company: "Fashion Store",
        type: "Retail",
        pay: 16,
        location: "New York, NY",
        distance: "3 miles",
        postedBy: "system",
        applicants: [],
        status: "open",
        createdAt: new Date(),
      },
    ];

    sampleJobs.forEach(job => this.jobs.set(job.id, job));
    sampleCourses.forEach(course => this.courses.set(course.id, course));
    sampleCompetitions.forEach(comp => this.competitions.set(comp.id, comp));
    samplePartTimeJobs.forEach(job => this.partTimeJobs.set(job.id, job));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "user",
      fullName: insertUser.fullName || null,
      bio: insertUser.bio || null,
      avatar: insertUser.avatar || null,
      skills: insertUser.skills || null,
      experience: insertUser.experience || null,
      socialLinks: insertUser.socialLinks || null,
      location: insertUser.location || null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      applicants: [],
      status: insertJob.status || "open",
      createdAt: new Date(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async applyToJob(jobId: string, userId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (job && !job.applicants?.includes(userId)) {
      job.applicants = [...(job.applicants || []), userId];
    }
  }

  async getJobsByUser(userId: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.postedBy === userId);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      enrolledStudents: [],
      rating: insertCourse.rating || 0,
      price: insertCourse.price || 0,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  async enrollInCourse(courseId: string, userId: string): Promise<void> {
    const course = this.courses.get(courseId);
    if (course && !course.enrolledStudents?.includes(userId)) {
      course.enrolledStudents = [...(course.enrolledStudents || []), userId];
    }
  }

  async getAllCompetitions(): Promise<Competition[]> {
    return Array.from(this.competitions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCompetition(id: string): Promise<Competition | undefined> {
    return this.competitions.get(id);
  }

  async createCompetition(insertCompetition: InsertCompetition): Promise<Competition> {
    const id = randomUUID();
    const competition: Competition = {
      ...insertCompetition,
      id,
      participants: [],
      submissions: [],
      createdAt: new Date(),
    };
    this.competitions.set(id, competition);
    return competition;
  }

  async joinCompetition(competitionId: string, userId: string): Promise<void> {
    const competition = this.competitions.get(competitionId);
    if (competition && !competition.participants?.includes(userId)) {
      competition.participants = [...(competition.participants || []), userId];
    }
  }

  async getPortfolioByUserId(userId: string): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(p => p.userId === userId);
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = randomUUID();
    const portfolio: Portfolio = {
      ...insertPortfolio,
      id,
      viewCount: 0,
      likes: 0,
      createdAt: new Date(),
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolio(userId: string, updates: Partial<Portfolio>): Promise<Portfolio> {
    const portfolio = await this.getPortfolioByUserId(userId);
    if (portfolio) {
      Object.assign(portfolio, updates);
      return portfolio;
    }
    throw new Error("Portfolio not found");
  }

  async addProjectToPortfolio(userId: string, project: any): Promise<void> {
    let portfolio = await this.getPortfolioByUserId(userId);
    if (!portfolio) {
      portfolio = await this.createPortfolio({ userId, projects: [project] });
    } else {
      portfolio.projects = [...(portfolio.projects || []), project];
    }
  }

  async getAllPartTimeJobs(): Promise<PartTimeJob[]> {
    return Array.from(this.partTimeJobs.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPartTimeJob(id: string): Promise<PartTimeJob | undefined> {
    return this.partTimeJobs.get(id);
  }

  async createPartTimeJob(insertJob: InsertPartTimeJob): Promise<PartTimeJob> {
    const id = randomUUID();
    const job: PartTimeJob = {
      ...insertJob,
      id,
      applicants: [],
      status: insertJob.status || "open",
      createdAt: new Date(),
    };
    this.partTimeJobs.set(id, job);
    return job;
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      ...insertPost,
      id,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return post;
  }

  async likePost(postId: string, userId: string): Promise<void> {
    const post = this.posts.get(postId);
    if (post) {
      const likes = post.likes || [];
      if (likes.includes(userId)) {
        post.likes = likes.filter(id => id !== userId);
      } else {
        post.likes = [...likes, userId];
      }
    }
  }

  async createConnection(insertConnection: InsertConnection): Promise<Connection> {
    const id = randomUUID();
    const connection: Connection = {
      ...insertConnection,
      id,
      status: insertConnection.status || "pending",
      createdAt: new Date(),
    };
    this.connections.set(id, connection);
    return connection;
  }

  async getConnectionsByUser(userId: string): Promise<Connection[]> {
    return Array.from(this.connections.values()).filter(
      c => c.userId === userId || c.connectedUserId === userId
    );
  }
}

export const storage = new MemStorage();
