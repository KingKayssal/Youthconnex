import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOpportunity } from '../firebase/opportunityService';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

export default function AddOpportunity() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState('agriculture');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organizationName: '',
    organizationType: 'cooperative',
    address: '',
    latitude: '3.848',
    longitude: '11.5021',
    contactName: '',
    contactPhone: '',
    contactWhatsapp: '',
    vacancies: '5',
    skillLevel: 'unskilled',
    dailyRate: '4000',
    // sector specific fields
    commodity: '',
    processingCapacity: '',
    projectType: '',
    currentPhase: '',
    serviceCategory: '',
    apprenticeshipAvailable: false,
    implementingAgency: '',
    quotaTarget: '80',
    eligibleCommunes: 'Yaoundé'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address location is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone number is required';
    if (!formData.dailyRate.trim()) newErrors.dailyRate = 'Daily rate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the validation errors.');
      return;
    }

    setLoading(true);
    try {
      const opportunityData = {
        title: formData.title,
        description: formData.description,
        category: category,
        location: {
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          address: formData.address,
          administrativeLevel: {
            region: 'Centre',
            division: 'Mfoundi',
            commune: 'Yaoundé'
          }
        },
        organizationName: formData.organizationName,
        organizationType: category === 'state' ? 'government' : category === 'agriculture' ? 'cooperative' : category === 'construction' ? 'contractor' : 'business',
        contactInfo: {
          name: formData.contactName,
          phone: formData.contactPhone,
          whatsapp: formData.contactWhatsapp || formData.contactPhone,
          email: `${formData.organizationName.toLowerCase().replace(/\s+/g, '')}@example.com`
        },
        jobDetails: {
          vacancies: parseInt(formData.vacancies),
          skillLevel: formData.skillLevel,
          requiredSkills: []
        },
        compensation: {
          currency: 'FCFA',
          dailyRate: parseInt(formData.dailyRate)
        },
        featured: true,
        // Sector specific extensions
        ...(category === 'agriculture' && {
          sectorDetails: {
            commodity: formData.commodity || 'crops',
            processingCapacity: formData.processingCapacity || 'Medium'
          }
        }),
        ...(category === 'construction' && {
          sectorDetails: {
            projectType: formData.projectType || 'building',
            currentPhase: formData.currentPhase || 'foundation',
            safetyCompliant: true
          }
        }),
        ...(category === 'services' && {
          sectorDetails: {
            serviceCategory: formData.serviceCategory || 'repair',
            apprenticeshipAvailable: formData.apprenticeshipAvailable
          }
        }),
        ...(category === 'state' && {
          sectorDetails: {
            projectType: 'infrastructure',
            implementingAgency: formData.implementingAgency || 'Ministry of Public Works',
            quotaTarget: parseInt(formData.quotaTarget)
          },
          eligibleCommunes: formData.eligibleCommunes.split(',').map(s => s.trim())
        })
      };

      await createOpportunity(opportunityData);
      toast.success('Opportunity created and pinned to GIS map successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create opportunity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Opportunity</h1>
            <p className="text-zinc-500 text-sm mt-1">Post new vacancies, cooperative memberships, or state works.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
          >
            ← Back to Dashboard
          </button>
        </div>

        <Card className="bg-zinc-900/40 border-zinc-850 p-6 md:p-8 space-y-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Sector Selector Header */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Select Sector</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'agriculture', label: '🌱 Agriculture', desc: 'Cooperatives & farms' },
                  { key: 'construction', label: '🏗️ Construction', desc: 'Building & road sites' },
                  { key: 'services', label: '🛠️ Local Services', desc: 'Shops & apprenticeships' },
                  { key: 'state', label: '🏛️ State Project', desc: 'Labor-intensive (HIMO)' }
                ].map(sec => (
                  <button
                    key={sec.key}
                    type="button"
                    onClick={() => {
                      setCategory(sec.key);
                      setFormData(prev => ({
                        ...prev,
                        dailyRate: sec.key === 'state' ? '3500' : '4500' // state projects have flat rate
                      }));
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      category === sec.key
                        ? 'border-primary bg-primary/5 text-white'
                        : 'border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-sm font-bold block mb-1">{sec.label}</span>
                    <span className="text-[10px] text-zinc-500">{sec.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Opportunity Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                errorMessage={errors.title}
                placeholder="e.g. Cocoa processing helper"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
                required
              />
              <Input
                label="Organization / Business Name"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                error={!!errors.organizationName}
                errorMessage={errors.organizationName}
                placeholder="e.g. Mbalmayo Cooperative"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe responsibilities, expectations, and shifts..."
                rows="4"
                className="w-full px-4 py-2 border border-zinc-800 rounded-lg text-white bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base"
              />
            </div>

            {/* GIS mapping inputs */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-850 space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">GIS Map Pin Coordinates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Address location"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  errorMessage={errors.address}
                  placeholder="e.g. Yaoundé Market Square"
                  className="bg-zinc-900 border-zinc-850 text-white focus:ring-primary"
                  required
                />
                <Input
                  label="Latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="3.848"
                  className="bg-zinc-900 border-zinc-850 text-white focus:ring-primary"
                />
                <Input
                  label="Longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="11.502"
                  className="bg-zinc-900 border-zinc-850 text-white focus:ring-primary"
                />
              </div>
            </div>

            {/* Sector-Specific Fields */}
            {category === 'agriculture' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-emerald-950/5 border border-emerald-500/10">
                <Input
                  label="Commodity Type"
                  name="commodity"
                  value={formData.commodity}
                  onChange={handleChange}
                  placeholder="e.g. Cocoa, Maize, Poultry"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
                <Input
                  label="Processing Capacity / Yield"
                  name="processingCapacity"
                  value={formData.processingCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 500kg/day"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {category === 'construction' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-amber-950/5 border border-amber-500/10">
                <Select
                  label="Project Type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  options={[
                    { value: 'building', label: 'Building complex' },
                    { value: 'road', label: 'Road rehabilitation' },
                    { value: 'bridge', label: 'Bridge / infrastructure' }
                  ]}
                  containerClassName="w-full"
                />
                <Select
                  label="Current Phase"
                  name="currentPhase"
                  value={formData.currentPhase}
                  onChange={handleChange}
                  options={[
                    { value: 'excavation', label: 'Excavation / Site Prep' },
                    { value: 'foundation', label: 'Foundation work' },
                    { value: 'superstructure', label: 'Superstructure structural' },
                    { value: 'finishing', label: 'Interior / Finishing' }
                  ]}
                  containerClassName="w-full"
                />
              </div>
            )}

            {category === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-purple-950/5 border border-purple-500/10 items-center">
                <Input
                  label="Service/Trade Category"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  placeholder="e.g. Tailoring, Welding, Repair"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="apprenticeshipAvailable"
                    name="apprenticeshipAvailable"
                    checked={formData.apprenticeshipAvailable}
                    onChange={handleChange}
                    className="h-4 w-4 bg-zinc-900 border-zinc-800 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="apprenticeshipAvailable" className="text-sm font-semibold text-zinc-300 cursor-pointer">
                    Apprenticeship program available
                  </label>
                </div>
              </div>
            )}

            {category === 'state' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-blue-950/5 border border-blue-500/10">
                <Input
                  label="Implementing Agency"
                  name="implementingAgency"
                  value={formData.implementingAgency}
                  onChange={handleChange}
                  placeholder="e.g. Min. of Water & Forestry"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
                <Input
                  label="Youth Quota target (%)"
                  name="quotaTarget"
                  value={formData.quotaTarget}
                  onChange={handleChange}
                  placeholder="80"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
                <Input
                  label="Eligible Resident Communes"
                  name="eligibleCommunes"
                  value={formData.eligibleCommunes}
                  onChange={handleChange}
                  placeholder="Yaoundé, Mbalmayo"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            )}

            {/* Vacancy and compensation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
              <Input
                label="Number of Vacancies"
                name="vacancies"
                type="number"
                value={formData.vacancies}
                onChange={handleChange}
                placeholder="5"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
              />
              <Select
                label="Skill Level"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                options={[
                  { value: 'unskilled', label: 'Unskilled (e.g. General laborer)' },
                  { value: 'semi-skilled', label: 'Semi-skilled (some experience)' },
                  { value: 'skilled', label: 'Skilled trade' }
                ]}
                containerClassName="w-full"
              />
              <Input
                label="Daily Wage Rate (FCFA)"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                error={!!errors.dailyRate}
                errorMessage={errors.dailyRate}
                placeholder="4000"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
                required
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Contact Person Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Jean Paul"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
              />
              <Input
                label="Phone number"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                errorMessage={errors.contactPhone}
                placeholder="+237672345678"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
                required
              />
              <Input
                label="WhatsApp (optional)"
                name="contactWhatsapp"
                value={formData.contactWhatsapp}
                onChange={handleChange}
                placeholder="+237672345678"
                className="bg-zinc-900 border-zinc-800 text-white focus:ring-primary"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t border-zinc-900">
              <Button type="submit" isLoading={loading} disabled={loading} className="px-6 py-2.5 font-bold shadow-lg shadow-primary/20">
                Publish Opportunity
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="border-zinc-850 hover:bg-zinc-900/60"
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
