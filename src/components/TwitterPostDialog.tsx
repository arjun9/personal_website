'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '@/components/Button'

export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player'

interface TwitterCardData {
  type: TwitterCardType
  title: string
  description: string
  image?: string
  // App card specific
  appCountry?: string
  appName?: string
  appId?: string
  appUrl?: string
  // Player card specific
  playerUrl?: string
  playerWidth?: number
  playerHeight?: number
  playerStream?: string
}

interface TwitterPostDialogProps {
  isOpen: boolean
  onClose: () => void
  article: {
    title: string
    description: string
    slug: string
  }
}

// Twitter Card Preview Components
function SummaryCard({ cardData, articleUrl }: { cardData: TwitterCardData; articleUrl: string }) {
  return (
    <div 
      className="cursor-pointer rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => window.open(articleUrl, '_blank')}
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          <div className="h-16 w-16 flex-shrink-0 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{cardData.title}</h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cardData.description}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              {process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || 'localhost:3000'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryLargeImageCard({ cardData, articleUrl }: { cardData: TwitterCardData; articleUrl: string }) {
  return (
    <div 
      className="cursor-pointer rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => window.open(articleUrl, '_blank')}
    >
      <div className="h-48 w-full rounded-t bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-lg font-bold text-white mb-2">{cardData.title}</h2>
          <p className="text-white/80 text-sm">Featured Article Image</p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{cardData.title}</h3>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cardData.description}</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || 'localhost:3000'}
        </p>
      </div>
    </div>
  )
}

