import { query } from '.';
import { Task } from './types';

export async function createTask(
    name: string,
    project_id: number,
): Promise<Task> {
    return query<Task>(
        'INSERT INTO tasks (name, project_id) VALUES ($1, $2) RETURNING *',
        [name, project_id],
    ).then(res => res.rows[0]);
}
