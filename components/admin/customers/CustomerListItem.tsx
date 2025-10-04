'use client';

import { Phone, Mail, Package, Edit, Trash2 } from 'lucide-react';

interface Props {
    customer: any;
    onEdit: (customer: any) => void;
    onDelete: (customer: any) => void;
}

export function CustomerListItem({ customer, onEdit, onDelete }: Props) {
    return (
        <li className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:bg-slate-50/50 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-lg">
                        {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{customer.name}</p>
                        <a href={`mailto:${customer.email}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 truncate">
                            <Mail className="w-4 h-4 flex-shrink-0"/> 
                            <span>{customer.email}</span>
                        </a>
                    </div>
                </div>

                {/* Contact & Bookings */}
                <div className="flex flex-col md:items-center gap-2">
                    <a href={`tel:${customer.phone}`} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 font-medium">
                        <Phone className="w-4 h-4 text-slate-400"/>
                        {customer.phone}
                    </a>
                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <Package className="w-3.5 h-3.5"/> 
                        {customer.totalBookings} Booking{customer.totalBookings !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-start md:justify-end gap-2">
                    <button 
                        onClick={() => onEdit(customer)} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                        <Edit size={14}/>
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete(customer)} 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
                    >
                        <Trash2 size={14}/>
                        Delete
                    </button>
                </div>

            </div>
        </li>
    );
}