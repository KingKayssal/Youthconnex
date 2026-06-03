import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

export default function ItemEditForm({
  editData,
  editErrors,
  editLoading,
  onFieldChange,
  onDescriptionChange,
  onSave,
  onCancel,
}) {
  return (
    <Card className="shadow-sm border border-gray-100 bg-white">
      {editErrors.submit && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-6 animate-slideIn">
          <p className="text-danger font-medium text-sm flex items-center gap-2">
            <span>⚠️</span> {editErrors.submit}
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="space-y-6"
      >
        <Input
          label="Item Name"
          type="text"
          name="name"
          value={editData.name || ''}
          onChange={onFieldChange}
          error={!!editErrors.name}
          errorMessage={editErrors.name}
          required
          containerClassName="w-full"
        />

        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="edit-description"
            name="description"
            value={editData.description || ''}
            onChange={onDescriptionChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-base"
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={editData.status || ''}
          onChange={onFieldChange}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Archived', label: 'Archived' },
          ]}
          containerClassName="w-full"
        />

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button type="submit" isLoading={editLoading} disabled={editLoading}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onCancel} disabled={editLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
