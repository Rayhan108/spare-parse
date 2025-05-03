import image from '../../../public/product_bg.png'
import image2 from '../../../public/product_bg2.png'

const NewArrival = () => {
    return (
        <div className="container mx-auto pb-5 md:pb-20">
            <div className="flex gap-2 items-center mb-5">
                <span className="bg-primary h-10 px-[10px] rounded-md">
                </span>
                <p className="text-primary font-semibold text-lg">Featured</p>
            </div>
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-5xl dark:text-white">New Arrival</h2>
            </div>
            <div className=' flex flex-col lg:flex-row gap-10'>
                <div className="lg:w-1/2 h-[500px] lg:h-[800px] bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image.src})` }}>
                    <div className=' absolute bottom-10 left-8 text-white'>
                        <h2 className=' text-4xl mb-5'>New Alloy Reem</h2>
                        <p className=' text-xl text-[#FAFAFA]'>Silver and White version alloy</p>
                        <p className=' text-xl text-[#FAFAFA]'>reem for the on road.</p>
                        <button className=' text-2xl border-b border-white mt-5'>Shop Now</button>
                    </div>
                </div>
                <div className='lg:w-1/2 h-[800px] flex flex-col gap-10'>
                    <div className="w-full h-[400px] bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image2.src})` }}>
                        <div className=' absolute bottom-10 left-8 text-white'>
                            <h2 className=' text-4xl mb-5'>New Alloy Reem</h2>
                            <p className=' text-xl text-[#FAFAFA]'>Silver and White version alloy reem</p>
                            <p className=' text-xl text-[#FAFAFA]'>for the on road.</p>
                            <button className=' text-2xl border-b border-white mt-5'>Shop Now</button>
                        </div>
                    </div>

                    <div className=' flex flex-row gap-5 sm:gap-10'>
                        <div className="w-1/2 h-[300px] sm:h-[400px] bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image.src})` }}>
                            <div className=' absolute bottom-10 left-3 sm:left-8 text-white'>
                                <h2 className=' text-xl mb-1'>New Alloy Reem</h2>
                                <p className=' text-sm text-[#FAFAFA]'>Silver and White version alloy</p>
                                <p className=' text-sm text-[#FAFAFA]'>reem for the on road.</p>
                                <button className=' text-lg border-b border-white mt-1'>Shop Now</button>
                            </div>
                        </div>
                        <div className="w-1/2 h-[300px] sm:h-[400px] bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${image.src})` }}>
                            <div className=' absolute bottom-10 left-3 sm:left-8 text-white'>
                                <h2 className=' text-xl mb-1'>New Alloy Reem</h2>
                                <p className=' text-sm text-[#FAFAFA]'>Silver and White version alloy</p>
                                <p className=' text-sm text-[#FAFAFA]'>reem for the on road.</p>
                                <button className=' text-lg border-b border-white mt-1'>Shop Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrival;