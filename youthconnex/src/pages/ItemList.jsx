import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function ItemList({ items, loading, error }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner message="Fetching your items..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 my-6 text-center animate-slideIn">
        <p className="text-danger font-medium text-sm">
          ⚠️ Failed to load items: {error}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-gray-500 font-medium mb-4">No items match your criteria</p>
        <Link to="/items/new">
          <Button size="sm" className="shadow-md shadow-primary/10">Create New Item</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Link key={item.id} to={`/items/${item.id}`} className="block group">
          <div className="border border-gray-150 rounded-xl p-5 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.99]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2 leading-relaxed">
                  {item.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              <div className="text-left md:text-right text-xs text-gray-400 font-medium self-start md:self-center">
                Added {new Date(item.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
