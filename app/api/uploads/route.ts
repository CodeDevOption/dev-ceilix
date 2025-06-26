import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file found' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadStream = () =>
        new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads', // optional folder
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            Readable.from(buffer).pipe(stream);
        });

    try {
        const result: any = await uploadStream();
        return NextResponse.json({ url: result.secure_url });
    } catch (err) {
        return NextResponse.json({ error: 'Upload failed' + err }, { status: 500 });
    }
}
