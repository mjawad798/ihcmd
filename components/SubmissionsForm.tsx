"use client";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const SubmissionsForm = () => {
  const [formData, setFormData] = useState({
    timestamp: "",
    name: "",
    fatherName: "",
    cnic: "",
    email: "",
    address: "",
    contactNumber: "",
    domicile: "",
    cityProvince: "",
    country: "",
    nationality: "",
    masterDegree: "",
    masterInstitute: "",
    lastDegree: "",
    lastInstitute: "",
    selectedProgram: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("access_key", "262634eb-b946-437c-8eb8-a9fdee9d5d92");

    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        form.append(key, value);
      }
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          className: "bg-gradient-to-tr from-blue-700 to-blue-900 text-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-110 hover:shadow-xl duration-300 ease-out",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
            border: "1px solid #34D399", // Adds a subtle border matching the theme
          },
        });
      

        // Reset form state
        setFormData({
          timestamp: "",
          name: "",
          fatherName: "",
          cnic: "",
          email: "",
          address: "",
          contactNumber: "",
          domicile: "",
          cityProvince: "",
          country: "",
          nationality: "",
          masterDegree: "",
          masterInstitute: "",
          lastDegree: "",
          lastInstitute: "",
          selectedProgram: "",
        });
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (error) {
      toast.error("There was an error submitting the form. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Online Admission Form
        </h2>

        {/* Timestamp */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Timestamp</label>
          <input
            type="datetime-local"
            name="timestamp"
            value={formData.timestamp || ""}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block font-semibold text-gray-700">CNIC #</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block font-semibold text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Domicile</label>
            <input
              type="text"
              name="domicile"
              value={formData.domicile || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <label className="block font-semibold text-gray-700">City/Province</label>
            <input
              type="text"
              name="cityProvince"
              value={formData.cityProvince || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Educational Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block font-semibold text-gray-700">Master Degree</label>
            <input
              type="text"
              name="masterDegree"
              value={formData.masterDegree || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Institute/University</label>
            <input
              type="text"
              name="masterInstitute"
              value={formData.masterInstitute || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block font-semibold text-gray-700">Last Degree</label>
            <input
              type="text"
              name="lastDegree"
              value={formData.lastDegree || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Institute/University</label>
            <input
              type="text"
              name="lastInstitute"
              value={formData.lastInstitute || ""}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>

        {/* Program Selection */}
        <div className="mt-4">
          <label className="block font-semibold text-gray-700">
            Course of Interest
          </label>
          <input
            type="text"
            name="selectedProgram"
            value={formData.selectedProgram || ""}
            onChange={handleInputChange}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter your course of interest"
            required
          />
        </div>


        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <Toaster />
    </div>
  );
};

export default SubmissionsForm;
