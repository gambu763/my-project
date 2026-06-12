import {useEffect, useState} from "react";

export default function Admin() {
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/applications')
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.error('Error fetching applications:', error));
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.applicationType}</td>
                            <td>{app.currentZoning}</td>
                            <td>{app.propertyDescription}</td>
                            <td>{app.streetAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
