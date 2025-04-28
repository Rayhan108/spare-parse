import ProductCart from "./ProductCart";

const ExploreProducts = () => {
    return (
        <div className="container mx-auto pb-20">
            <div className="flex gap-2 items-center mb-5">
                <span className="bg-primary h-10 px-[10px] rounded-md">
                </span>
                <p className="text-primary font-semibold text-lg">Our Products</p>
            </div>
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-5xl dark:text-white">Explore Our Products</h2>
            </div>
            <div className=" grid grid-cols-4 gap-10">
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
                <ProductCart></ProductCart>
            </div>
            <div className=" flex justify-center mt-10">
                <button className=" text-xl bg-primary px-16 py-4 text-white rounded cursor-pointer">View All Products</button>
            </div>
        </div>
    );
};

export default ExploreProducts;