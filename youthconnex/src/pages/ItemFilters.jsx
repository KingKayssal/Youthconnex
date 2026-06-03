import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

export default function ItemFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  setCurrentPage,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        label="Search Items"
        type="text"
        placeholder="Type name or description..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        containerClassName="w-full"
      />

      <Select
        label="Status Filter"
        value={filterStatus}
        onChange={(e) => {
          setFilterStatus(e.target.value);
          setCurrentPage(1);
        }}
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Archived', label: 'Archived' },
        ]}
        containerClassName="w-full"
      />

      <Select
        label="Sort Order"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={[
          { value: 'newest', label: 'Newest First' },
          { value: 'oldest', label: 'Oldest First' },
          { value: 'a-z', label: 'A - Z' },
          { value: 'z-a', label: 'Z - A' },
        ]}
        containerClassName="w-full"
      />
    </div>
  );
}
