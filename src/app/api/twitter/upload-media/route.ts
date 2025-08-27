import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'

export async function POST(request: NextRequest) {
  try {
    // Only allow this in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Twitter media upload is only available in development' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('media') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Media file is required' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Initialize Twitter client with OAuth 1.0a (required for write operations)
    const client = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY!,
      appSecret: process.env.TWITTER_APP_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    })

    // Test authentication first
    const user = await client.v2.me()
    console.log('Auth test successful for user:', user.data.username)
    
    // Upload media
    const mediaId = await client.v1.uploadMedia(buffer, {
      mimeType: file.type,
    })

    return NextResponse.json({
      success: true,
      mediaId: mediaId,
    })
  } catch (error) {
    console.error('Twitter media upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload media', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
