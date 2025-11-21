"use client";

import React, { useState, useRef } from "react";
import { Upload, ArrowRight, Plus } from "lucide-react";
import { uploadInvoice } from "@/services/invoiceService";
import "./home.css";

function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

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
    <div className="upload-invoice-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <h1 className="page-title">Upload Invoice</h1>
          <p className="page-subtitle">
            Upload your invoice files for automatic AI-powered processing and
            data extraction
          </p>
        </div>
        <button className="view-invoices-btn">
          View Invoices
          <ArrowRight className="arrow-icon" size={16} />
        </button>
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
                <Upload className="upload-icon" size={32} />
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
                <Upload className="upload-icon" size={32} />
              </div>

              {/* Heading */}
              <h2 className="upload-heading">Upload Invoice Files</h2>

              {/* Description */}
              <p className="upload-description">
                Drag and drop your invoice files here, or click to browse.
                Supports PDF, JPG, PNG and other document formats.
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
                <div className="upload-button">
                  <Plus className="plus-icon" size={20} />
                  Upload Invoice
                </div>
              </label>

              {/* File Info */}
              <p className="file-info">
                Maximum file size: 10MB • Supported formats: PDF, JPG, PNG, JPEG
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
