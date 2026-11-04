
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
  Wrench,
  MapPin,
  CalendarDays,
  RefreshCw,
  ShieldCheck,
  User,
} from "lucide-react";

function StaffDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("campusfixUser") || "{}"
  );

  const token = localStorage.getItem("campusfixToken");

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // FETCH ASSIGNED COMPLAINTS
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allComplaints = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      const assignedComplaints = allComplaints.filter(
        (complaint) =>
          (complaint.assignedTo || "").trim().toLowerCase() ===
          (user.name || "").trim().toLowerCase()
      );

      setComplaints(assignedComplaints);
    } catch (error) {
      console.error("Staff complaints error:", error);
      toast.error("Unable to load assigned complaints");
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

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await axios.put(
        `/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint status updated!");

      await fetchComplaints();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Unable to update complaint status");
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
      title: "Assigned Tasks",
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
      title: "Completed",
      value: complaints.filter((c) => c.status === "Resolved").length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  // SEARCH
  const filteredComplaints = complaints.filter((complaint) =>
    `${complaint.title || ""} ${complaint.category || ""} ${complaint.location || ""}`
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

        <div className="px-5 py-8">
          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Staff Workspace
          </p>

          <div className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3">
            <LayoutDashboard size={19} />
            <span className="text-sm font-semibold">My Dashboard</span>
          </div>

          <a
            href="#my-tasks"
            className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <ClipboardList size={19} />
            My Assigned Tasks
          </a>
        </div>

        {/* PROFILE */}
        <div className="mt-auto border-t border-white/10 p-5">
          <div className="mb-5 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.name || "Staff Member"}
              </p>
              <p className="text-xs text-slate-400">
                Maintenance Staff
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
                Staff Workspace
              </p>
              <h2 className="font-bold text-slate-900">
                My Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchComplaints}
              disabled={loading}
              className="rounded-xl bg-slate-50 p-3 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
              title="Refresh tasks"
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
              {user.name?.charAt(0)?.toUpperCase() || "S"}
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
                Maintenance Operations
              </div>

              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Welcome, {user.name?.split(" ")[0] || "Staff"}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
                Manage your assigned campus issues, update work progress
                and help maintain a better campus environment.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
              <div className="rounded-xl bg-white/15 p-3">
                <Wrench size={25} />
              </div>

              <div>
                <p className="text-xs text-blue-200">
                  My assigned tasks
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

          {/* TASK MANAGEMENT */}
          <section
            id="my-tasks"
            className="mt-10 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >

            <div className="flex flex-col justify-between gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  My Assigned Tasks
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  View your assigned complaints and update their progress.
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
                  placeholder="Search tasks..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 md:w-64"
                />
              </div>
            </div>

            {/* TASK TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">

                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Issue</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-14 text-center text-slate-400"
                      >
                        Loading assigned tasks...
                      </td>
                    </tr>
                  ) : filteredComplaints.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <ClipboardList size={26} />
                        </div>

                        <h4 className="mt-4 font-bold text-slate-800">
                          No assigned tasks found
                        </h4>

                        <p className="mt-2 text-sm text-slate-400">
                          Tasks assigned to your account will appear here.
                        </p>
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
                            {complaint.description}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {complaint.category}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          <span className="flex items-center gap-2">
                            <MapPin size={15} className="text-slate-400" />
                            {complaint.location}
                          </span>
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
                          <select
                            value={complaint.status}
                            disabled={updatingId === complaint._id}
                            onChange={(e) =>
                              updateStatus(
                                complaint._id,
                                e.target.value
                              )
                            }
                            className={`rounded-lg border-0 px-3 py-2 text-xs font-bold outline-none ${
                              statusStyle[complaint.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
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

            <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
              Showing {filteredComplaints.length} of {complaints.length} assigned tasks
            </div>

          </section>

          {/* INFORMATION CARDS */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-3 text-blue-700">
                <AlertCircle size={21} />
                <h3 className="font-bold">Work priorities</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Review complaint priority levels and address critical
                maintenance issues as quickly as possible.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle2 size={21} />
                <h3 className="font-bold">Update work progress</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Keep the administration and students informed by
                updating complaint statuses as work progresses.
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 CampusFix. Staff Operations Workspace.
          </footer>

        </div>
      </main>
    </div>
  );
}

export default StaffDashboard;
