"use client"

import { getRoom } from "@/libs/apis"
import useSWR from "swr"
import LoadingSpinner from "../../loading"
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery"
import { MdOutlineCleaningServices } from "react-icons/md"
import { LiaFireExtinguisherSolid } from "react-icons/lia"
import { AiOutlineMedicineBox } from "react-icons/ai"
import { GiSmokeBomb } from "react-icons/gi"
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { getStripe } from "@/libs/stripe"
import { useSession } from "next-auth/react"
const RoomDetails = (props: { params: { slug: string } }) => {
    const { params: { slug } } = props

    const [checkinDate, setCheckinDate] = useState<Date | null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Date | null>(null)
    const [adults, setAdults] = useState(1)
    const [numOfChildren, setNumOfChildren] = useState(0)
    const { status } = useSession();


    async function fetchData() {
        return getRoom(slug)
    }

    const calMinCheckoutDate = () => {
        if (checkinDate) {
            const nextDay = new Date(checkinDate)
            nextDay.setDate(nextDay.getDate() + 1)
            return nextDay
        }
        return null
    }

    const calNoOfDays = () => {
        if (!checkinDate || !checkoutDate)
            return;
        const timeDiff = checkoutDate.getTime() - checkinDate.getTime()
        const noOfDate = Math.ceil(timeDiff / (24 * 60 * 60 * 1000))
        return noOfDate
    }

    const { data: room, error, isLoading } = useSWR("/api/room", fetchData)
    if (error) throw new Error("Cannot fetch data");
    if (typeof room === "undefined" && !isLoading) throw new Error("Cannot fetch data");
    if (!room) return <LoadingSpinner />

    const handleBookNowClick = async () => {
        if (!checkinDate || !checkoutDate)
            return toast.error("Please provide checkin/ checkout Date")
        if (checkinDate > checkoutDate)
            return toast.error("Please choose a valid checkin period")
        if (status == "unauthenticated") {
            return toast.error("Please login your account before start booking")
        }
        const numberOfDays = calNoOfDays()

        const hotelRoomSlug = room.slug.current

        const stripe = await getStripe()

        try {
            const { data: stripeSession } = await axios.post('/api/stripe/', {
                checkinDate,
                checkoutDate,
                adults,
                children: numOfChildren,
                numberOfDays,
                hotelRoomSlug
            })

            if (stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: stripeSession.id,
                })

                if (result.error) {
                    toast.error("Payment Failed")
                }
            }

        } catch (error) {
            console.log("🚀 ~ Error:", error)
            toast.error("An Error ocurred")
        }
    }

    return (
        <div className="">
            <HotelPhotoGallery photos={room.images} />
            <div className=" container mx-auto mt-20">
                <div className=" md:grid grid-cols-12 gap-10 px-3">
                    <div className=" md:col-span-8 md:w-full">
                        <div>
                            <h2 className=" font-bold text-left text-lg md:text-2xl">
                                {room.name} {room.dimension}
                            </h2>
                            <div className=" flex my-11">
                                {room.offeredAmenities.map(amenity =>
                                    <div key={amenity._key} className=" md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                        <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                                        <p className=" text-xs md:text-base pt-3">{amenity.amenity}</p>
                                    </div>
                                )}
                            </div>
                            <div className=" mb-11">
                                <h2 className=" font-bold text-3xl mb-2">
                                    Description
                                </h2>
                                <p>{room.description}</p>
                            </div>
                            <div className=" mb-11">
                                <h2 className=" font-bold text-3xl mb-2">Offered Amenities</h2>
                                <div className=" grid grid-cols-2">
                                    {room.offeredAmenities.map(amenity =>
                                        <div key={amenity._key} className=" flex items-center md:my-0 my-1">
                                            <i className={`fa-solid ${amenity.icon}`}></i>
                                            <p className=" text-xs md:text-base ml-2">{amenity.amenity}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=" mb-11">
                                <h2 className=" font-bold text-3xl mb-2">Safe And Hygiene</h2>
                                <div className=" grid grid-cols-2">
                                    <div className=" flex items-center my-1 md:my-0 ">
                                        <MdOutlineCleaningServices />
                                        <p className=" ml-2 md:text-base text-xs">
                                            Daily Cleaning
                                        </p>
                                    </div>
                                    <div className=" flex items-center my-1 md:my-0 ">
                                        <LiaFireExtinguisherSolid />
                                        <p className=" ml-2 md:text-base text-xs">
                                            Fire Extinguisher
                                        </p>
                                    </div>
                                    <div className=" flex items-center my-1 md:my-0 ">
                                        <AiOutlineMedicineBox />
                                        <p className=" ml-2 md:text-base text-xs">
                                            Disinfection and Sterilizations
                                        </p>
                                    </div>
                                    <div className=" flex items-center my-1 md:my-0 ">
                                        <GiSmokeBomb />
                                        <p className=" ml-2 md:text-base text-xs">
                                            Smoke Detector
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className=" shadow dark:shadow-white rounded-lg p-6">
                                <div className=" items-center mb-4">
                                    <p className=" md:text-lg font-semibold">
                                        Customer Reviews
                                    </p>
                                </div>
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className=" md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
                        {/* Book room CTA */}
                        <BookRoomCta
                            discount={room.discount}
                            price={room.price}
                            specialNote={room.specialNote}
                            checkinDate={checkinDate}
                            checkoutDate={checkoutDate}
                            adults={adults}
                            numOfChildren={numOfChildren}
                            isBooked={room.isBooked}
                            setCheckinDate={setCheckinDate}
                            setCheckoutDate={setCheckoutDate}
                            calMinCheckoutDate={calMinCheckoutDate}
                            setNumOfChildren={setNumOfChildren}
                            setAdults={setAdults}
                            handleBookNowClick={handleBookNowClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails
