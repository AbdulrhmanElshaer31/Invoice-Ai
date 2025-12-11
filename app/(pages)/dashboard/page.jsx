"use client";

import React from "react";
import {
  Clock,
  DollarSign,
  BarChart3,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import "./dashboard.css";

function Dashboard() {
  // Get current date
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="glass-panel p-8 md:p-12 space-y-8">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="header-left">
              <div className="header-title">
                <Clock className="title-icon" size={24} />
                <h1>Dashboard</h1>
              </div>
              <p className="header-date">{formattedDate}</p>
            </div>
            <button className="refresh-btn-header">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          {/* Filter and Action Bar */}
          <div className="filter-bar">
            <select className="filter-dropdown">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
            <select className="filter-dropdown">
              <option>All Cost Centers</option>
            </select>
            <button className="refresh-btn-filter">
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <DollarSign className="metric-icon" size={20} />
                <h3 className="metric-title">Total Expenses</h3>
              </div>
              <div className="metric-value">$0</div>
              <div className="metric-change positive">0% from last period</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <BarChart3 className="metric-icon" size={20} />
                <h3 className="metric-title">Total Transactions</h3>
              </div>
              <div className="metric-value">0</div>
              <div className="metric-change positive">0% from last period</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <Clock className="metric-icon" size={20} />
                <h3 className="metric-title">Active Cost Centers</h3>
              </div>
              <div className="metric-value">0</div>
              <div className="metric-change positive">0% from last period</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <TrendingUp className="metric-icon" size={20} />
                <h3 className="metric-title">Average per Transaction</h3>
              </div>
              <div className="metric-value">$0</div>
              <div className="metric-change positive">0% from last period</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-grid">
            {/* Cost Center Distribution Panel */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Cost Center Distribution</h2>
                  <p className="chart-subtitle">
                    Expense breakdown by cost center
                  </p>
                </div>
                <button className="manage-btn">Manage Cost Centers</button>
              </div>
              <div className="chart-content empty">
                <Clock className="empty-icon" size={64} />
                <p className="empty-text">No Cost Center Data</p>
              </div>
            </div>

            {/* Expense Types Panel */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Expense Types</h2>
                  <p className="chart-subtitle">Spending by expense category</p>
                </div>
                <button className="manage-btn">Manage Expense Types</button>
              </div>
              <div className="chart-content empty">
                <BarChart3 className="empty-icon" size={64} />
                <p className="empty-text">No Expense Types Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
