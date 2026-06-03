import Card from '../components/ui/Card';

export default function StatsBar({ stats }) {
  const iconMap = {
    'Total Items': '📦',
    'Active Items': '🟢',
    'Archived Items': '📁',
  };

  const colorMap = {
    'Total Items': 'text-primary bg-primary/10 border-primary/20',
    'Active Items': 'text-success bg-success/10 border-success/20',
    'Archived Items': 'text-warning bg-warning/10 border-warning/20',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="flex items-center justify-between hover:translate-y-[-2px] transition-all duration-300 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
        >
          <div className="text-left">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-extrabold text-gray-900 leading-tight">
              {stat.value}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
              colorMap[stat.label] || 'text-gray-600 bg-gray-100'
            }`}
          >
            {iconMap[stat.label] || '📊'}
          </div>
        </Card>
      ))}
    </div>
  );
}
