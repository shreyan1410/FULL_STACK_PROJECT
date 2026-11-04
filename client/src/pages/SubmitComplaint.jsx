
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Building2,
  ArrowLeft,
  ClipboardList,
  MapPin,
  Tag,
  AlertCircle,
  Send,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck
} from "lucide-react";

function SubmitComplaint() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusfixUser") || "{}"
  );

  const token = localStorage.getItem("campusfixToken");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "Medium"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to submit a complaint");
      navigate("/login");
      return;
    }

    if (!user.id) {
      toast.error("User session not found. Please login again.");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.location.trim()
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/complaints",
        {
          ...formData,
          reportedBy: user.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success("Complaint submitted successfully!");

        setFormData({
          title: "",
          description: "",
          category: "",
          location: "",
          priority: "Medium"
        });

        setTimeout(() => {
          navigate("/student-dashboard");
        }, 1000);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to submit complaint. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* NAVIGATION */}
      <nav className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white">
              <Building2 size={24} />
            </div>

            <span className="text-xl font-extrabold text-slate-900">
              Campus<span className="text-blue-600">Fix.</span>
            </span>
          </Link>

          <Link
            to="/student-dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>
      </nav>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8">

        {/* HEADER */}
        <div className="mb-10">

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
            <ClipboardList size={15} />
            CAMPUS ISSUE REPORTING
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Report a Campus Issue
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-500">
            Help us improve your campus experience.
            Provide the necessary details and our
            administration team will review your complaint.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* FORM */}
          <section className="lg:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-9"
            >

              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <FileText size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Complaint Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Fill in the information below.
                  </p>
                </div>
              </div>

              {/* TITLE */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Complaint Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Projector not working in classroom"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {formData.title.length}/100
                </p>

              </div>

              {/* DESCRIPTION */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Detailed Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the problem, when it occurred and how it affects you..."
                  rows={5}
                  maxLength={1000}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {formData.description.length}/1000
                </p>

              </div>

              {/* CATEGORY */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Issue Category *
                </label>

                <div className="relative">

                  <Tag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-12 py-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Select an issue category</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Wi-Fi">Wi-Fi and Network</option>
                    <option value="Classroom">Classroom Facilities</option>
                    <option value="Hostel">Hostel Maintenance</option>
                    <option value="Other">Other</option>
                  </select>

                </div>

              </div>

              {/* LOCATION */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Issue Location *
                </label>

                <div className="relative">

                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Example: Block A, Room 204"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-12 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />

                </div>

              </div>

              {/* PRIORITY */}
              <div className="mb-8">

                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Issue Priority *
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {[
                    {
                      value: "Low",
                      color: "border-green-200 bg-green-50 text-green-700"
                    },
                    {
                      value: "Medium",
                      color: "border-blue-200 bg-blue-50 text-blue-700"
                    },
                    {
                      value: "High",
                      color: "border-orange-200 bg-orange-50 text-orange-700"
                    },
                    {
                      value: "Critical",
                      color: "border-red-200 bg-red-50 text-red-700"
                    }
                  ].map((priority) => (

                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        priority: priority.value
                      })}
                      className={`rounded-xl border-2 px-3 py-4 text-sm font-bold transition ${
                        formData.priority === priority.value
                          ? priority.color + " border-current shadow-sm"
                          : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {priority.value}

                      {formData.priority === priority.value && (
                        <CheckCircle2
                          size={15}
                          className="mx-auto mt-2"
                        />
                      )}

                    </button>

                  ))}

                </div>

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  "Submitting Complaint..."
                ) : (
                  <>
                    <Send size={19} />
                    Submit Complaint
                  </>
                )}

              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                By submitting, you confirm that the information provided is accurate.
              </p>

            </form>

          </section>

          {/* INFORMATION SIDEBAR */}
          <aside className="space-y-5">

            <div className="rounded-3xl bg-[#101827] p-7 text-white">

              <div className="rounded-xl bg-blue-600 p-3 inline-flex">
                <ShieldCheck size={24} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Your voice matters.
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Every complaint helps the institution identify
                problems and improve campus facilities.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

              <h3 className="font-bold text-slate-900">
                What happens next?
              </h3>

              <div className="mt-6 space-y-6">

                <div className="flex gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Send size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Complaint Submitted
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Your complaint is recorded in the system.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <Clock size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Administrative Review
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      The administration reviews your issue.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="rounded-xl bg-green-50 p-3 text-green-600">
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Resolution
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Track updates until the issue is resolved.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

              <div className="flex items-center gap-2 text-blue-700">
                <AlertCircle size={20} />
                <h3 className="font-bold">
                  Reporting guidelines
                </h3>
              </div>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• Provide accurate issue details.</li>
                <li>• Mention the exact campus location.</li>
                <li>• Select an appropriate priority.</li>
                <li>• Avoid submitting duplicate complaints.</li>
              </ul>

            </div>

          </aside>

        </div>

        <footer className="mt-12 border-t border-slate-200 py-7 text-center text-xs text-slate-400">
          © 2026 CampusFix. Smarter campuses. Better experiences.
        </footer>

      </main>

    </div>
  );
}

export default SubmitComplaint;
