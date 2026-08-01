import react from 'react'
import { useState } from 'react';
import axios from "axios";

export default function Applications() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [applicationType, setApplicationType] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [currentZoning, setCurrentZoning] = useState("");
    const [sitePlan, setSitePlan] = useState(null);
    const [gisAerial, setGisAerial] = useState(null);
    const [supportingDocument, setSupportingDocument] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setMessage("");

        if (!isVerified) {
            setMessage("Please verify that the information provided is accurate before submitting");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("applicationType", applicationType);
            formData.append("currentZoning", currentZoning);
            formData.append("propertyDescription", propertyDescription);
            formData.append("streetAddress", streetAddress);

            formData.append("sitePlan", sitePlan);
            formData.append("gisAerial", gisAerial);
            formData.append("supportingDocument", supportingDocument);

            const response = await axios.post(
                "http://localhost:5000/applications",
                formData
            );

            console.log("Success:", response.data);
            setMessage("Application submitted successfully");
            setName("");
            setEmail("");
            setPhone("");
            setApplicationType("");
            setCurrentZoning("");
            setPropertyDescription("");
            setStreetAddress("");

            setSitePlan(null);
            setGisAerial(null);
            setSupportingDocument(null);
            setIsVerified(false);

        } catch (error) {
            console.error("Error:", error);
            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const inputClass =
        "w-full border border-black px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black bg-white";
    const labelClass = "block text-black font-medium mb-1";
    const fieldClass = "flex flex-col w-full";

    return (
        <div className="min-h-screen bg-[#FAF3E8] flex justify-center px-3 sm:px-4 py-6 sm:py-10">
            <div className="w-full max-w-xl border border-black bg-[#FAF3E8] p-5 sm:p-10 flex flex-col gap-6 sm:gap-10">

                <div className={fieldClass}>
                    <label className={labelClass}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className={inputClass}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={inputClass}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className={inputClass}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Type of Application</label>
                    <select
                        value={applicationType}
                        onChange={(e) => setApplicationType(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select an option</option>
                        <option value="Lease">Lease</option>
                        <option value="Sale">Sale</option>
                        <option value="Set Aside">Set Aside</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Current Zoning</label>
                    <select
                        value={currentZoning}
                        onChange={(e) => setCurrentZoning(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select Zoning</option>
                        <option value="Conservation">Conservation</option>
                        <option value="Residential">Residential</option>
                        <option value="Existing Road/Street">Existing Road/Street</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Community Facility">Community Facility</option>
                        <option value="Govt and Municipal">Govt and Municipal</option>
                        <option value="Public Open Space">Public Open Space</option>
                        <option value="DMOSS">DMOSS</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Property Description</label>
                    <input
                        type="text"
                        value={propertyDescription}
                        onChange={(e) => setPropertyDescription(e.target.value)}
                        placeholder="Property Description"
                        className={inputClass}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Street Address</label>
                    <textarea
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Enter full street address"
                        rows="4"
                        className={inputClass}
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Site Plan</label>
                    <input
                        type="file"
                        onChange={(e) => setSitePlan(e.target.files[0])}
                        className="w-full border border-black px-3 py-2 text-black bg-white file:mr-4 file:border file:border-black file:bg-white file:px-3 file:py-1 file:text-black"
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>GIS Aerial Picture</label>
                    <input
                        type="file"
                        onChange={(e) => setGisAerial(e.target.files[0])}
                        className="w-full border border-black px-3 py-2 text-black bg-white file:mr-4 file:border file:border-black file:bg-white file:px-3 file:py-1 file:text-black"
                    />
                </div>

                <div className={fieldClass}>
                    <label className={labelClass}>Supporting Document</label>
                    <input
                        type="file"
                        onChange={(e) => setSupportingDocument(e.target.files[0])}
                        className="w-full border border-black px-3 py-2 text-black bg-white file:mr-4 file:border file:border-black file:bg-white file:px-3 file:py-1 file:text-black"
                    />
                </div>

                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="verify"
                        checked={isVerified}
                        onChange={(e) => setIsVerified(e.target.checked)}
                        className="mt-1 h-4 w-4 border border-black accent-black"
                    />
                    <label htmlFor="verify" className="text-black">
                        I verify that the information provided in this application is accurate
                    </label>
                </div>

                {message && <p className="text-black">{message}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={!isVerified}
                    className={`w-full border border-black py-2 transition-colors ${
                        isVerified
                            ? "bg-black text-white hover:bg-white hover:text-black"
                            : "bg-white text-gray-400 border-gray-400 cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>

            </div>
        </div>
    )
}
