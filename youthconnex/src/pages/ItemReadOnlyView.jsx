import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { formatDate } from '../utils/helpers';

export default function ItemReadOnlyView({ item, onEdit, onDelete, onBack }) {
  return (
    <Card className="shadow-sm border border-gray-100 bg-white">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Description
          </h2>
          <p className="text-gray-700 text-base leading-relaxed bg-gray-50/50 rounded-xl p-4 border border-gray-100/80 whitespace-pre-line">
            {item?.description || 'No description provided for this item.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-gray-50/30 rounded-xl p-4 border border-gray-100/50">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Status
            </h3>
            <p className="text-gray-900 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span className={`w-2.5 h-2.5 rounded-full ${item?.status === 'Active' ? 'bg-success' : 'bg-warning'}`} />
              {item?.status}
            </p>
          </div>
          <div className="bg-gray-50/30 rounded-xl p-4 border border-gray-100/50">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Created Date
            </h3>
            <p className="text-gray-700 text-sm md:text-base">
              {formatDate(item?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
        <Button onClick={onBack} variant="secondary" className="px-5">
          Back to Dashboard
        </Button>
        <div className="sm:ml-auto flex gap-3">
          <Button onClick={onEdit} className="px-5">
            Edit Item
          </Button>
          <Button variant="danger" onClick={onDelete} className="px-5">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
