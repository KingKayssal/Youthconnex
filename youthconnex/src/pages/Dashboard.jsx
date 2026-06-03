import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useOpportunities } from '../hooks/useOpportunities';
import { useFilters } from '../context/FilterContext';
import { useToast } from '../context/ToastContext';
import { zoneSpecs } from '../config/zoneSpecs';
import ZoneDetailsDrawer from '../components/dashboard/ZoneDetailsDrawer';
import MapView from '../components/map/MapView';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Dashboard() {
  const { user } = useAuth();
  const { location: userLocation } = useGeolocation();
  const { opportunities, loading: oppLoading, fetchAllOpportunities } = useOpportunities();
  const { searchQuery, setSearchQuery, category, setCategory, radius, setRadius } = useFilters();
  const toast = useToast();

  // Tab State
  const [activeTab, setActiveTab] = useState('Overview');
  const [userCommune, setUserCommune] = useState('Yaoundé');

  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    toast.info(`Theme switched to ${nextTheme} mode`);
  };

  const handleToggleCommune = () => {
    const nextCommune = userCommune === 'Yaoundé' ? 'Mbalmayo' : 'Yaoundé';
    setUserCommune(nextCommune);
    toast.info(`Home commune switched to ${nextCommune}`);
  };

  // Specs Framework State (old dashboard integration)
  const [selectedZone, setSelectedZone] = useState(null);

  // local component states for mock interactions
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('profile_saved_ids');
      return stored ? JSON.parse(stored) : ['mock-agri-001', 'mock-const-001'];
    } catch {
      return ['mock-agri-001', 'mock-const-001'];
    }
  });
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem('profile_applications');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'app-1',
        title: 'Farm Assistants – Cocoa Processing',
        org: 'Mbalmayo Cocoa Cooperative',
        status: 'Under Review',
        date: '2 days ago',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        icon: '🌱'
      },
      {
        id: 'app-2',
        title: 'Masons Needed – Residential Complex',
        org: 'Chantier Résidentiel K7',
        status: 'Interview',
        date: 'Tomorrow at 10:00 AM',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        icon: '🏗️'
      },
      {
        id: 'app-3',
        title: 'Tailoring Apprentice Wanted',
        org: 'Atelier Couture Aminata',
        status: 'Submitted',
        date: 'Just now',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        icon: '🛒'
      }
    ];
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New cocoa cooperative hiring near your location', time: '10m ago', type: 'agri', unread: true },
    { id: 2, text: 'Residential Complex construction project closing soon', time: '2h ago', type: 'const', unread: true },
    { id: 3, text: 'State HIMO Canal irrigation project approved', time: '1d ago', type: 'state', unread: false }
  ]);

  // Selected Opportunity Detail Modal state
  const [detailedOpportunity, setDetailedOpportunity] = useState(null);

  useEffect(() => {
    fetchAllOpportunities();
    const handleUpdate = () => {
      fetchAllOpportunities();
    };
    window.addEventListener('mock-opportunities-updated', handleUpdate);
    return () => {
      window.removeEventListener('mock-opportunities-updated', handleUpdate);
    };
  }, [fetchAllOpportunities]);

  useEffect(() => {
    try {
      localStorage.setItem('profile_saved_ids', JSON.stringify(savedIds));
    } catch (err) {
      console.error('Failed to save savedIds to localStorage:', err);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('profile_applications', JSON.stringify(applications));
    } catch (err) {
      console.error('Failed to save applications to localStorage:', err);
    }
  }, [applications]);

  // Profile Editor state
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profile_name') || user?.name || 'Eric');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profile_email') || user?.email || 'eric@example.com');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profile_phone') || '+237672345678');
  const [profileBio, setProfileBio] = useState(() => localStorage.getItem('profile_bio') || 'Enthusiastic explorer looking for local opportunities in Yaoundé.');
  const [profileSkills, setProfileSkills] = useState(() => localStorage.getItem('profile_skills') || 'Agriculture, Masonry, Web Development');
  const [cvFile, setCvFile] = useState(() => {
    const stored = localStorage.getItem('profile_cv');
    return stored ? JSON.parse(stored) : null;
  });

  // Interactive Application form state
  const [applyingOpportunity, setApplyingOpportunity] = useState(null);
  const [applicationCoverNote, setApplicationCoverNote] = useState('');
  const [applicationAttachCv, setApplicationAttachCv] = useState(true);
  const [modalCvFile, setModalCvFile] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('profile_name', profileName);
    localStorage.setItem('profile_email', profileEmail);
    localStorage.setItem('profile_phone', profilePhone);
    localStorage.setItem('profile_bio', profileBio);
    localStorage.setItem('profile_skills', profileSkills);
    toast.success('Profile details saved successfully!');
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const metadata = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString()
      };
      setCvFile(metadata);
      localStorage.setItem('profile_cv', JSON.stringify(metadata));
      toast.success(`CV "${file.name}" uploaded successfully!`);
    }
  };

  const handleCvDelete = () => {
    setCvFile(null);
    localStorage.removeItem('profile_cv');
    toast.info('CV removed from profile.');
  };

  const handleApplyClick = (opportunity) => {
    setApplyingOpportunity(opportunity);
    setApplicationCoverNote('');
    setApplicationAttachCv(!!cvFile);
    setModalCvFile(null);
  };

  const handleModalCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const metadata = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString()
      };
      setModalCvFile(metadata);
      setApplicationAttachCv(true);
      toast.success(`CV "${file.name}" attached to application!`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleToggleSave = (id) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyingOpportunity) return;

    // Add residency validation for state HIMO projects
    if (applyingOpportunity.category === 'state') {
      const eligibleCommunes = applyingOpportunity.eligibleCommunes || ['Mbalmayo']; // default restriction for mock HIMO projects
      const isEligible = eligibleCommunes.some(
        comm => comm.toLowerCase() === userCommune.toLowerCase()
      );
      if (!isEligible) {
        toast.error(`Residency Validation Failed: This HIMO state project is restricted to residents of ${eligibleCommunes.join(', ')}.`);
        return;
      }
    }

    // Add to applications
    if (applications.find(app => app.title === applyingOpportunity.title)) {
      toast.warning('You have already applied to this opportunity.');
      setApplyingOpportunity(null);
      return;
    }

    const attachedCvName = applicationAttachCv ? (cvFile?.name || modalCvFile?.name) : null;

    const newApp = {
      id: `app-${Date.now()}`,
      title: applyingOpportunity.title,
      org: applyingOpportunity.organizationName,
      status: 'Submitted',
      date: 'Just now',
      badge: applyingOpportunity.category === 'agriculture'
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        : applyingOpportunity.category === 'construction'
        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        : 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: applyingOpportunity.category === 'agriculture' ? '🌱' : applyingOpportunity.category === 'construction' ? '🏗️' : '🛒',
      coverNote: applicationCoverNote,
      cvName: attachedCvName
    };

    setApplications(prev => [newApp, ...prev]);
    setApplyingOpportunity(null);
    setDetailedOpportunity(null);
    toast.success(`Application sent successfully to ${applyingOpportunity.organizationName}!`);
  };

  // Filter opportunities by category lists
  const agricultureOpps = opportunities.filter(o => o.category === 'agriculture');
  const constructionOpps = opportunities.filter(o => o.category === 'construction');
  const serviceOpps = opportunities.filter(o => o.category === 'services');
  const stateOpps = opportunities.filter(o => o.category === 'state');
  const trainingOpps = opportunities.filter(o => o.category === 'training');

  const featuredOpps = opportunities.filter(o => o.featured);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-md hidden md:flex flex-col fixed h-screen z-20">
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center font-bold text-white text-lg">
              Y
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-zinc-100">YouthConnex</h2>
              <p className="text-[10px] text-zinc-500 font-medium">Command Center v1.2</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <span className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">Workspace</span>
          {[
            { id: 'Overview', label: 'Dashboard', icon: '📊' },
            { id: 'Map Explorer', label: 'Map Explorer', icon: '🗺️' },
            { id: 'Opportunities', label: 'Opportunities', icon: '✨' },
            { id: 'Cooperatives', label: 'Cooperatives', icon: '🌱', dot: 'bg-emerald-400' },
            { id: 'State Projects', label: 'State Projects', icon: '🏛️', dot: 'bg-blue-400' },
            { id: 'Businesses', label: 'Informal Businesses', icon: '🛒', dot: 'bg-purple-400' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-zinc-100 border border-zinc-800'
                  : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {tab.dot && <span className={`h-1.5 w-1.5 rounded-full ${tab.dot}`} />}
            </button>
          ))}

          <span className="px-3 pt-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2 text-left">Personal</span>
          {[
            { id: 'Applications', label: 'Applications', icon: '📋' },
            { id: 'Saved', label: 'Saved Items', icon: '📁' },
            { id: 'Specs', label: 'Specs Framework', icon: '⚙️' },
            { id: 'Profile', label: 'Profile', icon: '👤' },
            { id: 'Settings', label: 'Settings', icon: '🛠️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-zinc-100 border border-zinc-800'
                  : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>

        {/* User profile footer */}
        <div className="p-4 border-t border-zinc-900 flex items-center gap-3 bg-zinc-900/20">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-100 text-base">
            {user?.name?.[0]?.toUpperCase() || 'E'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-zinc-100 truncate">{user?.name || 'Eric'}</h4>
            <p className="text-[10px] text-zinc-500 truncate">{user?.email || 'eric@example.com'}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 min-h-screen pb-12">
        {/* Mobile Header Nav */}
        <header className="md:hidden flex items-center justify-between bg-zinc-950 p-4 border-b border-zinc-900 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">Y</div>
            <h1 className="text-sm font-black text-zinc-100 uppercase tracking-wider">YouthConnex</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <select
              value={activeTab}
              onChange={e => setActiveTab(e.target.value)}
              className="bg-zinc-900 border border-zinc-850 rounded-lg text-xs font-bold text-zinc-100 px-2 py-1.5"
            >
              <option value="Overview">Dashboard</option>
              <option value="Map Explorer">Map Explorer</option>
              <option value="Opportunities">Opportunities</option>
              <option value="Cooperatives">Cooperatives</option>
              <option value="State Projects">State Projects</option>
              <option value="Businesses">Businesses</option>
              <option value="Applications">Applications</option>
              <option value="Saved">Saved Items</option>
              <option value="Specs">Specs Framework</option>
              <option value="Profile">Profile</option>
              <option value="Settings">Settings</option>
            </select>
          </div>
        </header>

        {/* Content Render Switcher */}
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
          {activeTab === 'Overview' && (
            <>
              {/* Section 1: Smart Welcome Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-zinc-900 pb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
                    {getGreeting()}, <span className="text-primary-light">{user?.name || 'Eric'}</span> 👋
                  </h1>
                  <p className="text-zinc-500 text-sm mt-1">
                    You have <span className="text-zinc-100 font-bold">{opportunities.length || 8} economic opportunities</span> within your search radius.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Location Selector */}
                  <button
                    onClick={handleToggleCommune}
                    className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 px-3.5 py-2 rounded-xl text-xs text-zinc-300 font-semibold cursor-pointer hover:border-zinc-700 hover:text-zinc-100"
                  >
                    <span>📍</span>
                    <span>{userCommune}, Centre Region (Click to switch)</span>
                  </button>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </button>

                  {/* Notification Bell */}
                  <div className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 cursor-pointer">
                    <span>🔔</span>
                    {notifications.filter(n => n.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                        {notifications.filter(n => n.unread).length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Section 2: Opportunity Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Opportunities Nearby', value: opportunities.length || 8, icon: '💼', color: 'border-zinc-800' },
                  { label: 'Active State Projects', value: stateOpps.length || 1, icon: '🏛️', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
                  { label: 'Cooperatives Hiring', value: agricultureOpps.length || 2, icon: '🌱', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
                  { label: 'Businesses Recruiting', value: serviceOpps.length || 2, icon: '🛒', color: 'border-purple-500/20 text-purple-400 bg-purple-500/5' },
                  { label: 'Applications Sent', value: applications.length, icon: '📋', color: 'border-zinc-800' },
                  { label: 'Saved Opportunities', value: savedIds.length, icon: '📁', color: 'border-zinc-800' }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl bg-zinc-900/30 border flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 ${stat.color}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                    <span className="text-2xl font-black text-zinc-100">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Section 3 & 4: GIS Map & Recommendations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Mini GIS Map (60%) */}
                <div className="lg:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-900/20 overflow-hidden flex flex-col h-[400px]">
                  <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/40">
                    <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                      <span>🗺️</span> Economic GIS Map View
                    </h3>
                    <button
                      onClick={() => setActiveTab('Map Explorer')}
                      className="text-xs font-semibold text-primary hover:text-zinc-100"
                    >
                      Expand Map Explorer →
                    </button>
                  </div>
                  <div className="flex-grow relative bg-zinc-900/50">
                    {oppLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60">
                        <Spinner message="Loading mini map..." />
                      </div>
                    ) : (
                      <MapView
                        opportunities={opportunities}
                        initialLocation={userLocation}
                        onMarkerClick={opp => setDetailedOpportunity(opp)}
                      />
                    )}
                  </div>
                </div>

                {/* Recommended Opportunities (40%) */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 flex flex-col h-[400px]">
                  <div className="p-4 border-b border-zinc-900 bg-zinc-950/40">
                    <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                      <span>✨</span> Recommended For You
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
                    {featuredOpps.map(opp => (
                      <div
                        key={opp.id}
                        onClick={() => setDetailedOpportunity(opp)}
                        className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/40 hover:border-zinc-800 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-zinc-100 text-sm group-hover:text-primary transition-colors truncate">
                            {opp.title}
                          </h4>
                          <span className="text-xs shrink-0">
                            {opp.category === 'agriculture' ? '🌱' : opp.category === 'construction' ? '🏗️' : '🏛️'}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                          {opp.description}
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-semibold">
                          <span>{opp.organizationName}</span>
                          <span className="text-primary-light">
                            {opp.compensation?.dailyRate
                              ? `${opp.compensation.dailyRate.toLocaleString()} FCFA/day`
                              : 'Stipend'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 5: State Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <span className="text-blue-400">🏛️</span> State-Funded Labor-Intensive Projects (HIMO)
                  </h3>
                  <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    State Quota
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stateOpps.map(opp => (
                    <div key={opp.id} className="p-5 rounded-2xl border border-blue-950/40 bg-blue-950/5 hover:border-blue-900/60 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Public Works</span>
                          <span className="text-xs bg-blue-900/30 text-blue-300 font-semibold px-2 py-0.5 rounded-md">
                            👷 {opp.jobDetails?.vacancies || 50} open slots
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-zinc-100 mb-2">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">{opp.description}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-900/50 pt-4 mt-2">
                        <span className="text-xs text-zinc-500 font-medium">📍 {opp.location?.address}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailedOpportunity(opp)}
                            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold hover:bg-zinc-850 hover:text-zinc-100"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleApplyClick(opp)}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: Cooperatives */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <span className="text-emerald-400">🌱</span> Agricultural Cooperatives Hiring
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agricultureOpps.map(opp => (
                    <div key={opp.id} className="p-5 rounded-2xl border border-emerald-950/40 bg-emerald-950/5 hover:border-emerald-900/60 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Cooperative</span>
                          <span className="text-xs bg-emerald-900/30 text-emerald-300 font-semibold px-2 py-0.5 rounded-md">
                            📦 {opp.jobDetails?.vacancies || 10} positions
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">{opp.description}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-900/50 pt-4 mt-2">
                        <span className="text-xs text-zinc-500 font-medium">📞 {opp.contactInfo?.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailedOpportunity(opp)}
                            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold hover:bg-zinc-800 hover:text-white"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleApplyClick(opp)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                          >
                            Join Cooperative
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 7: Informal Businesses */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🛠️</span> Local Businesses Seeking Workers/Apprentices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {serviceOpps.map(opp => (
                    <div key={opp.id} className="p-5 rounded-2xl border border-purple-950/40 bg-purple-950/5 hover:border-purple-900/60 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Informal Sector</span>
                          <span className="text-[10px] bg-purple-900/30 text-purple-300 font-semibold px-2 py-0.5 rounded-md">
                            Apprenticeship
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-4">{opp.description}</p>
                      </div>
                      <div className="border-t border-zinc-900/50 pt-4 mt-2">
                        <p className="text-[11px] text-zinc-500 mb-3">📍 {opp.location?.address}</p>
                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => setDetailedOpportunity(opp)}
                            className="flex-1 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold hover:bg-zinc-800 hover:text-white"
                          >
                            Details
                          </button>
                          <a
                            href={`https://wa.me/${opp.contactInfo?.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1.5 px-3 rounded-lg bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20 flex items-center gap-1.5"
                          >
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 8 & 11: Tracker & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Tracker (Left 2/3) */}
                <div className="lg:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                    <span>📋</span> Application Tracker
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Submitted', 'Under Review', 'Interview'].map(status => {
                      const list = applications.filter(a => a.status === status);
                      return (
                        <div key={status} className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-900 flex flex-col space-y-3 min-h-[160px]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-400">{status}</span>
                            <span className="text-[10px] bg-zinc-800 text-zinc-500 font-bold px-2 py-0.5 rounded-md">
                              {list.length}
                            </span>
                          </div>
                          <div className="flex-1 overflow-y-auto space-y-2">
                            {list.map(app => (
                              <div key={app.id} className="p-3 rounded-lg bg-zinc-950 border border-zinc-850 flex flex-col space-y-1.5 shadow-sm hover:border-zinc-800 transition-colors">
                                <span className="text-xs font-bold text-white truncate">{app.title}</span>
                                <span className="text-[10px] text-zinc-500 truncate">{app.org}</span>
                                {app.cvName && (
                                  <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                                    <span>📎</span> {app.cvName}
                                  </span>
                                )}
                                {app.coverNote && (
                                  <p className="text-[9px] text-zinc-400 italic line-clamp-2 border-t border-zinc-900 pt-1 mt-1">
                                    "{app.coverNote}"
                                  </p>
                                )}
                                <div className="flex justify-between items-center text-[9px] font-semibold text-zinc-500 pt-1">
                                  <span>{app.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notifications & Deadlines (Right 1/3) */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 flex flex-col h-[280px]">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <span>🔔</span> Notifications & Alerts
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                    {notifications.map(n => (
                      <div key={n.id} className="p-3 rounded-xl border border-zinc-900 bg-zinc-900/40 flex items-start gap-3">
                        <span className="text-sm">
                          {n.type === 'agri' ? '🌱' : n.type === 'const' ? '🏗️' : '🏛️'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-300 leading-snug">{n.text}</p>
                          <span className="text-[10px] text-zinc-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 10: Opportunity Insights */}
              <div className="p-5 rounded-2xl border border-zinc-900 bg-zinc-900/20">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <span>📊</span> Sector-Specific Opportunity Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      This chart maps the percentage breakdown of active opportunities on YouthConnex, helping local youth align certifications with economic sector demands.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                        <span>Agri (40%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
                        <span>Const (35%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded-sm bg-purple-500" />
                        <span>Services (25%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="w-full h-8 bg-zinc-900 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white" style={{ width: '40%' }}>
                        40%
                      </div>
                      <div className="h-full bg-amber-500 flex items-center justify-center text-[10px] font-black text-white" style={{ width: '35%' }}>
                        35%
                      </div>
                      <div className="h-full bg-purple-500 flex items-center justify-center text-[10px] font-black text-white" style={{ width: '25%' }}>
                        25%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Map Explorer Tab */}
          {activeTab === 'Map Explorer' && (
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 overflow-hidden flex flex-col h-[650px] relative">
              <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/40">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🗺️</span> Full Map Explorer
                </h3>
              </div>
              <div className="flex-grow">
                <MapView
                  opportunities={opportunities}
                  initialLocation={userLocation}
                  onMarkerClick={opp => setDetailedOpportunity(opp)}
                />
              </div>
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === 'Opportunities' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">All Active Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map(opp => (
                  <div key={opp.id} className="p-5 rounded-2xl border border-zinc-900 bg-zinc-900/20 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">{opp.title}</h4>
                      <p className="text-xs text-zinc-400 mb-4">{opp.description}</p>
                    </div>
                    <div className="border-t border-zinc-800/40 pt-4">
                      <div className="flex justify-between items-center text-xs text-zinc-500 font-semibold mb-3">
                        <span>{opp.organizationName}</span>
                        <span className="text-primary-light">{opp.category}</span>
                      </div>
                      <button
                        onClick={() => setDetailedOpportunity(opp)}
                        className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cooperatives Tab */}
          {activeTab === 'Cooperatives' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Agricultural Cooperatives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agricultureOpps.map(opp => (
                  <div key={opp.id} className="p-6 rounded-2xl border border-emerald-950 bg-emerald-950/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{opp.title}</h4>
                      <p className="text-xs text-zinc-400 mb-4">{opp.description}</p>
                    </div>
                    <button
                      onClick={() => setDetailedOpportunity(opp)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* State Projects Tab */}
          {activeTab === 'State Projects' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">State-Funded Projects (HIMO)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stateOpps.map(opp => (
                  <div key={opp.id} className="p-6 rounded-2xl border border-blue-950 bg-blue-950/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{opp.title}</h4>
                      <p className="text-xs text-zinc-400 mb-4">{opp.description}</p>
                    </div>
                    <button
                      onClick={() => setDetailedOpportunity(opp)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Businesses Tab */}
          {activeTab === 'Businesses' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Informal Businesses Directory</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceOpps.map(opp => (
                  <div key={opp.id} className="p-6 rounded-2xl border border-purple-950 bg-purple-950/5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">{opp.title}</h4>
                      <p className="text-xs text-zinc-400 mb-4">{opp.description}</p>
                    </div>
                    <button
                      onClick={() => setDetailedOpportunity(opp)}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold"
                    >
                      Contact Business
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'Applications' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Your Sent Applications</h3>
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="p-5 rounded-2xl border border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <h4 className="text-base font-bold text-white">{app.title}</h4>
                        <p className="text-xs text-zinc-500">{app.org}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${app.badge}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-zinc-500">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Items Tab */}
          {activeTab === 'Saved' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">Saved Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {opportunities
                  .filter(o => savedIds.includes(o.id))
                  .map(opp => (
                    <div key={opp.id} className="p-5 rounded-2xl border border-zinc-900 bg-zinc-900/20 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white mb-2">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 mb-4">{opp.description}</p>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-800/40 pt-4 mt-2">
                        <span className="text-xs text-zinc-500 font-semibold">{opp.organizationName}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleSave(opp.id)}
                            className="px-3.5 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-bold"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => setDetailedOpportunity(opp)}
                            className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Reference Tab (integrated old specs view) */}
          {activeTab === 'Specs' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">GIS Specifications Reference</h3>
                <p className="text-zinc-500 text-sm mt-1">
                  Select any of the 9 dashboard zones below to expand the full written reference and sub-features.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {zoneSpecs.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300 text-left outline-none cursor-pointer flex flex-col justify-between h-48"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="p-2 bg-zinc-900 rounded-lg text-lg">{zone.icon}</span>
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                          {zone.type}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white truncate mb-1">{zone.title}</h4>
                      <p className="text-xs text-zinc-500 line-clamp-2">{zone.summary}</p>
                    </div>
                    <span className="text-[10px] text-primary font-bold mt-4">Expand specs →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Fields Editor */}
              <div className="lg:col-span-2 bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold text-white">Edit Profile Details</h3>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <Input
                    label="Full Name"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full"
                    required
                  />
                  <Input
                    label="Phone Number"
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full"
                    required
                  />
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Short Bio</label>
                    <textarea
                      value={profileBio}
                      onChange={e => setProfileBio(e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                  <Input
                    label="Skills / Experience Tags (Comma separated)"
                    value={profileSkills}
                    onChange={e => setProfileSkills(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full"
                  />
                  <Button type="submit" className="w-full py-2.5 font-bold shadow-md shadow-primary/10">
                    Save Profile Changes
                  </Button>
                </form>
              </div>

              {/* CV Management Uploader */}
              <div className="bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between h-[340px]">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Your CV / Resume</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Upload your resume to automatically attach it when applying to jobs or cooperatives.
                  </p>

                  {cvFile ? (
                    <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{cvFile.name}</h4>
                          <p className="text-[10px] text-zinc-500">{cvFile.size} • Uploaded {cvFile.uploadDate}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleCvDelete}
                        className="w-full py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-semibold"
                      >
                        Delete CV
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-zinc-850 hover:border-zinc-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-zinc-900/10 h-44">
                      <span className="text-3xl mb-2">📁</span>
                      <span className="text-xs font-bold text-zinc-300">Click to upload CV</span>
                      <span className="text-[9px] text-zinc-650 mt-1">PDF or DOCX (Max 5MB)</span>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="text-[10px] text-zinc-600 text-center font-medium">
                  Persisted locally in profile storage
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'Settings' && (
            <div className="max-w-2xl bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white">Settings & Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Push Notifications</h4>
                    <p className="text-xs text-zinc-500">Notify me about new jobs near me</p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold">Enabled</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Email Digest</h4>
                    <p className="text-xs text-zinc-500">Receive weekly summaries of cooperative vacancies</p>
                  </div>
                  <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md font-bold">Disabled</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Slide-over Specs Details Drawer component */}
      <ZoneDetailsDrawer
        zone={selectedZone}
        isOpen={!!selectedZone}
        onClose={() => setSelectedZone(null)}
      />

      {/* Opportunity Details Modal */}
      {detailedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDetailedOpportunity(null)} />
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 max-w-lg w-full relative z-10 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {detailedOpportunity.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 leading-snug">{detailedOpportunity.title}</h3>
              </div>
              <button
                onClick={() => setDetailedOpportunity(null)}
                className="text-zinc-500 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Organization</h4>
                <p className="text-sm text-white font-medium">{detailedOpportunity.organizationName}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{detailedOpportunity.description}</p>
              </div>

              {detailedOpportunity.jobDetails && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Job Specifications</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-900">
                      <span className="text-zinc-500 block mb-0.5">Vacancies</span>
                      <span className="text-white font-semibold">{detailedOpportunity.jobDetails.vacancies}</span>
                    </div>
                    <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-900">
                      <span className="text-zinc-500 block mb-0.5">Skill Level</span>
                      <span className="text-white font-semibold capitalize">{detailedOpportunity.jobDetails.skillLevel}</span>
                    </div>
                  </div>
                </div>
              )}

              {detailedOpportunity.compensation && (
                <div className="flex items-center justify-between p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-900">
                  <span className="text-xs text-zinc-400 font-medium">Daily Compensation</span>
                  <span className="text-sm font-black text-primary-light">
                    {detailedOpportunity.compensation.currency || 'FCFA'}{' '}
                    {detailedOpportunity.compensation.dailyRate?.toLocaleString() || '0'} / day
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleToggleSave(detailedOpportunity.id)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-colors ${
                  savedIds.includes(detailedOpportunity.id)
                    ? 'border-red-500/20 text-red-400 bg-red-500/5'
                    : 'border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                {savedIds.includes(detailedOpportunity.id) ? '♥ Saved' : '♡ Save Opportunity'}
              </button>
              <button
                onClick={() => handleApplyClick(detailedOpportunity)}
                className="flex-grow-[2] py-3 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-bold transition-all shadow-lg shadow-primary/20"
              >
                Express Interest & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {applyingOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setApplyingOpportunity(null)} />
          <form onSubmit={handleApplySubmit} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 max-w-lg w-full relative z-10 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Apply for Opportunity
                </span>
                <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                  {applyingOpportunity.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-0.5">{applyingOpportunity.organizationName}</p>
              </div>
              <button
                type="button"
                onClick={() => setApplyingOpportunity(null)}
                className="text-zinc-500 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full text-sm"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full text-sm"
                  required
                />
                <Input
                  label="Phone Number"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary w-full text-sm"
                  required
                />
              </div>

              {/* CV selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Resume / CV Attachment</label>
                {cvFile || modalCvFile ? (
                  <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">📄</span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{cvFile?.name || modalCvFile?.name}</h4>
                        <p className="text-[9px] text-zinc-500">{cvFile?.size || modalCvFile?.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="attachCv"
                        checked={applicationAttachCv}
                        onChange={e => setApplicationAttachCv(e.target.checked)}
                        className="h-4 w-4 bg-zinc-900 border-zinc-850 rounded accent-primary cursor-pointer"
                      />
                      <label htmlFor="attachCv" className="text-xs text-zinc-300 font-semibold cursor-pointer">
                        Attach
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-zinc-850 hover:border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-zinc-900/10">
                    <span className="text-xs font-bold text-zinc-300">📎 Attach Resume / CV</span>
                    <span className="text-[9px] text-zinc-650 mt-0.5">Click to choose a file</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleModalCvUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Cover Note / Message</label>
                <textarea
                  value={applicationCoverNote}
                  onChange={e => setApplicationCoverNote(e.target.value)}
                  placeholder="Introduce yourself and explain why you're a good fit..."
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setApplyingOpportunity(null)}
                className="flex-1 py-3 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-grow-[2] py-3 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-bold shadow-lg shadow-primary/20"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
