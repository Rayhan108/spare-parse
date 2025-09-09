
const ProductSkeleton = () => {
    return (
        <>
            <div className='relative'>
                {/* Skeleton for Product Image */}
                <div className='bg-gray-200 w-full h-[300px] rounded-md animate-pulse'></div>

                {/* Skeleton for Heart Icon */}
                <div className='bg-gray-200 p-2 w-10 h-10 rounded-full top-2 right-2 absolute animate-pulse'></div>

                {/* Skeleton for Title */}
                <div className='mt-6 pb-2 md:pb-5'>
                    <div className='bg-gray-200 h-6 w-3/4 rounded mb-4 animate-pulse'></div>

                    {/* Skeleton for Price, Rating, and Reviews */}
                    <div className='flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-3 font-semibold'>
                        <div className='bg-gray-200 h-6 w-1/4 rounded animate-pulse'></div>
                        <div className='bg-gray-200 h-6 w-16 rounded animate-pulse'></div>
                        <div className='bg-gray-200 h-6 w-16 rounded animate-pulse'></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSkeleton;
