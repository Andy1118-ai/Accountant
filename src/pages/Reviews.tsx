import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Reviews: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: user?.name || '',
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    // whenever user changes, sync name
    setNewReview(n => ({ ...n, name: user?.name || '' }));
  }, [user]);

  // Persist reviews in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      // seed with demo reviews if none exist
      setReviews([
        {
          id: 1,
          name: "John Doe",
          rating: 5,
          comment: "Excellent service! The team was very professional and helpful.",
          date: "2024-03-15"
        },
        {
          id: 2,
          name: "Jane Smith",
          rating: 4,
          comment: "Great experience working with this accounting firm. Very knowledgeable staff.",
          date: "2024-03-10"
        }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReviews = reviews.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE) || 1;
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  // editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: '', rating: 0, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      name: user?.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, review]);
    setNewReview({ name: user?.name || '', rating: 0, comment: '' });
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const startEdit = (review: Review) => {
    setEditingId(review.id);
    setEditData({ name: review.name, rating: review.rating, comment: review.comment });
  };

  const handleEditSave = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, ...editData } : r));
    setEditingId(null);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage(p => {
      if (direction === 'prev') return Math.max(1, p - 1);
      return Math.min(totalPages, p + 1);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight mb-4">What Our Clients Say</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">We value feedback. Read client stories or leave your own!</p>
        </div>

        {/* Review Form */}
        <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12 ring-1 ring-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={newReview.name}
                disabled
                className="mt-2 block w-full rounded-md bg-gray-100 border border-gray-300 px-4 py-2 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none transform transition-transform hover:scale-110"
                  >
                    {star <= newReview.rating ? (
                      <StarIcon className="h-8 w-8 text-yellow-400" />
                    ) : (
                      <StarOutlineIcon className="h-8 w-8 text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Your Review
              </label>
              <textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="mt-2 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 px-4 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Search */}
        <div className="mb-10 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 px-4 py-3"
          />
        </div>

        {/* Reviews List */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedReviews.map((review) => (
            <div key={review.id} className="relative bg-white/60 backdrop-blur-md ring-1 ring-gray-200 rounded-2xl shadow-lg p-6 group hover:shadow-2xl transition-shadow">
              {editingId === review.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 px-4 py-2"
                  />
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setEditData({ ...editData, rating: star })}>
                        {star <= editData.rating ? (
                          <StarIcon className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <StarOutlineIcon className="h-6 w-6 text-yellow-400" />
                        )}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editData.comment}
                    rows={3}
                    onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                    className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 px-4 py-2"
                  />
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditSave(review.id)} className="bg-green-600 text-white px-4 py-1.5 rounded-md shadow hover:bg-green-700 transition-colors">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-1.5 rounded-md shadow hover:bg-gray-500 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{review.comment}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => startEdit(review)} className="bg-blue-500/90 text-white px-4 py-1.5 rounded-md shadow hover:bg-blue-600 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(review.id)} className="bg-red-600/90 text-white px-4 py-1.5 rounded-md shadow hover:bg-red-700 transition-colors">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-14">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;