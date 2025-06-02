import { Select } from "antd";

const SelectYourVehicle = () => {
    return (
        <div className=" container mx-auto shadow-md border-t-[10px] border-t-[#f56100] border-b border-b-[#FCCEB0] border-r border-r-[#FCCEB0] border-l border-l-[#FCCEB0] py-14 mt-10">
            <div className="text-center">
                <h2 className="text-4xl font-semibold dark:text-white">Select Your Vehicle</h2>
                <p className="text-[#5A5B54] mt-3 dark:text-gray-300">For finding the correct part</p>
            </div>
            <div className=" px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {/* Select 1 */}
                <div className="flex items-center w-full">
                    <span className="bg-[#f56100] py-[10px] px-4 text-white">1</span>
                    <Select
                        // defaultValue="2025"
                        placeholder="Year"
                        className="w-full"
                        options={[
                            { value: '2025', label: '2025' },
                            { value: '2024', label: '2024' },
                            { value: '2023', label: '2023' },
                            { value: '2022', label: '2022' },
                            { value: '2021', label: '2021' },
                        ]}
                    />
                </div>
                {/* Select 2 */}
                <div className="flex items-center w-full">
                    <span className="bg-[#f56100] py-[10px] px-4 text-white">2</span>
                    <Select
                        placeholder="Brand"
                        className="w-full"
                        options={[
                            { value: 'toyota', label: 'Toyota' },
                            { value: 'honda', label: 'Honda' },
                            { value: 'ford', label: 'Ford' },
                            { value: 'chevrolet', label: 'Chevrolet' },
                            { value: 'bmw', label: 'BMW' },
                            { value: 'audi', label: 'Audi' },
                            { value: 'mercedes', label: 'Mercedes-Benz' },
                        ]}
                    />
                </div>
                {/* Select 3 */}
                <div className="flex items-center w-full">
                    <span className="bg-[#f56100] py-[10px] px-4 text-white">3</span>
                    <Select
                        placeholder="Model"
                        className="w-full"
                        options={[
                            { value: 'camry', label: 'Toyota Camry' },
                            { value: 'accord', label: 'Honda Accord' },
                            { value: 'mustang', label: 'Ford Mustang' },
                            { value: 'impala', label: 'Chevrolet Impala' },
                            { value: 'x5', label: 'BMW X5' },
                            { value: 'a4', label: 'Audi A4' },
                            { value: 'c_class', label: 'Mercedes-Benz C-Class' },
                        ]}
                    />
                </div>
                {/* Select 4 */}
                <div className="flex items-center w-full">
                    <span className="bg-[#f56100] py-[10px] px-4 text-white">4</span>
                    <Select
                        placeholder="Engine Power"
                        className="w-full"
                        options={[
                            { value: '150', label: '150 HP' },
                            { value: '200', label: '200 HP' },
                            { value: '250', label: '250 HP' },
                            { value: '300', label: '300 HP' },
                            { value: '350', label: '350 HP' },
                            { value: '400', label: '400 HP' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectYourVehicle;
