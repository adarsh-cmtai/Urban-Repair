'use client';

import { Phone, Mail, Wrench, Edit, Trash, UserX, UserCheck } from 'lucide-react';

interface Props {
    technician: any;
    onEdit: (technician: any) => void;
    onDelete: (technician: any) => void;
}

export function TechnicianCard({ technician, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-brand-red text-2xl font-bold">
                            {technician.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-montserrat text-lg font-bold text-neutral-800">{technician.name}</h3>
                            <p className="text-sm text-neutral-500">{technician.specialization || 'General Technician'}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${technician.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {technician.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div className="mt-6 space-y-3 border-t pt-4">
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{technician.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{technician.phone}</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2 border-t pt-4">
                <button onClick={() => onEdit(technician)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    <Edit className="w-4 h-4"/> Edit
                </button>
                <button onClick={() => onDelete(technician)} className={`flex items-center gap-1 text-sm font-medium ${technician.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}>
                    {technician.isActive ? <><UserX className="w-4 h-4"/> Deactivate</> : <><UserCheck className="w-4 h-4"/> Activate</>}
                </button>
            </div>
        </div>
    );
}