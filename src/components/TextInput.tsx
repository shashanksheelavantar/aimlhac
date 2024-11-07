import { Textarea } from '@/components/ui/textarea';

export default function TextInput() {
  return (
    <div className="mt-6">
      <label htmlFor="study-text" className="block text-sm font-medium text-gray-700">
        Or paste your text here
      </label>
      <Textarea
        id="study-text"
        placeholder="Enter or paste your study material here..."
        className="mt-1 block w-full"
        rows={6}
      />
    </div>
  );
}