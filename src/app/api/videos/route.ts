import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { Video, VideoCollection } from '@/lib/db/models/video';
import { getErrorMessage } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const client = await clientPromise;
    const db = client.db();
    
    const query = userId ? { userId } : {};
    const skip = (page - 1) * limit;

    const [videos, total] = await Promise.all([
      db.collection<Video>(VideoCollection)
        .find(query)
        .sort({ uploadDate: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection(VideoCollection).countDocuments(query)
    ]);

    return NextResponse.json({
      videos,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const video: Omit<Video, '_id'> = await request.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection<Video>(VideoCollection).insertOne({
      ...video,
      uploadDate: new Date(),
    });

    return NextResponse.json({ 
      id: result.insertedId,
      success: true 
    }, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}