import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem, deleteItem } from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage, formatDate } from '../utils/helpers';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import ItemReadOnlyView from './ItemReadOnlyView';
import ItemEditForm from './ItemEditForm';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [editErrors, setEditErrors] = useState({});

  // Fetch item
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getItemById(id);
        setItem(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(getErrorMessage(err));
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, toast]);

  const validateEditForm = () => {
    const newErrors = {};
    if (!editData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    if (editErrors[name]) {
      setEditErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveEdit = async () => {
    if (!validateEditForm()) return;

    setEditLoading(true);
    try {
      const response = await updateItem(id, editData);
      setItem(response.data);
      setIsEditing(false);
      toast.success('Item updated successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      setEditErrors({ submit: message });
      toast.error(message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteItem(id);
      toast.success('Item deleted successfully!');
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner message="Fetching item details..." />
      </div>
    );
  }

  if (error && !item) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <Card className="text-center p-8 shadow-md border border-gray-150">
          <div className="text-red-500 text-3xl mb-3">⚠️</div>
          <p className="text-gray-700 font-bold mb-6">{error}</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 animate-slideIn">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {item?.name}
            </h1>
            <div className="mt-2.5 flex items-center gap-3 text-sm text-gray-500 font-medium">
              <Badge variant={item?.status === 'Active' ? 'success' : 'warning'}>
                {item?.status}
              </Badge>
              <span>•</span>
              <span>Created {formatDate(item?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Form or ReadOnly view */}
        {!isEditing ? (
          <ItemReadOnlyView
            item={item}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setDeleteModalOpen(true)}
            onBack={() => navigate('/dashboard')}
          />
        ) : (
          <ItemEditForm
            editData={editData}
            editErrors={editErrors}
            editLoading={editLoading}
            onFieldChange={handleEditChange}
            onDescriptionChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
            onSave={handleSaveEdit}
            onCancel={() => {
              setEditData(item);
              setIsEditing(false);
            }}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        title="Delete Item"
        onClose={() => setDeleteModalOpen(false)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteLoading}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600 leading-relaxed">
          Are you sure you want to permanently delete <strong className="text-gray-950 font-bold">&quot;{item?.name}&quot;</strong>? This action cannot be undone and will delete the item from the catalog.
        </p>
      </Modal>
    </div>
  );
}
