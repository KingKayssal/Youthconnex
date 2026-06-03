export const zoneSpecs = [
  {
    id: 'overview-stats',
    title: 'Overview & stats',
    featureCount: 6,
    icon: '📊',
    type: 'Core Seeker',
    themeColor: 'blue',
    summary: 'Personalised greeting, live KPI cards, and activity summary at a glance.',
    quickBadges: ['KPI cards', 'Greeting', 'Activity'],
    features: [
      {
        title: 'Personalised greeting',
        description: 'Time-aware salutation ("Good morning, Alex 👋") rendered from the user\'s profile name or email. Resets on each session.'
      },
      {
        title: 'KPI summary cards',
        description: 'Four metric cards fetched on mount: total opportunities within the user\'s radius, saved count, applications started, and deadlines expiring this week. Each card shows a skeleton loader during the API call and a live count once resolved.'
      },
      {
        title: 'Deadline urgency strip',
        description: 'Horizontally scrollable row of opportunities closing within 72 hours, colour-coded from red (today) through amber (48 hrs) to yellow (72 hrs). Tapping any item navigates to its detail page.'
      },
      {
        title: 'Recent activity feed',
        description: 'Chronological log of the user\'s own actions (viewed, saved, applied) with relative timestamps ("2 hours ago"). Acts as a session resume point so the user can continue where they left off.'
      },
      {
        title: 'Profile completion ring',
        description: 'Circular progress indicator (0–100%) with a short prompt listing the three highest-impact missing fields. Incomplete profiles receive lower-quality recommendations, so this widget directly incentivises completion.'
      },
      {
        title: 'Auto-refresh on tab focus',
        description: 'Stats silently re-fetch when the browser tab regains focus after being idle for 5 or more minutes, keeping counts accurate without a manual page reload.'
      }
    ]
  },
  {
    id: 'geospatial-map',
    title: 'Interactive geospatial map',
    featureCount: 9,
    icon: '🗺️',
    type: 'Map / GIS',
    themeColor: 'green',
    summary: 'Full MapLibre GL JS map — clustered pins, heatmaps, radius search, and offline tile caching.',
    quickBadges: ['MapLibre GL', 'PostGIS radius', 'Clustering', 'Heatmap', 'Offline PWA'],
    features: [
      {
        title: 'Clustered opportunity pins',
        description: 'MapLibre GL JS renders colour-coded pins by category (jobs = blue, scholarships = gold, events = green, etc.). Supercluster groups nearby markers at low zoom levels into bubble clusters that show a count and explode into individual pins as the user zooms in.'
      },
      {
        title: 'Radius search ring',
        description: 'An animated pulsing circle centred on the user\'s location visualises the active search radius. A drag handle on the ring edge lets users resize it directly on the map; results update in real time without a page reload.'
      },
      {
        title: 'Opportunity density heatmap',
        description: 'A toggleable heatmap layer colours the map surface by listing concentration. A second toggle normalises the density by youth population data from the geographic_zones table, immediately revealing "opportunity deserts" — areas with many young people but few listings.'
      },
      {
        title: 'Administrative boundary overlay',
        description: 'Clickable GADM polygon layers for country, region, and city boundaries. Clicking a zone filters the sidebar list to only the opportunities within that administrative area and highlights the selected zone with a coloured fill.'
      },
      {
        title: 'Layer control panel',
        description: 'A floating control lets users independently toggle: street vs satellite basemap, each of the 7 opportunity categories, the heatmap, and boundary overlays. State is persisted in the URL query string so the view is shareable.'
      },
      {
        title: '"Find me" geolocation button',
        description: 'Requests the browser Geolocation API, centres the map on the user\'s coordinates, and refreshes results for the new location. Degrades gracefully to a manual city-search input when permission is denied.'
      },
      {
        title: 'Mini-card on pin tap',
        description: 'Tapping any pin opens a floating card anchored to that pin showing the title, organisation name, distance, category badge, deadline, and a "View full details" button — without the user leaving the map view.'
      },
      {
        title: 'Offline tile caching',
        description: 'Workbox service worker precaches map tiles for the user\'s home region on first load. When connectivity is lost, a banner appears and the cached map remains fully navigable and pannable.'
      },
      {
        title: 'Shareable map links',
        description: 'A "Copy link" button serialises the current viewport centre, zoom level, active category toggles, and filter state into a URL so the exact view can be shared via WhatsApp, email, or SMS.'
      }
    ]
  },
  {
    id: 'opportunity-feed',
    title: 'Opportunity discovery feed',
    featureCount: 7,
    icon: '✨',
    type: 'Core Seeker',
    themeColor: 'blue',
    summary: 'AI-matched personalised feed, trending opportunities, "new near you" cards, and deadline urgency scoring.',
    quickBadges: ['AI matching', 'Personalised', 'Trending', 'Deadline score'],
    features: [
      {
        title: 'AI-personalised recommendation cards',
        description: 'Content-based filtering scores every active opportunity in the database against the user\'s skills, education level, preferred categories, location, and languages. The top 10 ranked results populate the primary feed.'
      },
      {
        title: 'Collaborative filter ("Others like you")',
        description: 'A secondary section surfaces opportunities that users with a similar profile saved or applied to, catching relevant listings that the skills-matching algorithm alone would score too low to surface.'
      },
      {
        title: 'Trending in your area',
        description: 'Opportunities with the highest combined save and view velocity in the user\'s city over the previous 48 hours. Acts as a social proof signal and ensures popular time-sensitive listings reach users quickly.'
      },
      {
        title: '"New near you" section',
        description: 'Listings added within the last 7 days within the user\'s active radius, sorted by distance ascending. Refreshed daily and shown as a horizontal card scroller above the main feed.'
      },
      {
        title: 'Deadline urgency scoring',
        description: 'Listings closing within 7 days receive a "Closing soon" badge and are ranked higher in the feed. Listings past their deadline are automatically hidden from all feed and map views.'
      },
      {
        title: 'Infinite scroll with stale-while-revalidate',
        description: 'The feed loads 10 items at a time. Scrolling past 80% of the current list triggers the next page fetch. Background revalidation updates already-seen cards with fresh data without resetting scroll position.'
      },
      {
        title: 'One-tap share',
        description: 'A share icon on every feed card invokes the native Web Share API on mobile, pre-populating the share sheet with the opportunity title, organisation, deadline, and deep-link URL. Falls back to a copy-to-clipboard button on desktop.'
      }
    ]
  },
  {
    id: 'search-filter',
    title: 'Search & filter',
    featureCount: 8,
    icon: '🔍',
    type: 'Core Seeker',
    themeColor: 'blue',
    summary: 'Full-text Elasticsearch, multi-dimensional filters, saved searches, and sort controls.',
    quickBadges: ['Full-text', 'Faceted', 'Saved'],
    features: [
      {
        title: 'Full-text search bar',
        description: 'Elasticsearch BM25 search across opportunity title, description, organisation name, tags, and city. A useDebounce(300ms) hook prevents a new API call on every keystroke while keeping results feeling instantaneous.'
      },
      {
        title: 'Category multi-select',
        description: 'Checkbox group for all 7 types (jobs, internships, scholarships, training, volunteering, entrepreneurship, events). Selecting multiple types returns a union. Each checkbox shows the live count of matching results in the current radius.'
      },
      {
        title: 'Distance range slider',
        description: 'Dual-handle range input sets a minimum and maximum distance from the user\'s location. The map viewport and sidebar list update simultaneously. Values are written to the URL query string so the filtered view is shareable and bookmarkable.'
      },
      {
        title: 'Deadline date filter',
        description: 'Preset quick-select buttons ("Today", "3 days", "7 days", "30 days") and a custom date-range picker. Filtering is applied server-side using the deadline column so no expired items leak through.'
      },
      {
        title: 'Education level filter',
        description: 'Multi-select covering None, Secondary, Vocational / TVET, Undergraduate, and Postgraduate. Hides listings whose education_required field the user doesn\'t meet or that are below their current level.'
      },
      {
        title: 'Compensation toggle',
        description: 'Three-way switch: Paid only, Unpaid only, Both. A nested "Stipend included" checkbox further filters for listings that mention a living allowance in the benefits field.'
      },
      {
        title: 'Sort controls',
        description: 'Six modes: Relevance score, Closest first, Newest, Deadline soonest, Most saved, and A–Z. The selected sort mode is persisted to localStorage so it survives page refreshes.'
      },
      {
        title: 'Saved search alerts',
        description: 'Any combination of active filters can be saved with a custom name. Each saved search becomes a persistent notification trigger: when a new listing matches the saved criteria, the user receives a push or email alert.'
      }
    ]
  },
  {
    id: 'saved-tracker',
    title: 'Saved & applications',
    featureCount: 6,
    icon: '📁',
    type: 'Core Seeker',
    themeColor: 'blue',
    summary: 'Bookmarked opportunities, application tracker with status, and curated collections.',
    quickBadges: ['Bookmarks', 'Tracker', 'Collections'],
    features: [
      {
        title: 'Save / unsave toggle',
        description: 'A bookmark icon on every card and detail page. The action is optimistic (UI updates instantly) with a server write in the background. The save count on the listing increments in real time for all users.'
      },
      {
        title: 'Collections (curated lists)',
        description: 'Users create named folders (e.g. "STEM scholarships", "Nairobi internships") and assign opportunities to them. Each collection has a unique shareable link useful for guidance counsellors distributing curated lists to students.'
      },
      {
        title: 'Application status board',
        description: 'A Kanban-style view with columns: Saved → Applied → Interview → Offer → Closed. Cards are draggable between columns. Users can attach a note, outcome date, and the contact name for each application.'
      },
      {
        title: 'Deadline reminder badges',
        description: 'Red countdown labels appear on saved items within 7 days of their deadline. A "Remind me" toggle sends a push notification 3 days before and 1 day before closing.'
      },
      {
        title: 'Export saved list',
        description: 'Generates a branded PDF digest or CSV of all saved opportunities. The PDF includes the organisation logo, title, description excerpt, deadline, and direct application URL for each item — designed to be printable for community centre notice boards.'
      },
      {
        title: 'Bulk management',
        description: 'Select-all checkbox and bulk actions: remove from saved, move to a collection, or export a selection. Prevents tedious one-by-one management when cleaning up a large saved list.'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications centre',
    featureCount: 7,
    icon: '🔔',
    type: 'Provider',
    themeColor: 'gold',
    summary: 'Push, email, SMS, and in-app alerts. Unread counts, preferences, and digest scheduling.',
    quickBadges: ['Push', 'SMS', 'Digest'],
    features: [
      {
        title: 'In-app notification inbox',
        description: 'A slide-over panel showing all notifications with type icons and an unread count badge on the bell icon in the navbar. Four notification types: new match alert, deadline reminder, provider message, and system announcement.'
      },
      {
        title: 'Push notifications (FCM)',
        description: 'Firebase Cloud Messaging delivers browser push notifications for new matches within the user\'s radius and approaching deadlines on saved opportunities. Works on all Chromium and Firefox browsers and on the native mobile app.'
      },
      {
        title: 'Email digest',
        description: 'Users choose daily or weekly digest emails listing new matched opportunities since the last digest, formatted as a clean HTML email sent via SendGrid. A one-click unsubscribe link is included in every message.'
      },
      {
        title: 'SMS alerts',
        description: 'Critical match and deadline alerts delivered via Africa\'s Talking (African markets) or Twilio (global). Opt-in requires phone number verification. Messages are plain text with no images to minimise data costs.'
      },
      {
        title: 'Per-channel preference panel',
        description: 'Granular toggles for which events trigger which channels. Users set a minimum relevance score threshold for match alerts so low-confidence matches don\'t create noise. A quiet hours setting suppresses all notifications outside defined hours.'
      },
      {
        title: 'Mark all read and archive',
        description: 'Bulk actions in the notification inbox. Archived notifications remain accessible for 30 days and are excluded from the unread count. Read state is synced across devices in real time via WebSocket.'
      },
      {
        title: 'Provider direct messages',
        description: 'Verified organisations can send a single in-app message to a user who applied through the platform. All messages pass through an automated content moderation queue before delivery.'
      }
    ]
  },
  {
    id: 'profile-onboarding',
    title: 'Profile & onboarding',
    featureCount: 8,
    icon: '👤',
    type: 'Core Seeker',
    themeColor: 'blue',
    summary: 'Profile completion score, skills inventory, education history, and 5-step onboarding wizard.',
    quickBadges: ['Skills', 'Completion', 'Wizard'],
    features: [
      {
        title: '5-step onboarding wizard',
        description: 'Triggered on first login: (1) Basic info and location, (2) Current status, (3) Education level and field, (4) Skills picker from the ESCO-aligned taxonomy, (5) Interests and opportunity type preferences. Progress is saved per step so users can pause mid-wizard without losing data.'
      },
      {
        title: 'Profile completion score',
        description: 'A weighted percentage ring. Location and skills fields carry the highest point weight because they most directly influence recommendation quality. Specific prompts name the three fields with the highest remaining point value.'
      },
      {
        title: 'Skills taxonomy picker',
        description: 'A searchable, categorised tag picker mapped to the ESCO skills framework (max 20 tags). Grouped into Technical, Soft, Language, and Vocational. Each tag becomes a weighting signal in the recommendation engine.'
      },
      {
        title: 'Education and experience history',
        description: 'Structured timeline inputs for education entries and work or volunteer experience. Fields map directly to opportunity education_required and requirements columns to enable automatic qualification matching.'
      },
      {
        title: 'CV / resume upload',
        description: 'PDF or DOCX upload stored in S3 with a "last updated" timestamp. On upload, a parsing job attempts to pre-fill skills and experience fields. Users are prompted to re-upload if the document is more than 12 months old.'
      },
      {
        title: 'Language preferences',
        description: 'Multi-select for spoken languages, which pre-populates the language filter in search and discovery. The UI language preference is stored separately and persists across sessions.'
      },
      {
        title: 'Profile visibility controls',
        description: 'An "Open to opportunities" toggle makes the user\'s anonymised profile discoverable by verified organisations. Individual sensitive fields (phone, email, date of birth) can be individually marked as private.'
      },
      {
        title: 'Privacy and data settings',
        description: 'Dedicated settings page showing all stored data categories. Users can download a full personal data export (JSON), delete specific history or activity entries, or submit a GDPR-compliant account deletion request.'
      }
    ]
  },
  {
    id: 'provider-portal',
    title: 'Provider portal',
    featureCount: 7,
    icon: '💼',
    type: 'Provider',
    themeColor: 'gold',
    summary: 'Organisation dashboard — listing management, analytics, verification badge, and bulk import.',
    quickBadges: ['Listings', 'Analytics', 'Verified'],
    features: [
      {
        title: 'Opportunity creation wizard',
        description: 'A 5-step guided form: (1) Type and category, (2) Title, description, and benefits, (3) Requirements and eligibility criteria, (4) Location with a live map pin preview the user can drag to the exact location, (5) Review and publish. Draft auto-saves between steps.'
      },
      {
        title: 'Listing management table',
        description: 'Sortable, filterable table of all the organisation\'s listings with status chips (Draft, Active, Expired, Rejected). Inline quick-edit allows changing the deadline and status without opening the full form. Bulk archive and bulk export actions included.'
      },
      {
        title: 'Per-listing analytics',
        description: 'For each active listing: total unique views, saves count, application click-throughs, a 30-day trend sparkline, and a mini choropleth map showing the geographic distribution of viewers by district.'
      },
      {
        title: 'Verification badge system',
        description: 'Organisations upload their registration certificate and contact details. Platform administrators review and approve the submission within 48 hours. A "Verified" shield badge appears on all the organisation\'s listings and search results.'
      },
      {
        title: 'Bulk CSV and API import',
        description: 'Organisations with more than 10 opportunities can bulk-upload using a downloadable CSV template. A REST API endpoint is available for larger organisations with existing CMS systems. Both methods include row-level schema validation with a pre-commit error report.'
      },
      {
        title: 'Audience insights',
        description: 'Anonymised demographic breakdown of users who viewed, saved, or applied: age bracket, education level, distance band from the listing, and device type. Exportable as a PDF for internal reporting and impact documentation.'
      },
      {
        title: 'Featured listing promotion',
        description: 'Paid tier: featured listings are pinned at the top of the relevant category feed and map at all zoom levels for 30 days and receive a "Featured" badge. Managed through a self-service checkout in the provider dashboard.'
      }
    ]
  },
  {
    id: 'policy-analytics',
    title: 'Policy analytics',
    featureCount: 5,
    icon: '📊',
    type: 'System / Admin',
    themeColor: 'gray',
    summary: 'Choropleth density maps, gap analysis by zone, and exportable reports for government and NGOs.',
    quickBadges: ['Choropleth', 'Export', 'Gap analysis'],
    features: [
      {
        title: 'Opportunity density choropleth',
        description: 'District and city-level map shaded by listing count. A normalisation toggle divides by youth population from geographic_zones, immediately surfacing zones with many young people but few opportunities — the primary evidence for where new resources are needed.'
      },
      {
        title: 'Gap analysis table',
        description: 'Districts ranked by "opportunities per 1,000 youth" ascending. The table shows total youth population, listing count, and the calculated ratio. Exportable as CSV or embeddable as a chart in PDF funding proposals.'
      },
      {
        title: 'Sector breakdown charts',
        description: 'Bar and pie charts showing the distribution of opportunities by category, education requirement level, compensation type, and gender targeting across a selected region and configurable date range.'
      },
      {
        title: 'Engagement trend lines',
        description: 'Monthly time-series showing registrations, total searches, saves, and application click-throughs on the same axis. Useful for measuring the platform\'s measurable impact within reporting periods for grant accountability.'
      },
      {
        title: 'Exportable report builder',
        description: 'Users select a date range, one or more geographic zones, and which metrics to include. The system generates a branded PDF or structured JSON report. Government and NGO partners can request automated monthly reports delivered directly to their email.'
      }
    ]
  }
];
