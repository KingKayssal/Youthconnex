/**
 * Sample Data Seeder for YouthConnex GIS
 * 
 * Use this file to populate Firebase with sample opportunities for testing
 * 
 * HOW TO USE:
 * 1. Import: import { seedSampleData } from './firebase/sampleData'
 * 2. Call in a test component or console
 * 3. Monitor Firebase console to see data populated
 * 
 * WARNING: This will create REAL documents in Firestore.
 * Only run once, or delete existing data first!
 */

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

/**
 * Sample opportunities data
 * Includes all four sectors with realistic examples
 */
const SAMPLE_OPPORTUNITIES = [
  // AGRICULTURE OPPORTUNITIES
  {
    title: 'Farm Assistants Needed - Cocoa Processing',
    description: 'We are looking for 10 experienced farm assistants to help with cocoa harvesting and processing during peak season. Must be physically fit and available for seasonal work.',
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
      startDate: Timestamp.fromDate(new Date('2024-07-01')),
      endDate: Timestamp.fromDate(new Date('2024-12-31')),
      daysPerWeek: 5,
      hoursPerDay: 8
    },
    sectorDetails: {
      commodity: 'cocoa',
      processingCapacity: '500kg/day'
    },
    support: {
      ppe_provided: false,
      accommodation: true,
      meals: true,
      transport: true
    },
    status: 'open',
    featured: true,
    rating: { average: 4.7, count: 23 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  {
    title: 'Grain Harvesters Needed',
    description: 'Looking for 15 grain harvesters for the harvest season. Experience with combine harvesters preferred but not required.',
    category: 'agriculture',
    location: {
      latitude: 3.85,
      longitude: 11.52,
      address: 'Bamenda Grain Cooperative',
      geohash: 's0gs7e',
      administrativeLevel: {
        region: 'North West',
        division: 'Menchum',
        commune: 'Bamenda',
        village: 'Batibo'
      }
    },
    organizationId: 'coop_002',
    organizationName: 'Bamenda Grain Cooperative',
    organizationType: 'cooperative',
    contactInfo: {
      name: 'Amara Fru',
      phone: '+237678912345',
      whatsapp: '+237678912345',
      email: 'bamenda.grain@example.com'
    },
    jobDetails: {
      vacancies: 15,
      skillLevel: 'semi-skilled',
      requiredSkills: ['harvesting'],
      experience: 1,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 5000,
      monthlyRate: null,
      totalBudget: 1875000
    },
    duration: {
      type: 'seasonal',
      startDate: Timestamp.fromDate(new Date('2024-08-15')),
      endDate: Timestamp.fromDate(new Date('2024-10-31')),
      daysPerWeek: 6,
      hoursPerDay: 8
    },
    sectorDetails: {
      commodity: 'grain',
      processingCapacity: '200 bags/day'
    },
    support: {
      ppe_provided: true,
      accommodation: false,
      meals: true,
      transport: false
    },
    status: 'open',
    featured: false,
    rating: { average: 4.3, count: 12 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  // CONSTRUCTION OPPORTUNITIES
  {
    title: 'Masons Needed - Residential Complex',
    description: 'Seeking experienced masons for foundation and wall construction on a new residential complex. Must have 2+ years experience with documentation.',
    category: 'construction',
    location: {
      latitude: 3.862,
      longitude: 11.506,
      address: 'Chantier Résidentiel K7, Yaoundé',
      geohash: 's0gs3f',
      administrativeLevel: {
        region: 'Centre',
        division: 'Mfoundi',
        commune: 'Yaoundé'
      }
    },
    organizationId: 'const_001',
    organizationName: 'Chantier Résidentiel K7',
    organizationType: 'contractor',
    contactInfo: {
      name: 'Mr. Samba Diallo',
      phone: '+237691234567',
      whatsapp: '+237691234567',
      email: 'chantier.k7@example.com'
    },
    jobDetails: {
      vacancies: 12,
      skillLevel: 'skilled',
      requiredSkills: ['masonry', 'wall-construction'],
      experience: 2,
      certificates: ['TVET Masonry Certificate']
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 7000,
      monthlyRate: null,
      totalBudget: 4200000
    },
    duration: {
      type: 'temporary',
      startDate: Timestamp.fromDate(new Date('2024-06-15')),
      endDate: Timestamp.fromDate(new Date('2024-09-30')),
      daysPerWeek: 5,
      hoursPerDay: 8
    },
    sectorDetails: {
      projectType: 'building',
      currentPhase: 'foundation',
      safetyCompliant: true
    },
    support: {
      ppe_provided: true,
      accommodation: false,
      meals: false,
      transport: true
    },
    status: 'open',
    featured: true,
    rating: { average: 4.5, count: 18 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  {
    title: 'General Laborers - Road Construction',
    description: 'RN4 Highway rehabilitation project needs 35 general laborers for earthworks and site preparation. No experience needed, training provided.',
    category: 'construction',
    location: {
      latitude: 3.75,
      longitude: 11.55,
      address: 'Route Nationale RN4-Est',
      geohash: 's0gr8a',
      administrativeLevel: {
        region: 'Centre',
        division: 'Mfoundi',
        commune: 'Yaoundé'
      }
    },
    organizationId: 'const_002',
    organizationName: 'Road Authority - RN4 Project',
    organizationType: 'contractor',
    contactInfo: {
      name: 'Eng. Jean Baptiste',
      phone: '+237695678901',
      whatsapp: '+237695678901',
      email: 'rn4.project@example.com'
    },
    jobDetails: {
      vacancies: 35,
      skillLevel: 'unskilled',
      requiredSkills: [],
      experience: 0,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 3500,
      monthlyRate: null,
      totalBudget: 3150000
    },
    duration: {
      type: 'temporary',
      startDate: Timestamp.fromDate(new Date('2024-05-01')),
      endDate: Timestamp.fromDate(new Date('2024-11-30')),
      daysPerWeek: 6,
      hoursPerDay: 8
    },
    sectorDetails: {
      projectType: 'road',
      currentPhase: 'earthworks',
      safetyCompliant: true
    },
    support: {
      ppe_provided: true,
      accommodation: false,
      meals: true,
      transport: true
    },
    status: 'open',
    featured: false,
    rating: { average: 4.1, count: 45 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  // INFORMAL SERVICES OPPORTUNITIES
  {
    title: 'Tailoring Workshop - Apprentice Wanted',
    description: 'Modern tailoring workshop seeking apprentice to learn design and cutting. 2-year program with monthly stipend after probation.',
    category: 'services',
    location: {
      latitude: 3.855,
      longitude: 11.510,
      address: 'Bafoussam Central Market',
      geohash: 's0gs3h',
      administrativeLevel: {
        region: 'West',
        division: 'Mifi',
        commune: 'Bafoussam'
      }
    },
    organizationId: 'bus_001',
    organizationName: 'Atelier Couture Aminata',
    organizationType: 'business',
    contactInfo: {
      name: 'Aminata Diop',
      phone: '+237678123456',
      whatsapp: '+237678123456',
      email: 'aminata.couture@example.com'
    },
    jobDetails: {
      vacancies: 2,
      skillLevel: 'unskilled',
      requiredSkills: [],
      experience: 0,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 0,
      monthlyRate: 50000,
      totalBudget: 1200000
    },
    duration: {
      type: 'permanent',
      startDate: Timestamp.fromDate(new Date('2024-07-01')),
      endDate: Timestamp.fromDate(new Date('2026-07-01')),
      daysPerWeek: 5,
      hoursPerDay: 8
    },
    sectorDetails: {
      serviceCategory: 'tailoring',
      apprenticeshipAvailable: true
    },
    support: {
      ppe_provided: false,
      accommodation: false,
      meals: false,
      transport: false
    },
    status: 'open',
    featured: false,
    rating: { average: 4.8, count: 12 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  {
    title: 'Electronics Repair Shop - Assistant Needed',
    description: 'Electronics repair shop looking for a tech-savvy assistant. Opportunity to learn phone and computer repair.',
    category: 'services',
    location: {
      latitude: 3.860,
      longitude: 11.515,
      address: 'Yaoundé Downtown Tech Market',
      geohash: 's0gs3g',
      administrativeLevel: {
        region: 'Centre',
        division: 'Mfoundi',
        commune: 'Yaoundé'
      }
    },
    organizationId: 'bus_002',
    organizationName: 'Réparation Électronique - TechFix',
    organizationType: 'business',
    contactInfo: {
      name: 'Martin Obi',
      phone: '+237690234567',
      whatsapp: '+237690234567',
      email: 'martin.techfix@example.com'
    },
    jobDetails: {
      vacancies: 1,
      skillLevel: 'semi-skilled',
      requiredSkills: ['electronics-basics', 'customer-service'],
      experience: 0,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 3000,
      monthlyRate: null,
      totalBudget: 360000
    },
    duration: {
      type: 'permanent',
      startDate: Timestamp.fromDate(new Date('2024-06-01')),
      endDate: null,
      daysPerWeek: 6,
      hoursPerDay: 8
    },
    sectorDetails: {
      serviceCategory: 'repair',
      apprenticeshipAvailable: true
    },
    support: {
      ppe_provided: false,
      accommodation: false,
      meals: false,
      transport: false
    },
    status: 'open',
    featured: false,
    rating: { average: 4.6, count: 8 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  // STATE HIMO PROJECTS
  {
    title: 'HIMO - Canal Irrigation Zone 3',
    description: 'Government irrigation canal rehabilitation project. Open to local youth ages 18-35. No experience needed, all training provided.',
    category: 'state',
    location: {
      latitude: 3.78,
      longitude: 11.48,
      address: 'Commune Centre-Sud Irrigation Zone 3',
      geohash: 's0gr9b',
      administrativeLevel: {
        region: 'Centre',
        division: 'Mfoundi',
        commune: 'Yaoundé'
      }
    },
    organizationId: 'gov_001',
    organizationName: 'Ministry of Water & Forestry',
    organizationType: 'government',
    contactInfo: {
      name: 'Mr. Fonkwo',
      phone: '+237222123456',
      whatsapp: '+237222123456',
      email: 'minwa.recruitment@example.com'
    },
    jobDetails: {
      vacancies: 60,
      skillLevel: 'unskilled',
      requiredSkills: [],
      experience: 0,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 3500,
      monthlyRate: null,
      totalBudget: 8400000
    },
    duration: {
      type: 'temporary',
      startDate: Timestamp.fromDate(new Date('2024-07-01')),
      endDate: Timestamp.fromDate(new Date('2024-09-15')),
      daysPerWeek: 5,
      hoursPerDay: 8
    },
    sectorDetails: {
      projectType: 'irrigation',
      currentPhase: 'excavation'
    },
    support: {
      ppe_provided: true,
      accommodation: false,
      meals: true,
      transport: true
    },
    status: 'open',
    featured: true,
    rating: { average: 4.2, count: 156 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },

  {
    title: 'Community Tree Planting Program - Reforestation',
    description: 'Environmental reforestation initiative. Plant trees across commune and learn environmental conservation. Great for climate-conscious youth.',
    category: 'state',
    location: {
      latitude: 3.88,
      longitude: 11.50,
      address: 'Commune Nord Reforestation Area',
      geohash: 's0gs3i',
      administrativeLevel: {
        region: 'Centre',
        division: 'Mfoundi',
        commune: 'Yaoundé'
      }
    },
    organizationId: 'gov_002',
    organizationName: 'Ministry of Environment & Nature Protection',
    organizationType: 'government',
    contactInfo: {
      name: 'Dr. Benson Ayung',
      phone: '+237233234567',
      whatsapp: '+237233234567',
      email: 'minep.reforestation@example.com'
    },
    jobDetails: {
      vacancies: 45,
      skillLevel: 'unskilled',
      requiredSkills: [],
      experience: 0,
      certificates: []
    },
    compensation: {
      currency: 'FCFA',
      dailyRate: 3500,
      monthlyRate: null,
      totalBudget: 6300000
    },
    duration: {
      type: 'temporary',
      startDate: Timestamp.fromDate(new Date('2024-08-01')),
      endDate: Timestamp.fromDate(new Date('2024-10-31')),
      daysPerWeek: 5,
      hoursPerDay: 6
    },
    sectorDetails: {
      projectType: 'reforestation'
    },
    support: {
      ppe_provided: true,
      accommodation: false,
      meals: true,
      transport: true
    },
    status: 'open',
    featured: false,
    rating: { average: 4.4, count: 89 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
];

/**
 * Main seeding function
 * Uploads all sample opportunities to Firestore
 */
export const seedSampleData = async () => {
  try {
    console.log('Starting to seed sample opportunities...');
    const oppCollection = collection(db, 'opportunities');
    let successCount = 0;
    let errorCount = 0;

    for (const opportunity of SAMPLE_OPPORTUNITIES) {
      try {
        const docRef = await addDoc(oppCollection, opportunity);
        console.log(`✓ Created: ${opportunity.title} (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to create ${opportunity.title}:`, error);
        errorCount++;
      }
    }

    console.log(`\n✓ Seeding complete!`);
    console.log(`Successfully created: ${successCount} opportunities`);
    if (errorCount > 0) {
      console.warn(`Errors: ${errorCount}`);
    }

    return { successCount, errorCount };
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  }
};

/**
 * Delete all opportunities (for testing)
 * WARNING: This will permanently delete all opportunities!
 */
export const deleteAllOpportunities = async () => {
  try {
    console.warn('Are you sure? This will delete ALL opportunities!');
    console.warn('Call this function only if you understand the consequences.');
  } catch (error) {
    console.error('Operation canceled');
  }
};

/**
 * HOW TO USE THIS SEEDER:
 * 
 * 1. In your test component, import and call:
 *    
 *    import { seedSampleData } from './firebase/sampleData';
 *    
 *    useEffect(() => {
 *      seedSampleData();
 *    }, []);
 * 
 * 2. Or in browser console:
 *    
 *    import('./firebase/sampleData').then(m => m.seedSampleData());
 * 
 * 3. Watch Firebase Console for data creation
 * 
 * 4. Verify in Firestore by refreshing the console
 */
