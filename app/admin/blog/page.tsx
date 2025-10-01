'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getAdminBlogs, deleteBlog } from '@/services/adminService';

export default function AdminBlogPage() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state: RootState) => state.auth);

    const fetchArticles = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await getAdminBlogs(token);
            setArticles(res.data);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => { fetchArticles(); }, [token]);

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete the post "${title}"?`)) {
            const promise = deleteBlog(id, token!).then(() => fetchArticles());
            toast.promise(promise, {
                loading: 'Deleting post...',
                success: 'Post deleted successfully!',
                error: 'Failed to delete post.'
            });
        }
    };

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="w-10 h-10 animate-spin text-brand-red"/></div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="font-montserrat text-3xl font-bold text-neutral-800">Manage Blog Posts</h1>
                <Link href="/admin/blog/new">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700">
                        <Plus className="w-5 h-5" /> New Post
                    </button>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {articles.map((article: any) => (
                             <tr key={article._id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{article.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{article.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {article.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(article.updatedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <Link href={`/admin/blog/edit/${article._id}`} className="text-indigo-600 hover:text-indigo-900 p-1"><Edit className="inline w-4 h-4"/></Link>
                                    <button onClick={() => handleDelete(article._id, article.title)} className="text-red-600 hover:text-red-900 p-1"><Trash2 className="inline w-4 h-4"/></button>
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}