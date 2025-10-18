"use client";

interface AlternativeProduct {
  id: string;
  companyName: string;
  productName: string;
  image?: string;
  price: number;
}

interface AlternativesTabProps {
  similarProducts: AlternativeProduct[];
}

export default function AlternativesTab({ similarProducts }: AlternativesTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Alternatives</h3>
      {similarProducts?.length ? (
        similarProducts.map((alt) => (
          <div key={alt.id} className="flex gap-6 border border-border bg-card p-6">
            <div className="h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <img
                src={alt.image || "/placeholder.png"}
                alt={alt.productName}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <h4 className="text-base font-semibold text-foreground">
                {alt.companyName} - {alt.productName}
              </h4>
              <p className="text-sm text-muted-foreground">Price: €{alt.price}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button className="bg-blue-600 py-2 px-4 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No alternative products available.</p>
      )}
    </div>
  );
}
