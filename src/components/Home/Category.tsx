import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Category = () => {
    return (
        <div className=" container mx-auto py-32">
            <div className="flex gap-2 items-center mb-5">
                <span className=" bg-primary h-10 px-[10px] rounded-md">
                </span>
                <p className=" text-primary font-semibold text-lg">Categories</p>
            </div>
            <div className=" flex justify-between items-center">
                <h2 className=" text-5xl">Browse By Category</h2>
                <div className=" flex items-center gap-4">
                    <button className="bg-[#f5f5f5] p-2 rounded-full">
                        <FiArrowLeft size={35} className=" cursor-pointer" />
                    </button>
                    <button className="bg-[#f5f5f5] p-2 rounded-full">
                        <FiArrowRight size={35} className=" cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;