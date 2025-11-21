"use client";
// components/Sidebar.jsx
import Link from "next/link";
import "./SideBar.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  FileText,
  Calculator,
  Tag,
  Key,
  LogOut,
} from "lucide-react";

const workspaceItems = [
  { href: "/home"  , label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/cost-center", label: "Cost Centers", icon: Calculator },
  { href: "/expense-type", label: "Expense Type", icon: Tag },
];

export default function SideBar() {
  const pathname = usePathname();

  // Initialize state from localStorage using lazy initializer
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarCollapsed");
      return savedState !== null ? JSON.parse(savedState) : false;
    }
    return false;
  });

  // Save collapsed state to localStorage and update body class
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
      document.body.classList.toggle("sidebar-collapsed", isCollapsed);
    }
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      {/* Header with Logo and Collapse Button */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="brand">
            <div className="logo-icon">📄</div>
            <div className="brand-text">
              <span className="brand-invoice">Invoice</span>
              <span className="brand-ai">AI</span>
            </div>
          </div>
        )}
        <button
          className="collapse-btn"
          onClick={toggleCollapse}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? "⟩" : "⟨"}
        </button>
      </div>

      {/* WORKSPACE Section */}
      {!isCollapsed && (
        <div className="sidebar-section">
          <div className="section-title">WORKSPACE</div>
          <nav className="sidebar-nav">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Collapsed Navigation - Icons Only */}
      {isCollapsed && (
        <nav className="sidebar-nav-collapsed">
          {workspaceItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item-collapsed ${isActive ? "active" : ""}`}
                title={item.label}
              >
                <Icon className="nav-icon" />
              </Link>
            );
          })}
        </nav>
      )}

      {/* ADMINISTRATION Section */}
      {!isCollapsed && (
        <div className="sidebar-section">
          <div className="section-title">ADMINISTRATION</div>
          <button className="nav-item logout-item">
            <LogOut className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      )}

      {/* Collapsed Logout */}
      {isCollapsed && (
        <button
          className="nav-item-collapsed logout-item-collapsed"
          title="Logout"
        >
          <LogOut className="nav-icon" />
        </button>
      )}

      {/* User Profile Card */}
      {!isCollapsed && (
        <div className="user-card">
          <div className="user-avatar">TT</div>
          <div className="user-info">
            <div className="user-name">tareq true</div>
            <div className="user-email">tarek@gmail.com</div>
          </div>
        </div>
      )}
    </div>
  );
}
