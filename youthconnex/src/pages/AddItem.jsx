import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/helpers';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

export default function AddItem() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await createItem(formData);
      toast.success('Item created successfully!');
      navigate(`/items/${response.data.id}`);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 animate-slideIn">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Create New Item</h1>

        <Card className="shadow-sm border border-gray-100 bg-white">
          {errors.submit && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-6 animate-slideIn">
              <p className="text-danger font-medium text-sm flex items-center gap-2">
                <span>⚠️</span> {errors.submit}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Item Name"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              errorMessage={errors.name}
              placeholder="Enter item name"
              required
              containerClassName="w-full"
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleTextareaChange}
                placeholder="Enter item description (optional)"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base"
              />
            </div>

            <Select
              label="Status"
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Archived', label: 'Archived' },
              ]}
              containerClassName="w-full"
            />

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <Button type="submit" isLoading={loading} disabled={loading}>
                Create Item
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
