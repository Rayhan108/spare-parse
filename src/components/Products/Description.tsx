/* eslint-disable @typescript-eslint/no-explicit-any */
// import Image from "next/image";
// import product from '../../../public/product_bg.png'

const Description = ({description}:any) => {
    return (
        <div className="p-6 mb-10 dark:text-white">
            {description}
           
        </div>
    );
};

export default Description;