
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  GraduationCap
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/auth/register",
        formData
      );

      toast.success("Account created successfully!");

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">

      {/* LEFT PANEL */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#101827] p-14 text-white lg:flex">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <Building2 size={25} />
          </div>

          <span className="text-2xl font-extrabold">
            Campus<span className="text-blue-400">Fix.</span>
          </span>
        </Link>

        <div className="relative max-w-lg">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-200">
            <Sparkles size={16} />
            Join the campus revolution
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Better campuses
            <span className="text-blue-400"> begin together.</span>
          </h1>

          <p className="mt-7 text-lg leading-8 text-slate-400">
            Create your CampusFix account and become part of
            a connected community that makes campus life
            smarter, easier and better.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/10 p-3">
                <GraduationCap className="text-blue-400" size={23} />
              </div>
              <div>
                <p className="font-semibold">Student-focused platform</p>
                <p className="text-sm text-slate-400">
                  Make your voice heard.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/10 p-3">
                <ShieldCheck className="text-blue-400" size={23} />
              </div>
              <div>
                <p className="font-semibold">Secure account access</p>
                <p className="text-sm text-slate-400">
                  Your account, your campus.
                </p>
              </div>
            </div>

          </div>
        </div>

        <p className="relative text-sm text-slate-500">
          © 2026 CampusFix. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <Link to="/" className="mb-10 flex items-center gap-2 lg:hidden">
            <Building2 className="text-blue-600" size={28} />
            <span className="text-xl font-extrabold">
              Campus<span className="text-blue-600">Fix.</span>
            </span>
          </Link>

          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Get Started
            </span>

            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
              Create your account
            </h2>

            <p className="mt-3 text-slate-500">
              Join CampusFix and help build a better campus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Mobile Number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence and Data Science">
                  Artificial Intelligence and Data Science
                </option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="Electrical and Electronics">
                  Electrical and Electronics
                </option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  minLength="8"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={19} />}
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>

          <p className="mt-5 text-center text-xs text-slate-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
