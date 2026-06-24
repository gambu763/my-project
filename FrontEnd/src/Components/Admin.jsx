import { useEffect, useState } from "react";
import axios from "axios";


export default function Admin() {
    const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href =
    "/admin/login";
};
   
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
  try {
    const token =
      localStorage.getItem("token");

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
    console.error(
      "Error fetching applications:",
      error
    );
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

    return (
        <div>
            <button onClick={handleLogout}>
                     Logout
            </button>
           
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Application Type</th>
                        <th>Current Zoning</th>
                        <th>Property Description</th>
                        <th>Street Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app._id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.applicationType}</td>
                            <td>{app.currentZoning}</td>
                            <td>{app.propertyDescription}</td>
                            <td>{app.streetAddress}</td>
                            <td>
                                <select
                                    value={app.status || "Pending"}
                                    onChange={(e) => updateStatus(app._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                            <td>
                                <td>
    <button 
                                      onClick={() => downloadPdf(app._id)}
                                 >
                                    Download PDF
                                 </button>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}