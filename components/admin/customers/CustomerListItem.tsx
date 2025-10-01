'use client';

import { Phone, Mail, Package, Edit, Trash2 } from 'lucide-react';

interface Props {
    customer: any;
    onEdit: (customer: any) => void;
    onDelete: (customer: any) => void;
}

export function CustomerListItem({ customer, onEdit, onDelete }: Props) {
    return (
        <li className="flex flex-col sm:flex-row items-start justify-between gap-x-6 gap-y-4 py-5 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex min-w-0 gap-x-4">
                <div className="h-12 w-12 flex-none rounded-full bg-red-100 flex items-center justify-center text-brand-red font-bold text-lg">
                    {customer.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{customer.name}</p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <Mail className="w-4 h-4 mr-1.5 text-gray-400"/> {customer.email}
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:items-end gap-y-3">
                 <div className="flex items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{customer.phone}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs leading-5 text-gray-500">
                           <Package className="w-3 h-3"/> {customer.totalBookings} Bookings
                        </p>
                    </div>
                    <div className="flex gap-x-2">
                        <button onClick={() => onEdit(customer)} className="p-2 text-gray-500 hover:text-blue-600">
                            <Edit className="w-4 h-4"/>
                        </button>
                         <button onClick={() => onDelete(customer)} className="p-2 text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}