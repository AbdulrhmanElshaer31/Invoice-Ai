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
    <div className="page-shell">
      <div className="page-content flex flex-col gap-6">
        {/* Header Section */}
        <div className="glass-panel invoices-hero">
          <div className="invoices-header">
            <div>
              <div className="pill">Smart Workspace</div>
              <h1 className="invoices-title">Invoice Files</h1>
              <p className="invoices-subtitle">
                Organize, track, and refresh invoice processing in one view.
              </p>
            </div>
            <button className="refresh-btn-nav primary-button">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
          <div className="info-banner">
            Files process automatically. Click Refresh to see updates.
          </div>
        </div>

        {/* Navigation and Action Bar */}
        <div className="glass-panel nav-action-bar">
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
          <div className="search-add-inline">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input outline-input"
                placeholder="Search files..."
              />
            </div>
            <button className="new-invoice-btn primary-button">
              <Plus size={20} />
              New Invoice
            </button>
          </div>
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

        {/* File Listing Table */}
        <div className="glass-panel table-container">
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
    </div>
  );
}

export default Invoice;
