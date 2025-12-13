"use client";

import React from "react";
import {
  Clock,
  DollarSign,
  BarChart3,
  RefreshCw,
  FileText,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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

  // Monthly Spend Trend Data
  const monthlySpendData = [
    { month: "Jan", spend: 3200 },
    { month: "Feb", spend: 4200 },
    { month: "Mar", spend: 3800 },
    { month: "Apr", spend: 4500 },
    { month: "May", spend: 5200 },
    { month: "Jun", spend: 4800 },
    { month: "Jul", spend: 5600 },
    { month: "Aug", spend: 5900 },
    { month: "Sep", spend: 6200 },
    { month: "Oct", spend: 6500 },
    { month: "Nov", spend: 6800 },
    { month: "Dec", spend: 7000 },
  ];

  // Top Vendors Data
  const vendorsData = [
    { name: "Acme Corp", spend: 8500 },
    { name: "TechSupply", spend: 6200 },
    { name: "Office Pro", spend: 5800 },
    { name: "Cloud Services", spend: 4800 },
    { name: "Marketing", spend: 7200 },
  ];

  // Expense Types Data
  const expenseTypesData = [
    { type: "Software", spend: 18000 },
    { type: "Hardware", spend: 15000 },
    { type: "Services", spend: 12000 },
    { type: "Marketing", spend: 8000 },
    { type: "Office", spend: 5000 },
  ];

  // Cost Center Data
  const costCenterData = [
    { name: "Engineering", value: 15000, color: "#60a5fa" },
    { name: "Sales", value: 12000, color: "#f97316" },
    { name: "Marketing", value: 10000, color: "#ec4899" },
    { name: "Operations", value: 8000, color: "#10b981" },
    { name: "HR", value: 6000, color: "#a855f7" },
    { name: "Finance", value: 4231, color: "#60a5fa" },
  ];

  const COLORS = costCenterData.map((item) => item.color);

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
                <div className="metric-icon-wrapper green">
                  <DollarSign className="metric-icon" size={20} />
                </div>
                <h3 className="metric-title">Total Spend</h3>
              </div>
              <div className="metric-value">$45,231.89</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +20.1%
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-wrapper purple">
                  <FileText className="metric-icon" size={20} />
                </div>
                <h3 className="metric-title">Total Invoices</h3>
              </div>
              <div className="metric-value">1,234</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +15.3%
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-wrapper orange">
                  <Clock className="metric-icon" size={20} />
                </div>
                <h3 className="metric-title">Pending Payment</h3>
              </div>
              <div className="metric-value">$8,492.00</div>
              <div className="metric-change negative">
                <ArrowDown size={14} />
                -4.5%
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-wrapper teal">
                  <CheckCircle className="metric-icon" size={20} />
                </div>
                <h3 className="metric-title">Processed This Month</h3>
              </div>
              <div className="metric-value">348</div>
              <div className="metric-change positive">
                <ArrowUp size={14} />
                +32.7%
              </div>
            </div>
          </div>

          {/* Charts Section - First Row */}
          <div className="charts-grid">
            {/* Monthly Spend Trend */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Monthly Spend Trend</h2>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlySpendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                      domain={[0, 8000]}
                      ticks={[0, 2000, 4000, 6000, 8000]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="spend"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={{ fill: "#60a5fa", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Vendors by Spend */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Top Vendors by Spend</h2>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vendorsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
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
                    <Bar dataKey="spend" fill="#60a5fa" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Section - Second Row */}
          <div className="charts-grid">
            {/* Spend by Expense Type */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Spend by Expense Type</h2>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={expenseTypesData}
                    layout="vertical"
                    margin={{ left: 20, right: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      type="number"
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="type"
                      stroke="#94a3b8"
                      style={{ fontSize: "12px" }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Bar dataKey="spend" fill="#fbbf24" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Spend by Cost Center */}
            <div className="chart-panel">
              <div className="chart-header">
                <div className="chart-title-section">
                  <h2 className="chart-title">Spend by Cost Center</h2>
                </div>
              </div>
              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costCenterData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costCenterData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
