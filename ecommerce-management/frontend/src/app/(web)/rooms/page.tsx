"use client"

import { getRooms } from "@/libs/apis"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { Room } from "@/models/room"
import Search from "@/components/Search/Search"
import RoomsCard from "@/components/RoomsCard/RoomsCard"

const Rooms = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get("searchQuery")
        const roomType = searchParams.get("roomType")

        if (roomType) setRoomTypeFilter(roomType);
        if (searchQuery) setSearchQuery(searchQuery)

    }, [])

    async function fetchData() {
        return getRooms()
    }

    const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData)

    if (error) throw new Error("Cannot fetch data");
    if (typeof data === "undefined" && !isLoading) throw new Error("Cannot fetch data");

    const filterRooms = (rooms: Room[]) => {
        return rooms.filter(room => {
            if (roomTypeFilter && roomTypeFilter.toLowerCase() != 'all' && room.type.toLowerCase() !== roomTypeFilter.toLowerCase()) {
                return false
            }

            if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }
            return true
        })
    }

    const filteredRooms = filterRooms(data || [])

    return (
        <div className=" container mx-auto pt-10">
            <Search roomTypeFilter={roomTypeFilter} searchQuery={searchQuery} setRoomTypeFilter={setRoomTypeFilter} setSearchQuery={setSearchQuery} />
            <div className=" flex mt-20 gap-[20px] flex-wrap ">
                {filteredRooms.map(room => (
                    <RoomsCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    )
}

export default Rooms