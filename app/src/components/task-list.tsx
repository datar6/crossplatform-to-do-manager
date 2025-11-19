'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Task } from '@/lib/api';
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from 'hooks/use-tasks';
import { Edit2, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { EditTaskDialog } from './edit-task-dialog';
import { ThemeToggle } from './theme-toggle';

type FilterType = 'all' | 'active' | 'completed';

export function TaskList() {
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<{ id: string; title: string } | null>(null);

  const { data: tasks = [], isLoading } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Фільтрація та пошук
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Пошук по заголовку
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;

      // Фільтрація по статусу
      const matchesFilter = filter === 'all' ? true : filter === 'active' ? !task.done : filter === 'completed' ? task.done : true;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filter]);

  const addTask = () => {
    if (newTask.trim()) {
      createTaskMutation.mutate({ title: newTask });
      setNewTask('');
    }
  };

  const toggleTask = (taskId: string, done: boolean) => {
    updateTaskMutation.mutate({ id: taskId, updates: { done } });
  };

  const openDeleteDialog = (task: Task) => {
    setDeletingTask({ id: task.id, title: task.title });
  };

  if (isLoading) {
    return <div className="flex justify-center">Loading tasks...</div>;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Todo Manager</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-muted-foreground">{filteredTasks.length} tasks</span>
            <ThemeToggle />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Пошук */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search tasks..." className="pl-10" />
        </div>

        {/* Додавання нової задачі */}
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

        {/* Фільтри */}
        <div className="flex space-x-2">
          {(['all', 'active', 'completed'] as FilterType[]).map(filterType => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' && 'All'}
              {filterType === 'active' && 'Active'}
              {filterType === 'completed' && 'Completed'}
            </Button>
          ))}
        </div>

        {/* Список задач */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox checked={task.done} onCheckedChange={checked => toggleTask(task.id, checked as boolean)} />

                <div className="flex flex-col cursor-pointer" onClick={() => setEditingTask(task)}>
                  <Label className={task.done ? 'line-through text-muted-foreground' : ''}>{task.title}</Label>

                  {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => setEditingTask(task)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(task)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <DeleteConfirmDialog task={deletingTask} open={!!deletingTask} onOpenChange={open => !open && setDeletingTask(null)} />
              </div>
            </div>
          ))}
          <EditTaskDialog task={editingTask} open={!!editingTask} onOpenChange={open => !open && setEditingTask(null)} />
        </div>
      </CardContent>
    </Card>
  );
}
