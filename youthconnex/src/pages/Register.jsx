import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage, validateEmail, validatePassword } from '../utils/helpers';
import RegisterForm from './RegisterForm';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await registerApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      const message = getErrorMessage(error);
      if (error?.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: message });
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
