import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { FilterProvider } from './context/FilterContext';
import { ToastContainer } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';

// Eager load Home for faster initial load
import Home from './pages/Home';

// Lazy load other pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MapPage = lazy(() => import('./pages/MapPage'));
const ItemDetail = lazy(() => import('./pages/ItemDetail'));
const AddOpportunity = lazy(() => import('./pages/AddOpportunity'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner message="Loading page..." />
    </div>
  );
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <FilterProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/map" element={<MapPage />} />

                    {/* Protected Routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/items/:id"
                      element={
                        <ProtectedRoute>
                          <ItemDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/opportunities/new"
                      element={
                        <ProtectedRoute>
                          <AddOpportunity />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/items/new"
                      element={
                        <ProtectedRoute>
                          <AddOpportunity />
                        </ProtectedRoute>
                      }
                    />

                    {/* Catch-all for 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
            <ToastContainer />
          </FilterProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
