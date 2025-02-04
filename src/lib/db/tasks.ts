import { query } from '.';
import { CreateTaskInput, Task } from './types';

export async function createTask(task: CreateTaskInput): Promise<Task> {
    return query<Task>(
        `INSERT INTO tasks (
      name,
      project_id,
      description,
      deadline,
      status,
      created_at,
      updated_at,
      start_on,
      end_on,
      recurrence_type,
      recurrence_interval,
      recurrence_weekdays,
      recurrence_day_of_month
    ) VALUES (
      $1, $2, $3, $4, $5, 
      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
      $6, $7, $8, $9, $10, $11
    )
    RETURNING *`,
        [
            task.name,
            task.project_id,
            task.description,
            task.deadline,
            task.status,
            task.start_on,
            task.end_on,
            task.recurrence_type,
            task.recurrence_interval,
            task.recurrence_weekdays,
            task.recurrence_day_of_month,
        ],
    ).then(res => res.rows[0]);
}

export async function getAllTasks(): Promise<Task[]> {
    return query<Task>('SELECT * FROM tasks ORDER BY created_at DESC').then(
        res => res.rows,
    );
}
