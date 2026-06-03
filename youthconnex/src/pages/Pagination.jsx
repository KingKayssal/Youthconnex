import Button from '../components/ui/Button';

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        className="px-3"
      >
        Previous
      </Button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? 'primary' : 'secondary'}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 p-0 flex items-center justify-center font-bold ${
              currentPage === page ? 'shadow-md shadow-primary/10' : ''
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        className="px-3"
      >
        Next
      </Button>
    </div>
  );
}
