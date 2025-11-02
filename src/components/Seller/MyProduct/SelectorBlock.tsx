"use client";

import { Select } from "antd";
import { useState, useEffect } from "react";
import {
    useGetBrandsByYearQuery,
    useGetModelsByBrandQuery,
    useGetEnginesByModelQuery,
} from "@/redux/features/carBrand/carBrandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";


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
    hp: number;
}

interface Category {
    id: string;
    name: string;
}

interface CarAndCategorySelectorProps {
    onSelectChange?: (values: {
        year?: string;
        brandId?: string;
        brandName?: string;
        modelId?: string;
        modelName?: string;
        hp?: string;
        categoryId?: string;
    }) => void;
}

const CarAndCategorySelector: React.FC<CarAndCategorySelectorProps> = ({ onSelectChange }) => {

    const [year, setYear] = useState<string>();
    const [brandId, setBrandId] = useState<string>();
    const [brandName, setBrandName] = useState<string>();
    const [modelId, setModelId] = useState<string>();
    const [modelName, setModelName] = useState<string>();
    const [hp, setHp] = useState<string>();
    const [categoryId, setCategoryId] = useState<string>();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery({ page: 1, limit: 100 });
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => {
        const y = String(currentYear - i);
        return { value: y, label: y };
    });

    const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsByYearQuery(year!, { skip: !year });
    const brandOptions =
        (brandsData?.data as Brand[] | undefined)?.map((b) => ({
            value: b.brandId,
            label: b.brandName,
        })) || [];

    const { data: modelsData, isLoading: isModelsLoading } = useGetModelsByBrandQuery(
        { brandId: brandId!, year: year! },
        { skip: !brandId || !year }
    );
    const modelOptions =
        (modelsData?.data as Model[] | undefined)?.map((m) => ({
            value: m.modelId,
            label: m.modelName,
        })) || [];

    const { data: enginesData, isLoading: isEnginesLoading } = useGetEnginesByModelQuery(modelId!, { skip: !modelId });
    const hpOptions =
        (enginesData?.data as Engine[] | undefined)?.map((e) => ({
            value: String(e.hp),
            label: `${e.hp} HP`,
        })) || [];

    useEffect(() => {
        setBrandId(undefined);
        setBrandName(undefined);
        setModelId(undefined);
        setModelName(undefined);
        setHp(undefined);
    }, [year]);

    useEffect(() => {
        setModelId(undefined);
        setModelName(undefined);
        setHp(undefined);
    }, [brandId]);

    useEffect(() => {
        setHp(undefined);
    }, [modelId]);

    useEffect(() => {
        onSelectChange?.({
            year,
            brandId,
            brandName,
            modelId,
            modelName,
            hp,
            categoryId,
        });
    }, [year, brandId, brandName, modelId, modelName, hp, categoryId, onSelectChange]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1️⃣ Year */}
            <Select
                placeholder="Select Year"
                options={yearOptions}
                value={year}
                onChange={(val: string) => setYear(val)}
                className="w-full"
            />

            {/* 2️⃣ Brand */}
            <Select
                placeholder="Select Brand"
                loading={isBrandsLoading}
                options={brandOptions}
                value={brandId}
                onChange={(val: string) => {
                    setBrandId(val);
                    const selected = (brandsData?.data as Brand[] | undefined)?.find((b) => b.brandId === val);
                    setBrandName(selected?.brandName);
                }}
                disabled={!year}
                className="w-full"
            />

            {/* 3️⃣ Model */}
            <Select
                placeholder="Select Model"
                loading={isModelsLoading}
                options={modelOptions}
                value={modelId}
                onChange={(val: string) => {
                    setModelId(val);
                    const selected = (modelsData?.data as Model[] | undefined)?.find((m) => m.modelId === val);
                    setModelName(selected?.modelName);
                }}
                disabled={!brandId}
                className="w-full"
            />

            {/* 4️⃣ Engine HP */}
            <Select
                placeholder="Select Engine Power"
                loading={isEnginesLoading}
                options={hpOptions}
                value={hp}
                onChange={(val: string) => setHp(val)}
                disabled={!modelId}
                className="w-full"
            />

            {/* 5️⃣ Category */}
            <Select
                placeholder="Select Category"
                allowClear
                loading={isCategoriesLoading}
                options={(categoriesData?.data as Category[] | undefined)?.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                }))}
                value={categoryId}
                onChange={(val: string) => setCategoryId(val)}
                className="w-full"
            />
        </div>
    );
};

export default CarAndCategorySelector;
