import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MdPerson, MdEmail, MdSecurity, MdCalendarToday, MdBadge } from 'react-icons/md';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 pb-6 border-b border-base-200">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">Your Profile</h1>
          <p className="text-sm md:text-lg text-base-content/60 mt-2 font-medium">Manage your account information and security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col - Avatar & Basic Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-base-100 rounded-[2.5rem] p-10 shadow-sm border border-base-200 flex flex-col items-center text-center">
            <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
              <MdPerson size={64} />
            </div>
            <h3 className="text-2xl font-black text-base-content leading-tight mb-1">{user.name}</h3>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              {user.role}
            </p>
          </div>

          <div className="bg-base-100 rounded-[2rem] p-8 shadow-sm border border-base-200">
            <h4 className="text-xs font-black uppercase tracking-widest text-base-content/30 mb-6">Account Status</h4>
            <div className="flex items-center gap-4 text-success font-bold">
              <span className="size-3 rounded-full bg-success animate-pulse"></span>
              Verified Member
            </div>
          </div>
        </div>

        {/* Right Col - Detailed Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-base-100 rounded-[2.5rem] p-10 shadow-sm border border-base-200">
            <h3 className="text-xl font-black text-base-content mb-10 flex items-center gap-3">
              <MdBadge className="text-primary" /> Personal Information
            </h3>
            
            <div className="space-y-8">
              <InfoItem 
                icon={<MdPerson size={20} />} 
                label="Full Name" 
                value={user.name} 
              />
              <InfoItem 
                icon={<MdEmail size={20} />} 
                label="Email Address" 
                value={user.email} 
              />
              <InfoItem 
                icon={<MdSecurity size={20} />} 
                label="Access Tier" 
                value={user.role === 'admin' ? 'Administrative Access' : 'Standard Member Account'} 
              />
              <InfoItem 
                icon={<MdCalendarToday size={20} />} 
                label="Member Since" 
                value="January 2024" // Static for now as DB doesn't have it in the returned user object easily
              />
            </div>
          </div>

          <div className="bg-base-200/50 rounded-[2.5rem] p-10 border border-dashed border-base-300">
            <p className="text-sm font-medium text-base-content/40 text-center leading-relaxed">
              Profile editing is currently limited. If you need to update your email or security credentials, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-6 group">
    <div className="size-12 rounded-2xl bg-base-200 flex items-center justify-center text-base-content/30 group-hover:bg-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-base-content/30 mb-1">{label}</p>
      <p className="text-lg font-bold text-base-content">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
