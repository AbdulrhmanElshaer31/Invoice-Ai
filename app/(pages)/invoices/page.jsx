"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  RotateCcw,
  Search,
  Plus,
} from "lucide-react";
import "./invoices.css";

function Invoice() {
  const [activeTab, setActiveTab] = useState("files");

  return (
    <div className="invoices-container">
      {/* Header Section */}
      <div className="invoices-header">
        <h1 className="invoices-title">Invoice Files</h1>
        <div className="info-banner">
          Files process automatically. Click Refresh to see updates.
        </div>
      </div>

      {/* Navigation and Action Bar */}
      <div className="nav-action-bar">
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "files" ? "active" : ""}`}
            onClick={() => setActiveTab("files")}
          >
            Files View
          </button>
          <button
            className={`tab ${activeTab === "invoices" ? "active" : ""}`}
            onClick={() => setActiveTab("invoices")}
          >
            Invoices View
          </button>
        </div>
        <button className="refresh-btn-nav">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Metric Cards */}
      <div className="status-metrics-grid">
        <div className="status-card total">
          <div className="status-icon-wrapper">
            <FileText className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Total</div>
            <div className="status-value">0</div>
          </div>
        </div>

        <div className="status-card processed">
          <div className="status-icon-wrapper">
            <CheckCircle2 className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Processed</div>
            <div className="status-value">0</div>
          </div>
        </div>

        <div className="status-card processing">
          <div className="status-icon-wrapper">
            <Clock className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Processing</div>
            <div className="status-value">0</div>
          </div>
        </div>

        <div className="status-card pending">
          <div className="status-icon-wrapper">
            <AlertCircle className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Pending</div>
            <div className="status-value">0</div>
          </div>
        </div>

        <div className="status-card failed">
          <div className="status-icon-wrapper">
            <XCircle className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Failed</div>
            <div className="status-value">0</div>
          </div>
        </div>

        <div className="status-card skipped">
          <div className="status-icon-wrapper">
            <RotateCcw className="status-icon" size={24} />
          </div>
          <div className="status-info">
            <div className="status-label">Skipped</div>
            <div className="status-value">0</div>
          </div>
        </div>
      </div>

      {/* Search and Add Section */}
      <div className="search-add-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search files..."
          />
        </div>
        <button className="new-invoice-btn">
          <Plus size={20} />
          New Invoice
        </button>
      </div>

      {/* File Listing Table */}
      <div className="table-container">
        <table className="files-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date Added</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="empty-state">
                No files found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoice;
