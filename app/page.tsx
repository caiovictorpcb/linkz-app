import { UrlShortener } from "@/components/url-shortener"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">URL Shortener</h1>
        <p className="text-slate-600 text-center mb-8">Shorten your long URLs into compact, easy-to-share links.</p>
        <UrlShortener />
      </div>
    </main>
  )
}

