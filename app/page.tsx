import Link from 'next/link'
import { Button } from '@/components/Button'
import { Sparkles, Terminal, Activity, ShieldCheck } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-mesh-gradient">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-12 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-primary">
            DevInsight AI
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:bg-white/5 rounded-md transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-gradient-primary text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm mb-8 animate-fade-in">
          <Terminal size={16} />
          <span>Next Gen Analysis Tool</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Supercharge Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-primary">
            Development Insights
          </span>
        </h1>
        
        <p className="max-w-2xl text-gray-400 text-lg lg:text-xl mb-12">
          Harness the power of Gemini and Groq to analyze your codebase, track progress, and build faster with AI-driven intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Link href="/signup" className="h-12 px-8 flex items-center justify-center rounded-md font-medium transition-all bg-gradient-primary text-white hover:opacity-90 shadow-lg shadow-emerald-500/20 w-full sm:w-auto text-lg">
            Start Free Trial
          </Link>
          <Link href="/dashboard" className="h-12 px-8 flex items-center justify-center rounded-md font-medium transition-all border border-border bg-transparent hover:bg-white/5 text-foreground w-full sm:w-auto text-lg">
            Live Demo
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Analysis</h3>
            <p className="text-gray-400">Instant insights into your performance metrics and logic flow.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all group">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="text-violet-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Powered</h3>
            <p className="text-gray-400">Leverage the latest LLMs to solve complex development hurdles.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure by Default</h3>
            <p className="text-gray-400">Your data is yours. Protected with enterprise-grade Supabase RLS.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2026 DevInsight AI. Built with Next.js 14 and Passion.</p>
      </footer>
    </main>
  )
}
