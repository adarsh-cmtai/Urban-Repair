'use client';

import { BlogForm } from '@/components/admin/blog/BlogForm';
import { createBlog } from '@/services/adminService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function NewBlogPostPage() {
    const { token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            await createBlog(data, token!);
            router.push('/admin/blog');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    };
    
    return (
        <div className="space-y-8">
            <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Create New Blog Post</h1>
            <BlogForm onSubmit={handleSubmit} />
        </div>
    );
}