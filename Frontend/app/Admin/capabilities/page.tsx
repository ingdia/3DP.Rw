"use client";

import { useState } from 'react';
import CapabilityForm from '../../components/admin/CapabilityForm';
import { dummyCapabilities, Capability } from '../../../lib/dummy-data';
import '../../styles/admin.css';

const CapabilitiesPage = () => {
  const [capabilities, setCapabilities] = useState<Capability[]>(dummyCapabilities);

  const handleAddCapability = (newCapability: Omit<Capability, 'id'>) => {
    setCapabilities([
      ...capabilities,
      { id: `cap${capabilities.length + 1}`, ...newCapability },
    ]);
  };

  return (
    <div>
    <h1>Manage Capabilities</h1>
    <CapabilityForm onSubmit={handleAddCapability} />
      <h2>Existing Capabilities</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Weighting (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {capabilities.map((cap) => (
            <tr key={cap.id}>
              <td>{cap.name}</td>
              <td>{cap.weighting}</td>
              <td>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapabilitiesPage;