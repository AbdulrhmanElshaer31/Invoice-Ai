"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  DollarSign,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./expense-type.css";

function ExpenseType() {
  const [searchQuery, setSearchQuery] = useState("");

  // Summary data
  const summaryStats = {
    totalCategories: 6,
    totalSpent: "$45.200",
    totalInvoices: 225,
  };

  // Spend Distribution Data (Donut Chart)
  const spendDistributionData = [
    { name: "Software & Licenses", value: 28, color: "#3b82f6" }, // Blue
    { name: "Professional Services", value: 22, color: "#22c55e" }, // Green
    { name: "Office Supplies", value: 9, color: "#fb923c" }, // Orange
    { name: "Hardware & Equipment", value: 18, color: "#a855f7" }, // Purple
    { name: "Marketing & Advertising", value: 16, color: "#ec4899" }, // Pink
    { name: "Legal & Compliance", value: 7, color: "#eab308" }, // Yellow
  ];

  // Monthly Expense Trend Data (Bar Chart)
  const monthlyExpenseData = [
    { month: "Jul", amount: 6500 },
    { month: "Aug", amount: 7000 },
    { month: "Sep", amount: 6500 },
    { month: "Oct", amount: 7800 },
    { month: "Nov", amount: 7200 },
    { month: "Dec", amount: 8000 },
  ];

  // Expense Categories Table Data
  const expenseCategories = [
    {
      id: 1,
      category: "Software & Licenses",
      code: "SOFT",
      totalSpent: "$12.500",
      invoices: 45,
      percentage: 28,
      color: "#3b82f6", // Blue
    },
    {
      id: 2,
      category: "Hardware & Equipment",
      code: "HARD",
      totalSpent: "$8.200",
      invoices: 32,
      percentage: 18,
      color: "#a855f7", // Purple
    },
    {
      id: 3,
      category: "Professional Services",
      code: "SERV",
      totalSpent: "$9.800",
      invoices: 28,
      percentage: 22,
      color: "#22c55e", // Green
    },
    {
      id: 4,
      category: "Marketing & Advertising",
      code: "MRKT",
      totalSpent: "$7.300",
      invoices: 38,
      percentage: 16,
      color: "#ec4899", // Pink
    },
    {
      id: 5,
      category: "Office Supplies",
      code: "OFFC",
      totalSpent: "$4.100",
      invoices: 67,
      percentage: 9,
      color: "#fb923c", // Orange
    },
    {
      id: 6,
      category: "Legal & Compliance",
      code: "LEGL",
      totalSpent: "$3.300",
      invoices: 15,
      percentage: 7,
      color: "#eab308", // Yellow
    },
  ];

  return (
    <div className="page-shell">
      <div className="page-content expense-type-page-content">
        {/* Header Section */}
        <div className="expense-type-header">
          <div className="expense-type-header-content">
            <h1 className="expense-type-title">Expense Types</h1>
            <p className="expense-type-subtitle">
              Categorize and track different expense categories
            </p>
          </div>
          <button className="add-expense-type-button">
            <Plus size={18} />
            Add Expense Type
          </button>
        </div>

        {/* Summary Cards */}
        <div className="expense-summary-cards">
          <div className="expense-summary-card">
            <div className="expense-summary-content">
              <div className="expense-summary-label">Total Categories</div>
              <div className="expense-summary-value">
                {summaryStats.totalCategories}
              </div>
            </div>
            <div className="expense-summary-icon expense-icon-teal">
              <RefreshCw size={24} />
            </div>
          </div>

          <div className="expense-summary-card">
            <div className="expense-summary-content">
              <div className="expense-summary-label">Total Spent</div>
              <div className="expense-summary-value">
                {summaryStats.totalSpent}
              </div>
            </div>
            <div className="expense-summary-icon expense-icon-purple">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="expense-summary-card">
            <div className="expense-summary-content">
              <div className="expense-summary-label">Total Invoices</div>
              <div className="expense-summary-value">
                {summaryStats.totalInvoices}
              </div>
            </div>
            <div className="expense-summary-icon expense-icon-teal-dark">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="expense-charts-section">
          {/* Spend Distribution (Donut Chart) */}
          <div className="expense-chart-panel">
            <h2 className="expense-chart-title">Spend Distribution</h2>
            <div className="expense-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="expense-legend">
                {spendDistributionData.map((item, index) => (
                  <div key={index} className="expense-legend-item">
                    <div
                      className="expense-legend-dot"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="expense-legend-label">{item.name}</span>
                    <span className="expense-legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Expense Trend (Bar Chart) */}
          <div className="expense-chart-panel">
            <h2 className="expense-chart-title">Monthly Expense Trend</h2>
            <div className="expense-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="month"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                    domain={[0, 10000]}
                    ticks={[0, 2500, 5000, 7500, 10000]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Bar dataKey="amount" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
          {/* Search Bar */}
          <div className="expense-search-bar">
          <div className="expense-search-input-wrapper">
            <Search className="expense-search-icon" size={20} />
            <input
              type="text"
              className="expense-search-input"
              placeholder="Search expense types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Expense Categories Table */}
        <div className="expense-categories-table-container">
          <table className="expense-categories-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Code</th>
                <th>Total Spent</th>
                <th>Invoices</th>
                <th>Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseCategories.map((category) => (
                <tr key={category.id} className="expense-category-row">
                  <td>
                    <div className="category-cell">
                      <div
                        className="category-icon"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span>{category.category}</span>
                    </div>
                  </td>
                  <td className="category-code">{category.code}</td>
                  <td className="category-amount">{category.totalSpent}</td>
                  <td>{category.invoices}</td>
                  <td>
                    <div className="percentage-cell">
                      <div className="percentage-value">
                        {category.percentage}%
                      </div>
                      <div className="percentage-bar-container">
                        <div
                          className="percentage-bar"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="category-actions">
                      <button
                        className="action-button action-edit"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="action-button action-delete"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
      </div>
    </div>
  );
}

export default ExpenseType;
