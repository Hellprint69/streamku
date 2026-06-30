import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) {
  try {
    // Mengambil binding database D1 dari Cloudflare Environment
    // Ganti 'DB' sesuai dengan nama binding yang kamu pasang di wrangler.toml
    const db = process.env.DB || request.context?.env?.DB;

    if (!db) {
      return NextResponse.json({ status: 500, msg: "Database binding 'DB' tidak ditemukan." });
    }

    // Query SQL untuk mengambil semua video, diurutkan dari yang terbaru (id DESC)
    const { results } = await db.prepare("SELECT * FROM videos ORDER BY id DESC").all();

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ status: 500, msg: error.message });
  }
}
