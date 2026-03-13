'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import { Zap, Loader2, CheckCircle2 } from 'lucide-react'
import { type Tool } from '@/lib/prompts'

const tools: { id: Tool; label: string; description: string }[] = [
  { id: 'code_review', label: 'Code Review', description: 'Expert review for best practices' },
  { id: 'security_audit', label: 'Security Audit', description: 'Find vulnerabilities and risks' },
  { id: 'performance_check', label: 'Performance', description: 'Optimize for speed and memory' },
  { id: 'bug_analysis', label: 'Bug Analysis', description: 'Find root cause of issues' },
  { id: 'meeting_refiner', label: 'Meeting Refiner', description: 'Turn raw notes into professional docs' },
]

export function AnalysisForm() {
  const [inputText, setInputText] = useState('')
  const [selectedTool, setSelectedTool] = useState<Tool>('code_review')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: selectedTool, input_text: inputText }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.analysis)
        setInputText('')
      } else {
        setError(data.error || 'Failed to analyze')
        setResult(data) // Store error details in result to show them
      }
    } catch (err) {
      setError('An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="bg-white/5 border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Zap className="text-emerald-500 w-5 h-5" />
            New Intelligence Analysis
          </CardTitle>
          <CardDescription>Select a tool and paste your code snippet below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    selectedTool === tool.id
                      ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className={`block text-sm font-bold ${selectedTool === tool.id ? 'text-emerald-500' : 'text-white'}`}>
                    {tool.label}
                  </span>
                  <span className="block text-[10px] text-gray-500 leading-tight mt-1">{tool.description}</span>
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your code or logic here..."
                required
                className="w-full min-h-[200px] p-4 bg-card border border-border rounded-xl text-card-foreground font-mono text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm space-y-2">
                <p className="font-bold">{error}</p>
                {result?.gemini_error && <p className="text-xs opacity-70">Gemini: {result.gemini_error}</p>}
                {result?.groq_error && <p className="text-xs opacity-70">Groq: {result.groq_error}</p>}
                {result?.db_error && <p className="text-xs opacity-70">Database: {JSON.stringify(result.db_error)}</p>}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-12 text-lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing analysis...
                </>
              ) : (
                'Run Analysis'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result Display */}
      {result && (
        <Card className="bg-emerald-500/5 border-emerald-500/20 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/10 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-emerald-500 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Analysis Complete
              </CardTitle>
              <CardDescription className="text-emerald-500/70">
                Processed with {result.model_used}
              </CardDescription>
            </div>
            <Button variant="ghost" className="text-emerald-500 hover:bg-emerald-500/20" onClick={() => setResult(null)}>
              Dismiss
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300 font-sans leading-relaxed">
              {result.ai_response}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
