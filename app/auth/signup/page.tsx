'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    UserName: '',
    FullName: '',
    aadharId: '',
    ph_number: '',
    EmailId: '',
    state: '',
    City: '',
    District: '',
    User_type: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.status === 200) {
      toast.success('User registered successfully! उपयोगकर्ता पंजीकृत हो गया');
      router.push('/auth/login');
    } else if (res.status === 409) {
      toast.error('User already exists / उपयोगकर्ता पहले से मौजूद है');
    } else {
      toast.error('Registration failed / पंजीकरण विफल');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="max-w-xl w-full shadow-xl p-8 rounded-md border border-green-700">
        <h1 className="text-3xl font-bold text-green-700 mb-2">VedaTrace</h1>
        <h2 className="text-lg font-medium mb-1">
          Sign up as user / उपयोगकर्ता के रूप में पंजीकरण करें
        </h2>
        <p className="mb-6 text-sm text-gray-700">
          Register to trace the lifecycle of herbs through harvesting, processing, testing and manufacturing.
          <br />
          जड़ी-बूटियों के जीवन चक्र को ट्रैक करने के लिए पंजीकरण करें।
        </p>
  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="UserName" placeholder="Username / उपयोगकर्ता नाम" required onChange={handleChange} className="border p-2 col-span-2" />
          <input name="FullName" placeholder="Full Name / पूरा नाम" required onChange={handleChange} className="border p-2 col-span-2" />
          <input name="aadharId" placeholder="Aadhar ID" required maxLength={12} onChange={handleChange} className="border p-2" />
          <input name="ph_number" placeholder="Phone Number / फ़ोन नंबर" required onChange={handleChange} className="border p-2" />
          <input name="EmailId" placeholder="Email ID / ईमेल" required onChange={handleChange} className="border p-2 col-span-2" />
          <input name="state" placeholder="State / राज्य" onChange={handleChange} className="border p-2" />
          <input name="City" placeholder="City / शहर" onChange={handleChange} className="border p-2" />
          <input name="District" placeholder="District / ज़िला" onChange={handleChange} className="border p-2 col-span-2" />
          <select name="User_type" required onChange={handleChange} className="border p-2 col-span-2">
            <option value="">Select Role / भूमिका चुनें</option>
            <option value="Farmer">Farmer / किसान</option>
         <option value="Processor">Processor / प्रोसेसर</option>
            <option value="Tester">Tester / परीक्षक</option>
            <option value="Manufacturer">Manufacturer / निर्माता</option>
               <option value="Consumer">Consumer / उपभोक्ता</option>
          </select>
          <input type="password" name="password" placeholder="Password / पासवर्ड" required onChange={handleChange} className="border p-2 col-span-2" />
          <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded col-span-2">
            Sign Up / साइन अप
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">
            Already have an account? <a href="/auth/login" className="text-green-700 underline font-semibold">Login</a>
            <br />
            पहले से खाता है? <a href="/auth/login" className="text-green-700 underline font-semibold">लॉगिन करें</a>
          </span>
        </div>
      </div>
    </div>
  );
}
