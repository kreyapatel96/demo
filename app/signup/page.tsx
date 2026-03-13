'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card'
import { Sparkles, UserPlus } from 'lucide-react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-mesh-gradient px-4">
      <Link href="/" className="mb-8 flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight">DevInsight AI</span>
      </Link>

      <Card className="w-full max-w-md border-white/10 bg-background/80 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Create your account</CardTitle>
          <CardDescription className="text-gray-400">
            Join DevInsight AI to unlock intelligent development
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4 py-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Check your email</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ve sent a confirmation link to <strong>{email}</strong>.
              </p>
              <Link href="/login">
                <Button variant="ghost" className="mt-4">Back to login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              
              <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Create Account'}
                {!loading && <UserPlus className="ml-2 w-4 h-4" />}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-1 text-sm text-gray-500">
          <span>Already have an account?</span>
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition cursor-pointer">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
