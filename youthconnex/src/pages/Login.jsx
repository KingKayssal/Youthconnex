import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorMessage, validateEmail } from '../utils/helpers';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginApi(formData);
      if (response.data.token) {
        login(response.data.token);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      const message = getErrorMessage(error);
      if (error?.response?.status === 401) {
        setErrors({ submit: 'Invalid email or password' });
      } else {
        setErrors({ submit: message });
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-indigo-100 flex items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 border border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your account to continue</p>
          </div>

          {errors.submit && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-6 animate-slideIn">
              <p className="text-danger font-medium text-sm flex items-center gap-2">
                <span>⚠️</span> {errors.submit}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              error={!!errors.password}
              errorMessage={errors.password}
              placeholder="Enter your password"
              required
              containerClassName="w-full"
            />

            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-hover focus:ring-primary shadow-lg shadow-primary/20"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-hover font-semibold underline decoration-2 decoration-primary/20 hover:decoration-primary/60 transition-colors">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
