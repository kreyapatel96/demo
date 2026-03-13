import { Sidebar } from '@/components/Sidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card'
import { Button } from '@/components/Button'
import { Search, Filter, Trash2 } from 'lucide-react'
import { Input } from '@/components/Input'

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Analysis History</h1>
          <p className="text-gray-400">Review and manage your previous AI-driven insights.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input className="pl-10" placeholder="Search by analysis name or tool..." />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* History Table/List */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="p-4 font-semibold text-gray-300">Tool</th>
                    <th className="p-4 font-semibold text-gray-300">Analysis Title</th>
                    <th className="p-4 font-semibold text-gray-300">Model</th>
                    <th className="p-4 font-semibold text-gray-300">Date</th>
                    <th className="p-4 font-semibold text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium uppercase">Gemini</span>
                      </td>
                      <td className="p-4 text-white font-medium">Security Vulnerability Audit #{i}</td>
                      <td className="p-4 text-gray-400 text-sm">gemini-1.5-flash</td>
                      <td className="p-4 text-gray-400 text-sm">March {12 - i}, 2026</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                          </Button>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
