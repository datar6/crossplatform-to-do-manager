'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from 'hooks/use-tasks';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function TaskList() {
  const [newTask, setNewTask] = useState('');
  const { data: tasks = [], isLoading } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const addTask = () => {
    if (newTask.trim()) {
      createTaskMutation.mutate({ title: newTask });
      setNewTask('');
    }
  };

  const toggleTask = (taskId: string, done: boolean) => {
    updateTaskMutation.mutate({ id: taskId, updates: { done } });
  };

  const removeTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
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
          <Button onClick={addTask} disabled={createTaskMutation.isPending}>
            {createTaskMutation.isPending ? 'Adding...' : 'Add'}
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <Checkbox checked={task.done} onCheckedChange={checked => toggleTask(task.id, checked as boolean)} />
                <Label className={task.done ? 'line-through text-muted-foreground' : ''}>{task.title}</Label>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeTask(task.id)} disabled={deleteTaskMutation.isPending}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
