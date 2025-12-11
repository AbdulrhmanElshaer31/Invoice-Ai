import React from 'react'
import { ClipboardList, Plus } from 'lucide-react'

function ExpenseType() {
  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="glass-panel p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <div className="pill w-fit">
              <ClipboardList size={16} /> Expense Types
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Categorize expenses with the same sleek experience
            </h1>
            <p className="text-slate-200 text-base md:text-lg max-w-2xl">
              Create, organize, and refine expense types to keep approvals and reporting
              clean. The dark, glassy layout keeps consistency with your login screen.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="primary-button">
                <Plus size={18} />
                New expense type
              </button>
              <div className="pill">Real-time overview</div>
              <div className="pill">Audit ready</div>
            </div>
          </div>

          <div className="w-full lg:w-5/12 card-muted p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-200 font-semibold">Preview</span>
              <span className="pill">Empty state</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="flex justify-between text-slate-200">
                <span>Travel</span>
                <span className="text-slate-400 text-sm">Active</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Software</span>
                <span className="text-slate-400 text-sm">Active</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>+ Add more</span>
                <span>...</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Tip: keep names short and consistent for clean invoice exports.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseType