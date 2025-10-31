'use client';

import { useState, useEffect } from 'react';
import type { Game } from '@/lib/games';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

interface GameRatingProps {
  game: Game;
}

export default function GameRating({ game }: GameRatingProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [userName, setUserName] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Mock review data
  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: '1',
        userName: 'Gamer2023',
        rating: 5,
        comment: 'Amazing game! Beautiful visuals and smooth controls. Highly recommended!',
        date: '2024-01-15',
        likes: 12
      },
      {
        id: '2',
        userName: 'GameMaster',
        rating: 4,
        comment: 'Great gameplay and fun mechanics, a bit challenging in later levels.',
        date: '2024-01-10',
        likes: 8
      },
      {
        id: '3',
        userName: 'CasualPlayer',
        rating: 4,
        comment: 'Perfect for short breaks — very relaxing.',
        date: '2024-01-08',
        likes: 5
      }
    ];

    // 从localStorage获取评论
    if (typeof window !== 'undefined') {
      const savedReviews = localStorage.getItem(`reviews-${game.id}`);
      if (savedReviews) {
        const parsedReviews = JSON.parse(savedReviews);
        setReviews([...mockReviews, ...parsedReviews]);
      } else {
        setReviews(mockReviews);
      }
    }
  }, [game.id]);

  useEffect(() => {
    // Calculate average rating
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      setAverageRating(Math.round(avg * 10) / 10);
    }
  }, [reviews]);

  const handleSubmitReview = () => {
    if (!userName.trim() || !userComment.trim() || userRating === 0) {
      alert('Please fill in all review fields');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: userName.trim(),
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      const userReviews = updatedReviews.filter(r => !['1', '2', '3'].includes(r.id));
      localStorage.setItem(`reviews-${game.id}`, JSON.stringify(userReviews));
    }

    // Reset form
    setUserName('');
    setUserComment('');
    setUserRating(0);
    setShowReviewForm(false);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md', interactive = false) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && setUserRating(star)}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
            disabled={!interactive}
          >
            <svg
              fill={star <= rating ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              className={star <= rating ? 'text-yellow-400' : 'text-gray-400'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  const handleLike = (reviewId: string) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, likes: review.likes + 1 }
        : review
    ));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <span className="text-yellow-400 mr-2">⭐</span>
          Game Reviews
        </h2>

        {/* Overall rating */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{averageRating}</div>
            <div className="flex items-center justify-center">
              {renderStars(averageRating, 'sm')}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {reviews.length} reviews
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <span>✍️</span>
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Review form */}
      {showReviewForm && (
        <div className="bg-muted/20 border border-border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Write your review</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nickname
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {renderStars(userRating, 'lg', true)}
                <span className="text-muted-foreground ml-2">
                  {userRating > 0 ? `${userRating} stars` : 'Click the stars to rate'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your review
              </label>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSubmitReview}
                className="btn-primary"
              >
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Player Reviews</h3>

        {reviews.map((review) => (
          <div key={review.id} className="bg-muted/10 border border-border/50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{review.userName}</div>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating, 'sm')}
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {review.comment}
                </p>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(review.id)}
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-sm">{review.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
