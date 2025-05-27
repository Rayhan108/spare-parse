import Image from "next/image";
import productImage from '../../../../public/products/wheel3.svg'
import ordersIcon from '../../../../public/seller/orders-icon.svg'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const LastReviews = () => {
    const orders = [
        {
            id: 1,
            name: 'John Doe',
            date: 'Jun 10, 2025',
            productName: 'MRF Car Wheel Tyre 17/250',
            productDescription: 'The MRF 17/250 tyre appears to refer to a...',
            timeAgo: '34m ago',
            userImage: 'https://avatar.iran.liara.run/public/11', // Replace with your image path
            productImage: productImage, // Replace with your image path
        },
        {
            id: 2,
            name: 'John Doe',
            date: 'Jun 10, 2025',
            productName: 'MRF Car Wheel Tyre 17/250',
            productDescription: 'The MRF 17/250 tyre appears to refer to a...',
            timeAgo: '34m ago',
            userImage: 'https://avatar.iran.liara.run/public/9',
            productImage: productImage,
        },
        {
            id: 3,
            name: 'John Doe',
            date: 'Jun 10, 2025',
            productName: 'MRF Car Wheel Tyre 17/250',
            productDescription: 'The MRF 17/250 tyre appears to refer to a...',
            timeAgo: '34m ago',
            userImage: 'https://avatar.iran.liara.run/public/5',
            productImage: productImage,
        },
        {
            id: 4,
            name: 'John Doe',
            date: 'Jun 10, 2025',
            productName: 'MRF Car Wheel Tyre 17/250',
            productDescription: 'The MRF 17/250 tyre appears to refer to a...',
            timeAgo: '34m ago',
            userImage: 'https://avatar.iran.liara.run/public/12',
            productImage: productImage,
        },
        {
            id: 5,
            name: 'John Doe',
            date: 'Jun 10, 2025',
            productName: 'MRF Car Wheel Tyre 17/250',
            productDescription: 'The MRF 17/250 tyre appears to refer to a...',
            timeAgo: '34m ago',
            userImage: 'https://avatar.iran.liara.run/public/2',
            productImage: productImage,
        },
    ];

    return (
        <div className="border rounded-xl border-primary p-4 sm:p-6 my-8 max-w-full overflow-x-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
                <div className="flex items-center">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                        <Image
                            src={ordersIcon}
                            alt="Calendar"
                            width={48}
                            height={48}
                            className="bg-[#feefe6] p-1 sm:p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Last 5 Reviews</h2>
                        <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md">
                            See your recent product reviews
                        </p>
                    </div>
                </div>
                <div className="w-6 h-6 flex items-center justify-center">
                    <MdOutlineArrowForwardIos className="cursor-pointer" size={24} />
                </div>
            </div>

            <div className="border-t border-primary pt-2 sm:pt-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:gap-8 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
                    >
                        {/* Left side: user + product info */}
                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center w-full">
                            {/* User info */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={order?.userImage}
                                        alt={order?.name}
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{order?.name}</p>
                                    <p className="text-gray-500 text-sm">{order?.date}</p>
                                </div>
                            </div>

                            {/* Product info */}
                            <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                                    <Image
                                        src={order?.productImage}
                                        alt={order?.productName}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-gray-800 truncate">{order?.productName}</p>
                                    <p className="text-gray-500 text-sm truncate">{order?.productDescription}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right side: star rating */}
                        <div className="flex gap-1 items-center mt-3 sm:mt-0 flex-shrink-0 text-sm">
                            <FaStar className="text-yellow-400" size={20} />
                            <p>(5)</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastReviews;