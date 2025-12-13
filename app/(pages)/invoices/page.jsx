"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Filter,
  ChevronDown,
  Eye,
  MoreVertical,
  ArrowUpDown,
} from "lucide-react";
import "./invoices.css";

function Invoice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Sort by Date");

  // Sample invoice data
  const invoices = [
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      vendor: "Acme Corporation",
      category: "Software",
      amount: "$1.234,56",
      status: "Paid",
      date: "2024-12-08",
      dueDate: "2024-12-22",
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      vendor: "TechSupply Inc",
      category: "Hardware",
      amount: "$892",
      status: "Pending",
      date: "2024-12-07",
      dueDate: "2024-12-21",
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      vendor: "Office Pro",
      category: "Office Supplies",
      amount: "$2.145,8",
      status: "Paid",
      date: "2024-12-06",
      dueDate: "2024-12-20",
    },
    {
      id: 4,
      invoiceNumber: "INV-2024-004",
      vendor: "Cloud Services Ltd",
      category: "Cloud Services",
      amount: "$450",
      status: "Overdue",
      date: "2024-11-15",
      dueDate: "2024-11-29",
    },
    {
      id: 5,
      invoiceNumber: "INV-2024-005",
      vendor: "Marketing Agency",
      category: "Marketing",
      amount: "$3.500",
      status: "Pending",
      date: "2024-12-05",
      dueDate: "2024-12-19",
    },
    {
      id: 6,
      invoiceNumber: "INV-2024-006",
      vendor: "Legal Advisors",
      category: "Legal",
      amount: "$1.800",
      status: "Paid",
      date: "2024-12-04",
      dueDate: "2024-12-18",
    },
    {
      id: 7,
      invoiceNumber: "INV-2024-007",
      vendor: "Software Solutions",
      category: "Software",
      amount: "$999,99",
      status: "Pending",
      date: "2024-12-03",
      dueDate: "2024-12-17",
    },
    {
      id: 8,
      invoiceNumber: "INV-2024-008",
      vendor: "Consulting Group",
      category: "Consulting",
      amount: "$5.200",
      status: "Overdue",
      date: "2024-11-20",
      dueDate: "2024-12-04",
    },
  ];

  const summaryStats = {
    totalInvoices: 8,
    totalAmount: "$16.222,35",
    paid: 3,
    overdue: 2,
  };

  return (
    <div className="page-shell">
      <div className="page-content invoices-page-content">
        {/* Header Section */}
        <div className="invoices-page-header">
          <div className="invoices-header-content">
            <h1 className="invoices-page-title">Invoices</h1>
            <p className="invoices-page-subtitle">
              Manage and track all your invoices
            </p>
          </div>
          <button className="export-all-button">
            <Download size={18} />
            Export All
          </button>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards-grid">
          <div className="summary-card">
            <div className="summary-card-content">
              <div className="summary-label">Total Invoices</div>
              <div className="summary-value">{summaryStats.totalInvoices}</div>
            </div>
            <div className="summary-card-accent summary-accent-teal"></div>
          </div>

          <div className="summary-card">
            <div className="summary-card-content">
              <div className="summary-label">Total Amount</div>
              <div className="summary-value">{summaryStats.totalAmount}</div>
            </div>
            <div className="summary-card-accent summary-accent-purple"></div>
          </div>

          <div className="summary-card">
            <div className="summary-card-content">
              <div className="summary-label">Paid</div>
              <div className="summary-value">{summaryStats.paid}</div>
            </div>
            <div className="summary-card-accent summary-accent-orange"></div>
          </div>

          <div className="summary-card">
            <div className="summary-card-content">
              <div className="summary-label">Overdue</div>
              <div className="summary-value">{summaryStats.overdue}</div>
            </div>
            <div className="summary-card-accent summary-accent-red"></div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button className="filter-button">
              {statusFilter}
              <ChevronDown size={16} />
            </button>
            <button className="filter-button">
              {sortBy}
              <ChevronDown size={16} />
            </button>
            <button className="filter-button">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="invoices-table-container">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>
                  Invoice #
                  <ArrowUpDown size={14} className="sort-icon" />
                </th>
                <th>
                  Vendor
                  <ArrowUpDown size={14} className="sort-icon" />
                </th>
                <th>Category</th>
                <th>
                  Amount
                  <ArrowUpDown size={14} className="sort-icon" />
                </th>
                <th>Status</th>
                <th>
                  Date
                  <ArrowUpDown size={14} className="sort-icon" />
                </th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="invoice-row">
                  <td className="invoice-number">{invoice.invoiceNumber}</td>
                  <td>{invoice.vendor}</td>
                  <td>{invoice.category}</td>
                  <td className="invoice-amount">{invoice.amount}</td>
                  <td>
                    <span
                      className={`invoice-status-badge status-${invoice.status.toLowerCase()}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>{invoice.date}</td>
                  <td>{invoice.dueDate}</td>
                  <td>
                    <div className="invoice-actions">
                      <button className="action-button" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="action-button" title="More">
                        <MoreVertical size={18} />
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

export default Invoice;
