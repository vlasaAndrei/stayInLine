import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool();

export async function query<T extends QueryResultRow>(
    text: string,
    params: QueryConfig['values'] = [],
): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
        const res = await pool.query<T>(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', {
            text,
            duration,
            rows: res.rowCount,
        });
        return res;
    } catch (err) {
        console.error('Error executing query', { text, err });
        throw err;
    }
}

export default pool;
