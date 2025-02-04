import { createTask } from '@/lib/db/tasks';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log(request.url);
    createTask({
        name: 'dummy task',
        status: 'pending',
        start_on: new Date(),
        recurrence_type: 'daily',
    });

    return new NextResponse('Hello World', {
        headers: { 'Content-Type': 'text/plain' },
    });
}
