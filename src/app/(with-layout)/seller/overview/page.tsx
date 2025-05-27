import Image from 'next/image';
import logo from '../../../../../public/seller/seller-icon.svg'
import { LuCalendarCheck } from 'react-icons/lu';
import { PiWallet } from 'react-icons/pi';
import CurrentOrders from '@/components/Seller/Overview/CurrentOrders';

const Overview = () => {


    return (
        <div className=" container mx-auto px-4 md:px-0 py-8 md:py-16">
            <div className=' flex items-center gap-5'>
                <Image src={logo} width={400} height={400} alt='logo' className=' w-22 rounded-full' />
                <div>
                    <h1 className=' text-3xl sm:text-4xl font-semibold'>Welcome Back, Hatem!</h1>
                    <p className=' mt-1'>Here’s an overview of your business performance and activities today.</p>
                </div>
            </div>

            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
                <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg text-gray-600 mb-2">Current Orders</p>
                        <p className="text-3xl font-bold">05</p>
                    </div>
                    <div className="bg-primary rounded-full p-3">
                        <LuCalendarCheck className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg text-gray-600 mb-2">Available Balance</p>
                        <p className="text-3xl font-bold">$450</p>
                    </div>
                    <div className="bg-primary rounded-full p-3">
                        <PiWallet className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="px-4 py-8 border border-primary rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-lg text-gray-600 mb-2">Total Orders</p>
                        <p className="text-3xl font-bold">500</p>
                    </div>
                    <div className="bg-primary rounded-full p-3">
                        <LuCalendarCheck className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            <div>
                <CurrentOrders></CurrentOrders>
            </div>
        </div>
    );
};

export default Overview;