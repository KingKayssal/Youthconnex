# YouthConnex GIS Platform - Comprehensive Specification

## Executive Summary

**YouthConnex** is an interactive, location-based economic opportunity ecosystem designed to connect young people with employment, entrepreneurship, and local development opportunities. The platform transforms how youth discover jobs by mapping real opportunities across agriculture, construction, services, and state-funded labor-intensive projects directly on an interactive GIS map.

---

## Table of Contents

1. [Core Concept](#core-concept)
2. [Primary Goal](#primary-goal)
3. [Main User Types](#main-user-types)
4. [Key GIS Features](#key-gis-features)
5. [Sector-Specific Functionalities](#sector-specific-functionalities)
6. [User Interaction Flows](#user-interaction-flows)
7. [Data Visualization Elements](#data-visualization-elements)
8. [Dashboard Features](#dashboard-features)
9. [Advanced GIS Features](#advanced-gis-features)
10. [Technology Stack Recommendations](#technology-stack-recommendations)
11. [MVP Scope](#mvp-scope)
12. [Implementation Roadmap](#implementation-roadmap)

---

## Core Concept

YouthConnex helps young people discover **economic opportunities around them** through an interactive GIS map. Instead of showing only jobs and scholarships, the platform maps:

- **Agricultural cooperatives** - Processing units, farming collectives, agro-business centers
- **Agro-processing centers** - Grain mills, dairy facilities, vegetable processing
- **Construction projects** - Building sites, road rehabilitation, housing projects
- **State-funded labor-intensive projects** - HIMO projects, public works
- **Informal sector businesses** - Tailors, mechanics, market vendors, service providers
- **Local service providers** - Repair shops, hair salons, carpentry workshops
- **Youth entrepreneurship opportunities** - Apprenticeships, partnerships, supply chain connections
- **Vocational training centers** - TVET programs, skill development institutes

---

## Primary Goal

Enable users to **easily identify and engage with**:
1. Local agricultural processing cooperatives in need of workers
2. Construction sites seeking laborers with varying skill levels
3. Informal sector businesses looking for partners and apprentices
4. Labor-intensive work projects funded by the State within specific localities
5. Facilitating youth access to these job opportunities
6. Supporting and increasing visibility and connectivity of the informal sector

---

## Main User Types

### 1. **Youth Job-Seekers**
**Actions:**
- Find jobs near their location using interactive map
- Apply for opportunities directly
- Join cooperatives and get involved
- Contact businesses and managers
- Discover vocational training programs
- Track application status
- Build a verifiable work history

**Key Needs:**
- Proximity-based opportunity discovery
- Simple application process
- Clear job descriptions and requirements
- Direct contact with employers
- Safety assurance

### 2. **Business Owners & Contractors**
**Actions:**
- Post labor needs and requirements
- Search for workers matching their criteria
- Find partners and suppliers
- Promote their businesses on the map
- Manage applications and placements
- Track placement outcomes

**Key Needs:**
- Easy business registration
- Quick job posting
- Access to qualified candidates
- Candidate filtering and matching
- Streamlined hiring workflow

### 3. **Cooperatives & Associations**
**Actions:**
- Advertise available work
- Recruit members
- Showcase production activities and seasons
- Manage labor demand by season
- Track outcomes and employee performance
- Post partnership opportunities

**Key Needs:**
- Seasonal labor demand visibility
- Skill-matched candidate discovery
- Automated enrollment processes
- Compliance tracking
- Member feedback system

### 4. **Government Agencies**
**Actions:**
- Publish state-funded development projects
- Monitor employment outcomes by locality
- Track youth engagement metrics
- Manage labor quotas and targets
- Generate employment reports
- Track program impact

**Key Needs:**
- Real-time enrollment monitoring
- Demographic analytics
- Project visibility and updates
- Impact measurement tools
- Compliance reporting

---

## Key GIS Features

### 1. Interactive Economic Opportunity Map

**The Heart of the Application**

The map is the central interface where all opportunities are visualized in real-time.

#### **Marker Categories with Color Coding**

| Sector | Color | Icon | Represents |
|--------|-------|------|------------|
| 🟢 Agriculture | #2d7a3a | 🌱 | Cooperatives, processing units, farms |
| 🔵 Construction | #c45c1a | 🏗️ | Building sites, road projects, infrastructure |
| 🟠 Services | #7c3aed | 🛒 | Informal businesses, service providers |
| 🔴 State Projects | #1a6fa8 | 🏢 | Government HIMO, public works |
| 🟡 Training | #f59e0b | 📚 | TVET centers, vocational programs |

#### **Marker Interaction**

- **Click marker** → Display popup with opportunity details
- **Hover marker** → Scale effect (1.2x) to indicate interactivity
- **Select marker** → Highlight in sidebar, show full details card
- **Cluster markers** → Auto-cluster when map zoomed out to improve performance

#### **Marker Information Display**

Each marker popup shows:
- Opportunity name/business name
- Role/activity type
- Distance from user
- Number of job openings
- Sector badge with color
- "Express Interest" button
- Contact information (masked for privacy until interest expressed)

### 2. Agricultural Opportunity Mapping

**Comprehensive Cooperative Visibility**

Displays:
- Farming cooperatives across commodities
- Agro-processing units (grain, dairy, vegetables)
- Poultry farms and fish farming projects
- Cocoa, coffee, and specialty crop cooperatives
- Seasonal harvest operations

**Example Card:**

```
Mbalmayo Cocoa Cooperative
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Mbalmayo, Centre Region (2.4 km away)
🌾 Commodity: Cocoa processing
👥 Needs:
   • 10 Farm Assistants
   • 3 Machine Operators
   • 2 Logistics Coordinators
📅 Seasonal: Year-round, peak July-December
💰 Daily rate: 3,500-5,000 FCFA
📚 Skills required: None, basic literacy preferred
🏠 Accommodation: Available for seasonal workers

[View Full Profile] [Express Interest]
```

**Agricultural Features:**
- **Seasonal calendar overlay** showing planting/harvest windows by crop
- **Commodity filtering** (grains, dairy, horticulture, specialty crops)
- **Skill-matching engine** connecting youth certifications to cooperative needs
- **Processing facility profiles** with capacity, shift info, transport access
- **Cooperative rating system** based on youth feedback
- **Cooperative membership portal** for community joining

### 3. Construction Jobs Locator

**Active Site Registry with Phase Tracking**

Shows:
- Building sites and residential projects
- Road construction and infrastructure projects
- Housing and public facilities projects
- Site phases with timeline visibility

**Example Card:**

```
Road Rehabilitation Project — RN4-Est
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Yaoundé to Douala Highway (6.0 km away)
🏗️ Project Type: Road Rehabilitation
👥 Workers Needed: 50 total
   • 20 General laborers (URGENT)
   • 12 Masons
   • 8 Equipment operators
   • 10 Support staff

📅 Duration: 6 Months (Jan - Jun 2024)
💰 Daily wage: 4,500 FCFA (general), 6,000+ (skilled)
🛡️ Safety: PPE provided, safety induction required
🚚 Transport: Available to/from site daily

Current Phase: Foundation Works
Next phase: Superstructure (2 weeks)

[View Full Profile] [Apply Now] [Call Foreman]
```

**Construction Features:**
- **Trade-specific vacancies** (general laborer, mason, carpenter, electrician, scaffolder)
- **Color-coded urgency** (red=immediate, yellow=2 weeks, green=1 month+)
- **Direct foreman contact** (WhatsApp, phone, in-app messaging)
- **Safety compliance badges** (sites with verified PPE, inductions, contracts)
- **Project timeline tracking** with Gantt-style visualization
- **Phase-based job posting** (foundation, superstructure, finishing)
- **Career pathway suggestions** (upskilling recommendations post-placement)

### 4. State-Funded Labor-Intensive Projects (HIMO)

**Unique Government Opportunity Visibility**

Displays:
- All government-funded labor-intensive projects in real-time
- Road maintenance and drainage cleaning projects
- Public works and community infrastructure
- Reforestation and environmental projects
- School/hospital construction projects

**Example Card:**

```
HIMO — Canal Irrigation Zone 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Commune Centre-Sud (5.2 km away)
🏢 Implementing Agency: Ministry of Water & Forestry
🏗️ Project: Irrigation canal rehabilitation
👥 Total workforce needed: 60 person-days
   📊 Youth quota target: 80% (48 youth)
   ✅ Filled to date: 28 youth (58%)
   🔴 Slots available: 20

💰 Daily wage: 3,500 FCFA (standardized rate)
📅 Duration: 8 weeks
🌍 Eligible localities: Commune Centre-Sud, Sud-Est

⏰ Enrollment window: 72 hours (closes Jan 15)
📋 Requirements: Commune resident, age 18-35, no experience needed

[View Details] [Enroll Now] [Call Coordinator]
```

**State Project Features:**
- **Public works registry** with location polygons
- **Enrollment portal** integrated with government systems
- **Commune-level filtering** (department, arrondissement, commune)
- **Budget and workforce transparency** (total budget, person-days, wage)
- **Youth quota tracking** (target vs. filled vs. available)
- **Project launch alerts** (push notifications for new projects)
- **Direct enrollment** routing to government coordination unit
- **Outcome reporting** for government agencies

### 5. Informal Sector Business Directory

**Visibility for Hidden Economic Activity**

Maps:
- Street mechanics and welding shops
- Tailoring and garment workshops
- Hairdressing and beauty services
- Carpentry and woodwork shops
- Brick/cement manufacturing
- Market stalls and vendors
- Food preparation and catering

**Example Card:**

```
Atelier Couture Aminata
━━━━━━━━━━━━━━━━━━━━━━━
📍 Bafoussam Central Market (0.9 km away)
👗 Business: Tailoring Workshop
👥 Workers: 2 (Aminata + 1 apprentice)

🔍 Currently Seeking:
   • 1 Apprentice (textile design)
   • 1 Delivery partner (10 km radius)

💰 Apprentice terms:
   • Duration: 2 years
   • Stipend: 50,000 FCFA/month after 3 months
   • Skills: Pattern-making, cutting, finishing

📞 Contact: WhatsApp: +237 XXX XXXX
⭐ Rating: 4.8/5 (12 placements, 95% completion rate)

[Request Apprenticeship] [Message] [Share Business]
```

**Informal Sector Features:**
- **Self-registration** (no formal documents required)
- **Business directory** searchable by trade, location, hours
- **Partnership matching** (informal businesses post partnership needs)
- **Apprenticeship listings** (trade, duration, stipend, accommodation)
- **Digital presence boost** (QR-code business cards, shareable map links)
- **Supply chain connector** (informal suppliers bid on cooperative/construction needs)
- **Informal economy heatmap** (density visualization of economic activity)
- **Credibility system** (points for verified interactions)

---

## Sector-Specific Functionalities

### Agriculture & Cooperatives Sector

**Functionality Matrix:**

| Feature | Youth | Cooperative | Benefit |
|---------|-------|-------------|---------|
| **Cooperative Locator Map** | Browse nearby coops | Register location, commodity | Find workers, discover opportunities |
| **Labour Demand Indicators** | See job openings | Post labor needs | Transparent matching |
| **Seasonal Calendar Overlay** | Plan availability | Upload harvest calendar | Coordinate seasonal hiring |
| **Skill-Matching Engine** | Upload TVET cert | Review matched candidates | Find qualified workers faster |
| **Processing Facility Profiles** | Learn about facilities | Create detailed profiles | Attract relevant candidates |
| **Rating System** | Rate experience | Receive feedback | Build cooperative reputation |

**Key Data Points:**

- Commodity type (grains, dairy, vegetables, specialty crops)
- Processing capacity (tons/day, if applicable)
- Current workforce size
- Seasonal labor patterns
- Wage rates (daily, seasonal, bonus)
- Accommodation availability
- Transport accessibility
- Skills required
- Health & safety standards

### Construction Sector

**Functionality Matrix:**

| Feature | Youth | Contractor | Benefit |
|---------|-------|-----------|---------|
| **Active Site Registry** | Find nearby sites | Register active sites | Direct proximity matching |
| **Trade-Specific Vacancies** | Filter by trade | Post by phase & trade | Skill-aligned hiring |
| **Foreman Contact** | Call/message directly | Receive inquiries | Fast recruitment |
| **Safety Compliance Badges** | Find safe sites | Upload safety docs | Trust and compliance |
| **Timeline Tracker** | Plan availability | Update project phases | Efficient labor allocation |
| **Career Pathways** | Get upskilling suggestions | Verify outcomes | Long-term talent development |

**Key Data Points:**

- Project type (building, road, infrastructure)
- Site GPS coordinates
- Current phase (foundation, superstructure, finishing)
- Labor needed per phase
- Trade categories and headcount
- Skill requirements
- Wage rates (by trade)
- Daily start/end times
- Transport arrangements
- Safety requirements (PPE, induction)
- Site supervisor contact info
- Project timeline (start, end, expected duration)

### Informal Services Sector

**Functionality Matrix:**

| Feature | Youth | Informal Owner | Benefit |
|---------|-------|---|---------|
| **Business Directory** | Search by trade/location | Self-register | Visibility for unregistered businesses |
| **Partnership Matching** | Find partnership needs | Post needs | Direct connection |
| **Apprenticeships** | Apply for training | Post apprenticeships | Skill transfer, workforce development |
| **QR Business Cards** | Share easily | Generate/print cards | Low-cost marketing |
| **Supply Chain Connector** | Bid on jobs | Post procurement needs | Informal economy integration |
| **Credibility System** | Build track record | Earn verification points | Trust building |

**Key Data Points:**

- Business name, type (trade category)
- Owner contact information
- Service description
- Current workforce size
- Operating hours
- Location (map pin)
- Services offered / products sold
- Partnership needs (if any)
- Apprenticeship offerings
- Credibility points and ratings
- Community endorsements

### State Labor-Intensive Projects (HIMO)

**Functionality Matrix:**

| Feature | Youth | Government Officer | Benefit |
|---------|-------|---|---------|
| **Project Registry** | Find projects | Publish projects | Centralized project visibility |
| **Enrollment Portal** | Apply directly | Monitor applications | Streamlined government hiring |
| **Commune Filtering** | Find local projects | Manage by admin boundary | Residency requirement enforcement |
| **Budget Transparency** | See wages & person-days | Allocate budget | Informed decision-making |
| **Quota Tracking** | Compete fairly | Monitor targets | Accountability and impact |
| **Project Alerts** | Get notifications | Send announcements | Real-time communication |

**Key Data Points:**

- Project name and description
- Implementing agency
- Project type and scope
- Location (coordinates + admin boundaries)
- Total workforce budget
- Planned person-days
- Daily wage rate (standardized)
- Youth quota target (% and absolute)
- Current enrollment count
- Available slots
- Enrollment window dates/times
- Eligibility criteria
- Local residency requirements
- Age restrictions (typically 18-35)
- Any special skills needed
- Contact person and agency details

---

## User Interaction Flows

### Flow 1: Youth Job-Seeker Journey

**Step-by-Step Process:**

```
1. CREATE PROFILE
   ├─ Register with phone/email
   ├─ Add basic info (name, age, location)
   ├─ Select preferred trades/sectors
   ├─ Upload TVET certificate (if available)
   └─ Set location/home commune

2. DISCOVER NEARBY OPPORTUNITIES
   ├─ App centers map on home location
   ├─ All opportunities within 10 km load
   ├─ Markers visible across all sectors
   └─ Sidebar shows sortable list

3. FILTER AND EXPLORE
   ├─ Toggle sector layers (Agriculture, Construction, Services, State)
   ├─ Adjust search radius (2km, 5km, 10km, custom)
   ├─ Filter by job type/trade
   ├─ Sort by proximity, salary, urgency
   └─ Each marker opens detailed card

4. EXPRESS INTEREST
   ├─ Click "I'm Interested" button
   ├─ System auto-fills youth profile
   ├─ Optional message to opportunity owner
   ├─ Send to foreman/manager/government
   └─ Confirmation notification

5. TRACK STATUS
   ├─ Application board shows all submissions
   ├─ Track: Sent → Viewed → Contacted → Placed
   ├─ Push alerts on status changes
   ├─ Direct messaging with opportunity owners
   └─ Call or WhatsApp contact

6. POST-PLACEMENT
   ├─ Confirm placement completion
   ├─ Rate experience (1-5 stars)
   ├─ Provide feedback on employer
   ├─ Earn credibility points
   └─ Receive upskilling recommendations
```

**Key Screens:**

1. **Map View Screen**
   - Full-screen interactive map
   - Marker layer toggles (top-right)
   - Search/filter bar (top-left)
   - Opportunity sidebar (left panel, 200px)
   - Popup on marker click

2. **Opportunity Detail Card**
   - Full business/project name
   - Complete job description
   - Location & distance
   - Requirements & skills
   - Salary/compensation
   - Contact info
   - Apply/Express Interest button

3. **Application Tracker Dashboard**
   - List of submitted applications
   - Status badges (color-coded)
   - Last interaction timestamp
   - Direct action buttons (call, message, cancel)
   - Notification bell for updates

4. **Profile & Settings**
   - Personal information
   - Skills and certifications
   - Preferred sectors and trades
   - Location/home commune
   - Notification preferences

---

### Flow 2: Cooperative Manager Journey

**Step-by-Step Process:**

```
1. REGISTER COOPERATIVE
   ├─ Submit registration number
   ├─ Specify commodity type
   ├─ Enter processing location
   ├─ Provide GPS coordinates
   ├─ Add photos/verification docs
   └─ Wait for 48-hour verification

2. POST LABOR NEEDS
   ├─ Create vacancy card
   ├─ Specify workers needed (count)
   ├─ Define trade/task type
   ├─ Set duration (seasonal/permanent)
   ├─ Enter daily wage rate
   ├─ Specify accommodation availability
   └─ Set urgency level

3. REVIEW APPLICANTS
   ├─ Incoming interest cards
   ├─ View youth profile (skills, location, experience)
   ├─ One-tap to call candidate
   ├─ Send message or WhatsApp
   ├─ Request additional info
   └─ Schedule interviews

4. CONFIRM PLACEMENT
   ├─ Mark as confirmed
   ├─ Send onboarding info
   ├─ Record employment outcome
   └─ Build placement history
```

**Key Screens:**

1. **Cooperative Dashboard**
   - Cooperative profile overview
   - Active job postings
   - Received applications (count)
   - Placement history & outcomes
   - Quick actions (post job, edit profile)

2. **Vacancy Management**
   - List of open vacancies
   - Job posting form
   - Candidate applications per vacancy
   - Ranking system for candidates

3. **Applicant Management**
   - Incoming applications list
   - Youth profile cards (skills, distance, experience)
   - Communication center (call, message, WhatsApp)
   - Interview scheduling tool

---

### Flow 3: Construction Contractor Journey

**Step-by-Step Process:**

```
1. REGISTER ACTIVE SITE
   ├─ Enter site address (with GPS pin)
   ├─ Specify project type
   ├─ Add client info
   ├─ Set start/end dates
   ├─ Define labor needs by phase
   └─ Upload site photos

2. POST PHASE VACANCIES
   ├─ Update vacancies as project progresses
   ├─ Post job cards per phase
   ├─ Specify trade requirements
   ├─ Set priority/urgency
   └─ Timeline view shows when trades needed

3. BROWSE MATCHED PROFILES
   ├─ System surfaces nearby youth
   ├─ Filter by skill match
   ├─ Sort by availability
   ├─ One-click invitations
   └─ Proactive candidate outreach

4. ISSUE SAFETY INDUCTION
   ├─ Upload safety briefing document
   ├─ Accepted candidates receive in-app
   ├─ Track induction completion
   └─ Pre-site preparation
```

**Key Screens:**

1. **Site Management Dashboard**
   - List of active construction sites
   - Current phase status
   - Labor needs by phase
   - Received applications count
   - Quick actions (update phase, post job)

2. **Phase Timeline View**
   - Gantt-style project timeline
   - Labor intensive phases highlighted
   - Vacancies by phase
   - Upcoming phase warnings

---

### Flow 4: Government Project Officer Journey

**Step-by-Step Process:**

```
1. PUBLISH PROJECT
   ├─ Ministry uploads project
   ├─ Provide location polygon
   ├─ Set workforce budget
   ├─ Define youth quota target (%)
   ├─ Set enrollment window dates
   └─ Add eligibility criteria

2. MONITOR ENROLLMENT (Real-time)
   ├─ Dashboard shows enrollment rate
   ├─ Demographic breakdown (age, gender, commune)
   ├─ Applicant count by commune
   ├─ Unfilled slots visualization
   └─ Performance vs. target

3. VALIDATE LOCAL CANDIDATES
   ├─ Review applications
   ├─ Verify commune residency
   ├─ Confirm age & eligibility
   ├─ Mark as approved/rejected
   └─ Send notifications

4. REPORT IMPACT
   ├─ Export workforce report
   ├─ Total youth employed count
   ├─ Person-days delivered
   ├─ Average daily wage
   ├─ Gender split analysis
   ├─ Commune-level breakdown
   └─ Submit to ministry
```

**Key Screens:**

1. **Project Publication Form**
   - Project details entry
   - Location mapping
   - Budget and quota settings
   - Timeline configuration
   - Eligibility rules

2. **Enrollment Monitoring Dashboard**
   - Real-time enrollment meter (vs. target)
   - Demographic charts
   - Geographic heatmap (enrollment by commune)
   - Applicant queue
   - Alert system (falling behind target)

3. **Validation & Approval Panel**
   - Queue of applications for review
   - Residency verification checklist
   - Approve/reject actions
   - Bulk operations
   - Notification broadcasting

---

### Flow 5: Informal Business Owner Journey

**Step-by-Step Process:**

```
1. SELF-REGISTER (No documentation required)
   ├─ Enter business name
   ├─ Select trade category
   ├─ Pin location on map
   ├─ Add operating hours
   ├─ Provide contact number
   └─ Instant activation

2. POST A PARTNERSHIP NEED
   ├─ Describe what you're looking for
   ├─ Upload photos of business
   ├─ Set urgency level
   ├─ Specify requirements
   └─ Post visible to all users

3. RECEIVE AND RESPOND
   ├─ Incoming inquiries from youth
   ├─ Review candidate profile cards
   ├─ Call, WhatsApp, or message
   ├─ Schedule meetings/trials
   └─ Confirm arrangements

4. GROW VISIBILITY
   ├─ Each verified interaction = credibility point
   ├─ Higher-rated businesses rank higher
   ├─ QR business card (printable)
   ├─ Sharable map link
   └─ Community endorsements
```

**Key Screens:**

1. **Business Profile Setup**
   - Quick registration form
   - Map pin placement
   - Business photo upload
   - Contact details
   - Business hours

2. **Informal Business Dashboard**
   - Business overview card
   - Current partnership needs posts
   - Incoming inquiries
   - Credibility/rating score
   - Download QR business card

---

## Data Visualization Elements

### 1. Opportunity Heatmap

**Purpose:** Show areas with high job availability and economic activity

**Visualization:**
- Color gradient overlay on map (cool → hot)
- Blue zones: Low opportunity density
- Green zones: Moderate opportunity density
- Yellow zones: High opportunity density
- Red zones: Very high opportunity density (opportunity clusters)

**Interactions:**
- Click zone to filter by that area
- Hover to show count of opportunities
- Toggle on/off in layer menu

### 2. Opportunity Density Analysis

**Purpose:** Visualize employment/opportunity distribution by geography

**Charts:**

**Bar Chart: Opportunities by District**
```
Yaoundé Centre     ████████████░░  84 opportunities
Yaoundé Est        ██████░░░░░░░░  42 opportunities
Yaoundé Nord       ███████░░░░░░░  48 opportunities
Yaoundé Ouest      █████░░░░░░░░░  35 opportunities
Douala Port-Gentil ██████████░░░░░ 72 opportunities
```

**Map Overlay: Opportunities by Municipality**
- Each municipality polygon colored by opportunity density
- Tooltip shows count and sector breakdown
- Click municipality to zoom and filter

### 3. Sector Distribution Dashboard

**Purpose:** Show market composition and demand by sector

**Pie/Doughnut Chart:**
```
Sector Distribution (Total: 1,847 opportunities)
╔════════════════════════════════════════╗
║  Agriculture:        40% (738 jobs)    ║
║  Construction:       35% (646 jobs)    ║
║  Services:          20% (369 jobs)    ║
║  State HIMO:         5% (94 jobs)     ║
╚════════════════════════════════════════╝
```

**Stacked Bar Chart: Sector Trends Over Time**
```
Week 1  │████ Agri │███ Const │█ Serv │
Week 2  │█████ Agri │██ Const │██ Serv │
Week 3  │███ Agri │████████ Const │█ Serv │
Week 4  │██ Agri │██ Const │████ Serv │
```

### 4. Labor Demand by Sector

**Purpose:** Show where the most jobs are available

**Bar Chart:**
```
Active Labour Demand by Sector
━━━━━━━━━━━━━━━━━━━━━━━━━━
Agriculture   ████████████░ 68 opportunities
Construction  █████████████████░ 91 opportunities
Services      ████████░ 43 opportunities
State HIMO    ██████████░ 58 opportunities
━━━━━━━━━━━━━━━━━━━━━━━━━━
Highest demand: Construction
Fastest growing: State HIMO projects
```

### 5. Registered Youth by Geographic Area

**Purpose:** Show youth concentration and identify underserved areas

**Bubble Map Chart:**
```
Commune A    ●●● (312 youth registered)
Commune B    ●●●●● (478 youth registered)
Commune C    ●● (194 youth registered)
Commune D    ●●● (267 youth registered)
```

**Interpretation:**
- Larger bubbles = more youth
- Identify where youth concentration is highest
- Cross-reference with opportunity locations to find gaps

### 6. Opportunity vs. Youth (Supply-Demand Analysis)

**Purpose:** Identify "opportunity deserts" and labor shortages

**Quadrant Analysis:**

```
Opportunity vs. Youth Distribution
┌─────────────────────────────────────┐
│  HIGH JOBS │  OPPORTUNITY RICH      │
│  HIGH YOUTH│  (Balanced)            │
├─────────────┼─────────────────────────┤
│  HIGH JOBS │  ⚠️ OPPORTUNITY DESERT   │
│ LOW YOUTH  │  (High demand, few youths)
├─────────────┼─────────────────────────┤
│ LOW JOBS   │  LOW JOBS              │
│HIGH YOUTH  │ HIGH YOUTH             │
│           │  (Need opportunities)   │
├─────────────┼─────────────────────────┤
│ LOW JOBS   │  (Balanced low         │
│ LOW YOUTH  │   activity area)       │
└─────────────────────────────────────┘
```

**Bar Chart: Opportunity Deserts (High Youth / Low Jobs)**
```
Zone Nord    ████░░░░░░░░░░░░░░░░  15% filled
Zone Est     ██████░░░░░░░░░░░░░░  22% filled
Zone Ouest   ███████████░░░░░░░░░  38% filled
Zone Sud     ███████████████░░░░░  55% filled
```

### 7. Platform Activity Dashboard

**Real-Time Metrics (24-hour view)**

```
PLATFORM ACTIVITY TODAY
╔════════════════════════════════════╗
║ 2,341      │ Active youth logged in
║ 187        │ Open job opportunities
║ 64         │ New placements made
║ 12         │ New projects launched
║ 428        │ Applications submitted
║ 95%        │ Application response rate
╚════════════════════════════════════╝
```

### 8. Youth Employment Status Tracker

**Purpose:** Show macro employment trends

**Line Chart: Placements Over Time**
```
Placements (30-day rolling average)
                                    ▲
                                    │  ╱╲
                      ╱╲        ╱╲ ╱  ╲
         ╱──╲    ╱╲ ╱  ╲  ╱╲ ╱    │    ╲
    ────╱    ╲──╱  ╲    ╱    ╲    │
                                  ├───────▶ Time
                                  ▼
Trend: ↗ +15% (week-over-week)
```

### 9. Sector-Specific Insights

**Agriculture Sector:**
- Seasonal demand timeline
- Cooperative capacity utilization
- Harvest season forecasting
- Labor supply adequacy by crop

**Construction Sector:**
- Active sites count
- Total workers needed
- Project phase distribution
- Trade-specific demand

**Services Sector:**
- Business density heatmap
- Service category breakdown
- Informal economy growth rate
- Partnership opportunity count

**State HIMO Projects:**
- Project enrollment vs. target
- Budget allocation
- Geographic coverage
- Youth demographic representation

---

## Dashboard Features

### User Dashboard (Youth Job-Seeker)

**Components:**

1. **Welcome Card**
   ```
   Hello, Ahmed!
   ─────────────────
   Current location: Yaoundé, Centre Region
   Profile completion: 85%
   [Complete Profile]
   ```

2. **Economic Opportunity Summary**
   ```
   📊 Your Opportunities (Today)
   ├─ 18 new opportunities nearby
   ├─ 4 in your preferred sectors
   ├─ 2 within 1 km
   └─ 1 matching your skills perfectly
   
   [Explore Map]
   ```

3. **Nearby Opportunities (Map Widget)**
   ```
   🗺️ Opportunities Within 5 km
   ┌─────────────────────────────┐
   │  Map Preview (Interactive)  │
   │  ▪ Agriculture (2)          │
   │  ▪ Construction (1)         │
   │  ▪ Services (3)             │
   └─────────────────────────────┘
   [Show Full Map]
   ```

4. **Application Tracker**
   ```
   📋 Your Applications (6 active)
   
   Mbalmayo Cocoa Cooperative
   ├─ Status: Viewed (2 days ago)
   ├─ Contact: +237 XXXX XXXX
   └─ [Message] [Call] [Cancel]
   
   Chantier Résidentiel K7
   ├─ Status: Contacted (today)
   ├─ Interview: Tomorrow at 10 AM
   └─ [Confirm] [Message]
   
   [View All Applications]
   ```

5. **Recommended Opportunities**
   ```
   ✨ Recommended For You
   Based on location, skills & interests:
   
   • Coopérative Horticulture (2.2 km)
     Needs: 20 farm assistants
   
   • Atelier Couture Aminata (0.9 km)
     Seeks: Apprentice (textile design)
   
   [View More Recommendations]
   ```

6. **Local Economic Activity Feed**
   ```
   📰 Latest in Your Area
   
   🟢 NEW: Coopérative Maïs d'Or
       Now hiring 12 processors
       Posted 2 hours ago
   
   🔵 UPDATED: Road Rehab Project RN4
       25 slots now open
       Updated 4 hours ago
   
   🟠 NEW: Repair Shop (Electronics)
       Seeking supply partners
       Posted 6 hours ago
   
   [See More]
   ```

### Cooperative Manager Dashboard

**Components:**

1. **Cooperative Overview**
   ```
   Mbalmayo Cocoa Cooperative
   ─────────────────────────────
   Status: ✅ Verified (48 days)
   Members: 147
   Average rating: ⭐ 4.7/5
   Placements this month: 23
   ```

2. **Labor Needs Summary**
   ```
   👥 Current Labour Needs
   ├─ 10 Farm Assistants (URGENT)
   ├─ 3 Machine Operators (2 weeks)
   ├─ 2 Logistics Coordinators (1 month)
   └─ Total: 15 positions open
   
   Applications received: 47
   Qualified candidates: 12
   Hired: 7 (21% conversion)
   ```

3. **Seasonal Capacity View**
   ```
   📅 Seasonal Demand Timeline
   
   Jan  ▓▓░░░░░ 2 workers
   Feb  ▓▓░░░░░ 2 workers
   Mar  ▓▓▓░░░░ 3 workers
   Apr  ▓▓▓▓░░░ 5 workers
   May  ▓▓▓▓▓▓░ 8 workers (PEAK)
   Jun  ▓▓▓▓▓▓░ 8 workers (PEAK)
   ```

4. **Recent Applications**
   ```
   📬 Incoming Applications (12 this week)
   
   Isaac Nkongho (Yaoundé, 1.2 km)
   ├─ TVET Certificate: Crop Management
   ├─ Experience: 2 years cocoa farming
   └─ [Call] [Message] [Schedule Interview]
   
   Fatima Diallo (Yaoundé, 2.5 km)
   ├─ No certification, eager to learn
   ├─ Available immediately
   └─ [Call] [Message] [Schedule Interview]
   ```

5. **Placement History & Ratings**
   ```
   ⭐ Recent Placements
   
   John Tambe - Hired 3 weeks ago
   └─ Rating: ⭐⭐⭐⭐⭐ "Excellent worker"
   
   Marie Ayuk - Hired 2 months ago
   └─ Rating: ⭐⭐⭐⭐☆ "Good work ethic"
   ```

### Construction Site Manager Dashboard

**Components:**

1. **Active Sites Overview**
   ```
   🏗️ Your Projects (3 active)
   
   Chantier Résidentiel K7
   ├─ Phase: Foundation (week 4/12)
   ├─ Workers on-site: 18/20
   ├─ Next phase: Superstructure (2 weeks)
   └─ Status: On schedule ✅
   
   Road Rehabilitation RN4-Est
   ├─ Phase: Earthworks (week 1/24)
   ├─ Workers on-site: 32/35
   ├─ Slots opening: 15 (2 weeks)
   └─ Status: Ahead of schedule ✅
   ```

2. **Labour Needs by Phase**
   ```
   📊 Upcoming Labour Needs
   
   Current (This Week): 5 masons needed
   2 Weeks: 12 carpenters, 8 electricians
   1 Month: 20 general laborers, 5 equipment ops
   
   [Post Vacancies]
   ```

3. **Project Timeline with Labour View**
   ```
   Gantt Chart: Project Duration + Labour Demand
   
   Activity          Week 1-4    Week 5-12   Week 13-24
   ─────────────────────────────────────────────────────
   Foundation        [BUSY]▓▓▓▓  Workers: 35
   Structure                     [VERY BUSY]▓▓▓▓▓
                                  Workers: 50
   Finishing                                  [BUSY]▓▓
                                              Workers: 15
   ```

### Government Project Officer Dashboard

**Components:**

1. **Project Registry & Status**
   ```
   🏢 Active Government Projects (7)
   
   HIMO Canal Irrigation Z3
   ├─ Budget: 15M FCFA
   ├─ Workers target: 60
   ├─ Youth quota: 80% (48 youth)
   ├─ Currently enrolled: 28 youth (58% of quota)
   ├─ Status: Enrolling (72 hours left)
   └─ Progress: ▓▓▓▓▓░░ 58%
   
   Reboisement Commune Sud
   ├─ Budget: 8M FCFA
   ├─ Workers target: 45
   ├─ Currently enrolled: 45 youth (100% ✅)
   ├─ Status: QUOTA FILLED
   └─ Progress: ▓▓▓▓▓▓▓ 100%
   ```

2. **Real-Time Enrollment Monitor**
   ```
   📊 Enrollment Dashboard
   
   Total Target: 500 youth
   Total Enrolled: 312 youth (62%)
   Average: ▓▓▓░░░░░░░ 62%
   
   Trend: ↗ +8% (today vs. yesterday)
   Projection: Target reached in 5 days
   ```

3. **Demographics by Project**
   ```
   👥 Applicant Demographics (HIMO Canal Irrigation Z3)
   
   Gender split: 68% Male, 32% Female
   Age: 75% (18-25), 20% (26-35), 5% (35+)
   Education: 45% Primary, 40% Secondary, 15% TVET cert
   Commune split:
   ├─ Commune Sud: 60%
   ├─ Commune Centre: 30%
   └─ Commune Nord: 10%
   ```

4. **Geographic Heat Map**
   ```
   🗺️ Enrollment by Commune (Geographic View)
   
   Commune A: ●●●●● (128 enrolled)
   Commune B: ●●● (84 enrolled)
   Commune C: ●●●● (100 enrolled)
   ```

---

## Advanced GIS Features

### 1. Radius Search with Visualization

**Functionality:**
- User sets desired radius (2 km, 5 km, 10 km, 25 km, or custom)
- Circle drawn on map showing search boundary
- Only opportunities within circle displayed
- Results sidebar sorted by distance

**UI Elements:**
- Radius slider (with preset buttons)
- Distance toggle (km or miles)
- Results count badge
- Clear results option

### 2. Route Navigation & Directions

**Functionality:**
- Click "Directions" on opportunity card
- Integrates with device GPS navigation
- Shows route from current location to opportunity
- Multiple route options (fastest, shortest, public transit)
- Real-time navigation within app

**Third-Party Integration:**
- Google Maps API for routing
- Open Street Map alternative for offline regions

### 3. Locality Filter (Admin Boundaries)

**Filter By:**
- Region (Littoral, Centre, West, etc.)
- Division (urban administrative unit)
- Subdivision (smaller district)
- Commune (municipality)
- Village / Neighborhood

**UI:**
- Hierarchical dropdown menu
- Map boundary visualization
- Count of opportunities per level

### 4. Sector & Trade-Specific Search

**Advanced Filters:**
- **By Sector:** Agriculture, Construction, Services, State HIMO
- **By Commodity (Agri):** Grains, Dairy, Vegetables, Poultry, Fish, Specialty
- **By Trade (Construction):** Mason, Carpenter, Electrician, Painter, Laborer, Equipment
- **By Service Category:** Tailoring, Repair, Transport, Food, Craft
- **By Skill Level:** Unskilled, Semi-skilled, Skilled, Master
- **By Duration:** 1-2 days, 1 week, 1 month, 3 months, 6 months, permanent
- **By Wage Range:** Custom min/max filter

### 5. Opportunity Clustering

**When Zoomed Out:**
- Map clusters nearby opportunities into visual groups
- Cluster shows count and sector breakdown
- Click cluster to zoom into constituent pins
- Cluster color reflects dominant sector

### 6. Opportunity Comparison Tool

**Functionality:**
- Select 2-3 opportunities from sidebar
- Slide-by-side comparison card
- Comparison matrix: wages, distance, sector, rating, etc.
- Visual differences highlighted

### 7. Saved Opportunities & Watchlist

**Features:**
- Heart/bookmark icon on opportunity card
- Saves to "Watchlist" for later
- Notifications when watchlist items are updated
- Easy access from dashboard

### 8. Offline Map Capability

**For Rural Communities with Poor Connectivity:**
- Download specific map regions for offline use
- Cached opportunity data (last sync)
- Offline search and filtering
- Auto-sync when connection restored

### 9. Route Optimization for Multi-Site Touring

**For Youth Visiting Multiple Opportunities:**
- Mark multiple opportunities of interest
- System calculates optimal visiting route
- Minimize travel time/distance
- Turn-by-turn directions to each site

### 10. Real-Time Traffic & Accessibility

**Map Overlay:**
- Shows traffic conditions on roads
- Public transit options
- Accessibility indicators (ADA compliance where applicable)
- Estimated travel times with current traffic

---

## Technology Stack Recommendations

### Frontend Framework
- **React 18+** (already in place)
- **Vite** (build tool, faster than CRA)
- **TypeScript** (type safety, recommended)

### Mapping Libraries
- **Mapbox GL JS** (powerful, real-time updates)
  - Alternative: **Leaflet + OpenStreetMap** (open source)
  - Alternative: **Google Maps API** (comprehensive)
  - Recommendation: **Start with Mapbox for production quality**

### State Management
- **React Context** (already in place)
- Alternative: **Redux Toolkit** (if state complexity increases)
- **Zustand** (lightweight alternative)

### UI Components & Styling
- **Tailwind CSS** (already configured)
- **shadcn/ui** or **Radix UI** (accessible components)
- **Recharts** or **Chart.js** (data visualization)

### Real-Time Features
- **Firebase Realtime Database** (already integrated)
- **Socket.io** (for notifications and live updates)
- **Pusher** or **Ably** (managed real-time service)

### Geolocation & GPS
- **Geolocation API** (browser native)
- **react-geolocated** (React wrapper)

### Backend Services
- **Firebase Cloud Functions** (serverless)
- **Node.js + Express** (traditional backend)
- **GraphQL** (alternative to REST for complex queries)

### Database
- **Firebase Firestore** (already in place, good for geo queries)
- **PostGIS** (PostgreSQL with geospatial extensions) - for heavy GIS work

### Authentication
- **Firebase Authentication** (already configured)
- **JWT** (if moving away from Firebase)

### Testing
- **Vitest** (unit tests)
- **Playwright** (E2E tests)
- **React Testing Library** (component tests)

### Deployment
- **Vercel** (optimized for Next.js/React)
- **Firebase Hosting** (integrated with Firebase backend)
- **Netlify** (static site hosting)

---

## MVP Scope

### Phase 1: MVP Core Features (2-4 weeks)

#### **Essential Components:**

1. **Interactive GIS Map**
   - Mapbox GL JS integration
   - Marker layer rendering
   - Click-to-see-details popup
   - Sector layer toggles (agriculture, construction, services, state)
   - Basic search/filter by location

2. **Opportunity Display System**
   - Marker placement on map (all four sectors)
   - Popup/card display on click
   - Sidebar list view
   - Distance calculation from user location
   - Marker color coding by sector

3. **Agriculture Opportunities**
   - Cooperative registration form
   - Job posting for cooperatives
   - Opportunity card display
   - Basic filtering by commodity type

4. **Construction Opportunities**
   - Contractor site registration
   - Job posting by trade category
   - Opportunity card with foreman contact
   - Basic site information display

5. **Informal Services Directory**
   - Business self-registration (minimal form)
   - Business pin placement on map
   - Business information card
   - Search by business category

6. **State HIMO Projects**
   - Government project registration form
   - Project publication on map
   - Enrollment portal (basic)
   - Application form for youth

7. **User Authentication & Profiles**
   - Phone/email registration
   - Simple profile creation
   - Profile data storage (Firebase)
   - User role selection (youth, business, government, etc.)

8. **Application Tracking**
   - "Express Interest" button functionality
   - Basic application storage
   - Application status tracking (sent, viewed, contacted)
   - Dashboard list of applications

### Phase 2: Enhanced Features (2-3 weeks)

1. **Advanced Filtering & Search**
   - Radius adjustment slider
   - Locality filtering (by commune, division)
   - Trade/commodity specific filters
   - Wage range filters
   - Duration filters

2. **Data Visualization**
   - Sector distribution chart
   - Opportunity heatmap
   - Labor demand chart
   - Youth registration by area

3. **Direct Communication**
   - In-app messaging between users
   - WhatsApp integration
   - Phone call button
   - Message templates

4. **Notifications System**
   - Application status updates
   - New opportunity alerts
   - Project launch notifications
   - Push notifications (if PWA)

5. **Opportunity Management**
   - Edit/update job postings
   - Manage active opportunities
   - Close opportunities
   - Mark placements as complete

6. **Offline Support**
   - Download map regions for offline viewing
   - Service Workers for offline functionality
   - Sync when online

### Phase 3: Advanced Features (2-3 weeks)

1. **Rating & Review System**
   - Post-placement rating forms
   - Display ratings on business/cooperative cards
   - Feedback collection
   - Rating display logic

2. **Government Analytics Dashboard**
   - Real-time enrollment monitoring
   - Demographic analytics
   - Geographic distribution
   - Project performance tracking
   - Export reports

3. **Matching Engine**
   - Basic skill matching (youth profile vs. job requirements)
   - Recommendation suggestions
   - Career pathway suggestions

4. **Advanced GIS Features**
   - Route optimization
   - Traffic layer (optional)
   - Multi-site visiting routes
   - Custom radius search visualization

### MVP Data Model

**Collections (Firebase Firestore):**

```
users/
  ├─ userId/
      ├─ type: 'youth' | 'business' | 'cooperative' | 'government'
      ├─ name, email, phone
      ├─ location: { lat, lng }
      ├─ profile: { skills, education, experience }
      └─ preferences: { sectors, trades }

opportunities/
  ├─ opportunityId/
      ├─ type: 'agriculture' | 'construction' | 'services' | 'state'
      ├─ title, description
      ├─ location: { lat, lng, address }
      ├─ sector: string
      ├─ jobsNeeded: number
      ├─ wage: { currency, dailyRate }
      ├─ duration: string
      ├─ requirements: [ ]
      ├─ ownerId: reference to user
      ├─ status: 'active' | 'filled' | 'closed'
      ├─ createdAt, updatedAt
      └─ ratings: []

applications/
  ├─ applicationId/
      ├─ youthId: reference
      ├─ opportunityId: reference
      ├─ status: 'sent' | 'viewed' | 'contacted' | 'placed' | 'rejected'
      ├─ message: string
      ├─ createdAt, updatedAt
      └─ rating: { score, comment }

cooperatives/
  ├─ cooperativeId/
      ├─ name, registrationNumber
      ├─ location: { lat, lng }
      ├─ commodity: string
      ├─ members: number
      ├─ verified: boolean
      └─ rating: number

ratings/
  ├─ ratingId/
      ├─ fromUserId: reference
      ├─ toBusinessId: reference
      ├─ score: 1-5
      ├─ comment: string
      └─ createdAt
```

---

## Implementation Roadmap

### Week 1-2: Foundation & Map Integration
- [ ] Set up Mapbox GL JS
- [ ] Create interactive map component
- [ ] Implement marker rendering system
- [ ] Build basic popup display
- [ ] Connect Firebase data to map markers
- [ ] Implement layer toggle functionality

### Week 3-4: Opportunity System
- [ ] Create opportunity model and database schema
- [ ] Build opportunity card component
- [ ] Implement sidebar list view
- [ ] Build opportunity detail view
- [ ] Create filtering system (basic)
- [ ] Implement search functionality

### Week 5-6: User Roles & Authentication
- [ ] Extend Firebase auth for multiple user types
- [ ] Create registration flows for each user type
- [ ] Build user profile pages
- [ ] Implement role-based UI
- [ ] Create profile completion logic

### Week 7-8: Application System
- [ ] Build "Express Interest" functionality
- [ ] Create application tracking dashboard
- [ ] Implement application status management
- [ ] Build application list view
- [ ] Create notification system for status changes

### Week 9-10: Sector-Specific Features
- [ ] Build cooperative registration & management
- [ ] Build construction site registration & management
- [ ] Build informal business registration & management
- [ ] Build government project management
- [ ] Implement sector-specific field handling

### Week 11-12: Visualization & Analytics
- [ ] Build data visualization components (charts, heatmaps)
- [ ] Create analytics dashboard
- [ ] Implement real-time data aggregation
- [ ] Build government reporting tools

### Week 13-14: Communication & Advanced Features
- [ ] Implement messaging system
- [ ] Add WhatsApp/phone integration
- [ ] Build rating and review system
- [ ] Implement offline map support
- [ ] Add advanced filtering options

### Week 15+: Polish & Deployment
- [ ] Testing and QA
- [ ] Performance optimization
- [ ] SEO and accessibility improvements
- [ ] Deployment pipeline setup
- [ ] Monitoring and logging

---

## Key Success Metrics

### User Engagement
- Monthly Active Users (MAU)
- Session duration
- Map interactions per session
- Opportunities viewed per session

### Business Outcomes
- Applications submitted
- Placements made
- Average time-to-placement
- Repeat usage rate

### Platform Health
- Opportunity listing quality
- User profile completion %
- Application response rate
- Platform uptime

### Social Impact (Government)
- Youth employed through platform
- Total person-days delivered
- Wage disbursed
- Geographic coverage
- Youth quota achievement %

---

## Future Enhancement Roadmap

### Phase 4: AI & Intelligence
- Machine learning-based opportunity matching
- Predictive labor demand forecasting
- Natural language job description processing
- Skills gap analysis

### Phase 5: Supply Chain Integration
- Procurement marketplace
- Supplier ratings and history
- Purchase order management
- Payment integration

### Phase 6: Mobile App
- Native iOS app (React Native)
- Native Android app (React Native)
- Offline-first architecture
- Enhanced geolocation features
- App-only features (push notifications, location tracking)

### Phase 7: Ecosystem Expansion
- Job training marketplace
- Microfinance/credit for informal businesses
- Business incubation support
- Government policy tracking
- Export compliance tools

---

## Conclusion

YouthConnex is positioned to become a transformative platform that:

1. **Eliminates information barriers** - Making opportunities visible to youth who would otherwise never know they exist
2. **Formalizes the informal economy** - Bringing informal businesses into a verifiable, connected ecosystem
3. **Drives employment outcomes** - Direct connection between youth seeking work and employers seeking workers
4. **Supports government priorities** - Enabling efficient deployment of state labor-intensive projects to reach youth
5. **Creates economic multipliers** - As businesses access workers and grow, they create more opportunities

The MVP focuses on the core value proposition: **a map that shows real opportunities, with people who can find them and employers who can fill their needs**. Everything else builds on this foundation.

---

## Appendix: Component Structure Recommendations

```
src/
├── components/
│   ├── Map/
│   │   ├── InteractiveMap.jsx
│   │   ├── MarkerLayer.jsx
│   │   ├── PopupCard.jsx
│   │   ├── HeatmapLayer.jsx
│   │   └── SearchBar.jsx
│   ├── Opportunities/
│   │   ├── OpportunityCard.jsx
│   │   ├── OpportunitySidebar.jsx
│   │   ├── OpportunityFilters.jsx
│   │   └── OpportunityDetail.jsx
│   ├── Dashboard/
│   │   ├── YouthDashboard.jsx
│   │   ├── BusinessDashboard.jsx
│   │   ├── GovernmentDashboard.jsx
│   │   └── ApplicationTracker.jsx
│   ├── Forms/
│   │   ├── OpportunityForm.jsx
│   │   ├── UserProfileForm.jsx
│   │   ├── FilterForm.jsx
│   │   └── ApplicationForm.jsx
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── RoleSelector.jsx
│   └── Shared/
│       ├── TopBar.jsx
│       ├── Sidebar.jsx
│       └── NotificationCenter.jsx
├── pages/
│   ├── MapPage.jsx
│   ├── DashboardPage.jsx
│   ├── OpportunityDetailsPage.jsx
│   ├── ProfilePage.jsx
│   └── AdminPage.jsx
├── services/
│   ├── api.js (existing)
│   ├── geoService.js
│   ├── mapService.js
│   └── analyticService.js
├── utils/
│   ├── helpers.js (existing)
│   ├── mapHelpers.js
│   └── distanceCalculator.js
└── hooks/
    ├── useMap.js
    ├── useOpportunities.js
    ├── useUserLocation.js
    └── useApplications.js
```

