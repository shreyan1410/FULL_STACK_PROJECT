
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  LayoutDashboard,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  Users,
  Wrench,
  RefreshCw,
  Filter,
  ShieldCheck,
  MapPin,
  CalendarDays,
  BarChart3,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("campusfixToken");

  const user = JSON.parse(
    localStorage.getItem("campusfixUser") || "{}"
  );

  // FETCH ALL COMPLAINTS
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Admin complaint loading error:", error);
      toast.error("Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaints();
  }, []);

  // UPDATE COMPLAINT
  const updateComplaint = async (id, updates) => {
    try {
      setUpdatingId(id);

      await axios.put(`/api/complaints/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Complaint updated successfully!");

      await fetchComplaints();
    } catch (error) {
      console.error("Complaint update error:", error);
      toast.error("Unable to update complaint");
    } finally {
      setUpdatingId(null);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("campusfixToken");
    localStorage.removeItem("campusfixUser");

    toast.success("Logged out successfully");
    navigate("/login");
  };

  // STATISTICS
  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
      accent: "border-blue-500",
    },
    {
      title: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      accent: "border-orange-500",
    },
    {
      title: "In Progress",
      value: complaints.filter((c) => c.status === "In Progress").length,
      icon: Wrench,
      color: "bg-purple-50 text-purple-600",
      accent: "border-purple-500",
    },
    {
      title: "Resolved",
      value: complaints.filter((c) => c.status === "Resolved").length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
      accent: "border-green-500",
    },
  ];

  const categories = [
    "All",
    "Electrical",
    "Plumbing",
    "Cleaning",
    "Wi-Fi",
    "Classroom",
    "Hostel",
    "Other",
  ];

  // FILTER COMPLAINTS
  const filteredComplaints = complaints.filter((complaint) => {
    const searchText = `
      ${complaint.title || ""}
      ${complaint.category || ""}
      ${complaint.location || ""}
      ${complaint.reportedBy || ""}
    `.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesCategory =
      categoryFilter === "All" ||
      complaint.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const statusStyle = {
    Pending: "bg-orange-50 text-orange-700",
    Assigned: "bg-blue-50 text-blue-700",
    "In Progress": "bg-purple-50 text-purple-700",
    Resolved: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
  };

  const priorityStyle = {
    Low: "bg-slate-100 text-slate-600",
    Medium: "bg-blue-50 text-blue-700",
    High: "bg-orange-50 text-orange-700",
    Critical: "bg-red-50 text-red-700",
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

        {/* SIDEBAR LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-7">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2.5">
              <Building2 size={23} />
            </div>

            <span className="text-xl font-extrabold">
              Campus<span className="text-blue-400">Fix.</span>
            </span>
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>

        </div>

        {/* SIDEBAR MENU */}
        <div className="px-5 py-8">

          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Administration
          </p>

          <div className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3">
            <LayoutDashboard size={19} />
            <span className="text-sm font-semibold">Overview</span>
          </div>

          <a
            href="#all-complaints"
            className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <ClipboardList size={19} />
            All Complaints
          </a>

          <div className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400">
            <Users size={19} />
            Staff Management
            <span className="ml-auto text-[10px]">
              Coming next
            </span>
          </div>

        </div>

        {/* SIDEBAR PROFILE */}
        <div className="mt-auto border-t border-white/10 p-5">

          <div className="mb-5 flex items-center gap-3 px-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.name || "Administrator"}
              </p>

              <p className="text-xs text-slate-400">
                Admin Workspace
              </p>
            </div>

          </div>

          <button
            type="button"
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

        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white px-5 md:px-9">

          <div className="flex items-center gap-4">

            <button
              type="button"
              className="text-slate-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm text-slate-400">
                Administration Workspace
              </p>

              <h2 className="font-bold text-slate-900">
                Admin Dashboard
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={fetchComplaints}
              disabled={loading}
              className="rounded-xl bg-slate-50 p-3 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Refresh complaints"
            >
              <RefreshCw
                size={19}
                className={loading ? "animate-spin" : ""}
              />
            </button>

            <button
              type="button"
              className="relative rounded-xl bg-slate-50 p-3 text-slate-500"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="mx-auto max-w-7xl px-5 py-9 md:px-9">

          {/* WELCOME BANNER */}
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#101827] to-[#1E40AF] p-8 text-white md:flex-row md:items-center">

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
                <ShieldCheck size={17} />
                Administrator Control Center
              </div>

              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Welcome, {user.name?.split(" ")[0] || "Admin"}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                Monitor campus complaints, coordinate maintenance
                activities and ensure every reported issue receives
                attention.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">

              <div className="rounded-xl bg-white/15 p-3">
                <BarChart3 size={25} />
              </div>

              <div>
                <p className="text-xs text-blue-200">
                  Total submissions
                </p>

                <p className="text-2xl font-extrabold">
                  {complaints.length}
                </p>
              </div>

            </div>
          </div>

          {/* STATISTICS */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`rounded-2xl border border-slate-100 border-l-4 ${stat.accent} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
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

          {/* QUICK INSIGHTS */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-red-100 bg-white p-5">
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <AlertCircle size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Critical priority
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    {complaints.filter((c) => c.priority === "Critical").length}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Users size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Assigned complaints
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    {complaints.filter((c) => c.assignedTo).length}
                  </p>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-5">
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Resolution rate
                  </p>

                  <p className="text-xl font-extrabold text-slate-900">
                    {complaints.length
                      ? Math.round(
                          (complaints.filter(
                            (c) => c.status === "Resolved"
                          ).length / complaints.length) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* COMPLAINT MANAGEMENT */}
          <section
            id="all-complaints"
            className="mt-10 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >

            <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-6 lg:flex-row lg:items-center">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Complaint Management
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Review and manage all reported campus issues.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search complaints..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={17}
                  />

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-8 text-sm outline-none focus:border-blue-500 sm:w-44"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "All"
                          ? "All Categories"
                          : category}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* COMPLAINT TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px] text-left">

                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Complaint</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Reported By</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Assign Staff</th>
                    <th className="px-6 py-4">Update Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-14 text-center text-slate-400"
                      >
                        Loading campus complaints...
                      </td>
                    </tr>
                  ) : filteredComplaints.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-16 text-center"
                      >

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <ClipboardList size={26} />
                        </div>

                        <h4 className="mt-4 font-bold text-slate-800">
                          No complaints found
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                          New student submissions will appear here.
                        </p>

                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="max-w-[230px] px-6 py-5">
                          <p className="truncate font-semibold text-slate-800">
                            {complaint.title}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin size={12} />
                            {complaint.location}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {complaint.category}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-2 text-xs font-bold ${
                              priorityStyle[complaint.priority] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {complaint.priority}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {complaint.reportedBy}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
                            <CalendarDays size={15} />
                            {complaint.createdAt
                              ? new Date(
                                  complaint.createdAt
                                ).toLocaleDateString()
                              : "—"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <input
                            key={`${complaint._id}-${complaint.assignedTo || ""}`}
                            defaultValue={complaint.assignedTo || ""}
                            placeholder="Staff name"
                            onBlur={(e) => {
                              const value = e.target.value.trim();

                              if (
                                value !== (complaint.assignedTo || "")
                              ) {
                                updateComplaint(complaint._id, {
                                  assignedTo: value,
                                  status: value
                                    ? "Assigned"
                                    : complaint.status,
                                });
                              }
                            }}
                            className="w-36 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-blue-500"
                          />
                        </td>

                        <td className="px-6 py-5">
                          <select
                            value={complaint.status}
                            disabled={updatingId === complaint._id}
                            onChange={(e) =>
                              updateComplaint(complaint._id, {
                                status: e.target.value,
                              })
                            }
                            className={`rounded-lg border-0 px-3 py-2 text-xs font-bold outline-none ${
                              statusStyle[complaint.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>
              </table>

            </div>

            {/* TABLE FOOTER */}
            <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-400 sm:flex-row">
              <span>
                Showing {filteredComplaints.length} of {complaints.length} complaints
              </span>

              <span>CampusFix Administration</span>
            </div>

          </section>

          {/* FOOTER */}
          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 CampusFix. Administrative Management System.
          </footer>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
