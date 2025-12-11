"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  FileText,
  DollarSign,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Building2,
  Sparkles,
} from "lucide-react";
import "./Navbar.css";

const mainNavItems = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Invoices", path: "/invoices", icon: FileText },
  { name: "Cost Center", path: "/cost-center", icon: Building2 },
  { name: "Expense Type", path: "/expense-type", icon: DollarSign },
];

const authNavItems = [
  { name: "Login", path: "/login", icon: LogIn },
  { name: "Sign Up", path: "/sign-up", icon: UserPlus },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-wrapper">
          <div className="navbar-container">
            {/* Logo/Brand */}
            <Link href="/home" className="navbar-brand">
              <div className="brand-icon">
                <Sparkles size={22} />
              </div>
              <span className="brand-text">Invoice AI</span>
            </Link>

            {/* Desktop Navigation - Main Links */}
            <div className="navbar-links">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Navigation - Auth Links */}
            <div className="navbar-auth">
              {authNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`auth-link ${isActive ? "active" : ""}`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      >
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Link
              href="/home"
              className="mobile-brand"
              onClick={closeMobileMenu}
            >
              <div className="brand-icon">
                <Sparkles size={20} />
              </div>
              <span>Invoice AI</span>
            </Link>
            <button className="mobile-close-btn" onClick={closeMobileMenu}>
              <X size={20} />
            </button>
          </div>

          <div className="mobile-menu-content">
            <div className="mobile-section">
              <div className="mobile-section-title">Navigation</div>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`mobile-link ${isActive ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Account</div>
              {authNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`mobile-link ${isActive ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
