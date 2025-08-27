import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'

export async function POST(request: NextRequest) {
  try {
    // Only allow this in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Twitter posting is only available in development' },
        { status: 403 }
      )
    }

    const { text, mediaIds } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Tweet text is required' },
        { status: 400 }
      )
    }

    // Initialize Twitter client with OAuth 1.0a (required for write operations)
    const client = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY!,
      appSecret: process.env.TWITTER_APP_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    })

    // Create the tweet
    const tweetOptions: any = {
      text: text,
    }

    if (mediaIds && mediaIds.length > 0) {
      tweetOptions.media = {
        media_ids: mediaIds
      }
    }

    const tweet = await client.v2.tweet(tweetOptions)

    return NextResponse.json({
      success: true,
      tweetId: tweet.data.id,
      tweetText: tweet.data.text,
    })
  } catch (error) {
    console.error('Twitter posting error:', error)
    return NextResponse.json(
      { error: 'Failed to post tweet', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
