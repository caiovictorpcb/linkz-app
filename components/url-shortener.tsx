"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, Link2 } from "lucide-react"
import { useCallback, useState } from "react"

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!url) {
        throw new Error("Please enter a URL")
      }

      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        toast({
          variant: 'destructive',
          title: 'Invalid URL',
          description: 'Please enter a valid URL starting with http:// or https://',
        })
      }

      const { shortUrl} = await fetch('/api/short', { method: 'POST', body: JSON.stringify({ url }) }).then((res) => res.json())
      if(shortUrl?.length)
        setShortUrl(shortUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to shorten URL")
    } finally {
      setIsLoading(false)
    }
  },[url, toast])

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter your long URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                type="text"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Shortening..." : "Shorten"}
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </form>
      </CardHeader>
      {shortUrl && (
        <>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="shortUrl">Your shortened URL</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary truncate"
                >
                  {shortUrl}
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={copyToClipboard}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to clipboard
                </>
              )}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

