import { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from "lucide-react";

const EMPTY_CROP = {
  cropName: "",
  quantity: "",
  unit: "kg",
  location: "",
  price: "",
  season: "Rabi",
  status: "Planned",
  notes: "",
};

const INPUT_CLASS = 
  "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400";

const LABEL_CLASS = 
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const convertToKg = (quantity, unit) => {
  const q = Number(quantity) || 0;
  switch (unit) {
    case "quintal": return q * 100;
    case "ton": return q * 1000;
    default: return q;
  }
};

export default function CropPlanner() {
  const navigate = useNavigate();
  const { crops, loading, createCrop, editCrop, removeCrop } = useCrops();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [showModal, setShowModal] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deleteCrop, setDeleteCrop] = useState(null);
  const [notification, setNotification] = useState(null);

  const triggerNotification = useCallback((message, type = "success") => {
    const id = Date.now();
    setNotification({ id, message, type });
    
    setTimeout(() => {
      setNotification((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const filteredCrops = useMemo(() => {
    let list = [...crops];

    if (search) {
      const lowerSearch = search.toLowerCase();
      list = list.filter(
        (c) => c?.cropName?.toLowerCase().includes(lowerSearch)
      );
    }

    if (locationFilter) list = list.filter((c) => c.location === locationFilter);
    if (seasonFilter) list = list.filter((c) => c.season === seasonFilter);

    list.sort((a, b) => {
      if (sortBy === "latest") return (b._id || "").localeCompare(a._id || "");
      if (sortBy === "price") return (b.price || 0) - (a.price || 0);
      if (sortBy === "quantity") return convertToKg(b.quantity, b.unit) - convertToKg(a.quantity, a.unit);
      return (a.cropName || "").localeCompare(b.cropName || "");
    });

    return list;
  }, [crops, search, locationFilter, seasonFilter, sortBy]);

  const stats = useMemo(() => {
    let totalQty = 0;
    let totalVal = 0;
    const uniqueLocs = new Set();

    crops.forEach((crop) => {
      const kg = convertToKg(crop.quantity, crop.unit);
      totalQty += kg;
      totalVal += kg * (Number(crop.price) || 0);
      if (crop.location) uniqueLocs.add(crop.location);
    });

    return {
      totalQuantityKg: totalQty,
      estimatedValue: totalVal,
      locations: [...uniqueLocs],
    };
  }, [crops]);

  const handleSaveCrop = useCallback(async (formData) => {
    try {
      const cropData = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      };

      if (editingCrop) {
        await editCrop(editingCrop._id, cropData);
        triggerNotification(`Successfully updated crop: "${cropData.cropName}"`, "update");
      } else {
        await createCrop(cropData);
        triggerNotification(`Successfully added new crop: "${cropData.cropName}"`, "success");
      }

      setEditingCrop(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      triggerNotification("An error occurred while saving your crop changes.", "error");
    }
  }, [editingCrop, editCrop, createCrop, triggerNotification]);

  const handleDeleteCrop = useCallback(async () => {
    if (!deleteCrop) return;
    const targetsName = deleteCrop.cropName;
    try {
      await removeCrop(deleteCrop._id);
      setDeleteCrop(null);
      triggerNotification(`Removed crop: "${targetsName}" from records.`, "delete");
    } catch (err) {
      console.error(err);
      triggerNotification("An error occurred while deleting the crop entry.", "error");
    }
  }, [deleteCrop, removeCrop, triggerNotification]);

  const openCreateModal = useCallback(() => {
    setEditingCrop(null);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((crop) => {
    setEditingCrop(crop);
    setShowModal(true);
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-600 font-semibold">Loading crops...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />

      <UpiNotification notification={notification} onClose={dismissNotification} />

      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Crop Planner</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage all your planned and growing crops.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-sm transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-sm transition-colors"
            >
              <Plus size={18} />
              Add Crop
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          <StatCard icon={<Package />} title="Total Crops" value={crops.length} />
          <StatCard icon={<Package />} title="Total Qty (Normalized)" value={`${stats.totalQuantityKg.toLocaleString()} kg`} />
          <StatCard icon={<IndianRupee />} title="Estimated Value" value={`₹${stats.estimatedValue.toLocaleString()}`} />
          <StatCard icon={<MapPin />} title="Locations" value={stats.locations.length} />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 mb-6 flex flex-wrap gap-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
          <div className="flex items-center border dark:border-gray-700 rounded-lg px-3 flex-1 bg-gray-50 dark:bg-gray-950">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search Crop..."
              className="p-2 outline-none w-full bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-950"
            onChange={(e) => setLocationFilter(e.target.value)}
            value={locationFilter}
          >
            <option value="">Location</option>
            {stats.locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            className="border dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-950"
            onChange={(e) => setSeasonFilter(e.target.value)}
            value={seasonFilter}
          >
            <option value="">Season</option>
            <option>Rabi</option>
            <option>Kharif</option>
            <option>Zaid</option>
          </select>

          <select
            className="border dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-950"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Latest Added</option>
            <option value="cropName">Name</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow border border-gray-200/50 dark:border-gray-800">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4 font-semibold">Crop</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Market Price</th>
                <th className="p-4 font-semibold">Season</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.map((crop) => (
                <tr key={crop._id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-medium">{crop.cropName}</td>
                  <td className="p-4">{crop.quantity} {crop.unit}</td>
                  <td className="p-4">{crop.location}</td>
                  <td className="p-4">₹{crop.price}/kg</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {crop.season}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      crop.status === 'Harvested' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      crop.status === 'Growing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {crop.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(crop)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteCrop(crop)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCrops.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">No crops found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <CropModal
            editingCrop={editingCrop}
            onClose={() => setShowModal(false)}
            onSave={handleSaveCrop}
          />
        )}

        {deleteCrop && (
          <DeleteDialog
            cropName={deleteCrop.cropName}
            onClose={() => setDeleteCrop(null)}
            onConfirm={handleDeleteCrop}
          />
        )}
      </div>
    </div>
  );
}

const StatCard = memo(function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-800 p-5 flex justify-between items-center">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        <h2 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h2>
      </div>
      <div className="text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950/50 p-3 rounded-xl">{icon}</div>
    </div>
  );
});

function CropModal({ editingCrop, onClose, onSave }) {
  const [form, setForm] = useState(editingCrop || EMPTY_CROP);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className={`p-1.5 rounded-lg text-white ${editingCrop ? 'bg-blue-600' : 'bg-green-600'}`}>
              {editingCrop ? <Edit size={16} /> : <Plus size={16} />}
            </span>
            {editingCrop ? "Edit Crop Details" : "Plan New Crop"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          <div>
            <label className={LABEL_CLASS}>Crop Name</label>
            <input
              placeholder="e.g., Wheat, Basmati Rice"
              className={INPUT_CLASS}
              value={form.cropName || ""}
              onChange={(e) => setForm({ ...form, cropName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={LABEL_CLASS}>Quantity</label>
              <input
                type="number"
                placeholder="0.00"
                className={INPUT_CLASS}
                value={form.quantity || ""}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Unit</label>
              <select
                className={INPUT_CLASS}
                value={form.unit || "kg"}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              >
                <option>kg</option>
                <option>quintal</option>
                <option>ton</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Market Price (per kg)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none text-sm">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className={INPUT_CLASS}
                  style={{ paddingLeft: '1.75rem' }}
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS}>Location / Field ID</label>
              <input
                placeholder="e.g., North Sector A"
                className={INPUT_CLASS}
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Season</label>
              <select
                className={INPUT_CLASS}
                value={form.season || "Rabi"}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
              >
                <option>Rabi</option>
                <option>Kharif</option>
                <option>Zaid</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS}>Status</label>
              <select
                className={INPUT_CLASS}
                value={form.status || "Planned"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Planned</option>
                <option>Growing</option>
                <option>Harvested</option>
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS}>Notes & Observations</label>
            <textarea
              placeholder="Add soil parameters, seed variety, or fertilizer schedules..."
              rows={3}
              className={`${INPUT_CLASS} resize-none`}
              value={form.notes || ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className={`px-5 py-2.5 rounded-xl text-white shadow-sm font-medium text-sm transition-colors ${editingCrop ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
            {editingCrop ? "Update Crop" : "Save Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}

const DeleteDialog = memo(function DeleteDialog({ cropName, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[400px] border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete {cropName}?</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
          This action cannot be undone. All recorded history for this crop batch will be cleared.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border dark:border-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

const UpiNotification = memo(function UpiNotification({ notification, onClose }) {
  if (!notification) return null;

  const { type, message } = notification;

  let accentColor = "bg-emerald-600 dark:bg-emerald-500";
  let ringBg = "bg-emerald-50 dark:bg-emerald-950/40";
  let textColor = "text-emerald-600 dark:text-emerald-400";
  let title = "Done Successfully";
  let IconComponent = <CheckCircle2 size={48} className="text-white animate-bounce" />;

  if (type === "update") {
    accentColor = "bg-blue-600 dark:bg-blue-500";
    ringBg = "bg-blue-50 dark:bg-blue-950/40";
    textColor = "text-blue-600 dark:text-blue-400";
    title = "Record Updated";
    IconComponent = <RefreshCw size={44} className="text-white animate-spin [animation-duration:3s]" />;
  } else if (type === "delete") {
    accentColor = "bg-amber-500 dark:bg-amber-500";
    ringBg = "bg-amber-50 dark:bg-amber-950/40";
    textColor = "text-amber-600 dark:text-amber-400";
    title = "Entry Deleted";
    IconComponent = <Trash2 size={44} className="text-white" />;
  } else if (type === "error") {
    accentColor = "bg-red-600 dark:bg-red-500";
    ringBg = "bg-red-50 dark:bg-red-950/40";
    textColor = "text-red-600 dark:text-red-400";
    title = "Action Failed";
    IconComponent = <AlertCircle size={46} className="text-white" />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[150] p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden text-center p-8 border border-gray-100 dark:border-gray-800 relative transform animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className={`mx-auto flex items-center justify-center h-24 w-24 rounded-full ${ringBg} p-4 mb-6 relative`}>
          <div className={`h-16 w-16 rounded-full ${accentColor} flex items-center justify-center shadow-lg`}>
            {IconComponent}
          </div>
        </div>

        <h3 className={`text-xl font-bold tracking-tight ${textColor} mb-2`}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium px-2 leading-relaxed">
          {message}
        </p>

        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center items-center gap-1.5 text-xs font-semibold text-gray-400 tracking-wider uppercase">
          <CheckCircle2 size={12} className="text-gray-400" /> Secure Database Logged
        </div>
      </div>
    </div>
  );
});
