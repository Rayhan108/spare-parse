import Image from 'next/image';
import productImage from '../../../public/products_image.png'
import { Rate } from 'antd';

const ProductCart = () => {
    return (
        <div>
            <Image src={productImage} height={500} width={500} alt='product' className='w-full h-[300px object-cover]' />
            <div className='mt-6 pb-5'>
                <h2 className=' text-xl mb-4 font-semibold dark:text-white'>Curology Product Set</h2>
                <div className=' flex text-lg items-center gap-3 font-semibold'>
                    <p className=' text-primary'>$500</p>
                    <Rate disabled defaultValue={4} />
                    <p className=' dark:text-white'>(120)</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;