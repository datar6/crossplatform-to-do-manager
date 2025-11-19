import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Todo Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Test Button</Button>
            <p className="mt-4">UI Components are ready!</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
