
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Building2,
  MessageSquare,
  Wrench,
  Activity,
  CircleCheck,
} from "lucide-react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

/* ==========================================
   HOMEPAGE
========================================== */

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ClipboardList,
      title: "Easy Issue Reporting",
      description:
        "Report campus problems in seconds with descriptions, categories and precise location details.",
    },
    {
      icon: Activity,
      title: "Real-Time Tracking",
      description:
        "Monitor complaints from submission to resolution with clear status updates.",
    },
    {
      icon: ShieldCheck,
      title: "Accountable Resolution",
      description:
        "Connect students, staff and administrators through a structured resolution workflow.",
    },
    {
      icon: MapPin,
      title: "Location-Based Reports",
      description:
        "Identify exactly where an issue occurs so the responsible team can respond efficiently.",
    },
    {
      icon: Clock,
      title: "Faster Response",
      description:
        "Prioritize urgent problems and reduce delays in campus maintenance and support.",
    },
    {
      icon: Users,
      title: "Connected Campus",
      description:
        "Build a collaborative campus environment where every concern gets attention.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Report an issue",
      description:
        "Submit a complaint with its category, location, priority and description.",
    },
    {
      number: "02",
      title: "Get it assigned",
      description:
        "The issue can be reviewed and directed to the responsible department.",
    },
    {
      number: "03",
      title: "Track progress",
      description:
        "Follow the progress of your complaint through every stage.",
    },
    {
      number: "04",
      title: "Get it resolved",
      description:
        "Receive a clear outcome when the reported issue is addressed.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">

          <Link to="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 sm:h-11 sm:w-11">
              <Building2 size={22} />
            </div>

            <div className="min-w-0">
              <h1 className="whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl">
                Campus<span className="text-blue-600">Fix</span>
              </h1>
              <p className="hidden text-[9px] font-semibold uppercase tracking-[1.5px] text-slate-500 sm:block">
                Smart Campus Solutions
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              How it works
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              About
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex h-11 min-w-[76px] items-center justify-center whitespace-nowrap rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:min-w-[94px] sm:px-5"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="inline-flex h-11 min-w-[112px] items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-blue-600 px-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:min-w-[130px] sm:px-5"
            >
              Get started
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              A smarter way to manage campus issues
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.13] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Every campus
              <br />
              deserves a{" "}
              <span className="text-blue-400">better way</span>
              <br />
              to solve problems.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              CampusFix brings campus issue reporting, complaint tracking and
              resolution management together in one intelligent platform.
              Speak up, stay informed and help build a better campus.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-1 hover:bg-blue-500 sm:px-7"
              >
                Report an issue
                <ArrowRight size={18} className="ml-2 inline" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-xl border border-slate-600 px-6 py-4 font-bold text-white transition hover:border-white hover:bg-white/10 sm:px-7"
              >
                Explore dashboard
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-cyan-400" />
                Simple reporting
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-cyan-400" />
                Transparent tracking
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-cyan-400" />
                Organized resolution
              </span>
            </div>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-blue-500/20 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white p-5 shadow-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    CampusFix overview
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Issue management
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <ClipboardList size={23} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Reported issues
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    128
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    Sample submissions
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Resolved
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    96
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Sample resolutions
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">
                    Recent activity
                  </h4>
                  <span className="text-xs font-semibold text-blue-600">
                    Preview
                  </span>
                </div>

                {[
                  {
                    icon: Wrench,
                    title: "Classroom maintenance",
                    location: "Block A · Room 204",
                    status: "In Progress",
                    color: "bg-amber-100 text-amber-700",
                  },
                  {
                    icon: MessageSquare,
                    title: "Wi-Fi connectivity",
                    location: "Library · Second floor",
                    status: "Pending",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    icon: CircleCheck,
                    title: "Water leakage",
                    location: "Hostel · Block C",
                    status: "Resolved",
                    color: "bg-emerald-100 text-emerald-700",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 border-t border-slate-100 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-800">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      <span className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-9 text-center md:grid-cols-4 lg:px-10">
          {[
            ["01", "Report"],
            ["02", "Assign"],
            ["03", "Track"],
            ["04", "Resolve"],
          ].map(([number, label]) => (
            <div key={number}>
              <p className="text-xs font-bold tracking-widest text-blue-600">
                STEP {number}
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-slate-50 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
              Everything in one place
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Designed for a better campus experience.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              From the moment an issue is reported to the moment it is
              resolved, CampusFix helps make the process organized and
              transparent.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
              A simple process
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From problem to solution.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              A clear workflow that keeps everyone informed and helps campus
              issues move towards resolution.
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="text-5xl font-black text-blue-100">
                  {step.number}
                </p>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT AND CTA */}
      <section id="about" className="bg-slate-950 px-6 py-20 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[3px] text-blue-400">
              CampusFix
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Better communication.
              <br />
              Better maintenance.
              <br />
              Better campus living.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Our goal is to simplify campus issue management through a
              centralized digital platform that connects students,
              administrators and maintenance teams.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="shrink-0 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Join CampusFix
            <ArrowRight className="ml-2 inline" size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 px-6 pb-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-slate-800 pt-8 sm:flex-row">
          <div>
            <p className="text-lg font-extrabold text-white">
              Campus<span className="text-blue-400">Fix</span>
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Smart Campus Issue Reporting and Resolution System
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <Link to="/login" className="transition hover:text-white">
              Login
            </Link>

            <Link to="/register" className="transition hover:text-white">
              Register
            </Link>

            <a href="#features" className="transition hover:text-white">
              Features
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-slate-600">
          © {new Date().getFullYear()} CampusFix. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ==========================================
   APPLICATION ROUTES
========================================== */

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#101827",
            color: "#ffffff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/submit-complaint"
          element={<SubmitComplaint />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/staff-dashboard"
          element={<StaffDashboard />}
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;