function AppCard({ cardData, articleUrl }: { cardData: TwitterCardData; articleUrl: string }) {
  return (
    <div 
      className="cursor-pointer rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => window.open(articleUrl, '_blank')}
    >
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{cardData.appName || cardData.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cardData.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <button className="rounded-full bg-blue-500 px-4 py-1 text-xs font-medium text-white">
                Install
              </button>
              <span className="text-xs text-gray-500">Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayerCard({ cardData, articleUrl }: { cardData: TwitterCardData; articleUrl: string }) {
  return (
    <div 
      className="cursor-pointer rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => window.open(articleUrl, '_blank')}
    >
      <div className="relative h-48 w-full rounded-t bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 rounded-t"></div>
        <div className="relative text-center p-4">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12l-2 5H9l-2-5z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium">Play Video</p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{cardData.title}</h3>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cardData.description}</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {cardData.playerWidth && cardData.playerHeight 
            ? `${cardData.playerWidth}x${cardData.playerHeight}` 
            : 'Video Content'}
        </p>
      </div>
    </div>
  )
}

export function TwitterPostDialog({ isOpen, onClose, article }: TwitterPostDialogProps) {
  const [tweetText, setTweetText] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [postResult, setPostResult] = useState<{
    success: boolean
    message: string
    tweetId?: string
  } | null>(null)
  const [cardData, setCardData] = useState<TwitterCardData>({
    type: 'summary',
    title: article.title,
    description: article.description,
  })

  // Generate shortened URL
  const generateShortenedUrl = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const articleUrl = `${baseUrl}/articles/${article.slug}`
    
    setIsLoadingUrl(true)
    try {
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: articleUrl }),
      })
      
      const result = await response.json()
      if (result.success) {
        setShortenedUrl(result.shortenedUrl)
        return result.shortenedUrl
      }
    } catch (error) {
      console.error('Failed to shorten URL:', error)
    } finally {
      setIsLoadingUrl(false)
    }
    
    return articleUrl // fallback to original URL
  }

  // Generate default tweet text based on article
  const generateDefaultTweet = async () => {
    const url = shortenedUrl || await generateShortenedUrl()
    return `${article.title}\n\n${url}`
  }

  // Reset form when dialog closes
  const handleClose = () => {
    setTweetText('')
    setShortenedUrl(null)
    setPostResult(null)
    setCardData({
      type: 'summary',
      title: article.title,
      description: article.description,
    })
    onClose()
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPosting(true)
    setPostResult(null)

    try {
      // Post tweet without media - let Twitter cards handle the visuals
      const response = await fetch('/api/twitter/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: tweetText,
          // No mediaIds - Twitter cards will provide the image
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setPostResult({
          success: true,
          message: 'Tweet posted successfully!',
          tweetId: result.tweetId,
        })
      } else {
        setPostResult({
          success: false,
          message: result.error || 'Failed to post tweet',
        })
      }
    } catch (error) {
      setPostResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to post tweet',
      })
    } finally {
      setIsPosting(false)
    }
  }

  // Handle dialog open effect
  useEffect(() => {
    if (isOpen && !tweetText) {
      const initializeDialog = async () => {
        const defaultTweet = await generateDefaultTweet()
        setTweetText(defaultTweet)
      }
      initializeDialog()
    }
  }, [isOpen, tweetText]) // eslint-disable-line react-hooks/exhaustive-deps

  // Get article URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const articleUrl = `${baseUrl}/articles/${article.slug}`

  const remainingChars = 280 - tweetText.length

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Post to Twitter
          </Dialog.Title>

          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share "{article.title}" on Twitter
            </p>
          </div>

          {!postResult ? (
            <div className="mt-4 space-y-4">
              {/* Twitter Card Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter Card Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'summary' as TwitterCardType, label: 'Summary', icon: '📄' },
                    { type: 'summary_large_image' as TwitterCardType, label: 'Large Image', icon: '🖼️' },
                    { type: 'app' as TwitterCardType, label: 'App Card', icon: '📱' },
                    { type: 'player' as TwitterCardType, label: 'Player', icon: '🎥' },
                  ].map((option) => (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => setCardData(prev => ({ ...prev, type: option.type }))}
                      className={`p-2 text-sm rounded-lg border-2 transition-colors ${
                        cardData.type === option.type
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Twitter Card Preview */}
              <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Twitter Card Preview - {cardData.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  {isLoadingUrl && (
                    <p className="text-xs text-blue-500">Generating short URL...</p>
                  )}
                </div>
                {cardData.type === 'summary' && <SummaryCard cardData={cardData} articleUrl={articleUrl} />}
                {cardData.type === 'summary_large_image' && <SummaryLargeImageCard cardData={cardData} articleUrl={articleUrl} />}
                {cardData.type === 'app' && <AppCard cardData={cardData} articleUrl={articleUrl} />}
                {cardData.type === 'player' && <PlayerCard cardData={cardData} articleUrl={articleUrl} />}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tweet Text */}
                <div>
                  <label htmlFor="tweet-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tweet Text
                  </label>
                <textarea
                  id="tweet-text"
                  rows={6}
                  value={tweetText}
                  onChange={(e) => setTweetText(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                  placeholder="What's happening?"
                  maxLength={280}
                  required
                />
                <div className="mt-1 flex justify-end text-xs">
                  <span className={`${remainingChars < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {remainingChars} characters remaining
                  </span>
                </div>
                
                {/* URL Status */}
                <div className="mt-2 text-xs">
                  {shortenedUrl ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ Short URL: {shortenedUrl}
                    </span>
                  ) : isLoadingUrl ? (
                    <span className="text-blue-500">Generating short URL...</span>
                  ) : null}
                </div>
              </div>

              {/* Card Type Specific Fields */}
              {cardData.type === 'app' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">App Card Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        App Name
                      </label>
                      <input
                        type="text"
                        value={cardData.appName || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, appName: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="My Awesome App"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        App Store Country
                      </label>
                      <input
                        type="text"
                        value={cardData.appCountry || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, appCountry: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="US"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        App Store ID
                      </label>
                      <input
                        type="text"
                        value={cardData.appId || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, appId: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        App URL
                      </label>
                      <input
                        type="url"
                        value={cardData.appUrl || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, appUrl: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="https://apps.apple.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {cardData.type === 'player' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Player Card Details</h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      Player URL
                    </label>
                    <input
                      type="url"
                      value={cardData.playerUrl || ''}
                      onChange={(e) => setCardData(prev => ({ ...prev, playerUrl: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                      placeholder="https://player.example.com/video/123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        Player Width
                      </label>
                      <input
                        type="number"
                        value={cardData.playerWidth || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, playerWidth: parseInt(e.target.value) || undefined }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="1280"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        Player Height
                      </label>
                      <input
                        type="number"
                        value={cardData.playerHeight || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, playerHeight: parseInt(e.target.value) || undefined }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="720"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      Stream URL (optional)
                    </label>
                    <input
                      type="url"
                      value={cardData.playerStream || ''}
                      onChange={(e) => setCardData(prev => ({ ...prev, playerStream: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                      placeholder="https://stream.example.com/video.mp4"
                    />
                  </div>
                </div>
              )}

              {(cardData.type === 'summary' || cardData.type === 'summary_large_image') && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Card Content</h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={cardData.title}
                      onChange={(e) => setCardData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                      placeholder="Article title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      Card Description
                    </label>
                    <textarea
                      rows={2}
                      value={cardData.description}
                      onChange={(e) => setCardData(prev => ({ ...prev, description: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                      placeholder="Article description"
                    />
                  </div>
                  {cardData.type === 'summary_large_image' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                        Image URL (optional)
                      </label>
                      <input
                        type="url"
                        value={cardData.image || ''}
                        onChange={(e) => setCardData(prev => ({ ...prev, image: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Twitter Card Info & Debugging */}
              <div className="space-y-3">
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        {cardData.type === 'summary' && "Summary cards show a small thumbnail with title and description."}
                        {cardData.type === 'summary_large_image' && "Large image cards feature a prominent image with title and description."}
                        {cardData.type === 'app' && "App cards display mobile app information with install buttons and ratings."}
                        {cardData.type === 'player' && "Player cards embed rich media content like videos or audio players."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Twitter Card Debugging */}
                <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Twitter Card Debugging</h4>
                      <div className="mt-2 text-xs text-yellow-700 dark:text-yellow-300">
                        <p className="mb-2">Your article URL: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">{articleUrl}</code></p>
                        <p className="mb-2">Card type in meta tags: <strong>summary_large_image</strong></p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => window.open(`https://cards-dev.twitter.com/validator?url=${encodeURIComponent(articleUrl)}`, '_blank')}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-200 text-yellow-800 hover:bg-yellow-300 dark:bg-yellow-800 dark:text-yellow-200 dark:hover:bg-yellow-700"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Validate Card
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={handleClose}
                  disabled={isPosting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPosting || remainingChars < 0 || !tweetText.trim()}
                >
                  {isPosting ? 'Posting...' : 'Post Tweet'}
                </Button>
              </div>
              </form>
            </div>
          ) : (
            /* Post Result */
            <div className="mt-4">
              <div className={`rounded-md p-4 ${postResult.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {postResult.success ? (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${postResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      {postResult.message}
                    </p>
                    {postResult.success && postResult.tweetId && (
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        <a
                          href={`https://twitter.com/intent/tweet?in_reply_to=${postResult.tweetId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          View on Twitter
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
