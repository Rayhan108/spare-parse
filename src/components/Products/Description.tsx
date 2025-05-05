import Image from "next/image";
import product from '../../../public/product_bg.png'

const Description = () => {
    return (
        <div className="p-6 mb-10">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Product Description</h2>
                    <p className="text-gray-700 mb-6">
                        Experience peak performance and durability with the WP 17/20 Car Wheel Tyre, engineered for optimal
                        driving confidence. With its robust construction and superior tread design, this tyre delivers
                        excellent road grip, stability, and comfort. Whether you&apos;re navigating city streets or cruising down
                        highways, the WP 17/20 provides a smooth, safe, and fuel-efficient ride. Built to last, it&apos;s the
                        perfect combination of strength and style for modern vehicles.
                    </p>

                    <h2 className="text-lg font-semibold mb-4">Product Details:</h2>
                    <ul className="space-y-2 text-gray-700 mb-6">
                        <li>• Tyre Size: 17/20</li>
                        <li>• Rim Diameter: 17 inches</li>
                        <li>• Tyre Width: 280 mm</li>
                        <li>• Tread Design: All-terrain pattern for maximum grip</li>
                        <li>• Made of: High-quality rubber compounds</li>
                        <li>• Load Capacity: [To be specified based on vehicle]</li>
                        <li>• Compatibility: Suitable for sedans, hatchbacks, and compact SUVs</li>
                        <li>• Durability: Designed for long-lasting wear with reinforced sidewalls</li>
                        <li>• Warranty: [If applicable, e.g. 1-year manufacturer warranty]</li>
                        <li>• Certification: Certified to all local & regional standards</li>
                    </ul>

                    <h2 className="text-lg font-semibold mb-4">Why You&apos;ll Love It:</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Superior traction on dry and wet roads</li>
                        <li>• Durable and resistant to punctures and wear</li>
                        <li>• Low road noise and enhanced ride comfort</li>
                        <li>• Fuel-efficient design with low rolling resistance</li>
                        <li>• Ideal for everyday use and weekend getaways</li>
                        <li>• Manufactured by WP — a trusted name in tyre innovation</li>
                        <li>• Backed by rigorous quality testing and safety standards</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center">
                    <Image
                        src={product}
                        alt="WP 17/20 Car Wheel Tyre"
                        width={400}
                        height={400}
                        className="rounded-md w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Description;