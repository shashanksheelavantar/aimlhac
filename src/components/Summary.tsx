import { Card } from '@/components/ui/card';

export default function Summary() {
  return (
    <Card className="mt-6 p-6">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Your summary will appear here</p>
      </div>
    </Card>
  );
}