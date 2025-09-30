import React, { useEffect, useRef } from "react";
import { useApp } from "./AppProvider";
import Chart from "chart.js/auto";

export const Reports = () => {
  const { tickets, users } = useApp();

  // refs to canvases
  const deptChartRef = useRef(null);
  const resolutionChartRef = useRef(null);

  // store chart instances to destroy on cleanup
  const deptChartInstance = useRef(null);
  const resolutionChartInstance = useRef(null);

  useEffect(() => {
    if (!tickets || tickets.length === 0) return;

    // Department Chart
    if (deptChartInstance.current) {
      deptChartInstance.current.destroy();
    }

    if (deptChartRef.current) {
      const deptData = tickets.reduce((acc, ticket) => {
        acc[ticket.department] = (acc[ticket.department] || 0) + 1;
        return acc;
      }, {});

      deptChartInstance.current = new Chart(deptChartRef.current, {
        type: "pie",
        data: {
          labels: Object.keys(deptData),
          datasets: [
            {
              data: Object.values(deptData),
              backgroundColor: [
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Resolution Trend Chart
    if (resolutionChartInstance.current) {
      resolutionChartInstance.current.destroy();
    }

    if (resolutionChartRef.current) {
      // Get last 7 days as date strings in yyyy-mm-dd
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();

      // Filter tickets by createdDate for dailyCreated
      const dailyCreated = last7Days.map((date) =>
        tickets.filter((t) => t.createdDate.startsWith(date)).length
      );

      // For resolved, check if status is 'Resolved' and resolvedDate (if you have it) or createdDate
      // Assuming you have a resolvedDate field, otherwise fallback to createdDate and status
      const dailyResolved = last7Days.map((date) =>
        tickets.filter(
          (t) =>
            t.status === "Resolved" &&
            t.resolvedDate &&
            t.resolvedDate.startsWith(date)
        ).length
      );

      resolutionChartInstance.current = new Chart(resolutionChartRef.current, {
        type: "line",
        data: {
          labels: last7Days.map((date) =>
            new Date(date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Created",
              data: dailyCreated,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.1,
            },
            {
              label: "Resolved",
              data: dailyResolved,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      // cleanup charts on unmount
      if (deptChartInstance.current) {
        deptChartInstance.current.destroy();
      }
      if (resolutionChartInstance.current) {
        resolutionChartInstance.current.destroy();
      }
    };
  }, [tickets]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600">
          Comprehensive ticket system analytics and insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-orange-100 text-orange-600">
              <i className="fas fa-clock text-lg"></i>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-xl font-bold text-gray-900">2.5 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <i className="fas fa-check-circle text-lg"></i>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Resolution Rate</p>
              <p className="text-xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
              <i className="fas fa-exclamation-triangle text-lg"></i>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">SLA Breaches</p>
              <p className="text-xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600">
              <i className="fas fa-star text-lg"></i>
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Customer Satisfaction</p>
              <p className="text-xl font-bold text-gray-900">4.2/5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tickets by Department</h3>
          <div style={{ height: "300px" }}>
            <canvas ref={deptChartRef} id="departmentChart"></canvas>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ticket Trends (Last 7 Days)</h3>
          <div style={{ height: "300px" }}>
            <canvas ref={resolutionChartRef} id="resolutionChart"></canvas>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Team Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Resolved
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  In Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const userTickets = tickets.filter((t) => t.assignedTo === user.name);
                const resolved = userTickets.filter((t) => t.status === "Resolved").length;
                const inProgress = userTickets.filter((t) => t.status === "In Progress").length;
                const performance =
                  userTickets.length > 0
                    ? Math.round((resolved / userTickets.length) * 100)
                    : 0;

                return (
                  <tr key={user.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                      <div className="text-xs text-gray-500">{user.department}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {userTickets.length}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{resolved}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{inProgress}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              performance >= 80
                                ? "bg-green-500"
                                : performance >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${performance}%` }}
                          ></div>
                        </div>
                        <span>{performance}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
