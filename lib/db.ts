import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://admin:admin123@localhost:5432/medical_db',
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export type Patient = {
  id: number;
  name: string;
  sex: string;
  department: string;
  status: string;
};
