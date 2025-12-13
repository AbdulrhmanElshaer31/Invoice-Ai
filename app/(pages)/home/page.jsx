"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  Zap,
  Clock,
  FileText,
  BarChart3,
  History,
  ArrowRight,
} from "lucide-react";
import { uploadInvoice } from "@/services/invoiceService";
import "./home.css";

function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Sample data for recently uploaded invoices
  const recentInvoices = [
    {
      id: 1,
      fileName: "Invoice_2024_001.pdf",
      vendor: "Acme Corp",
      amount: "$1,234.56",
      status: "Paid",
      date: "2024-12-08",
    },
    {
      id: 2,
      fileName: "Invoice_2024_002.pdf",
      vendor: "TechSupply Inc",
      amount: "$892.00",
      status: "Pending",
      date: "2024-12-07",
    },
    {
      id: 3,
      fileName: "Invoice_2024_003.pdf",
      vendor: "Office Pro",
      amount: "$2,145.80",
      status: "Paid",
      date: "2024-12-06",
    },
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file) => {
    // Validate file type
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    if (!validTypes.includes(file.type)) {
      setUploadStatus({
        type: "error",
        message: "Invalid file type. Please upload PDF, JPG, or PNG files.",
      });
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadStatus({
        type: "error",
        message: "File size exceeds 10MB limit.",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const result = await uploadInvoice(file);

      if (result.success) {
        setUploadStatus({
          type: "success",
          message: "Invoice uploaded successfully!",
        });
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setUploadStatus({
          type: "error",
          message:
            result.error || "Failed to upload invoice. Please try again.",
        });
      }
    } catch {
      setUploadStatus({
        type: "error",
        message: "An error occurred while uploading. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-content">
        <div className="upload-page-container">
          {/* Header Section */}
          <div className="upload-header">
            <h1 className="upload-main-title">Process Invoices with AI</h1>
            <p className="upload-subtitle">
              Upload your invoices and let artificial intelligence extract all
              the data in seconds
            </p>
          </div>

          {/* Three-Step Process Cards */}
          <div className="process-steps">
            <div className="process-card">
              <div className="process-icon-wrapper">
                <Upload className="process-icon" size={24} />
              </div>
              <h3 className="process-title">Upload Invoice</h3>
              <p className="process-description">
                Drag and drop or browse your PDF/image files
              </p>
            </div>

            <div className="process-card">
              <div className="process-icon-wrapper">
                <Zap className="process-icon" size={24} />
              </div>
              <h3 className="process-title">AI Processing</h3>
              <p className="process-description">
                Our AI extracts all relevant data automatically
              </p>
            </div>

            <div className="process-card">
              <div className="process-icon-wrapper">
                <Clock className="process-icon" size={24} />
              </div>
              <h3 className="process-title">Review & Save</h3>
              <p className="process-description">
                Verify extracted data and save to your system
              </p>
            </div>
          </div>

          {/* Upload Status Message */}
          {uploadStatus && (
            <div className={`upload-status ${uploadStatus.type}`}>
              {uploadStatus.message}
            </div>
          )}

          {/* Main Upload Area */}
          <div
            className={`upload-area ${isDragging ? "dragging" : ""} ${
              isUploading ? "uploading" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              {isUploading ? (
                <>
                  <div className="upload-icon-wrapper">
                    <Upload className="upload-icon" size={48} />
                  </div>
                  <h2 className="upload-heading">Uploading...</h2>
                  <p className="upload-description">
                    Please wait while we process your file.
                  </p>
                </>
              ) : (
                <>
                  {/* Upload Icon */}
                  <div className="upload-icon-wrapper">
                    <Upload className="upload-icon" size={48} />
                  </div>

                  {/* Heading */}
                  <h2 className="upload-heading">Drop invoices here</h2>

                  {/* Description */}
                  <p className="upload-description">
                    or click to browse from your computer
                  </p>

                  {/* Upload Button */}
                  <label className="upload-button-label">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="file-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                    />
                    <button className="browse-files-button" type="button">
                      Browse Files
                    </button>
                  </label>

                  {/* File Info */}
                  <p className="file-info">
                    Supports PDF, PNG, JPG (Max 10MB per file)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="nav-cards-section">
            <Link href="/invoices" className="nav-card nav-card-blue">
              <div className="nav-card-icon-wrapper nav-card-icon-blue">
                <FileText className="nav-card-icon" size={24} />
              </div>
              <div className="nav-card-content">
                <h3 className="nav-card-title">View All Invoices</h3>
                <p className="nav-card-description">Browse your invoice library</p>
              </div>
              <ArrowRight className="nav-card-arrow" size={20} />
            </Link>

            <Link href="/dashboard" className="nav-card nav-card-purple">
              <div className="nav-card-icon-wrapper nav-card-icon-purple">
                <BarChart3 className="nav-card-icon" size={24} />
              </div>
              <div className="nav-card-content">
                <h3 className="nav-card-title">Dashboard</h3>
                <p className="nav-card-description">View analytics and insights</p>
              </div>
              <ArrowRight className="nav-card-arrow" size={20} />
            </Link>

            <Link href="/invoices" className="nav-card nav-card-green">
              <div className="nav-card-icon-wrapper nav-card-icon-green">
                <History className="nav-card-icon" size={24} />
              </div>
              <div className="nav-card-content">
                <h3 className="nav-card-title">AI History</h3>
                <p className="nav-card-description">View extraction history</p>
              </div>
              <ArrowRight className="nav-card-arrow" size={20} />
            </Link>
          </div>

          {/* Recently Uploaded Section */}
          <div className="recent-uploads-section">
            <div className="recent-uploads-header">
              <h2 className="recent-uploads-title">Recently Uploaded</h2>
              <Link href="/invoices" className="view-all-link">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="recent-uploads-table-container">
              <table className="recent-uploads-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id} className="recent-uploads-row">
                      <td>
                        <div className="file-name-cell">
                          <FileText className="file-icon" size={18} />
                          <span>{invoice.fileName}</span>
                        </div>
                      </td>
                      <td>{invoice.vendor}</td>
                      <td>{invoice.amount}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            invoice.status === "Paid"
                              ? "status-paid"
                              : "status-pending"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td>{invoice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
