import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { whoAmI } from '../../../api/auth';
import { fetchBookingsBasedOnAListing } from '../../../api/user';

function ManageService() {
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    // States for managing different sections
    const [activeTab, setActiveTab] = useState('bookings');
    const [showSignInModal, setShowSignInModal] = useState(false);

    // Mock data - replace with actual API calls
    const [serviceData, setServiceData] = useState({
        id: id,
        title: "Math Tutoring",
        description: "Offering help with calculus, linear algebra, and statistics.",
        price: 15,
        rating: 4.8,
        reviewsCount: 32,
        isActive: true
    });

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadBookings = async () => {
            if (!accessToken) return;
            try {
                const data = await fetchBookingsBasedOnAListing({
                    id,
                    accessToken,
                });
    
                if (data.error) {
                    console.error("Failed to fetch bookings:", data.error);
                    return;
                }
    
                setBookings(data.bookings || []);
                console.log(data.bookings);
            } catch (err) {
                console.error("Unexpected error while fetching bookings:", err);
            }
        };
    
        loadBookings();
    }, [id, accessToken]);

    const [analytics, setAnalytics] = useState({
        totalBookings: 15,
        completedBookings: 12,
        totalEarnings: 450,
        averageRating: 4.8,
        responseRate: 95,
        monthlyBookings: [
            { month: 'Jan', bookings: 3 },
            { month: 'Feb', bookings: 5 },
            { month: 'Mar', bookings: 7 }
        ]
    });

    // Critical action wrapper
    const withAuth = async (callback) => {
        if (!accessToken) {
            setShowSignInModal(true);
            return;
        }

        try {
            const authCheck = await whoAmI({ accessToken });
            if (!authCheck.authenticated) {
                setShowSignInModal(true);
                return;
            }
            callback();
        } catch (error) {
            console.error('Auth check failed:', error);
            setShowSignInModal(true);
        }
    };

    // Utility functions
    const formatDateTime = (isoString) => {
        return new Date(isoString).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    const handleBookingAction = (bookingId, action) => {
        setBookings(prev =>
            prev.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: action }
                    : booking
            )
        );
    };

    const handleSignIn = () => {
        setShowSignInModal(false);
        navigate('/signin');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/profile')}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Manage <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{serviceData.title}</span>
                                </h1>
                                <p className="text-gray-600 mt-1">Track bookings and manage your service</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Service Status</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${serviceData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium">{serviceData.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-1 bg-white/60 backdrop-blur rounded-xl p-1 border border-gray-200 mb-8 overflow-x-auto">
                    {[
                        { id: 'bookings', label: 'Bookings', icon: '📅' },
                        { id: 'analytics', label: 'Analytics', icon: '📊' },
                        { id: 'settings', label: 'Settings', icon: '⚙️' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                                }
              `}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content based on active tab */}
                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Pending', count: bookings.filter(b => b.status === 'pending').length, color: 'yellow' },
                                { label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length, color: 'blue' },
                                { label: 'Completed', count: bookings.filter(b => b.status === 'completed').length, color: 'green' },
                                { label: 'Total Earnings', count: `$${bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)}`, color: 'indigo' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent`}>
                                        {stat.count}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Bookings List */}
                        {/* customerId(client) is the an actual user object*/}
                        {/* listingId is populated by an actual object in the backend*/}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={booking.clientAvatar}
                                                alt={booking.customerId.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{booking.customerId.name}</h3>
                                                <p className="text-sm text-gray-600">test@vt.edu</p>
                                                <p className="text-sm text-blue-600 font-medium">{booking.listingId.serviceName}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Date & Time</p>
                                            <p className="font-medium">{formatDateTime(booking.timeSlot)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Duration & Price</p>
                                            <p className="font-medium">{booking.duration}h • ${booking.price}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Notes</p>
                                            <p className="font-medium text-gray-700">{booking.notes}</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {booking.status === 'pending' && (
                                        <div className="mt-4 flex gap-3">
                                            <button
      onClick={() => handleBookingAction(booking.id, 'confirmed')}
      className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
    >
      Confirm
    </button>
    <button
      onClick={() => handleBookingAction(booking.id, 'cancelled')}
      className="px-4 py-2 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
    >
      Decline
    </button>
                                        </div>
                                    )}

                                    {booking.status === 'confirmed' && (
                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() => handleBookingAction(booking.id, 'completed')}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
                                            >
                                                Mark Complete
                                            </button>
                                            <button
                                                onClick={() => handleBookingAction(booking.id, 'cancelled')}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Analytics Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Bookings', value: analytics.totalBookings, change: '+12%', color: 'blue' },
                                { label: 'Completion Rate', value: `${Math.round((analytics.completedBookings / analytics.totalBookings) * 100)}%`, change: '+5%', color: 'indigo' },
                                { label: 'Total Earnings', value: `${analytics.totalEarnings}`, change: '+18%', color: 'slate' },
                                { label: 'Average Rating', value: analytics.averageRating, change: '+0.1', color: 'blue' }
                            ].map((metric, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                                    <p className={`text-3xl font-bold bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 bg-clip-text text-transparent mb-1`}>
                                        {metric.value}
                                    </p>
                                    <p className="text-sm text-blue-600 font-medium">{metric.change} vs last month</p>
                                </div>
                            ))}
                        </div>

                        {/* Performance Insights */}
                        <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Monthly Booking Trends</h4>
                                    <div className="space-y-3">
                                        {analytics.monthlyBookings.map((month, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{month.month}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                                                            style={{ width: `${(month.bookings / 10) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{month.bookings}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Response Rate</span>
                                            <span className="text-sm font-medium text-green-600">{analytics.responseRate}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Average Session</span>
                                            <span className="text-sm font-medium text-gray-900">1.7 hours</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Repeat Clients</span>
                                            <span className="text-sm font-medium text-gray-900">67%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6">
                        {/* Service Settings */}
                        <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">Service Status</p>
                                        <p className="text-sm text-gray-600">Make your service visible to clients</p>
                                    </div>
                                    <button
                                        onClick={() => setServiceData(prev => ({ ...prev, isActive: !prev.isActive }))}
                                        className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                      ${serviceData.isActive ? 'bg-blue-500' : 'bg-gray-300'}
                    `}
                                    >
                                        <span className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                      ${serviceData.isActive ? 'translate-x-6' : 'translate-x-1'}
                    `} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">Auto-confirm bookings</p>
                                        <p className="text-sm text-gray-600">Automatically accept new booking requests</p>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">Email notifications</p>
                                        <p className="text-sm text-gray-600">Receive email alerts for new bookings</p>
                                    </div>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate(`/edit-listing/${listingId}`)}
                                    className="p-4 text-left bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Edit Service</p>
                                            <p className="text-sm text-gray-600">Update description, price, or photos</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="p-4 text-left bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Manage Availability</p>
                                            <p className="text-sm text-gray-600">Update your available time slots</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="p-4 text-left bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">View Analytics</p>
                                            <p className="text-sm text-gray-600">Detailed performance insights</p>
                                        </div>
                                    </div>
                                </button>

                                <button className="p-4 text-left bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Delete Service</p>
                                            <p className="text-sm text-gray-600">Permanently remove this listing</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sign In Required Modal */}
            {showSignInModal && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Sign In Required</h3>
                            <p className="text-gray-600 mb-6">Please sign in to manage your services</p>
                            <div className="flex gap-3">
                                <button
                                    className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200"
                                    onClick={() => setShowSignInModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageService;