'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTask, deleteTask, getTasks, Task, updateTask } from '@/lib/api';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const task = await createTask(newTask);
        setTasks([...tasks, task]);
        setNewTask('');
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const toggleTask = async (taskId: string, done: boolean) => {
    try {
      const updatedTask = await updateTask(taskId, { done });
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Todo Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            onKeyPress={e => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask}>Add</Button>
        </div>

        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <Checkbox checked={task.done} onCheckedChange={checked => toggleTask(task.id, checked as boolean)} />
                <Label className={task.done ? 'line-through text-muted-foreground' : ''}>{task.title}</Label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
