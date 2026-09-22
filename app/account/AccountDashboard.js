'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

export default function AccountDashboard({ user }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings'
  const [loggingOut, setLoggingOut] = useState(false);

  // Form states for settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: '+91 98765 43210',
    notifications: true,
  });
  const [savedSuccess, setSavedSuccess] = useState('');

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'kulfi-mate',
      name: 'Kulfi Mate - Plant Protein',
      price: 1899,
      originalPrice: 2499,
      image: '/kulfi-mate.png',
      tag: 'Best Seller ⭐',
    },
    {
      id: 'steel-shaker',
      name: 'Matte Steel Shaker Bottle',
      price: 699,
      originalPrice: 999,
      image: '/steel-shaker.png',
      tag: 'Essential Gear ⚡',
    },
  ]);

  // Saved Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      fullName: user?.name || 'Vishal',
      street: 'Flat 402, Sunshine Heights, 12th Main Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '9876543210',
      type: 'HOME',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: user?.name || 'Vishal',
      street: 'Tech Park Tower B, 5th Floor, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '9876543210',
      type: 'WORK',
      isDefault: false,
    },
  ]);

  // Modal & Address Form State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    type: 'HOME',
    isDefault: false,
  });

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/');
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  const handleRemoveWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess('Profile updated successfully!');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  /* ── Address Handlers ────────────────────────────────────────── */
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: user?.name || '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      type: 'HOME',
      isDefault: addresses.length === 0,
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      fullName: addr.fullName,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode.replace(/\D/g, ''),
      phone: addr.phone.replace(/\D/g, ''),
      type: addr.type,
      isDefault: addr.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setAddresses(updated);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleSaveAddressSubmit = (e) => {
    e.preventDefault();

    const cleanPincode = addressForm.pincode.replace(/\D/g, '');
    const cleanPhone = addressForm.phone.replace(/\D/g, '');

    if (!addressForm.fullName.trim() || !addressForm.street.trim() || !addressForm.city.trim()) {
      alert('Please fill in all required address fields.');
      return;
    }

    if (cleanPincode.length !== 6) {
      alert('Pincode must be an integer number of exactly 6 digits.');
      return;
    }

    if (cleanPhone.length !== 10) {
      alert('Phone number must be an integer number of exactly 10 digits.');
      return;
    }

    const sanitizedForm = {
      ...addressForm,
      pincode: cleanPincode,
      phone: cleanPhone,
    };

    let updatedList;
    if (editingAddressId) {
      // Edit existing
      updatedList = addresses.map((a) => {
        if (a.id === editingAddressId) {
          return { ...a, ...sanitizedForm };
        }
        return sanitizedForm.isDefault ? { ...a, isDefault: false } : a;
      });
    } else {
      // Create new
      const newAddress = {
        id: 'addr-' + Date.now(),
        ...sanitizedForm,
      };
      if (sanitizedForm.isDefault) {
        updatedList = addresses.map((a) => ({ ...a, isDefault: false }));
        updatedList.push(newAddress);
      } else {
        updatedList = [...addresses, newAddress];
      }
    }

    setAddresses(updatedList);
    setIsAddressModalOpen(false);
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Profile Overview',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: 'addresses',
      label: 'Saved Addresses',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex-1 pt-14 sm:pt-16 flex flex-col md:flex-row w-full min-h-[calc(100vh-64px)]">
      {/* ── Left Edge Side Panel ────────────────────────────────── */}
      <aside className="w-full md:w-80 lg:w-84 bg-white border-r border-black/10 p-5 sm:p-7 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* User Profile Avatar & Header */}
          <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-stone-100">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EF5A32] text-white flex items-center justify-center font-['Anton'] text-2xl shadow-md shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5A32] block mb-0.5">
                TRIBE MEMBER
              </span>
              <h2 className="font-['Anton'] text-lg sm:text-xl text-[#111111] uppercase tracking-wide truncate">
                {user?.name}
              </h2>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#EF5A32]/10 text-[#EF5A32] border border-[#EF5A32]/20">
                {user?.role || 'Customer'}
              </span>
            </div>
          </div>

          {/* 5 Navigation Menu Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#EF5A32] text-white shadow-md'
                      : 'text-stone-600 hover:text-[#111111] hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Sign Out at Bottom of Left Panel */}
        <div className="pt-6 mt-6 border-t border-stone-100">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{loggingOut ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* ── Right Main Structured Details Area ───────────────────── */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto bg-[#FBF7F1]">
        
        {/* 1. PROFILE OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EF5A32] mb-1 block">
                WELCOME BACK
              </span>
              <h1 className="font-['Anton'] text-3xl sm:text-5xl text-[#111111] uppercase tracking-wide">
                Welcome, {user?.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Here is your overall account status, profile summary, and protein routine details.
              </p>
            </div>

            {/* Account Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-black/5">
                <h3 className="font-['Anton'] text-xl text-[#111111] uppercase tracking-wide mb-4">
                  Profile Information
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="pb-3 border-b border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Full Name</span>
                    <span className="font-semibold text-stone-900">{user?.name}</span>
                  </div>
                  <div className="pb-3 border-b border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Email Address</span>
                    <span className="font-semibold text-stone-900">{user?.email}</span>
                  </div>
                  <div className="pb-3 border-b border-stone-100">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Account Status</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Verified Tribe Member
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Member Since</span>
                    <span className="font-medium text-stone-600">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Routine Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                      ⚡ Routine Status
                    </span>
                    <span className="text-xs text-[#EF5A32] font-bold">30g Daily Target</span>
                  </div>
                  <h3 className="font-['Anton'] text-xl text-[#111111] uppercase tracking-wide mb-2">
                    Daily Protein Fuel
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    Formulated for gentle Indian digestion with zero whey bloat. Keep your daily routine active!
                  </p>
                </div>
                <a
                  href="/calculator"
                  className="w-full py-3 px-4 rounded-xl bg-[#111111] text-white hover:bg-[#EF5A32] text-xs font-bold uppercase tracking-wider text-center transition-all block"
                >
                  Recalculate Protein Target →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 2. MY ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EF5A32] mb-1 block">
                ORDER HISTORY
              </span>
              <h1 className="font-['Anton'] text-3xl sm:text-5xl text-[#111111] uppercase tracking-wide">
                My Orders
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Track current shipments, view past orders, and download tax invoices.
              </p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {/* Order Card 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-black/5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Order ID</span>
                    <span className="font-bold text-[#111111]">#PRT-892401</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Date Placed</span>
                    <span className="font-semibold text-stone-700">Sep 18, 2026</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Total</span>
                    <span className="font-bold text-[#EF5A32]">₹2,598</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Delivered ✓
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FBF7F1] p-2 border border-stone-200 shrink-0">
                    <img src="/kulfi-mate.png" alt="Kulfi Mate" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-[#111111]">Kulfi Mate - Plant Protein (1 KG Pack)</h4>
                    <p className="text-xs text-stone-500">Qty: 1 • Flavor: Kulfi Mate</p>
                  </div>
                  <a
                    href="/shop"
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#111111] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Reorder
                  </a>
                </div>
              </div>

              {/* Order Card 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-black/5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Order ID</span>
                    <span className="font-bold text-[#111111]">#PRT-781204</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Date Placed</span>
                    <span className="font-semibold text-stone-700">Aug 24, 2026</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold tracking-wider">Total</span>
                    <span className="font-bold text-[#EF5A32]">₹1,849</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Delivered ✓
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FBF7F1] p-2 border border-stone-200 shrink-0">
                    <img src="/protein.png" alt="Choco Buddy" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-[#111111]">Choco Buddy - Plant Protein (1 KG Pack)</h4>
                    <p className="text-xs text-stone-500">Qty: 1 • Flavor: Belgian Chocolate</p>
                  </div>
                  <a
                    href="/shop"
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#111111] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Reorder
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SAVED ADDRESSES TAB */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EF5A32] mb-1 block">
                  DELIVERY PREFERENCES
                </span>
                <h1 className="font-['Anton'] text-3xl sm:text-5xl text-[#111111] uppercase tracking-wide">
                  Saved Addresses ({addresses.length})
                </h1>
              </div>
              <button
                onClick={handleOpenAddAddress}
                className="px-4 py-2.5 rounded-xl bg-[#EF5A32] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d94822] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Add New Address</span>
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`bg-white rounded-3xl p-6 shadow-md border transition-all flex flex-col justify-between ${
                      addr.isDefault ? 'border-[#EF5A32]/40 ring-1 ring-[#EF5A32]/20' : 'border-black/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            addr.isDefault
                              ? 'bg-[#EF5A32] text-white'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {addr.isDefault ? `DEFAULT ${addr.type}` : addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-xs text-[#EF5A32] font-semibold">Primary Address</span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-[#111111]">{addr.fullName}</h4>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {addr.street}<br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-stone-500 mt-2 font-medium">📱 {addr.phone}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-3 text-xs font-bold text-[#EF5A32]">
                      {!addr.isDefault && (
                        <>
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                          <span className="text-stone-300">•</span>
                        </>
                      )}
                      <button
                        onClick={() => handleOpenEditAddress(addr)}
                        className="hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <span className="text-stone-300">•</span>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="hover:underline text-red-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-stone-200">
                <p className="text-sm text-stone-500 font-medium">No delivery addresses saved yet.</p>
                <button
                  onClick={handleOpenAddAddress}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#EF5A32] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  + Add Your First Address
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. WISHLIST TAB */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EF5A32] mb-1 block">
                SAVED FAVORITES
              </span>
              <h1 className="font-['Anton'] text-3xl sm:text-5xl text-[#111111] uppercase tracking-wide">
                My Wishlist ({wishlistItems.length})
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Your favorite protein flavors & essential shaker gear.
              </p>
            </div>

            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl p-5 shadow-md border border-black/5 flex gap-4 items-center justify-between">
                    <div className="w-20 h-20 bg-[#FBF7F1] rounded-2xl p-2 shrink-0 border border-stone-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#EF5A32] block">
                        {item.tag}
                      </span>
                      <h4 className="font-bold text-sm text-[#111111] truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-['Anton'] text-base text-[#111111]">₹{item.price}</span>
                        <span className="text-xs text-stone-400 line-through">₹{item.originalPrice}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <a
                        href="/shop"
                        className="px-3 py-1.5 rounded-xl bg-[#EF5A32] text-white text-[11px] font-bold uppercase tracking-wider text-center hover:bg-[#d94822] transition-colors"
                      >
                        Buy Now
                      </a>
                      <button
                        onClick={() => handleRemoveWishlist(item.id)}
                        className="text-[10px] font-semibold text-stone-400 hover:text-red-500 text-center cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-stone-200">
                <p className="text-sm text-stone-500 font-medium">Your wishlist is empty.</p>
                <a href="/shop" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#EF5A32] text-white font-bold text-xs uppercase tracking-wider">
                  Explore Flavors
                </a>
              </div>
            )}
          </div>
        )}

        {/* 5. ACCOUNT SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EF5A32] mb-1 block">
                SECURITY & PREFERENCES
              </span>
              <h1 className="font-['Anton'] text-3xl sm:text-5xl text-[#111111] uppercase tracking-wide">
                Account Settings
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Update your personal details, notification preferences, and security settings.
              </p>
            </div>

            {savedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <span>✓</span> {savedSuccess}
              </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-black/5 space-y-5">
              <h3 className="font-['Anton'] text-lg text-[#111111] uppercase tracking-wide pb-3 border-b border-stone-100">
                Edit Profile Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address (Verified)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-100 text-stone-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#EF5A32] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d94822] transition-all shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* Logout Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-red-200 space-y-3">
              <h3 className="font-['Anton'] text-lg text-red-600 uppercase tracking-wide">
                Account Security & Sign Out
              </h3>
              <p className="text-xs text-stone-600">
                Sign out of your active session on this browser securely.
              </p>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-all shadow-sm cursor-pointer"
              >
                {loggingOut ? 'Logging Out...' : 'Sign Out Now'}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ── Add / Edit Address Modal Dialog ────────────────────────────── */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/10 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <h3 className="font-['Anton'] text-xl text-[#111111] uppercase tracking-wide">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Full Name (Recipient) *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  placeholder="e.g. Vishal Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Street Address / House No / Area *
                </label>
                <textarea
                  required
                  rows={2}
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="Flat 402, Sunshine Heights, 12th Main Road..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="Bengaluru"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pincode (6 digits) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                    placeholder="560038"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="Karnataka"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number (10 digits) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Address Type
                  </label>
                  <select
                    value={addressForm.type}
                    onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#EF5A32] text-xs outline-none bg-white"
                  >
                    <option value="HOME">HOME</option>
                    <option value="WORK">WORK / OFFICE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="rounded text-[#EF5A32] focus:ring-[#EF5A32]"
                    />
                    <span>Set as Primary Default</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100 mt-5">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#EF5A32] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d94822] shadow-sm"
                >
                  {editingAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
