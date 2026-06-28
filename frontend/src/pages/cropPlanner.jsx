// CropPlanner.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCrops } from "../context/CropContext";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Package,
  IndianRupee,
  LayoutDashboard,
  Sprout,
} from "lucide-react";

const emptyCrop = {
  name: "",
  quantity: "",
  unit: "kg",
  location: "",
  price: "",
  season: "Rabi",
  status: "Planned",
  notes: "",
};

export default function CropPlanner() {
  const navigate = useNavigate();
  
  const { crops, setCrops } = useCrops();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCrop);

  const [deleteCrop, setDeleteCrop] = useState(null);

  const filtered = useMemo(() => {
    let list = [...crops];

    list = list.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (locationFilter)
      list = list.filter((c) => c.location === locationFilter);

    if (seasonFilter)
      list = list.filter((c) => c.season === seasonFilter);

    list.sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "quantity") return b.quantity - a.quantity;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [crops, search, locationFilter, seasonFilter, sortBy]);

  const totalQuantity = crops.reduce((a, b) => a + b.quantity, 0);

  const estimatedValue = crops.reduce(
    (a, b) => a + b.quantity * b.price,
    0
  );

  const locations = [...new Set(crops.map((c) => c.location))];

  const saveCrop = () => {
    if (editing) {
      setCrops(
        crops.map((c) =>
          c.id === editing.id
            ? {
                ...editing,
                ...form,
                quantity: Number(form.quantity),
                price: Number(form.price),
              }
            : c
        )
      );
    } else {
      setCrops([
        ...crops,
        {
          id: Date.now(),
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price),
        },
      ]);
    }

    setEditing(null);
    setForm(emptyCrop);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout size={30} />
            <h1 className="text-2xl font-bold">CropSage</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-green-200">
              Dashboard
            </Link>
            <Link to="/crop-planner" className="font-semibold border-b-2 border-white">
              Crop Planner
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Crop Planner</h1>
            <p className="text-gray-500">
              Manage all your planned and growing crops.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => {
                setEditing(null);
                setForm(emptyCrop);
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              <Plus size={18} />
              Add Crop
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={<Package />}
            title="Total Crops"
            value={crops.length}
          />
          <StatCard
            icon={<Package />}
            title="Total Quantity"
            value={`${totalQuantity} kg`}
          />
          <StatCard
            icon={<IndianRupee />}
            title="Estimated Value"
            value={`₹${estimatedValue.toLocaleString()}`}
          />
          <StatCard
            icon={<MapPin />}
            title="Locations"
            value={locations.length}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 mb-6 flex flex-wrap gap-4">
          <div className="flex items-center border rounded-lg px-3 flex-1">
            <Search size={18} />
            <input
              placeholder="Search Crop..."
              className="p-2 outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Location</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setSeasonFilter(e.target.value)}
          >
            <option value="">Season</option>
            <option>Rabi</option>
            <option>Kharif</option>
            <option>Zaid</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">Crop</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Market Price</th>
                <th>Season</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crop) => (
                <tr key={crop.id} className="border-b">
                  <td className="p-3">{crop.name}</td>
                  <td>
                    {crop.quantity} {crop.unit}
                  </td>
                  <td>{crop.location}</td>
                  <td>₹{crop.price}/kg</td>
                  <td>{crop.season}</td>
                  <td>{crop.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditing(crop);
                        setForm(crop);
                        setShowModal(true);
                      }}
                      className="mr-3 text-blue-600"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteCrop(crop)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[500px]">
              <h2 className="text-2xl font-bold mb-5">
                {editing ? "Edit Crop" : "Add Crop"}
              </h2>

              <div className="space-y-4">
                <input
                  placeholder="Crop Name"
                  className="border w-full p-2 rounded"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  placeholder="Quantity"
                  type="number"
                  className="border w-full p-2 rounded"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                />

                <select
                  className="border w-full p-2 rounded"
                  value={form.unit}
                  onChange={(e) =>
                    setForm({ ...form, unit: e.target.value })
                  }
                >
                  <option>kg</option>
                  <option>quintal</option>
                  <option>ton</option>
                </select>

                <input
                  placeholder="Location"
                  className="border w-full p-2 rounded"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />

                <input
                  placeholder="Market Price"
                  type="number"
                  className="border w-full p-2 rounded"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />

                <select
                  className="border w-full p-2 rounded"
                  value={form.season}
                  onChange={(e) =>
                    setForm({ ...form, season: e.target.value })
                  }
                >
                  <option>Rabi</option>
                  <option>Kharif</option>
                  <option>Zaid</option>
                </select>

                <select
                  className="border w-full p-2 rounded"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>Planned</option>
                  <option>Growing</option>
                  <option>Harvested</option>
                </select>

                <textarea
                  placeholder="Notes"
                  className="border w-full p-2 rounded"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border px-5 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCrop}
                    className="bg-green-600 text-white px-5 py-2 rounded"
                  >
                    {editing ? "Update" : "Save Crop"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Dialog */}
        {deleteCrop && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[400px]">
              <h2 className="text-xl font-bold">
                Delete {deleteCrop.name}?
              </h2>
              <p className="text-gray-500 mt-3">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setDeleteCrop(null)}
                  className="border px-5 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setCrops(
                      crops.filter((c) => c.id !== deleteCrop.id)
                    );
                    setDeleteCrop(null);
                  }}
                  className="bg-red-600 text-white px-5 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="text-green-600">{icon}</div>
    </div>
  );
}