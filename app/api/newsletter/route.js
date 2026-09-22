import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Subscriber from '@/lib/models/Subscriber';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.create({ email });
    return NextResponse.json(
      { success: true, message: 'Subscribed successfully!', data: subscriber },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed!' },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
