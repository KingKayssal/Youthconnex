/**
 * Firebase Firestore Schema for YouthConnex GIS Platform
 * Optimized for geospatial queries and real-time updates
 * 
 * Collections:
 * - opportunities: All job/project opportunities
 * - users: User profiles with roles
 * - cooperatives: Cooperative information
 * - businesses: Informal business registrations
 * - stateProjects: Government HIMO projects
 * - applications: Job applications from youth
 */

/**
 * OPPORTUNITIES COLLECTION
 * 
 * Document ID: Auto-generated or custom ID
 * Path: /opportunities/{opportunityId}
 */
export const OPPORTUNITIES_SCHEMA = {
  // Basic Information
  id: 'string', // Unique opportunity ID
  title: 'string', // e.g., "Road Construction Workers"
  description: 'string', // Detailed job description
  category: 'string', // 'agriculture' | 'construction' | 'services' | 'state'
  
  // Location & Geospatial Data
  location: {
    latitude: 'number', // e.g., 3.8480
    longitude: 'number', // e.g., 11.5021
    address: 'string', // e.g., "Yaoundé Centre"
    geohash: 'string', // e.g., "s0gs3d8" (for efficient nearby queries)
    administrativeLevel: {
      region: 'string', // e.g., "Centre"
      division: 'string', // e.g., "Mfoundi"
      commune: 'string', // e.g., "Yaoundé"
      village: 'string' // Optional
    }
  },
  
  // Organization/Owner Information
  organizationId: 'string', // Reference to organization
  organizationName: 'string', // e.g., "Mbalmayo Cocoa Cooperative"
  organizationType: 'string', // 'cooperative' | 'contractor' | 'business' | 'government'
  contactInfo: {
    name: 'string', // Contact person name
    phone: 'string',
    whatsapp: 'string',
    email: 'string'
  },
  
  // Job Details
  jobDetails: {
    vacancies: 'number', // Number of positions available
    skillLevel: 'string', // 'unskilled' | 'semi-skilled' | 'skilled'
    requiredSkills: ['string'], // e.g., ["masonry", "carpentry"]
    experience: 'number', // Years required (0 for entry-level)
    certificates: ['string'] // Required certifications
  },
  
  // Compensation & Terms
  compensation: {
    currency: 'string', // "FCFA"
    dailyRate: 'number', // Daily wage if applicable
    monthlyRate: 'number', // Monthly wage if applicable
    totalBudget: 'number' // Total project budget
  },
  
  // Duration & Availability
  duration: {
    type: 'string', // 'temporary' | 'seasonal' | 'permanent'
    startDate: 'timestamp', // Project/job start date
    endDate: 'timestamp', // Project/job end date
    daysPerWeek: 'number', // 5 for full-time
    hoursPerDay: 'number' // Working hours
  },
  
  // Sector-Specific Fields
  sectorDetails: {
    // For agriculture
    commodity: 'string', // 'cocoa' | 'grain' | 'dairy' etc
    processingCapacity: 'string', // e.g., "500kg/day"
    
    // For construction
    projectType: 'string', // 'building' | 'road' | 'infrastructure'
    currentPhase: 'string', // 'foundation' | 'superstructure' | 'finishing'
    safetyCompliant: 'boolean', // Has safety verification
    
    // For informal services
    serviceCategory: 'string', // 'tailoring' | 'repair' | 'transport'
    apprenticeshipAvailable: 'boolean'
  },
  
  // Safety & Accommodation
  support: {
    ppe_provided: 'boolean', // Personal Protective Equipment
    accommodation: 'boolean', // On-site accommodation
    meals: 'boolean', // Meals provided
    transport: 'boolean' // Transport provided
  },
  
  // Status & Metadata
  status: 'string', // 'open' | 'filled' | 'closed' | 'archived'
  featured: 'boolean', // Promoted opportunity
  rating: {
    average: 'number', // 1-5 stars
    count: 'number' // Number of ratings
  },
  
  // Timestamps
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  createdBy: 'string' // User ID who created
};

/**
 * Example Opportunity Document
 */
