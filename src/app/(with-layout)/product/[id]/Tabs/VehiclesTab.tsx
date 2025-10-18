"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FitVehicle {
    id: string;
    engine: {
        engineCode: string;
        hp: number;
        ccm: number;
        fuelType: string;
        generation: {
            generationName: string;
            body: string;
            productionStart: string;
            productionEnd: string | null;
            model: {
                modelName: string;
                brand: { brandName: string };
            };
        };
    };
}

interface VehiclesTabProps {
    fitVehicles: FitVehicle[];
}

export default function VehiclesTab({ fitVehicles }: VehiclesTabProps) {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const toggle = (manufacturer: string) => {
        const newSet = new Set(expanded);
        if (newSet.has(manufacturer)) newSet.delete(manufacturer);
        else newSet.add(manufacturer);
        setExpanded(newSet);
    };

    const grouped: Record<string, FitVehicle[]> = {};
    fitVehicles.forEach((v) => {
        const brand = v.engine.generation.model.brand.brandName;
        if (!grouped[brand]) grouped[brand] = [];
        grouped[brand].push(v);
    });

    return (
        <div className="mt-8">
            <h2 className="mb-6 text-lg font-semibold text-foreground">Fit Vehicles</h2>
            <div className="space-y-2">
                {Object.entries(grouped).map(([manufacturer, vehicles]) => (
                    <div key={manufacturer} className="border border-border bg-card">
                        <button
                            onClick={() => toggle(manufacturer)}
                            className="flex w-full justify-between p-4 text-left hover:bg-muted/50"
                        >
                            <span>{manufacturer}</span>
                            <span>{vehicles.length} vehicles</span>
                        </button>

                        {expanded.has(manufacturer) &&
                            vehicles.map((v) => {
                                const { engine } = v;
                                const { generation } = engine;
                                const yearRange = `${new Date(generation.productionStart).getFullYear()} - ${generation.productionEnd ? new Date(generation.productionEnd).getFullYear() : "Present"
                                    }`;
                                return (
                                    <div key={v.id} className="p-4 border-t border-border">
                                        <div className="text-blue-600 font-semibold">{generation.model.modelName} ({generation.body})</div>
                                        <div>Engine: {engine.engineCode}, {engine.hp}HP, {engine.ccm}cc, {engine.fuelType}</div>
                                        <div className="text-muted-foreground">Years: {yearRange}</div>
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </div>
        </div>
    );
}
