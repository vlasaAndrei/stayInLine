import { createTask, getAllTasks } from '@/lib/db/tasks';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log(request.url);
    const newTask = await createTask({
        name: 'dummy task',
        status: 'pending',
        start_on: new Date(),
        recurrence_type: 'daily',
    });

    console.log('new task created', newTask);

    return new NextResponse('Hello World', {
        headers: { 'Content-Type': 'text/plain' },
    });
}

export async function GET() {
    return await getAllTasks();
}
