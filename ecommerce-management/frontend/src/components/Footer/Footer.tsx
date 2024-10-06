import Link from "next/link"
import { BiMessageDetail } from "react-icons/bi"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"

const Footer = () => {
    return (
        <footer id="contact" className=" mt-16">
            <div className="container mx-auto px-4">
                <Link href={"/"} className=" font-black text-tertiary-dark">
                    Hotel
                </Link>
                <h4 className=" font-semibold text-[40px] py-6">Contact</h4>
                <div className=" flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex-1">
                        <p>Binh Tan District, Ho Chi Minh City</p>
                        <div className="flex items-center py-4">
                            <BsFillSendFill />
                            <p className="ml-2">duyduong365900it@gmail.com</p>
                        </div>
                        <div className="flex items-center ">
                            <BsTelephoneOutbound />
                            <p className="ml-2">0799608210</p>
                        </div>
                        <div className="flex items-center pt-4 ">
                            <BiMessageDetail />
                            <p className="ml-2">duyduong365900it@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex-1 md:text-right">
                        <p className=" pb-4">
                            Our Story
                        </p>
                        <p className=" pb-4">
                            Get in Touch
                        </p>
                        <p className=" pb-4">
                            Our Privacy Commitment
                        </p>
                        <p className=" pb-4">
                            Term of service
                        </p>
                        <p>Customer Assistance</p>
                    </div>
                    <div className="flex-1 md:text-right">
                        <p className="pb-4">
                            Dining Experience
                        </p>
                        <p className="pb-4">
                            Wellness
                        </p>
                        <p className="pb-4">
                            Fitness
                        </p>
                        <p className="pb-4">
                            Sports
                        </p>
                        <p>
                            Events
                        </p>
                    </div>
                </div>
            </div>
            <div className=" bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0"></div>
        </footer>
    )
}

export default Footer