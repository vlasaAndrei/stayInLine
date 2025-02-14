import { getAllTasks } from '@/lib/db/tasks';
import { ITask } from '@/lib/db/types';
import style from './page.module.css';
import Task from '@/components/Task/Task';

export default async function Tasks() {
    const tasks: ITask[] = await getAllTasks();

    return (
        <div className={style['tasks-container']}>
            {tasks.map((task: ITask) => {
                return (
                    <Task
                        key={task.id}
                        taskData={task}
                    />
                );
            })}
        </div>
    );
}
