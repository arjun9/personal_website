import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Use TinyURL API (free, no API key required)
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to shorten URL')
    }

    const shortenedUrl = await response.text()

    // Check if TinyURL returned an error
    if (shortenedUrl.includes('Error')) {
      throw new Error('TinyURL service error')
    }

    return NextResponse.json({
      success: true,
      originalUrl: url,
      shortenedUrl: shortenedUrl.trim(),
    })
  } catch (error) {
    console.error('URL shortening error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to shorten URL', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
