import { IoArrowForward } from 'react-icons/io5';
import image from '../../../../../public/slide-image.png';
const SliderItem = () => {
    return (
        <div className="flex h-[400px]">
            <div className="w-[40%] bg-black flex flex-col justify-center pl-18">
                <div>
                    <h1 className="text-white text-6xl font-semibold">Up to 10%</h1>
                    <h1 className="text-white text-6xl font-semibold mt-4">off Voucher</h1>
                </div>
                <div>
                    <div className=' flex gap-1 items-center mt-12'>
                        <button className=' text-white border-b-2 py-2 border-white text-lg cursor-pointer'>Shop Now</button>
                        <IoArrowForward size={25} className=' text-white' />
                    </div>
                </div>

            </div>
            <div className="w-[60%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}>
            </div>
        </div>
    );
};

export default SliderItem;