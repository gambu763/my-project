import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
    };

    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return null;
            }

            const response = await fetch(
                "http://localhost:5000/applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            setApplications(data);

        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/applications/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchApplications();

        } catch (error) {
            console.error(error);
        }
    };

    const downloadPdf = async (id) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/pdf/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        window.open(url);
    };

    // Returns an inline shadow style based on status, not a background highlight.
    // Using inline style (rather than a dynamic Tailwind class) so it always renders,
    // regardless of whether Tailwind's build step can statically see the class name.
    const getStatusShadowStyle = (status) => {
        if (status === "Approved") {
            return { boxShadow: "inset 0 0 0 2px #16a34a" };
        }
        if (status === "Rejected") {
            return { boxShadow: "inset 0 0 0 2px #dc2626" };
        }
        return {};
    };

    return (
        <div className="min-h-screen bg-[#FAF3E8] px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black pb-4 mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-black">Admin Dashboard</h2>
                    <button
                        onClick={handleLogout}
                        className="border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition-colors self-start sm:self-auto"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                        <div key={app._id} className="border border-black bg-[#FAF3E8] p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start gap-2">
                                <span className="font-semibold text-black text-lg">{app.name}</span>
                                <select
                                    value={app.status || "Pending"}
                                    onChange={(e) => updateStatus(app._id, e.target.value)}
                                    style={getStatusShadowStyle(app.status)}
                                    className="border border-black px-2 py-1 text-black bg-white focus:outline-none focus:ring-1 focus:ring-black"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div className="text-sm text-black grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                                <span className="font-medium">Email:</span>
                                <span className="break-words">{app.email}</span>

                                <span className="font-medium">Phone:</span>
                                <span>{app.phone}</span>

                                <span className="font-medium">Type:</span>
                                <span>{app.applicationType}</span>

                                <span className="font-medium">Zoning:</span>
                                <span>{app.currentZoning}</span>

                                <span className="font-medium">Property:</span>
                                <span className="break-words">{app.propertyDescription}</span>

                                <span className="font-medium">Address:</span>
                                <span className="break-words">{app.streetAddress}</span>
                            </div>

                            <div className="pt-1">
                                <button
                                    onClick={() => downloadPdf(app._id)}
                                    className="border border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
