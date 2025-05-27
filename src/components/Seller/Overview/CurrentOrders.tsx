import Image from "next/image";
import productImage from '../../../../public/products/wheel3.svg'
import ordersIcon from '../../../../public/seller/orders-icon.svg'
import { MdOutlineArrowForwardIos } from "react-icons/md";

const CurrentOrders = () => {
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
        <div className=" border rounded-xl border-primary p-6 my-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    {/* Calendar Icon */}
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                        <Image src={ordersIcon} alt="Calendar" width={200} height={200} className=" bg-[#feefe6] p-2 rounded-lg" /> {/* Replace with your icon path */}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Current Orders</h2>
                        <p className="text-gray-500">Manage your current orders and track booking orders.</p>
                    </div>
                </div>
                {/* Arrow Icon */}
                <div className="w-6 h-6 flex items-center justify-center">
                    <MdOutlineArrowForwardIos size={30} />
                </div>
            </div>

            <div className="border-t border-primary pt-4">
                {orders.map((order) => (
                    <div key={order.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden mr-4">
                            <Image src={order?.userImage} alt={order?.name} width={40} height={40} className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{order?.name}</p>
                            <p className=" text-gray-500">{order?.date}</p>
                        </div>
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-4 bg-gray-50 flex items-center justify-center">
                            <Image src={order?.productImage} alt={order?.productName} width={48} height={48} className="object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className=" font-semibold text-gray-800 truncate">{order?.productName}</p>
                            <p className="text-gray-500 truncate">{order?.productDescription}</p>
                        </div>
                        <div className="text-gray-400 ml-auto">{order?.timeAgo}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CurrentOrders;