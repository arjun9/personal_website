'use client'

import { useState, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '@/components/Button'

interface TwitterPostDialogProps {
  isOpen: boolean
  onClose: () => void
  article: {
    title: string
    description: string
    slug: string
  }
}

export function TwitterPostDialog({ isOpen, onClose, article }: TwitterPostDialogProps) {
  const [tweetText, setTweetText] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const [postResult, setPostResult] = useState<{
    success: boolean
    message: string
    tweetId?: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate default tweet text based on article
  const generateDefaultTweet = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const articleUrl = `${baseUrl}/articles/${article.slug}`
    return `Just published: "${article.title}"\n\n${article.description}\n\nRead more: ${articleUrl}`
  }

  // Initialize with default tweet when dialog opens
  const handleOpen = () => {
    if (isOpen && !tweetText) {
      setTweetText(generateDefaultTweet())
    }
  }

  // Reset form when dialog closes
  const handleClose = () => {
    setTweetText('')
    setMediaFile(null)
    setPostResult(null)
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (Twitter limit is 5MB for images)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert('Only image and video files are supported')
        return
      }
      
      setMediaFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPosting(true)
    setPostResult(null)

    try {
      let mediaIds: string[] = []

      // Upload media if present
      if (mediaFile) {
        const formData = new FormData()
        formData.append('media', mediaFile)

        const mediaResponse = await fetch('/api/twitter/upload-media', {
          method: 'POST',
          body: formData,
        })

        if (!mediaResponse.ok) {
          throw new Error('Failed to upload media')
        }

        const mediaResult = await mediaResponse.json()
        mediaIds = [mediaResult.mediaId]
      }

      // Post tweet
      const response = await fetch('/api/twitter/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: tweetText,
          mediaIds: mediaIds.length > 0 ? mediaIds : undefined,
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
  if (isOpen && !tweetText) {
    handleOpen()
  }

  const remainingChars = 280 - tweetText.length

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Post to Twitter
          </Dialog.Title>

          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share "{article.title}" on Twitter
            </p>
          </div>

          {!postResult ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    {mediaFile && `Media: ${mediaFile.name}`}
                  </span>
                  <span className={`${remainingChars < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {remainingChars} characters remaining
                  </span>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label htmlFor="media-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Media (Optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900 dark:file:text-indigo-300 dark:hover:file:bg-indigo-800"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Images and videos up to 5MB
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
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
