'use client'
import { useState, useEffect } from "react";
import { Select, Pagination } from "antd";
import Image from "next/image";

import {
    useGetBrandsByYearQuery,
    useGetModelsByBrandQuery,
    useGetEnginesByModelQuery,
    useGetCarBrandsQuery,
} from "@/redux/features/carBrand/carBrandApi";
import { useRouter } from "next/navigation";

interface Brand {
    brandId: string;
    brandName: string;
}

interface Model {
    modelId: string;
    modelName: string;
}

interface Engine {
    engineId: string;
    engineCode: string;
    hp: number;
    kw: number;
    ccm: number;
    fuelType: string;
}

interface VehicleApiItem {
    engineId: string;
    brandId: string;
    brandName: string;
    brandImage?: string;
    modelId: string;
    modelName: string;
    generationId?: string;
    generationName?: string;
    hp: number;
    kw: number;
    ccm: number;
    productionStart: string;
    productionEnd: string;
}

interface Product {
    id: string;
    brandId: string;
    brandName: string;
    brandImage?: string;
    modelId: string;
    modelName: string;
    generationId?: string;
    generationName?: string;
    hp: number;
    kw: number;
    ccm: number;
    yearRange: string;
}

const SelectYourVehicle = () => {
    const [year, setYear] = useState<string>();
    const [brandId, setBrandId] = useState<string>();
    const [brandName, setBrandName] = useState<string>();
    const [modelId, setModelId] = useState<string>();
    const [modelName, setModelName] = useState<string>();
    const [hp, setHp] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasSearched, setHasSearched] = useState<boolean>(false); // New state for search tracking
    const pageSize = 8;
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => {
        const y = String(currentYear - i);
        return { value: y, label: y };
    });

    const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsByYearQuery(year!, { skip: !year });
    const brandOptions = brandsData?.data.map((b: Brand) => ({ value: b.brandId, label: b.brandName })) || [];

    const { data: modelsData, isLoading: isModelsLoading } = useGetModelsByBrandQuery({ brandId: brandId!, year: year! }, { skip: !brandId || !year });
    const modelOptions = modelsData?.data.map((m: Model) => ({ value: m.modelId, label: m.modelName })) || [];

    const { data: enginesData, isLoading: isEnginesLoading } = useGetEnginesByModelQuery(modelId!, { skip: !modelId });
    const hpOptions: { value: string; label: string }[] = enginesData?.data.map((e: Engine) => ({ value: String(e.kw), label: `${e.kw} KW` })) || [];

    const { data: vehiclesData, isLoading: isVehiclesLoading, isError: isVehiclesError } = useGetCarBrandsQuery(
        { year, brandName, modelName, hp },
        { skip: !year || !brandName || !modelName || !hp }
    );

    const products: Product[] =
        vehiclesData?.data.map((item: VehicleApiItem) => ({
            id: item.engineId,
            brandId: item.brandId,
            brandName: item.brandName,
            brandImage: item.brandImage || "",
            modelId: item.modelId,
            modelName: item.modelName,
            generationId: item.generationId,
            generationName: item.generationName,
            hp: item.hp,
            kw: item.kw,
            ccm: item.ccm,
            yearRange: `${new Date(item.productionStart).getFullYear()} - ${new Date(item.productionEnd).getFullYear()}`,
        })) || [];

    useEffect(() => {
        setBrandId(undefined);
        setBrandName(undefined);
        setModelId(undefined);
        setModelName(undefined);
        setHp(undefined);
        setCurrentPage(1);
        setHasSearched(false); // Reset search status when the year is changed
    }, [year]);

    useEffect(() => {
        setModelId(undefined);
        setModelName(undefined);
        setHp(undefined);
        setCurrentPage(1);
        setHasSearched(false); // Reset search status when brand is changed
    }, [brandId]);

    useEffect(() => {
        setHp(undefined);
        setCurrentPage(1);
        setHasSearched(false); // Reset search status when model is changed
    }, [modelId]);

    useEffect(() => setCurrentPage(1), [hp]);

    const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const router = useRouter();

    const handleClick = (engineId: string) => {
        router.push(`/vehicle?engineId=${engineId}`);
    };

    // Trigger search flag when user selects all necessary filters (i.e., year, brand, model, hp)
    useEffect(() => {
        if (year && brandName && modelName && hp) {
            setHasSearched(true);
        }
    }, [year, brandName, modelName, hp]);

    return (
        <div className="container mx-auto py-8 md:py-16">
            {/* Vehicle selectors */}
            <div className="container mx-auto shadow-md border-t-[10px] border-t-[#f56100] border border-[#FCCEB0] py-14">
                <div className="text-center">
                    <h2 className="text-4xl font-semibold dark:text-white">Select Your Vehicle</h2>
                    <p className="text-[#5A5B54] mt-3 dark:text-gray-300">For finding the correct part</p>
                </div>

                <div className="px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                    {/* Year */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white rounded-l-md">1</span>
                        <Select
                            className="w-full"
                            placeholder="Year"
                            options={yearOptions}
                            onChange={setYear}
                            value={year}
                        />
                    </div>

                    {/* Brand */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white rounded-l-md">2</span>
                        <Select
                            className="w-full"
                            placeholder="Brand"
                            options={brandOptions}
                            loading={isBrandsLoading}
                            onChange={(val) => {
                                setBrandId(val);
                                const selected = brandsData?.data.find((b: Brand) => b.brandId === val);
                                setBrandName(selected?.brandName);
                            }}
                            value={brandId}
                        />
                    </div>

                    {/* Model */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white rounded-l-md">3</span>
                        <Select
                            className="w-full"
                            placeholder="Model"
                            options={modelOptions}
                            loading={isModelsLoading}
                            onChange={(val) => {
                                setModelId(val);
                                const selected = modelsData?.data.find((m: Model) => m.modelId === val);
                                setModelName(selected?.modelName);
                            }}
                            value={modelId}
                        />
                    </div>

                    {/* Engine HP */}
                    <div className="flex items-center w-full">
                        <span className="bg-[#f56100] py-[10px] px-4 text-white rounded-l-md">4</span>
                        <Select
                            className="w-full"
                            placeholder="Engine Power"
                            options={hpOptions}
                            loading={isEnginesLoading}
                            onChange={setHp}
                            value={hp}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="mt-8 space-y-4">
                    {isVehiclesLoading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : isVehiclesError ? (
                        <p className="text-center text-red-500">Failed to load products</p>
                    ) : hasSearched && paginatedProducts.length === 0 ? (
                        <p className="text-center text-gray-500">No products found. Please select your vehicle.</p>
                    ) : (
                        paginatedProducts.map((product) => (
                            <div
                                onClick={() => handleClick(product.id)}
                                key={product.id}
                                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4 flex-1">
                                        {product.brandImage ? (
                                            <Image
                                                src={product.brandImage}
                                                alt={product.brandName}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">🚗</span>
                                            </div>
                                        )}
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">{product.brandName}</h3>
                                            <p className="text-sm text-gray-600">
                                                {product.modelName} {product.generationName}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Display all car details directly */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Power</p>
                                            <p className="text-lg font-semibold text-gray-900">{product.kw} (KW)</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Displacement</p>
                                            <p className="text-lg font-semibold text-gray-900">{product.ccm} (CCM)</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Horsepower</p>
                                            <p className="text-lg font-semibold text-gray-900">{product.hp} (HP)</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Year Range</p>
                                            <p className="text-lg font-semibold text-gray-900">{product.yearRange}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {products.length > pageSize && (
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={products.length}
                            onChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectYourVehicle;
