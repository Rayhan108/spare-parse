import image from '../../../../../public/slide-image.png';
const SliderItem = () => {
    return (
        <div className="flex h-[400px]">
            <div className="w-[40%] bg-black flex flex-col justify-center items-center">
                <h1 className="text-white text-6xl">Up to 10%</h1>
                <h1 className="text-white text-6xl mt-4">off Voucher</h1>
            </div>
            <div className="w-[60%] h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${image.src})` }}>
            </div>
        </div>
    );
};

export default SliderItem;