import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <main className="flex-grow flex items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-primary-light/30 via-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="text-center max-w-md relative animate-slideIn">
          <div className="text-9xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 tracking-tighter">
            404
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Page Not Found</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
              Go Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
