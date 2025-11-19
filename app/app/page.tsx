import { TaskList } from '@/components/task-list';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4 flex justify-center">
        <TaskList />
      </div>
    </main>
  );
}
