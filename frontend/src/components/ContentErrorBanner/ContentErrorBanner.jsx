import { useContent } from '../../context/ContentContext';
import { AlertCircleIcon, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';

export function ContentErrorBanner() {
  const { error, revalidate } = useContent();
  if (!error) return null;

  return (
    <div
      role="alert"
      className="flex items-center gap-3 px-4 py-3 bg-amber-50 border-b border-amber-200 text-amber-800"
    >
      <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">
        Could not load content: {error}. Check your connection and refresh.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => revalidate()}
        className="shrink-0 border-amber-300 text-amber-800 hover:bg-amber-100"
      >
        <RotateCcw className="w-4 h-4 mr-1.5" />
        Retry
      </Button>
    </div>
  );
}
