"use client";

import { useState, useEffect } from "react";

interface Shipping {
  id: string;
  countryName: string;
  countryCode: string;
  carrier: string;
  cost: number;
  deliveryMin: number;
  deliveryMax: number;
  isDefault: boolean;
}

interface ShippingRatesProps {
  shippings: Shipping[];
}

export default function ShippingRates({ shippings }: ShippingRatesProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [shippingRates, setShippingRates] = useState<Shipping[]>([]);

  useEffect(() => {
    const defaultCountry = shippings?.find((s) => s.isDefault)?.countryName || shippings?.[0]?.countryName || "";
    setSelectedCountry(defaultCountry);
  }, [shippings]);

  const handleGetRates = () => {
    const filtered = shippings?.filter((s) => s.countryName === selectedCountry);
    setShippingRates(filtered || []);
  };

  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-foreground mt-6">Shipping rates</h2>
      <div className="rounded-lg border border-gray-300 bg-card p-6">
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="country-select" className="text-sm text-foreground">
            Shipping to:
          </label>
          <select
            id="country-select"
            className="w-[200px] rounded border px-2 py-1
    bg-white text-black dark:bg-[#444444] dark:text-white dark:border-[#df5800]"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {shippings?.map((s) => (
              <option
                key={s.id}
                value={s.countryName}
                className="dark:bg-[#444444] dark:text-white"
              >
                {s.countryName}
              </option>
            ))}
          </select>

          <button
            onClick={handleGetRates}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-muted"
          >
            Get rates
          </button>
        </div>

        {shippingRates?.length > 0 && (
          <div className="overflow-hidden rounded-md border border-gray-300">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 bg-muted/50">
                  <th className="p-4 text-left text-sm font-medium text-foreground">
                    Carrier
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-foreground">
                    Estimated delivery
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-foreground">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {shippingRates.map((shipping) => (
                  <tr key={shipping.id} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm text-foreground">{shipping.carrier}</td>
                    <td className="p-4 text-sm text-foreground">
                      {shipping.deliveryMin}-{shipping.deliveryMax} days
                    </td>
                    <td className="p-4 text-sm text-foreground">€{shipping.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
