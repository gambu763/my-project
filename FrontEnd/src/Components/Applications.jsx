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
    const [supportingDocument, setSupportingDocument] =  useState(null);
      const [message, setMessage] = useState("");
   const handleSubmit = async () => {
    setMessage("");
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

  } catch (error) {
    console.error("Error:", error);
setMessage(
  error.response?.data?.message ||
  "Something went wrong"
);
  }
};

    return (
        <div>
            <label>Name</label>
             <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
        />
       
            <label>Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
        />
            <label>Phone Number</label>
        <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
        />
        
         <label>Type of Application</label>
  <br />
  <select
    value={applicationType}
    onChange={(e) => setApplicationType(e.target.value)}
  >
    <option value="">Select an option</option>
    <option value="Lease">Lease</option>
    <option value="Sale">Sale</option>
    <option value="Set Aside">Set Aside</option>
    <option value="Other">Other</option>
  </select>
    <br />
    
    <label>Current Zoning</label>
  <br />
  <select
    value={currentZoning}
    onChange={(e) => setCurrentZoning(e.target.value)}
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
    <br />
    
    <label>Property Description</label>
<br />
<input
  type="text"
  value={propertyDescription}
  onChange={(e) => setPropertyDescription(e.target.value)}
  placeholder="Property Description"
/>

<br /><br />

<label>Street Address</label>
<br />
<textarea
  value={streetAddress}
  onChange={(e) => setStreetAddress(e.target.value)}
  placeholder="Enter full street address"
  rows="4"
  cols="50"
/>
<label>Site Plan</label>

<input
  type="file"
  onChange={(e) =>
    setSitePlan(e.target.files[0])
  }
/>

<br />

<label>GIS Aerial Picture</label>

<input
  type="file"
  onChange={(e) =>
    setGisAerial(e.target.files[0])
  }
/>

<br />

<label>Supporting Document</label>

<input
  type="file"
  onChange={(e) =>
    setSupportingDocument(e.target.files[0])
  }
/>
{message && <p>{message}</p>}
<button onClick={handleSubmit}>
  Submit
</button>


        



        </div>
       
        
            

        
    )

  }