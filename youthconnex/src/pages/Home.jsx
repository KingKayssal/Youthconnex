import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFilters } from '../context/FilterContext';
import { getOpportunityStats } from '../firebase/opportunityService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { setSearchQuery, setCategory, setRadius } = useFilters();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ total: 0, totalVacancies: 0, byCategory: {} });
  const [localQuery, setLocalQuery] = useState('');
  const [localCategory, setLocalCategory] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const data = await getOpportunityStats();
        if (isMounted && data) {
          setStats(data);
        }
      } catch (err) {
        console.error('Error loading opportunity stats:', err);
      }
    };
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setCategory(localCategory || null);
    navigate('/map');
  };

  const handleSectorClick = (sectorKey) => {
    setSearchQuery('');
    setCategory(sectorKey);
    navigate('/map');
  };

  const features = [
    {
      key: 'agriculture',
      title: 'Agriculture',
      description: 'Find local cooperatives, grain processing facilities, and seasonal agro-business clusters.',
      icon: '🌱',
      color: 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30',
      badgeColor: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      key: 'construction',
      title: 'Construction',
      description: 'Explore building sites, road rehabilitation projects, and trade apprenticeship vacancies.',
      icon: '🏗️',
      color: 'bg-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-500/10 hover:border-amber-500/30',
      badgeColor: 'bg-amber-500/10 text-amber-600',
    },
    {
      key: 'services',
      title: 'Local Services',
      description: 'Connect with informal workshops, tailor shops, repair centers, and service providers.',
      icon: '🛒',
      color: 'bg-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-500/10 hover:border-purple-500/30',
      badgeColor: 'bg-purple-500/10 text-purple-600',
    },
    {
      key: 'state',
      title: 'State Projects (HIMO)',
      description: 'Access state-funded labor-intensive initiatives and public infrastructure openings.',
      icon: '🏢',
      color: 'bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/10 hover:border-blue-500/30',
      badgeColor: 'bg-blue-500/10 text-blue-600',
    },
    {
      key: 'training',
      title: 'Vocational Training',
      description: 'Enhance your skills with certified TVET courses, apprenticeships, and classes.',
      icon: '📚',
      color: 'bg-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-500/10 hover:border-rose-500/30',
      badgeColor: 'bg-rose-500/10 text-rose-600',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 transition-colors duration-200">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/30 via-zinc-900/40 to-zinc-950 py-16 md:py-28 border-b border-zinc-900/50">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--zinc-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--zinc-800)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

          {/* Background Image Watermark */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06] dark:opacity-[0.12] pointer-events-none z-0"
            style={{ 
              backgroundImage: "url('/youthconnex.png')",
            }}
          />

          {/* Linear gradient fade mask to blend the watermark smoothly */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-6 animate-pulse">
                ✨ Empowering the Next Generation
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-100 tracking-tight leading-none mb-6">
                Connecting Minds,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                  Building Futures
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-350 mb-8 max-w-2xl mx-auto leading-relaxed">
                YouthConnex is the central platform for community engagement, collaboration, and learning. Shape your future in collaboration with a vibrant network of leaders.
              </p>

              {/* Interactive Search Widget */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-zinc-900 p-3 rounded-2xl shadow-xl shadow-zinc-950/20 border border-zinc-800 flex flex-col md:flex-row gap-3 items-center mb-10">
                <div className="flex-1 w-full relative">
                  <span className="absolute left-4 top-3.5 text-zinc-500">🔍</span>
                  <input
                    type="text"
                    placeholder="Search trades, cooperatives, communes..."
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-base border-b md:border-b-0 md:border-r border-zinc-800"
                  />
                </div>
                <div className="w-full md:w-56">
                  <select
                    value={localCategory}
                    onChange={(e) => setLocalCategory(e.target.value)}
                    className="w-full py-3 px-3 bg-transparent text-zinc-300 focus:outline-none text-base cursor-pointer"
                  >
                    <option value="" className="bg-zinc-900 text-zinc-100">All Sectors</option>
                    <option value="agriculture" className="bg-zinc-900 text-zinc-100">Agriculture</option>
                    <option value="construction" className="bg-zinc-900 text-zinc-100">Construction</option>
                    <option value="services" className="bg-zinc-900 text-zinc-100">Local Services</option>
                    <option value="state" className="bg-zinc-900 text-zinc-100">State Projects (HIMO)</option>
                    <option value="training" className="bg-zinc-900 text-zinc-100">Vocational Training</option>
                  </select>
                </div>
                <Button type="submit" size="md" className="w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-md shadow-primary/20">
                  Search Map
                </Button>
              </form>

              {/* Live Statistics Strip */}
              <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap text-sm text-zinc-400 font-semibold bg-zinc-900/60 backdrop-blur-sm px-6 py-3.5 rounded-full border border-zinc-800/60 max-w-max mx-auto shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{stats.total || 8} Active Organizations</span>
                </div>
                <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
                <div>
                  <span className="text-zinc-100 font-bold text-base mr-1">{stats.totalVacancies || '150+'}</span>
                  <span>Openings Near You</span>
                </div>
              </div>

              <div className="mt-8">
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/register">
                      <Button size="lg" className="w-48 shadow-lg shadow-primary/25 font-bold">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="w-48 border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-bold">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="px-8 shadow-lg shadow-primary/25 font-bold">
                      Go to Dashboard →
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-20 md:py-28 bg-zinc-900 border-t border-zinc-800/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
                Explore Economic Sectors
              </h2>
              <p className="text-zinc-400 mt-3 text-base">
                Click any sector below to discover active opportunities mapped in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSectorClick(feature.key)}
                  className={`group flex flex-col text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer active:scale-95 hover:shadow-lg hover:-translate-y-1 ${feature.color}`}
                >
                  <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed flex-grow">{feature.description}</p>
                  
                  <span className="text-[10px] font-bold tracking-wider uppercase mt-4 flex items-center gap-1 opacity-70 group-hover:opacity-100">
                    Explore Map
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white py-16 md:py-24 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to Take the Next Step?</h2>
              <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-xl mx-auto leading-relaxed">
                Create an account today to access our shared database, manage your items, and collaborate.
              </p>
              {!isAuthenticated ? (
                <Link to="/register">
                  <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-bold shadow-xl shadow-black/10 transition-transform active:scale-95">
                    Create Your Account
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-bold shadow-xl shadow-black/10 transition-transform active:scale-95">
                    Open Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
