'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  done: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTask,
          done: false,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, done: !task.done } : task)));
  };

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
            <div key={task.id} className="flex items-center space-x-2 p-2 border rounded">
              <Checkbox checked={task.done} onCheckedChange={() => toggleTask(task.id)} />
              <Label className={task.done ? 'line-through text-muted-foreground' : ''}>{task.title}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
