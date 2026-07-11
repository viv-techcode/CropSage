import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit3, Leaf, MapPin, Save, Sprout, User, Wheat } from "lucide-react";
import Navbar from "../components/Navbar";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useCrops } from "../context/CropContext";
import { useTheme } from "../context/ThemeContext";

const initialProfile = {
  gender: "",
  dob: "",
  language: "",
  farmName: "",
  village: "",
  district: "",
  state: "",
  country: "India",
  gps: "",
  region: "",
  climate: "",
  soil: "",
  weatherUnits: "Metric",
  temperatureUnit: "Celsius",
  rainfallAlerts: true,
  diseaseAlerts: false,
  notifications: true,
};

function Field({ label, value, onChange, editing, type = "text", options, readOnly = false, required = false }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}{required && <span className="text-rose-500"> *</span>}</span>
      {editing && !readOnly ? (
        options ? (
          <select value={value} required={required} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950">
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        ) : (
          <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950" />
        )
      ) : (
        <p className="min-h-10 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-800 dark:bg-white/5 dark:text-slate-200">{value || "Not provided"}</p>
      )}
    </label>
  );
}

function Profile() {
  const { user, token, login, logout } = useAuth();
  const { crops, loading: cropsLoading } = useCrops();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const onboarding = Boolean(location.state?.onboarding);
  const [editing, setEditing] = useState(onboarding);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [personal, setPersonal] = useState({ name: user?.name || "Farmer", email: user?.email || "", mobile: user?.mobile || "" });
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    if (!token) return;
    const loadProfile = async () => {
      try {
        const { data } = await authService.get("/auth/profile");
        const savedUser = data.user;
        setPersonal({ name: savedUser.name || "Farmer", email: savedUser.email || "", mobile: savedUser.mobile || "" });
        setProfile({ ...initialProfile, ...(savedUser.profile || {}) });
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to load profile details.");
      }
    };
    loadProfile();
  }, [token]);

  const cropSummary = useMemo(() => {
    const statusCount = (status) => crops.filter((crop) => (crop.status || "Planned") === status).length;
    const locations = new Set(crops.map((crop) => crop.location).filter(Boolean));
    return {
      locations: locations.size,
      planned: statusCount("Planned"),
      growing: statusCount("Growing"),
      harvested: statusCount("Harvested"),
      active: crops.filter((crop) => (crop.status || "Planned") !== "Harvested"),
    };
  }, [crops]);

  const updateProfile = (field, value) => setProfile((current) => ({ ...current, [field]: value }));

  const saveProfile = async () => {
    const requiredFields = ["farmName", "village", "district", "state", "soil"];
    const missingFields = requiredFields.filter((field) => !profile[field]?.trim());
    if (missingFields.length) {
      setMessage("Please complete Farm name, Village, District, State, and Soil type before saving.");
      return;
    }

    try {
      setSaving(true);
      const { data } = await authService.put("/auth/profile", { name: personal.name, mobile: personal.mobile, profile });
      login({ id: data.user._id, name: data.user.name, email: data.user.email, mobile: data.user.mobile }, token);
      setEditing(false);
      setMessage("Profile saved successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const panel = "rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70";
  const initials = personal.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"}`}>
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="flex flex-col gap-5 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-xl font-bold text-white shadow-md shadow-emerald-500/20">{initials}</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{personal.name}</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{profile.farmName || "Your CropSage profile"} {profile.village && `• ${profile.village}`}</p>
            </div>
          </div>
          <button onClick={() => editing ? saveProfile() : setEditing(true)} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60">
            {editing ? <Save size={16} /> : <Edit3 size={16} />}{saving ? "Saving..." : editing ? "Save profile" : "Edit profile"}
          </button>
        </section>

        {message && <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">{message}</p>}
        {onboarding && editing && <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">Welcome to CropSage. Fill in the required farm details marked with * to complete your setup.</p>}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ["Fields", cropSummary.locations, MapPin], ["Crop records", crops.length, Leaf],
            ["Active crops", cropSummary.active.length, Sprout], ["Harvested", cropSummary.harvested, Wheat],
          ].map(([label, value, Icon]) => (
            <div key={label} className={panel}><Icon size={18} className="text-emerald-500" /><p className="mt-3 text-2xl font-bold">{cropsLoading ? "—" : value}</p><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p></div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className={panel}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold"><User size={19} className="text-emerald-500" /> Personal information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={personal.name} editing={editing} onChange={(value) => setPersonal((current) => ({ ...current, name: value }))} />
              <Field label="Email" value={personal.email} editing={editing} onChange={() => {}} readOnly />
              <Field label="Phone" value={personal.mobile} editing={editing} onChange={(value) => setPersonal((current) => ({ ...current, mobile: value }))} />
              <Field label="Gender" value={profile.gender} editing={editing} onChange={(value) => updateProfile("gender", value)} options={["", "Male", "Female", "Other"]} />
              <Field label="Date of birth" value={profile.dob} editing={editing} onChange={(value) => updateProfile("dob", value)} type="date" />
              <Field label="Language" value={profile.language} editing={editing} onChange={(value) => updateProfile("language", value)} />
            </div>
          </div>

          <div className={panel}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold"><MapPin size={19} className="text-emerald-500" /> Farm information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['Farm name', 'farmName'], ['Village', 'village'], ['District', 'district'], ['State', 'state'], ['Country', 'country'], ['Region', 'region'], ['Climate zone', 'climate'], ['Soil type', 'soil']].map(([label, field]) => (
                <Field key={field} label={label} value={profile[field]} editing={editing} required={["farmName", "village", "district", "state", "soil"].includes(field)} onChange={(value) => updateProfile(field, value)} />
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={`${panel} lg:col-span-2`}>
            <div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 text-lg font-bold"><Sprout size={19} className="text-emerald-500" /> Crops from Crop Planner</h2><button onClick={() => navigate("/crop-planner")} className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">Manage crops</button></div>
            {cropsLoading ? <p className="text-sm text-slate-500">Loading crops...</p> : cropSummary.active.length ? <div className="grid gap-3 sm:grid-cols-2">{cropSummary.active.slice(0, 6).map((crop) => <div key={crop._id} className="rounded-xl bg-slate-50 p-4 dark:bg-white/5"><p className="font-semibold">{crop.cropName}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{crop.location || "No field set"} · {crop.status || "Planned"}</p></div>)}</div> : <p className="text-sm text-slate-500">No active crops. Add one in Crop Planner.</p>}
          </div>
          <div className={panel}>
            <h2 className="mb-5 text-lg font-bold">Crop status</h2>
            {[['Planned', cropSummary.planned], ['Growing', cropSummary.growing], ['Harvested', cropSummary.harvested]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last:border-0 dark:border-white/10"><span className="text-slate-500 dark:text-slate-400">{label}</span><span className="font-bold">{cropsLoading ? "—" : value}</span></div>)}
          </div>
        </section>

        <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-white/10">
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Sign out
          </button>
        </div>

      </main>
    </div>
  );
}

export default Profile;
