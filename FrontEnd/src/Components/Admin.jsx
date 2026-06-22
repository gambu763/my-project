import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
    const [applications, setApplications] = useState([]);

    const fetchApplications = () => {
        fetch('http://localhost:5000/applications')
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.error('Error fetching applications:', error));
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/applications/${id}/status`,
                { status }
            );
            fetchApplications();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
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
                                <a
                                    href={`http://localhost:5000/pdf/${app._id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Download PDF
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}