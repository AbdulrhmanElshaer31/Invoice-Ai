"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Filter,
  CheckCircle2,
  MoreHorizontal,
  Search,
  Plus,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import "./const-center.css";

function ConstCenter() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;
  const totalItems = 1;

  return (
    <div className="page-shell">
      <div className="page-content flex flex-col gap-6">
        {/* Hero Header */}
        <div className="glass-panel cost-center-hero">
          <div className="cost-center-header">
            <div>
              <div className="pill">Operations</div>
              <h1 className="cost-center-title">Cost Centers</h1>
              <p className="cost-center-subtitle">
                Track, monitor, and organize your spending in real time.
              </p>
            </div>
            <button className="refresh-btn-header primary-button">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
          <div className="summary-cards-grid">
            <div className="summary-card total">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Total Cost Centers</div>
                  <div className="summary-value">1</div>
                </div>
                <div className="summary-icon-wrapper">
                  <Filter className="summary-icon" size={24} />
                </div>
              </div>
            </div>

            <div className="summary-card active">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Active Centers</div>
                  <div className="summary-value">1</div>
                </div>
                <div className="summary-icon-wrapper">
                  <CheckCircle2 className="summary-icon" size={24} />
                </div>
              </div>
            </div>

            <div className="summary-card inactive">
              <div className="summary-content">
                <div className="summary-info">
                  <div className="summary-label">Inactive Centers</div>
                  <div className="summary-value">0</div>
                </div>
                <div className="summary-icon-wrapper">
                  <MoreHorizontal className="summary-icon" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="glass-panel action-bar">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input outline-input"
              placeholder="Search cost centers..."
            />
          </div>
          <button className="new-cost-center-btn primary-button">
            <Plus size={20} />
            New Cost Center
          </button>
        </div>

        {/* Cost Centers Table */}
        <div className="glass-panel table-container">
          <table className="cost-center-table">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-center">Created At</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">Tareq</td>
                <td className="text-center">2025-10-15</td>
                <td className="text-right">
                  <button className="actions-btn">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {totalItems} of {totalItems} cost centers
            </div>
            <div className="pagination-controls">
              <div className="rows-per-page">
                <span>Rows per page:</span>
                <select
                  className="rows-select"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="page-navigation">
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="pagination-buttons">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    <ChevronsLeft size={18} />
                  </button>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConstCenter;
