import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Share2, 
  Trash2, 
  Calendar, 
  Tag, 
  User, 
  Send, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { 
    posts, 
    selectedPostId, 
    setSelectedPostId, 
    setCurrentPage, 
    toggleLikePost, 
    addComment, 
    deleteComment, 
    currentUser, 
    showToast 
  } = useApp();

  const [commentText, setCommentText] = useState('');

  const post = posts.find((p) => p.id === selectedPostId) || posts[0];

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-100 py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Post not found</h2>
        <button
          onClick={() => setCurrentPage('news')}
          className="mt-4 bg-[#D40511] text-white px-4 py-2 rounded text-xs font-bold"
        >
          Return to News
        </button>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Post link copied to clipboard!', 'success');
  };

  const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back navigation */}
        <button
          onClick={() => {
            setCurrentPage('news');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#D40511] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News & Updates
        </button>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header image if present */}
          {post.imageUrl && (
            <div className="h-72 sm:h-96 w-full overflow-hidden relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#FFCC00] text-black font-black text-xs uppercase px-3 py-1 rounded shadow-md">
                {post.category}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-8">
            {/* Meta & Category */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D40511]" />
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                  {post.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {post.title}
              </h1>

              {/* Author badge */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#D40511]"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      {post.authorName}
                      {post.authorName === 'Zubair WebsiteWala' && (
                        <span className="bg-yellow-100 text-yellow-900 text-[10px] font-black px-1.5 py-0.2 rounded">
                          Creator
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{post.authorRole}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                      post.likedByCurrentUser
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-current' : ''}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer"
                    title="Share article link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-slate-100">
              <p className="whitespace-pre-line leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Bio Box */}
            <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#D40511] shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-black text-sm text-slate-900">About {post.authorName}</div>
                <div className="text-xs font-semibold text-[#D40511]">{post.authorRole}</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {post.authorBio || 'Exploring technology, website design, and building functional modern logistics prototypes.'}
                </p>
                {post.authorName === 'Zubair WebsiteWala' && (
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-[#D40511] font-bold hover:underline inline-block pt-1 cursor-pointer"
                  >
                    View Zubair&apos;s Full Demo Profile & Shipments →
                  </button>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-6 border-t border-slate-200 space-y-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#D40511]" />
                <h3 className="text-lg font-black uppercase text-slate-900">
                  Community Comments ({post.comments.length})
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt="Current user"
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <textarea
                      rows={3}
                      placeholder={`Leave a comment as ${currentUser?.name || 'Visitor'}...`}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-xs text-black focus:outline-none focus:border-[#D40511]"
                      required
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#D40511] hover:bg-red-700 text-white font-black text-xs uppercase px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-2">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">
                              {comment.authorName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>

                      {currentUser && currentUser.name === comment.authorName && (
                        <button
                          onClick={() => deleteComment(post.id, comment.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition cursor-pointer"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No comments yet. Be the first to share your feedback!
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-black uppercase text-slate-900">
              More Updates & Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedPostId(rel.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#D40511] uppercase block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2 mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {rel.content}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 pt-2 block">
                    {new Date(rel.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
