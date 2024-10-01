"use client"
import { useState } from "react"
import Search from "../Search/Search"

const PageSearch = () => {
    const [roomType, setRoomType] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div>
            <Search roomTypeFilter={roomType} searchQuery={searchQuery} setRoomTypeFilter={setRoomType} setSearchQuery={setSearchQuery} />
        </div>
    )
}

export default PageSearch