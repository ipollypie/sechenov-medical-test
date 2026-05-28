import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const department = searchParams.get('department');

  try {
    let sqlQuery = 'SELECT id, name, sex, department, status FROM patients ORDER BY id';
    let params: string[] = [];

    if (department && department !== 'all') {
      sqlQuery = 'SELECT id, name, sex, department, status FROM patients WHERE department = $1 ORDER BY id';
      params = [department];
    }

    const result = await query(sqlQuery, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
