'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BlogForm } from '@/components/admin/blog/BlogForm';
import { getBlogById, updateBlog } from '@/services/adminService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Loader2 } from 'lucide-react';

export default function EditBlogPostPage() {
    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    useEffect(() => {
        if (!id || !token) return;
        getBlogById(id, token)
            .then(res => setInitialData(res.data))
            .finally(() => setIsLoading(false));
    }, [id, token]);
    
    const handleSubmit = async (data: any) => {
        try {
            await updateBlog(id, data, token!);
            router.push('/admin/blog');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };
    
    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>;

    return (
        <div className="space-y-8">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Edit Blog Post</h1>
            <BlogForm initialData={initialData} onSubmit={handleSubmit} />
        </div>
    );
}