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
       listingToBeUpdated.cloudStoredImages = listingToBeUpdated.cloudStoredImages.filter((image => image.public_id === imageToBeRemovedId));
       setImagesToDelete((prev) => [...prev, imageToBeRemovedId]);
    };

    const parseTime = (isoTime) => {
        return new Date(isoTime).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true })
    
      };

    return (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white w-[90%] max-w-2xl p-6 rounded-xl shadow-xl">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Service Listing</h2>
                        <button onClick={() => setEditListing(false)} className="text-gray-400 hover:text-gray-800 text-2xl">
                            &times;
                        </button>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">
                        {/* Section: Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-medium text-gray-700">Your Name</label>
                                <input name="name" type="text" required className="input input-bordered w-full" value={listingToBeUpdated.serviceProvider} onChange={handleChange} />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700">Service Title</label>
                                <input name="service" type="text" required className="input input-bordered w-full" value={listingToBeUpdated.serviceName} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Section: Price */}
                        <div>
                            <label className="block text-m font-medium text-gray-700">Rate per Hour ($)</label>
                            <input name="price" type="number" min="1" required className="input input-bordered w-full" value={listingToBeUpdated.ratePerHr} onChange={handleChange} />
                        </div>

                        {/* Section: Description */}
                        <div>
                            <label className="block text-m font-medium text-gray-700">Service Description</label>
                            <textarea name="description" rows="4" required className="textarea textarea-bordered w-full" placeholder="What do you offer, and who is it for?" value={listingToBeUpdated.description} onChange={handleChange} />
                        </div>

                        {/* Add your custom time slots, service options, or image section here if needed */}
                        <div className="space-y-2">
                            <label className="block text-m font-medium text-gray-700">Available Time Slots</label>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Add Available Time Slots</label>

                                <div className="flex gap-2">
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered w-full"
                                        placeholder="Select a date and time"
                                        id="date-time-input"
                                        value={timeSlot}
                                        onChange={(event) => {
                                            setTimeSlot(event.target.value);
                                        }}
                                    />


                                    <button type="button" className="btn btn-primary" onClick={() => {
                                        //const value = document.getElementById("date-time-input").value;
                                        const updatedTimeSlots = [...timeSlots, timeSlot]
                                        setTimeSlots(updatedTimeSlots);
                                        setListingToBeUpdated(prev => ({
                                            ...prev,
                                            timeSlotsAv: updatedTimeSlots
                                        }));
                                        console.log("Time Slot", timeSlot)
                                        console.log("Time Slots", timeSlots);
                                    }}>
                                        Add
                                    </button>
                                </div>

                                {/* Display of added time slots — can later be connected to state */}
                                <div className="flex flex-col gap-2 mt-2">
                                    {timeSlots.map((slot, index) => (
                                        <div key={index} className="p-2 rounded-lg border bg-gray-50 text-sm text-gray-700">{parseTime(slot)}</div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="space-y-2">

                            <div>
                                <label className="block text-m font-medium text-gray-700 pb-2">Service Options</label>
                                <div className="space-y-2">
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
                                                className="input input-bordered w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newOptions = [...serviceOptions];
                                                    newOptions.splice(index, 1); // remove this item
                                                    setServiceOptions(newOptions);
                                                }}
                                                className="btn btn-error btn-sm"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}

                                    {/* Add new input */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline mt-1"
                                        onClick={() => {
                                            setServiceOptions([...serviceOptions, ""])
                                            //console.log(serviceOptions);
                                        }}
                                    >
                                        + Add
                                    </button>
                                </div>

                            </div>

                            <label className="block text-m font-medium text-gray-700">Service Images</label>

                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                className="file-input file-input-bordered w-full"
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
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                {/* Cloud images */}
                                {cloudStoredImages.map((image, index) => (
                                    <div key={`cloud-${index}`} className="relative border rounded-lg overflow-hidden aspect-square">
                                        <img src={image.url} alt={`Cloud ${index + 1}`} className="object-cover w-full h-full" />
                                        <button
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
                                            onClick={() => {
                                                handleCloudStoredImages(image.url);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                {/* Local selected images */}
                                {selectedImages.map((file, index) => (
                                    <div key={`local-${index}`} className="relative border rounded-lg overflow-hidden aspect-square">
                                        <img src={URL.createObjectURL(file)} alt={`Selected ${index + 1}`} className="object-cover w-full h-full" />
                                        <button
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
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
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" onClick={() => setEditListing(false)} className="btn btn-ghost">
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();
                                handleSubmission(); // <-- this triggers the update handler you’ll implement
                                //i might take the handleSubmission route

                            }} disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showEditSuccess && (
                <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
                        <h3 className="font-bold text-lg text-green-600">Success!</h3>
                        <p className="py-4">Your listing has been updated successfully.</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    setShowEditSuccess(false);
                                    setEditListing(false);
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default ListingEdit
