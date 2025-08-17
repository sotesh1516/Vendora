import React, { useState } from 'react'
import { editListing } from '../../../api/listing';

function ListingEdit({ listing, setEditListing }) {

    //state to keep track of service option for a single listing
    const [serviceOptions, setServiceOptions] = useState(listing.serviceOptions);

    //state for keeping track of time slots
    const [timeSlots, setTimeSlots] = useState([]);

    //state for controlling single timeslot pick
    const [timeSlot, setTimeSlot] = useState(listing.timeSlots);

    //state for keeping track of the added images
    const [selectedImages, setSelectedImages] = useState([]);

    //state for keeping track of cloud stored images
    const [cloudStoredImages, setCloudStoredImages] = useState(listing.cloudStoredImages);

    //state to signify the success of edition
    const [showEditSuccess, setShowEditSuccess] = useState(false);

    //state to signify that the edition is in the process
    const [isSubmitting, setIsSubmitting] = useState(false);

    //state to save the urls of images to delete from cloudinary
    const [imagesToDelete, setImagesToDelete] = useState([]);


    const [listingToBeUpdated, setListingToBeUpdated] = useState({
        serviceProvider: listing.serviceProvider,
        serviceName: listing.serviceName,
        serviceOptions: serviceOptions,
        timeSlots: timeSlots,
        ratePerHr: listing.ratePerHr,
        description: listing.description,
        ratings: listing.ratings,
        //avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
        cloudStoredImages: cloudStoredImages,
        images: selectedImages,
        imagesToDelete: imagesToDelete,
    });

    let numberOfTotalImages = listingToBeUpdated.cloudStoredImages.length + listingToBeUpdated.images.length;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setListingToBeUpdated({ ...listingToBeUpdated, [name]: value });
    }

    const handleSubmission = async () => {
        try {
            //might need to implement editListing
            setIsSubmitting(true);
            const updateInfo = {
                id: listing._id,
                updatedListing: listingToBeUpdated
            };

            const result = await editListing(updateInfo);

            if (result && result.listing) {
                setIsSubmitting(false);
                setShowEditSuccess(true);
            }
        } catch (error) {

        }
    };

    const handleCloudStoredImages = (imageToBeRemovedId) => {
        const updatedCloudImages = cloudStoredImages.filter(image => image.public_id !== imageToBeRemovedId);
        setCloudStoredImages(updatedCloudImages);
        setImagesToDelete((prev) => [...prev, imageToBeRemovedId]);

        // Update the main listing object to keep it in sync
        setListingToBeUpdated(prev => ({
            ...prev,
            cloudStoredImages: updatedCloudImages,
            imagesToDelete: [...prev.imagesToDelete, imageToBeRemovedId]
        }));
    };

    const parseTime = (isoTime) => {
        return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })

    };

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-200 p-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Edit Service Listing
                        </h2>
                        <button
                            onClick={() => setEditListing(false)}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <form className="p-6 space-y-6">
                        {/* Section: Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    value={listingToBeUpdated.serviceProvider}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                                <input
                                    name="service"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    value={listingToBeUpdated.serviceName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Section: Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rate per Hour ($)</label>
                            <input
                                name="price"
                                type="number"
                                min="1"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                value={listingToBeUpdated.ratePerHr}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Section: Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                                placeholder="What do you offer, and who is it for?"
                                value={listingToBeUpdated.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Time Slots Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Available Time Slots</label>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="datetime-local"
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                    placeholder="Select a date and time"
                                    id="date-time-input"
                                    value={timeSlot}
                                    onChange={(event) => {
                                        setTimeSlot(event.target.value);
                                    }}
                                />

                                <button
                                    type="button"
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                                    onClick={() => {
                                        //const value = document.getElementById("date-time-input").value;
                                        const updatedTimeSlots = [...timeSlots, timeSlot]
                                        setTimeSlots(updatedTimeSlots);
                                        setListingToBeUpdated(prev => ({
                                            ...prev,
                                            timeSlotsAv: updatedTimeSlots
                                        }));
                                        console.log("Time Slot", timeSlot)
                                        console.log("Time Slots", timeSlots);
                                    }}
                                >
                                    Add
                                </button>
                            </div>

                            {/* Display of added time slots — can later be connected to state */}
                            <div className="space-y-2">
                                {timeSlots.map((slot, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-white/80 border border-gray-200 text-sm text-gray-700">
                                        {parseTime(slot)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Service Options Section */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Options</label>

                            <div className="space-y-3">
                                {/* Map each input on its own row */}
                                {serviceOptions.map((service, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            name="serviceOptions[]"
                                            placeholder="e.g., Algebra, Calculus..."
                                            value={service}
                                            onChange={(e) => {
                                                const newOptions = [...serviceOptions];
                                                newOptions[index] = e.target.value;
                                                setServiceOptions(newOptions);  // even if i come back to change one input, the entire state array gets updated
                                            }}
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newOptions = [...serviceOptions];
                                                newOptions.splice(index, 1); // remove this item
                                                setServiceOptions(newOptions);
                                            }}
                                            className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}

                                {/* Add new input */}
                                <button
                                    type="button"
                                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors duration-200"
                                    onClick={() => {
                                        setServiceOptions([...serviceOptions, ""])
                                        //console.log(serviceOptions);
                                    }}
                                >
                                    + Add Option
                                </button>
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Images</label>

                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) => {
                                    //A filelist is an array like objects 
                                    //need to convert (or destructure/spread) that FileList into individual File objects 
                                    // before merging with your existing selectedImages array
                                    //Array.from takes in an array like object and converts to an array
                                    const files = Array.from(e.target.files);
                                    const newTotal = selectedImages.length + files.length;
                                    const grandTotal = newTotal + listingToBeUpdated.cloudStoredImages.length;

                                    if (grandTotal > 3) {
                                        alert(`Please select exactly 3 images.`);
                                        // Clear the file input
                                        e.target.value = "";
                                        return;
                                    }
                                    else if (grandTotal < 3) {
                                        alert(`Please select exactly 3 images. You currently have ${grandTotal} image(s).`);
                                    }

                                    setSelectedImages((prev) => [...prev, ...files]);
                                    console.log(selectedImages);
                                }}
                            />

                            {/* Combined Preview Grid */}
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {/* Cloud images */}
                                {cloudStoredImages.map((image, index) => (
                                    <div key={`cloud-${index}`} className="relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                                        <img src={image.url} alt={`Cloud ${index + 1}`} className="object-cover w-full h-full rounded-xl" />
                                        <button
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-sm font-bold transition-all duration-200"
                                            onClick={() => {
                                                handleCloudStoredImages(image.public_id);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Local selected images */}
                                {selectedImages.map((file, index) => (
                                    <div key={`local-${index}`} className="relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                                        <img src={URL.createObjectURL(file)} alt={`Selected ${index + 1}`} className="object-cover w-full h-full rounded-xl" />
                                        <button
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-sm font-bold transition-all duration-200"
                                            onClick={() => {
                                                setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setEditListing(false)}
                                className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmission(); // <-- this triggers the update handler you'll implement
                                    //i might take the handleSubmission route
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </div>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showEditSuccess && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 w-[90%] max-w-md rounded-2xl shadow-2xl border border-gray-200">
                        <div className="text-center p-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="font-bold text-2xl text-green-600 mb-2">Success!</h3>
                            <p className="text-gray-600 mb-6">Your listing has been updated successfully.</p>
                            <button
                                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                                onClick={() => {
                                    setShowEditSuccess(false);
                                    setEditListing(false);
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListingEdit