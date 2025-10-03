import { useState } from 'react';
import { getUploadPresignedUrl } from '@/services/technicianService';
import { toast } from 'react-hot-toast';
import { Loader2, UploadCloud, Camera } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Props {
    label: string;
    imageUrl: string | null;
    onUploadSuccess: (imageUrl: string) => void;
}

export function ImageUploader({ label, imageUrl, onUploadSuccess }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <label htmlFor={`file-upload-${label}`} className="relative mt-2 flex justify-center items-center h-40 rounded-lg border border-dashed border-gray-900/25 cursor-pointer hover:border-brand-red">
                {isUploading ? (
                     <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                ) : imageUrl ? (
                    <img src={imageUrl} alt={label} className="h-full w-full object-contain rounded-lg"/>
                ) : (
                    <div className="text-center">
                        <Camera className="mx-auto h-10 w-10 text-gray-300" />
                        <span className="mt-2 block text-sm font-semibold text-gray-500">Upload Photo</span>
                    </div>
                )}
                <input id={`file-upload-${label}`} name={`file-upload-${label}`} type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
            </label>
        </div>
    );
}