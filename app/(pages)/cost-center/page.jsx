"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  FileText,
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
} from "lucide-react";
import "./const-center.css";

function ConstCenter() {
  // Cost center data
  const costCenters = [
    {
      id: "ENG-001",
      name: "Engineering",
      description: "Software development and infrastructure",
      budget: 50000,
      spent: 35420,
      invoices: 142,
      manager: "John Smith",
      usagePercent: 70.8,
    },
    {
      id: "MKT-001",
      name: "Marketing",
      description: "Marketing campaigns and advertising",
      budget: 40000,
      spent: 28350,
      invoices: 98,
      manager: "Sarah Johnson",
      usagePercent: 70.9,
    },
    {
      id: "SAL-001",
      name: "Sales",
      description: "Sales operations and client entertainment",
      budget: 35000,
      spent: 22085,
      invoices: 156,
      manager: "Michael Brown",
      usagePercent: 63.1,
    },
    {
      id: "OPS-001",
      name: "Operations",
      description: "General operations and facilities",
      budget: 50000,
      spent: 31500,
      invoices: 99,
      manager: "Emily Davis",
      usagePercent: 63.0,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCostCenters = costCenters.filter((center) =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBudget = costCenters.reduce((sum, center) => sum + center.budget, 0);
  const totalSpent = costCenters.reduce((sum, center) => sum + center.spent, 0);
  const totalInvoices = costCenters.reduce((sum, center) => sum + center.invoices, 0);
  const budgetUsagePercent = (totalSpent / totalBudget) * 100;

  return (
    <div className="page-shell">
      <div className="page-content flex flex-col gap-6">
        {/* Header */}
        <div className="glass-panel cost-center-hero">
          <div className="cost-center-header">
            <div>
              <h1 className="cost-center-title">Cost Centers</h1>
              <p className="cost-center-subtitle">
                Manage and track spending by department
              </p>
            </div>
            <button className="add-cost-center-btn">
              <Plus size={18} />
              Add Cost Center
            </button>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards-grid">
            <div className="summary-card budget">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Total Budget</div>
                  <div className="summary-value">
                    ${totalBudget.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="summary-icon-wrapper green">
                  <DollarSign className="summary-icon" size={24} />
                </div>
              </div>
            </div>

            <div className="summary-card spent">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Total Spent</div>
                  <div className="summary-value">
                    ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="summary-additional">
                    <ArrowUp size={12} />
                    {budgetUsagePercent.toFixed(1)}% of budget
                  </div>
                </div>
                <div className="summary-icon-wrapper purple">
                  <TrendingUp className="summary-icon" size={24} />
                </div>
              </div>
            </div>

            <div className="summary-card invoices">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Total Invoices</div>
                  <div className="summary-value">{totalInvoices}</div>
                </div>
                <div className="summary-icon-wrapper teal">
                  <FileText className="summary-icon" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass-panel search-bar-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search cost centers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cost Center Cards Grid */}
        <div className="cost-centers-grid">
          {filteredCostCenters.map((center) => (
            <div key={center.id} className="cost-center-card">
              <div className="cost-center-card-header">
                <div>
                  <h3 className="cost-center-card-name">{center.name}</h3>
                  <p className="cost-center-card-id">{center.id}</p>
                </div>
                <div className="cost-center-card-actions">
                  <button className="card-action-btn">
                    <Pencil size={16} />
                  </button>
                  <button className="card-action-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="cost-center-card-description">{center.description}</p>

              <div className="cost-center-budget-usage">
                <div className="budget-usage-header">
                  <span className="budget-usage-label">Budget Usage</span>
                  <span className="budget-usage-percent">
                    {center.usagePercent.toFixed(1)}%
                  </span>
                </div>
                <div className="budget-usage-bar">
                  <div
                    className="budget-usage-fill"
                    style={{ width: `${center.usagePercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="cost-center-financials">
                <div className="financial-item">
                  <span className="financial-label">Budget</span>
                  <span className="financial-value">
                    ${center.budget.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="financial-item">
                  <span className="financial-label">Spent</span>
                  <span className="financial-value">
                    ${center.spent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="financial-item">
                  <span className="financial-label">Invoices</span>
                  <span className="financial-value">{center.invoices}</span>
                </div>
              </div>

              <div className="cost-center-manager">
                <span className="manager-label">Manager:</span>
                <span className="manager-name">{center.manager}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConstCenter;
