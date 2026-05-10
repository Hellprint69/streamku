import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = "109446t4h65dr9m44eajs8"; // API Key Doodstream kamu
  try {
    const response = await fetch(`https://doodapi.com/api/file/list?key=${API_KEY}`);
    const data = await response.json();

    // Jika data berhasil diambil, kita "bersihkan" link-nya sebelum dikirim ke Admin Panel
    if (data.status === 200 && data.result && data.result.files) {
      data.result.files = data.result.files.map(file => {
        return {
          ...file,
          // Kita pastikan semua link yang masuk pakai domain playmogo.com agar lancar di HP
          file_code: file.file_code, 
          title: file.title
        };
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 500, msg: error.message });
  }
}
