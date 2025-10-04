'use client';

import { Phone, Mail, Edit, ShieldOff, ShieldCheck } from 'lucide-react';

interface Props {
    technician: any;
    onEdit: (technician: any) => void;
    onDelete: (technician: any) => void;
}

export function TechnicianCard({ technician, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-2xl">
                        {technician.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-lg text-slate-800">{technician.name}</h3>
                        <p className="text-sm text-slate-500">{technician.specialization || 'General Technician'}</p>
                    </div>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${technician.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    <div className={`h-2 w-2 rounded-full ${technician.isActive ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                    {technician.isActive ? 'Active' : 'Inactive'}
                </div>
            </div>
            
            <div className="border-t border-slate-200 my-4"></div>

            {/* Contact Info Section */}
            <div className="space-y-3 text-sm flex-grow">
                <a href={`mailto:${technician.email}`} className="flex items-center gap-3 text-slate-600 hover:text-red-600 transition-colors">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{technician.email}</span>
                </a>
                <a href={`tel:${technician.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-red-600 transition-colors">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{technician.phone}</span>
                </a>
            </div>

            {/* Actions Section */}
            <div className="mt-6 flex gap-2">
                <button 
                    onClick={() => onEdit(technician)} 
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors text-sm"
                >
                    <Edit size={14} /> Edit
                </button>
                <button 
                    onClick={() => onDelete(technician)} 
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-sm ${
                        technician.isActive 
                        ? 'text-red-600 bg-red-100 hover:bg-red-200' 
                        : 'text-green-600 bg-green-100 hover:bg-green-200'
                    }`}
                >
                    {technician.isActive ? (
                        <><ShieldOff size={14} /> Deactivate</>
                    ) : (
                        <><ShieldCheck size={14} /> Activate</>
                    )}
                </button>
            </div>
        </div>
    );
}