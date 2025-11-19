const API_BASE = 'http://localhost:3001';

export interface Task {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE}/tasks`);
  return response.json();
}

export async function createTask(title: string, description?: string): Promise<Task> {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  return response.json();
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
}
