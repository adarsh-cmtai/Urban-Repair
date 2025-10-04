'use client';

import { useState } from 'react';
import { getUploadPresignedUrl } from '@/services/technicianService';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, Image as ImageIcon, X, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
    label: string;
    imageUrl: string | null;
    onUploadSuccess: (imageUrl: string) => void;
    disabled?: boolean;
}

export function ImageUploader({ label, imageUrl, onUploadSuccess, disabled = false }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || disabled) return;

        setIsUploading(true);
        try {
            const { uploadURL, imageUrl: finalImageUrl } = await getUploadPresignedUrl(file.type, token!);
            
            await fetch(uploadURL, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            onUploadSuccess(finalImageUrl);
            toast.success(`${label} image uploaded!`);
        } catch (error) {
            toast.error('Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onUploadSuccess(''); 
    };

    const id = `file-upload-${label.replace(/\s+/g, '-')}`;

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <label 
                htmlFor={id} 
                className={`group relative mt-1 flex justify-center items-center aspect-video rounded-xl border-2 border-dashed  transition-colors ${
                    disabled 
                        ? 'bg-slate-100 border-slate-300 cursor-not-allowed'
                        : 'border-slate-300 hover:border-red-500 cursor-pointer'
                }`}
            >
                {isUploading ? (
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto" />
                        <p className="mt-2 text-sm font-semibold text-slate-500">Uploading...</p>
                    </div>
                ) : imageUrl ? (
                    <>
                        <img src={imageUrl} alt={label} className="h-full w-full object-contain rounded-lg p-2"/>
                        {!disabled && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity rounded-xl">
                                <RefreshCw className="h-6 w-6 text-white cursor-pointer hover:scale-110" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="p-1.5 bg-white/20 rounded-full text-white hover:bg-red-500"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`text-center transition-colors ${disabled ? 'text-slate-400' : 'text-slate-500 group-hover:text-red-600'}`}>
                        <UploadCloud className="mx-auto h-10 w-10" />
                        <span className="mt-2 block text-sm font-semibold">
                            {disabled ? 'Image not uploaded' : 'Upload Photo'}
                        </span>
                    </div>
                )}
                {!disabled && (
                    <input 
                        id={id} 
                        name={id} 
                        type="file" 
                        className="sr-only" 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        disabled={isUploading}
                    />
                )}
            </label>
        </div>
    );
}