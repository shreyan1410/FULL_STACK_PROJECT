
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Building2,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Eye,
  EyeOff,
  ArrowRight,
  LockKeyhole,
  Mail,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const roles = [
  {
    id: "Student",
    title: "Student",
    description: "Report and track campus issues",
    icon: GraduationCap,
    color: "blue",
    dashboard: "/student-dashboard",
  },
  {
    id: "Admin",
    title: "Admin",
    description: "Manage complaints and operations",
    icon: ShieldCheck,
    color: "violet",
    dashboard: "/admin-dashboard",
  },
  {
    id: "Staff",
    title: "Staff",
    description: "Manage assigned maintenance tasks",
    icon: Wrench,
    color: "emerald",
    dashboard: "/staff-dashboard",
  },
];

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const activeRole = roles.find(
    (role) => role.id === selectedRole
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        expectedRole: selectedRole,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid login response from server.");
      }

      if (user.role !== selectedRole) {
        toast.error(
          `This account is not registered as ${selectedRole}.`
        );
        return;
      }

      localStorage.setItem("campusfixToken", token);
      localStorage.setItem(
        "campusfixUser",
        JSON.stringify(user)
      );

      toast.success(`Welcome back, ${user.name}!`);

      navigate(activeRole.dashboard);
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleColors = (role, active) => {
    if (!active) {
      return "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50";
    }

    if (role === "Student") {
      return "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100";
    }

    if (role === "Admin") {
      return "border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-100";
    }

    return "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100";
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] lg:grid lg:grid-cols-2">

      {/* LEFT PANEL */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#101827] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* BRAND */}
        <Link to="/" className="relative flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <Building2 size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              Campus<span className="text-blue-400">Fix.</span>
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
              Smart Campus Solutions
            </p>
          </div>
        </Link>

        {/* MAIN CONTENT */}
        <div className="relative max-w-xl">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
            <CheckCircle2 size={16} />
            One platform. Three workspaces.
          </div>

          <h2 className="text-5xl font-extrabold leading-tight xl:text-6xl">
            A better campus
            <br />
            starts with
            <br />
            <span className="text-blue-400">your voice.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-slate-300">
            CampusFix connects students, administrators and
            maintenance teams through one intelligent campus
            issue reporting and resolution platform.
          </p>

          {/* ROLE CARDS */}
          <div className="mt-12 space-y-4">

            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
                >
                  <div className="rounded-xl bg-white/10 p-3 text-blue-300">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold">{role.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {role.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        <div className="relative border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 CampusFix. All rights reserved.
        </div>
      </section>

      {/* RIGHT LOGIN PANEL */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">

        <div className="w-full max-w-lg">

          {/* MOBILE BRAND */}
          <div className="mb-9 flex items-center justify-between lg:hidden">

            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-2.5 text-white">
                <Building2 size={22} />
              </div>

              <span className="text-xl font-extrabold text-slate-900">
                Campus<span className="text-blue-600">Fix.</span>
              </span>
            </Link>

            <Link
              to="/"
              className="text-sm font-semibold text-slate-500"
            >
              Home
            </Link>

          </div>

          {/* HEADING */}
          <div className="mb-8">

            <p className="text-sm font-bold uppercase tracking-[2px] text-blue-600">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Sign in to CampusFix
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Select your workspace and enter your account
              credentials to continue.
            </p>

          </div>

          {/* ROLE SELECTOR */}
          <div className="mb-8">

            <label className="mb-3 block text-sm font-bold text-slate-800">
              Choose your login type
            </label>

            <div className="grid grid-cols-3 gap-3">

              {roles.map((role) => {
                const Icon = role.icon;
                const active = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-2xl border p-3 transition duration-200 ${getRoleColors(
                      role.id,
                      active
                    )}`}
                  >

                    <Icon size={25} />

                    <span className="text-sm font-bold">
                      {role.title}
                    </span>

                    {active && (
                      <span className="absolute right-2 top-2">
                        <CheckCircle2 size={15} />
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

            <p className="mt-3 text-xs text-slate-500">
              Selected workspace:{" "}
              <span className="font-bold text-slate-800">
                {selectedRole}
              </span>
            </p>

          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    toast("Password reset will be available soon.")
                  }
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : `Sign in as ${selectedRole}`}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          {/* REGISTER */}
          {selectedRole === "Student" && (
            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have a student account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:underline"
              >
                Create an account
              </Link>
            </p>
          )}

          {selectedRole !== "Student" && (
            <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">

              <p className="text-xs leading-5 text-slate-500">
                {selectedRole} accounts are created by authorized
                CampusFix administrators. Public registration is
                available for students only.
              </p>

            </div>
          )}

          {/* BACK HOME */}
          <div className="mt-8 text-center">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to homepage
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Login;

