import delivery from '../../../public/service/delivery.svg'
import customer_service from '../../../public/service/customer_service.svg'
import money_back from '../../../public/service/money_back.svg'
import Image from 'next/image';

const ServiceFeatures = () => {
    return (
        <div className=' w-[1100px] mx-auto pt-10 pb-32'>
            <div className=' flex justify-between'>
                <div className=' flex flex-col justify-center items-center'>
                    <Image src={delivery} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                    <h2 className=' text-xl font-bold mb-2'>FREE AND FAST DELIVERY</h2>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className=' flex flex-col justify-center items-center'>
                    <Image src={customer_service} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                    <h2 className=' text-xl font-bold mb-2'>24/7 CUSTOMER SERVICE</h2>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div className=' flex flex-col justify-center items-center'>
                    <Image src={money_back} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                    <h2 className=' text-xl font-bold mb-2'>MONEY BACK GUARANTEE</h2>
                    <p>We reurn money within 30 days</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceFeatures;