'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteTask } from 'hooks/use-tasks';

interface DeleteConfirmDialogProps {
  task: { id: string; title: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteConfirmDialog({ task, open, onOpenChange }: DeleteConfirmDialogProps) {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = async () => {
    if (task) {
      await deleteTaskMutation.mutateAsync(task.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>Are you sure you want to delete "{task?.title}"? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteTaskMutation.isPending}>
            {deleteTaskMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
