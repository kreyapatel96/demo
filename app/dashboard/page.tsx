import { Sidebar } from '@/components/Sidebar'
import { AnalysisForm } from '@/components/AnalysisForm'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Analysis Center</h1>
          <p className="text-gray-400">Leverage advanced AI to get deep insights into your development workflow.</p>
        </header>

        <AnalysisForm />
      </main>
    </div>
  )
}
