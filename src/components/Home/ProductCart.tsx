import Image from 'next/image';
import productImage from '../../../public/products_image.png'
import { Rate } from 'antd';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';

const ProductCart = () => {
    return (
        <div className=' relative'>
            <Link href="/product/777777"><Image src={productImage} height={500} width={500} alt='product' className='w-full h-[300px object-cover] cursor-pointer' /></Link>
            <IoIosHeartEmpty className=' bg-[#e6fbef] p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer' />
            <div className='mt-6 pb-2 md:pb-5'>
                <h2 className=' text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white'>Curology Product Set</h2>
                <div className=' flex flex-col md:flex-row items-start  md:text-lg md:items-center gap-0 md:gap-3 font-semibold'>
                    <p className=' text-primary mb-1 md:mb-0 text-md '>$500</p>
                    <Rate disabled defaultValue={4} />
                    <p className=' dark:text-white'>(120)</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;