"use client";

interface NumberItem {
  value: string;
  isLink: boolean;
}

interface ReferenceItem {
  manufacturer: string;
  numbers: NumberItem[];
}

interface ReferencesTabProps {
  referenceItems: ReferenceItem[];
}

export default function ReferencesTab({ referenceItems }: ReferencesTabProps) {
  return (
    <div className="space-y-6">
      {referenceItems.map((item) => (
        <div
          key={item.manufacturer}
          className="rounded-lg border border-gray-300 bg-card p-6"
        >
          <h3 className="mb-4 text-base font-semibold text-foreground">
            {item.manufacturer}
          </h3>
          <div className="space-y-2">
            {item.numbers.map((num, idx) => (
              <a
                key={idx}
                href={num.isLink ? "#" : undefined}
                className={`text-sm ${num.isLink ? "text-black dark:text-white underline" : "text-foreground"}`}
              >
                {num.value}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
