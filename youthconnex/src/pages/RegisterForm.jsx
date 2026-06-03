import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function RegisterForm({
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-indigo-100 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 border border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Join YouthConnex and start connecting</p>
          </div>

          {errors.submit && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-6 animate-slideIn">
              <p className="text-danger font-medium text-sm flex items-center gap-2">
                <span>⚠️</span> {errors.submit}
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={onChange}
              error={!!errors.name}
              errorMessage={errors.name}
              placeholder="John Doe"
              required
              containerClassName="w-full"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={onChange}
              error={!!errors.email}
              errorMessage={errors.email}
              placeholder="you@example.com"
              required
              containerClassName="w-full"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={onChange}
              error={!!errors.password}
              errorMessage={errors.password}
              placeholder="Min. 8 chars, uppercase, number"
              required
              containerClassName="w-full"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              placeholder="Re-enter your password"
              required
              containerClassName="w-full"
            />

            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-hover focus:ring-primary shadow-lg shadow-primary/20"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover font-semibold underline decoration-2 decoration-primary/20 hover:decoration-primary/60 transition-colors">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
