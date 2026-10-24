import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Plus, 
  Search, 
  Heart, 
  MessageSquare, 
  ArrowRight, 
  Tag, 
  Trash2, 
  Edit3, 
  X, 
  Image as ImageIcon, 
  UserCheck, 
  Sparkles,
  Filter
} from 'lucide-react';
import { Post } from '../types';

export const NewsPage: React.FC = () => {
  const { 
    posts, 
    currentUser, 
    setCurrentPage, 
    setSelectedPostId, 
    toggleLikePost, 
    createPost, 
    deletePost, 
    showToast 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // New Post Form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<Post['category']>('Website Project Updates');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTags, setNewTags] = useState('Logistics, WebDev, Innovation');

  const categories = [
    'All',
    'Website Project Updates',
    'Shipping and Logistics',
    'Technology and Innovation',
    'Sustainability',
    'Company Updates',
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please enter both title and content for your post.', 'warning');
      return;
    }

    const tagArray = newTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    createPost({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      imageUrl: newImageUrl.trim() || undefined,
      tags: tagArray.length > 0 ? tagArray : ['DHLClone', 'ProjectUpdate'],
    });

    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner Header */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-[#D40511] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-[#D40511] uppercase tracking-widest">
              Educational Clone Community & News
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase font-sans">
              News, Articles & Project Updates
            </h1>
            <p className="text-xs text-slate-600 max-w-xl">
              Follow project development notes by <strong>Zubair WebsiteWala</strong>, global courier industry updates, logistics technology advancements, and green shipping insights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-5 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </button>
            <button
              onClick={() => {
                setCurrentPage('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#FFCC00] hover:bg-yellow-400 text-black font-bold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer shadow-xs"
            >
              Zubair Profile
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by title, tag, or author (e.g. Zubair, Sustainability, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-xs text-black focus:outline-none focus:border-[#D40511]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>{filteredPosts.length} article(s) found</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#FFCC00]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => {
              const isOwner = currentUser && (currentUser.name === post.authorName);

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group"
                >
                  {/* Top Image if present */}
                  {post.imageUrl && (
                    <div 
                      className="h-48 overflow-hidden relative cursor-pointer"
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setCurrentPage('post-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#FFCC00] text-black font-black text-[10px] uppercase px-2.5 py-0.5 rounded shadow-xs">
                        {post.category}
                      </div>
                      {post.featured && (
                        <div className="absolute top-3 right-3 bg-[#D40511] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                          Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Author row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorAvatar}
                            alt={post.authorName}
                            className="w-7 h-7 rounded-full object-cover border-2 border-[#D40511]"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-tight">
                              {post.authorName}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {new Date(post.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>

                        {isOwner && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Delete this post?')) {
                                deletePost(post.id);
                              }
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition cursor-pointer"
                            title="Delete your post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Post Title */}
                      <h2
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setCurrentPage('post-detail');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-base font-black text-slate-900 group-hover:text-[#D40511] transition cursor-pointer mb-2 line-clamp-2"
                      >
                        {post.title}
                      </h2>

                      {/* Content Preview */}
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                        {post.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[10px] text-slate-500 hover:text-black bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom engagement row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center gap-1.5 font-bold transition cursor-pointer ${
                            post.likedByCurrentUser
                              ? 'text-red-600'
                              : 'text-slate-500 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPostId(post.id);
                            setCurrentPage('post-detail');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold transition cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.comments.length}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setCurrentPage('post-detail');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[#D40511] font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No updates found</h3>
            <p className="text-xs text-slate-500">
              Try searching with a different keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > visibleCount && (
          <div className="text-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs px-6 py-2.5 rounded-lg transition cursor-pointer shadow-xs"
            >
              Load More Posts ({filteredPosts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#1A1A1A] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#FFCC00]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#FFCC00]" />
                <h3 className="text-sm font-black uppercase">Publish a Post / Project Update</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author</label>
                <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt="Author"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-bold text-slate-900">{currentUser?.name || 'Zubair WebsiteWala'}</span>
                  <span className="text-[10px] text-slate-500">({currentUser?.role || 'Demo Creator'})</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Website Project Update: Advanced Tracking Released"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                >
                  <option value="Website Project Updates">Website Project Updates</option>
                  <option value="Shipping and Logistics">Shipping and Logistics</option>
                  <option value="Technology and Innovation">Technology and Innovation</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Company Updates">Company Updates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Post Content *</label>
                <textarea
                  rows={4}
                  placeholder="Share details, updates, learnings, or logistics news..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. WebDev, DHLClone, Logistics, AI"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-black focus:outline-none focus:border-[#D40511]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D40511] hover:bg-red-700 text-white rounded-lg text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Publish Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
