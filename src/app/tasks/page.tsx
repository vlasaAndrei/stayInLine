import { getAllTasks } from '@/lib/db/tasks';
import { Task } from '@/lib/db/types';
import style from './page.module.css';

export default async function Tasks() {
    const tasks: Task[] = await getAllTasks();

    return (
        <div>
            {tasks.map((task: Task) => {
                return (
                    <div
                        key={task.id}
                        className={style.task}
                    >
                        {task.name} {task.id}
                    </div>
                );
            })}
        </div>
    );
}
