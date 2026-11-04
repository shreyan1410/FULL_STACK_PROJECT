
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Building2,
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Bell,
  User,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
  Wrench,
  ShieldCheck,
} from "lucide-react";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusfixUser") || "{}"
  );

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("campusfixToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ownComplaints = response.data.data.filter(
        (item) => item.reportedBy === user.id
      );

      setComplaints(ownComplaints);
    } catch (error) {
      console.error("Complaint loading error:", error);
      toast.error("Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("campusfixToken");
    localStorage.removeItem("campusfixUser");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "In Progress",
      value: complaints.filter((c) => c.status === "In Progress").length,
      icon: Wrench,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Resolved",
      value: complaints.filter((c) => c.status === "Resolved").length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  const filteredComplaints = complaints.filter((c) =>
    `${c.title} ${c.category} ${c.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusStyle = {
    Pending: "bg-orange-50 text-orange-700",
    Assigned: "bg-blue-50 text-blue-700",
    "In Progress": "bg-purple-50 text-purple-700",
    Resolved: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#101827] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-7">

          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5">
              <Building2 size={23} />
            </div>

            <span className="text-xl font-extrabold">
              Campus<span className="text-blue-400">Fix.</span>
            </span>
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>

        </div>

        <div className="px-5 py-8">

          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Workspace
          </p>

          <div className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3">
            <LayoutDashboard size={19} />
            <span className="text-sm font-semibold">Dashboard</span>
          </div>

          <Link
            to="/submit-complaint"
            className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <PlusCircle size={19} />
            Report an Issue
          </Link>

          <a
            href="#complaints"
            className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <ClipboardList size={19} />
            My Complaints
          </a>

        </div>

        <div className="mt-auto border-t border-white/10 p-5">

          <div className="mb-5 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.name || "Student"}
              </p>
              <p className="text-xs text-slate-400">Student Account</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Sign Out
          </button>

        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-72">

        {/* TOP NAV */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white px-5 md:px-9">

          <div className="flex items-center gap-4">

            <button
              className="text-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm text-slate-400">
                Student Workspace
              </p>
              <h2 className="font-bold text-slate-900">
                Dashboard
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <button className="relative rounded-xl bg-slate-50 p-3 text-slate-500">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {user.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
            </div>

          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="mx-auto max-w-7xl px-5 py-9 md:px-9">

          {/* WELCOME */}
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#101827] to-[#1E40AF] p-8 text-white md:flex-row md:items-center">

            <div>
              <p className="text-sm font-medium text-blue-200">
                Welcome back!
              </p>

              <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Hello, {user.name?.split(" ")[0] || "Student"} 👋
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
                Stay updated with your campus complaints.
                Your voice helps make our campus better.
              </p>
            </div>

            <button
              onClick={() => navigate("/submit-complaint")}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-blue-700 shadow-lg transition hover:-translate-y-1"
            >
              <PlusCircle size={19} />
              Report an Issue
            </button>

          </div>

          {/* STATISTICS */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                        {stat.value}
                      </h3>
                    </div>

                    <div className={`rounded-xl p-4 ${stat.color}`}>
                      <Icon size={23} />
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

          {/* COMPLAINT TABLE */}
          <section
            id="complaints"
            className="mt-10 rounded-2xl border border-slate-100 bg-white shadow-sm"
          >

            <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  My Complaints
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Monitor the progress of your reported issues.
                </p>
              </div>

              <div className="relative">

                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search complaints..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 md:w-64"
                />

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left">

                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Complaint</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-400">
                        Loading complaints...
                      </td>
                    </tr>
                  ) : filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <ClipboardList size={26} />
                        </div>

                        <h4 className="mt-4 font-bold text-slate-800">
                          No complaints found
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                          Your reported issues will appear here.
                        </p>

                        <button
                          onClick={() => navigate("/submit-complaint")}
                          className="mt-5 font-semibold text-blue-600 hover:underline"
                        >
                          Submit your first complaint →
                        </button>

                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">
                          <p className="font-semibold text-slate-800">
                            {complaint.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {complaint.location}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {complaint.category}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">
                          {complaint.priority}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-2 text-xs font-bold ${
                              statusStyle[complaint.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {complaint.createdAt
                            ? new Date(complaint.createdAt).toLocaleDateString()
                            : "—"}
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* BOTTOM INFORMATION */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-3 text-blue-700">
                <AlertCircle size={21} />
                <h3 className="font-bold">Need assistance?</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Report any maintenance issue on campus.
                Our administration team will review and
                assign it to the appropriate department.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="flex items-center gap-3 text-green-700">
                <ShieldCheck size={21} />
                <h3 className="font-bold">Transparent resolution</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Track every submitted complaint and stay
                informed about its progress through CampusFix.
              </p>
            </div>

          </div>

          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 CampusFix. Smarter campuses. Better experiences.
          </footer>

        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