export const OPPORTUNITY_EXAMPLE = {
  id: 'opp_cocoa_001',
  title: 'Farm Assistants Needed - Cocoa Processing',
  description: 'We are looking for 10 farm assistants to help with cocoa harvesting and processing during peak season.',
  category: 'agriculture',
  
  location: {
    latitude: 3.8480,
    longitude: 11.5021,
    address: 'Mbalmayo Processing Facility',
    geohash: 's0gs3d',
    administrativeLevel: {
      region: 'Centre',
      division: 'Mfoundi',
      commune: 'Yaoundé',
      village: 'Mbalmayo'
    }
  },
  
  organizationId: 'coop_001',
  organizationName: 'Mbalmayo Cocoa Cooperative',
  organizationType: 'cooperative',
  contactInfo: {
    name: 'Jean Paul Nkomo',
    phone: '+237672345678',
    whatsapp: '+237672345678',
    email: 'coop@example.com'
  },
  
  jobDetails: {
    vacancies: 10,
    skillLevel: 'unskilled',
    requiredSkills: [],
    experience: 0,
    certificates: []
  },
  
  compensation: {
    currency: 'FCFA',
    dailyRate: 4500,
    monthlyRate: null,
    totalBudget: 1350000
  },
  
  duration: {
    type: 'seasonal',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-12-31'),
    daysPerWeek: 5,
    hoursPerDay: 8
  },
  
  sectorDetails: {
    commodity: 'cocoa',
    processingCapacity: '500kg/day',
    projectType: null,
    currentPhase: null,
    safetyCompliant: false,
    serviceCategory: null,
    apprenticeshipAvailable: false
  },
  
  support: {
    ppe_provided: false,
    accommodation: true,
    meals: true,
    transport: true
  },
  
  status: 'open',
  featured: true,
  rating: {
    average: 4.7,
    count: 23
  },
  
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'user_coop_001'
};

/**
 * USERS COLLECTION
 * Path: /users/{userId}
 */
export const USERS_SCHEMA = {
  id: 'string',
  email: 'string',
  phone: 'string',
  name: 'string',
  role: 'string', // 'youth' | 'business' | 'cooperative' | 'government'
  
  // Youth-specific
  profile: {
    age: 'number',
    education: 'string', // 'primary' | 'secondary' | 'tvet' | 'tertiary'
    skills: ['string'],
    certificates: ['string'],
    preferredSectors: ['string'],
    preferredTrades: ['string']
  },
  
  // Location
  location: {
    latitude: 'number',
    longitude: 'number',
    homeCommune: 'string'
  },
  
  status: 'string', // 'active' | 'inactive'
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

/**
 * APPLICATIONS COLLECTION
 * Path: /applications/{applicationId}
 */
export const APPLICATIONS_SCHEMA = {
  id: 'string',
  youthId: 'string', // Reference to user
  opportunityId: 'string', // Reference to opportunity
  
  status: 'string', // 'submitted' | 'viewed' | 'contacted' | 'placed' | 'rejected'
  appliedAt: 'timestamp',
  viewedAt: 'timestamp',
  respondedAt: 'timestamp',
  
  rating: {
    score: 'number', // 1-5
    comment: 'string',
    ratedAt: 'timestamp'
  }
};

/**
 * STATE PROJECTS COLLECTION
 * Path: /stateProjects/{projectId}
 */
export const STATE_PROJECTS_SCHEMA = {
  id: 'string',
  title: 'string',
  description: 'string',
  
  location: {
    latitude: 'number',
    longitude: 'number',
    geohash: 'string',
    administrativeLevel: {
      region: 'string',
      division: 'string',
      commune: 'string'
    }
  },
  
  implementingAgency: 'string', // e.g., "Ministry of Water & Forestry"
  projectType: 'string', // 'road' | 'irrigation' | 'reforestation' | etc
  
  workforce: {
    totalNeeded: 'number',
    youthQuota: 'number', // Percentage or absolute
    enrolled: 'number',
    filled: 'number'
  },
  
  compensation: {
    dailyRate: 'number',
    currency: 'string'
  },
  
  enrollmentWindow: {
    startDate: 'timestamp',
    endDate: 'timestamp'
  },
  
  status: 'string', // 'recruiting' | 'ongoing' | 'completed' | 'closed'
  createdAt: 'timestamp'
};

/**
 * Composite Index Recommendations for Firestore
 * 
 * 1. Opportunities - Geospatial queries:
 *    Collection: opportunities
 *    Fields: 
 *      - location.latitude (Ascending)
 *      - location.longitude (Ascending)
 *      - status (Ascending)
 *    Query: Find open opportunities near user location
 *
 * 2. Opportunities - Category & Status:
 *    Collection: opportunities
 *    Fields:
 *      - category (Ascending)
 *      - status (Ascending)
 *      - createdAt (Descending)
 *    Query: Find latest opportunities by category
 *
 * 3. Applications - User tracking:
 *    Collection: applications
 *    Fields:
 *      - youthId (Ascending)
 *      - status (Ascending)
 *      - appliedAt (Descending)
 *    Query: Track user's applications by status
 */
