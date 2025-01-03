import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db/mongodb';
import { Video, VideoCollection } from '@/lib/db/models/video';
import { getErrorMessage } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    
    const client = await clientPromise;
    const db = client.db();
    
    const video = await db.collection<Video>(VideoCollection)
      .findOne({ _id: id });
      
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    const updates = await request.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection<Video>(VideoCollection)
      .updateOne(
        { _id: id },
        { $set: updates }
      );
      
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    
    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection<Video>(VideoCollection)
      .deleteOne({ _id: id });
      
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}