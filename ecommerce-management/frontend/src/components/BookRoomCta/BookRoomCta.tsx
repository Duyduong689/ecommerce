import { Dispatch, FC, SetStateAction } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    price: number,
    discount: number
    specialNote: string,
    checkinDate: Date | null,
    checkoutDate: Date | null,
    adults: number,
    children: number,
    isBooked: boolean,
    calMinCheckoutDate: () => Date | null,
    setCheckinDate: Dispatch<SetStateAction<Date | null>>,
    setCheckoutDate: Dispatch<SetStateAction<Date | null>>,
    setAdults: Dispatch<SetStateAction<number>>,
    setChildren: Dispatch<SetStateAction<number>>,
    handleBookNowClick: () => void
}

const BookRoomCta: FC<Props> = (props) => {
    const { price, discount, specialNote, checkinDate, checkoutDate, adults, children, isBooked, setCheckinDate, setCheckoutDate, calMinCheckoutDate, setAdults, setChildren, handleBookNowClick } = props

    const discountPrice = price - (price / 100) * discount

    const calNoOfDays = () => {
        if (!checkinDate || !checkoutDate)
            return 0;
        const timeDiff = checkoutDate.getTime() - checkinDate.getTime()
        const noOfDate = Math.ceil(timeDiff / (24 * 60 * 60 * 1000))
        return noOfDate
    }

    return (
        <div className=" px-7 py-6 ">
            <h3>
                <span className={`${discount ? "text-gray-400" : ""} font-bold text-xl`}>
                    $ {price}
                </span>
                {discount ?
                    <span className=" font-bold text-xl">{" "} | discount $ {discount}%. Now <span className=" text-tertiary-dark">$ {discountPrice}</span>
                    </span>
                    :
                    ""
                }
            </h3>
            <div className=" w-full border-b-2 border-b-secondary my-2"></div>

            <div >
                {specialNote}
            </div>
            <div className="flex">
                <div className=" w-1/2 pr-2">
                    <label htmlFor="check-in-date" className=" block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Check In date
                    </label>
                    <DatePicker selected={checkinDate} onChange={date => setCheckinDate(date)} dateFormat={"dd/MM/yyyy"} minDate={new Date()}
                        popperProps={{ strategy: 'fixed' }}
                        id="check-in-date" className=" w-full border text-black  rounded-lg p-2.5 focus:ring-primary focus:border-primary" />
                </div>
                <div className=" w-1/2 pl-2">
                    <label htmlFor="check-out-date" className=" block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Check Out date
                    </label>
                    <DatePicker selected={checkoutDate} onChange={date => setCheckoutDate(date)} dateFormat={"dd/MM/yyyy"} minDate={calMinCheckoutDate()!} disabled={!checkinDate}
                        popperProps={{ strategy: 'fixed' }}
                        id="check-out-date" className=" w-full border text-black  rounded-lg p-2.5 focus:ring-primary focus:border-primary" />
                </div>
            </div>

            <div className=" flex mt-4">
                <div className="w-1/2 pr-2">
                    <label htmlFor="adults" className=" block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Adults
                    </label>
                    <input type="number" id="adults"
                        min={1}
                        max={5}
                        value={adults}
                        onChange={(e) => setAdults(+(e.target.value))}
                        className=" w-full border border-gray-300 rounded-lg p-2.5"
                    />
                </div>
                <div className="w-1/2 pl-2">
                    <label htmlFor="children" className=" block text-sm font-medium text-gray-900 dark:text-gray-400">
                        Children
                    </label>
                    <input type="number" id="children"
                        min={0}
                        max={5}
                        value={children}
                        onChange={(e) => setChildren(+(e.target.value))}
                        className=" w-full border border-gray-300 rounded-lg p-2.5"
                    />
                </div>
            </div>

            {calNoOfDays() > 0 ? <p className=" mt-3">
                Total Price: $ {calNoOfDays() * price}
            </p> : ""}

            <button className=" btn-primary w-full mt-6 disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={isBooked}
                onClick={handleBookNowClick}
            >
                {isBooked ? "Booked" : "Book Now"}
            </button>
        </div>

    )
}

export default BookRoomCta