export interface NumberItem {
  value: string;
  isLink: boolean;
}

export interface ReferenceItem {
  manufacturer: string; // e.g., "OE Numbers" or "Cross Reference Numbers"
  numbers: NumberItem[];
}

interface ReferenceNumbersProps {
  title: string; // Section title
  items: ReferenceItem[];
}

export function ReferenceNumbers({ title, items }: ReferenceNumbersProps) {
  return (
    <div className="overflow-hidden">
      {/* Section title */}
      <div className="border-b border-border bg-muted/30 px-4 py-3 md:px-6">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>

      {/* Reference items */}
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <div
            key={`${item.manufacturer}-${index}`}
            className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-[200px_1fr] md:gap-4 md:px-6"
          >
            <span className="text-sm font-medium text-muted-foreground md:font-normal">
              {item.manufacturer}
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4">
              {item.numbers.map((number, numIndex) =>
                number.isLink ? (
                  <a
                    key={`${number.value}-${numIndex}`}
                    href="#"
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    {number.value}
                  </a>
                ) : (
                  <span
                    key={`${number.value}-${numIndex}`}
                    className="text-sm text-foreground"
                  >
                    {number.value}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
