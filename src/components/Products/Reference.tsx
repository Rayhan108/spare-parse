// export default Reference;

/* eslint-disable @typescript-eslint/no-explicit-any */

const Reference = ({ oe, crn }: any) => {
  return (
    <div className="p-8 px-4 font-sans text-gray-900 text-sm leading-relaxed dark:text-white">
      {/* OE Numbers Section */}
      <h2 className="text-lg font-semibold mb-4">OE Numbers</h2>
      <table className="w-full mb-10">
        <tbody>
          {oe?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="pr-6 font-semibold align-top w-1/4">{item.company}</td>
              <td className="space-x-4 text-gray-500 underline cursor-pointer">
                <span>{item.code}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cross-Reference Numbers Section */}
      <h2 className="text-lg font-semibold mb-4">Cross-Reference Numbers</h2>
      <table className="w-full">
        <tbody>
          {crn?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="pr-6 font-semibold align-top w-1/4">{item.company}</td>
              <td className="space-x-4 text-gray-500 underline cursor-pointer">
                <span>{item.code}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reference;
