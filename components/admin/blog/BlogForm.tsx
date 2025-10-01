'use client';

import { useState, useEffect, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';
import { getUploadPresignedUrl } from '@/services/adminService';
import { Loader2, UploadCloud } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const emptyForm = { title: '', excerpt: '', category: '', author: '', readTime: '', imageUrl: '', content: '', isPublished: false };

export function BlogForm({ initialData, onSubmit }: { initialData?: any, onSubmit: (data: any) => Promise<any> }) {
    const [formData, setFormData] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                excerpt: initialData.excerpt || '',
                category: initialData.category || '',
                author: initialData.author || '',
                readTime: initialData.readTime || '',
                imageUrl: initialData.imageUrl || '',
                content: initialData.content || '',
                isPublished: initialData.isPublished || false,
            });
        } else {
            setFormData(emptyForm);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const { uploadURL, imageUrl } = await getUploadPresignedUrl(file.type, token!);
            await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
            setFormData(prev => ({ ...prev, imageUrl }));
            toast.success('Image uploaded!');
        } catch (error) {
            toast.error('Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            toast.error('Please upload a cover image.');
            return;
        }
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-md border">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Post Title" required className="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-brand-red p-2 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full rounded-md border-gray-300" />
                    <input name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" required className="w-full rounded-md border-gray-300" />
                    <input name="readTime" value={formData.readTime} onChange={handleChange} placeholder="Read Time (e.g., 5 min read)" required className="w-full rounded-md border-gray-300" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md border">
                    <label className="font-semibold mb-2 block">Post Content</label>
                    <div className="h-64 mb-4">
                        <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData(prev => ({...prev, content}))} className="h-full" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                         <label htmlFor="file-upload" className="cursor-pointer">
                             <div className="text-center">
                                 {isUploading ? <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" /> : formData.imageUrl ? (
                                     <img src={formData.imageUrl} alt="Preview" className="mx-auto h-24 w-auto object-contain rounded-md"/>
                                 ) : (
                                     <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                 )}
                                 <p className="mt-2 text-sm text-gray-600">{formData.imageUrl ? 'Change Image' : 'Upload Cover Image'}</p>
                             </div>
                             <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                         </label>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md border">
                        <label className="font-semibold mb-2 block">Excerpt</label>
                        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="A short summary of the post..." rows={4} required className="w-full rounded-md border-gray-300" />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData(prev => ({...prev, isPublished: e.target.checked}))} className="rounded text-brand-red focus:ring-brand-red h-4 w-4"/> 
                    Publish Post
                </label>
                <button type="submit" disabled={isSubmitting || isUploading} className="inline-flex items-center rounded-md bg-brand-red px-6 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-300">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Post'}
                </button>
            </div>
        </form>
    );
}