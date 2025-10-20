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
  const [expandedBrand, setExpandedBrand] = useState<Set<string>>(new Set());
  const [expandedModel, setExpandedModel] = useState<Set<string>>(new Set());

  const toggleBrand = (brand: string) => {
    const newSet = new Set(expandedBrand);
    if (newSet.has(brand)) newSet.delete(brand);
    else newSet.add(brand);
    setExpandedBrand(newSet);
  };

  const toggleModel = (modelKey: string) => {
    const newSet = new Set(expandedModel);
    if (newSet.has(modelKey)) newSet.delete(modelKey);
    else newSet.add(modelKey);
    setExpandedModel(newSet);
  };

  // Group vehicles by brand
  const grouped: Record<string, FitVehicle[]> = {};
  fitVehicles.forEach((v) => {
    const brandName = v.engine.generation.model.brand.brandName || "Unknown";
    if (!grouped[brandName]) grouped[brandName] = [];
    grouped[brandName].push(v);
  });

  // Group vehicles by model within a brand
  const getModelGroups = (vehicles: FitVehicle[]) => {
    const modelGroups: Record<string, FitVehicle[]> = {};
    vehicles.forEach((v) => {
      const modelName = v.engine.generation.model.modelName || "Unknown";
      if (!modelGroups[modelName]) modelGroups[modelName] = [];
      modelGroups[modelName].push(v);
    });
    return modelGroups;
  };

  const getKW = (hp: number) => Math.round(hp * 0.7457 * 10) / 10;

  const getYearRange = (vehicles: FitVehicle[]) => {
    const years = vehicles.map((v) => {
      const start = new Date(v.engine.generation.productionStart).getFullYear();
      const end = v.engine.generation.productionEnd
        ? new Date(v.engine.generation.productionEnd).getFullYear()
        : null;
      return { start, end };
    });
    const minYear = Math.min(...years.map((y) => y.start));
    const maxYear = Math.max(...years.map((y) => y.end ?? y.start));
    return `${minYear} - ${maxYear === minYear ? "Present" : maxYear}`;
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Fit Vehicles</h2>
      <div className="space-y-2">
        {Object.entries(grouped).map(([brand, vehicles]) => {
          const modelGroups = getModelGroups(vehicles);
          const isBrandExpanded = expandedBrand.has(brand);

          return (
            <div key={brand} className="border border-border rounded-lg overflow-hidden">
              {/* Brand header */}
              <button
                onClick={() => toggleBrand(brand)}
                className="flex w-full justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold">{brand}</span>
                <span>{vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}</span>
              </button>

              {/* Models */}
              {isBrandExpanded &&
                Object.entries(modelGroups).map(([modelName, modelVehicles]) => {
                  const modelKey = `${brand}-${modelName}`;
                  const isModelExpanded = expandedModel.has(modelKey);
                  const yearRange = getYearRange(modelVehicles);

                  return (
                    <div key={modelKey} className="border-t border-gray-200">
                      {/* Model header */}
                      <button
                        onClick={() => toggleModel(modelKey)}
                        className="flex w-full justify-between items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="font-medium">{modelName}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 text-sm">{yearRange}</span>
                          <ChevronDown
                            size={20}
                            className={`text-gray-400 transition-transform ${isModelExpanded ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      {/* Table */}
                      {isModelExpanded && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white border-t border-gray-200">
                                <th className="px-6 py-3 text-left font-semibold">Body</th>
                                <th className="px-6 py-3 text-left font-semibold">Engine</th>
                                <th className="px-6 py-3 text-left font-semibold">Produced</th>
                                <th className="px-6 py-3 text-right font-semibold">KW</th>
                                <th className="px-6 py-3 text-right font-semibold">HP</th>
                                <th className="px-6 py-3 text-right font-semibold">CCM</th>
                                <th className="px-6 py-3 text-left font-semibold">Fuel</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modelVehicles.map((v, idx) => {
                                const { engine } = v;
                                const { generation } = engine;
                                const startDate = new Date(generation.productionStart);
                                const endDate = generation.productionEnd ? new Date(generation.productionEnd) : null;
                                const producedRange = endDate
                                  ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")} - ${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}`
                                  : `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")} - Present`;
                                const kw = getKW(engine.hp);

                                return (
                                  <tr key={v.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t border-gray-200`}>
                                    <td className="px-6 py-3">{generation.body}</td>
                                    <td className="px-6 py-3">{engine.engineCode}</td>
                                    <td className="px-6 py-3">{producedRange}</td>
                                    <td className="px-6 py-3 text-right">{kw}</td>
                                    <td className="px-6 py-3 text-right">{engine.hp}</td>
                                    <td className="px-6 py-3 text-right">{engine.ccm}</td>
                                    <td className="px-6 py-3">{engine.fuelType}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
