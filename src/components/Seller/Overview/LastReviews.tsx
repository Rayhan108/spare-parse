"use client"; 
import Image from "next/image";
import ordersIcon from '../../../../public/seller/orders-icon.svg';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Review {
  id: number;
  name: string;
  date: string;
  productName: string;
  productDescription: string;
  timeAgo?: string;
  userImage: string;
  productImage: string;
}


interface LastReviewsProps {
  reviews: Review[];
}
const LastReviews: React.FC<LastReviewsProps> = ({ reviews }) => {
  const t = useTranslations("sellerOverview");
  return (
    <div className="border rounded-xl border-primary p-4 sm:p-6 my-8 max-w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-0">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <Image
              src={ordersIcon}
              alt="Calendar"
              width={48}
              height={48}
              className="bg-[#feefe6] p-1 sm:p-2 rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{t("lastReviewsTitle")}</h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md dark:text-white">
                  {t("lastReviewsMessage")}
            </p>
          </div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <Link href={'/seller/overview/reviews'}>
            <MdOutlineArrowForwardIos className="cursor-pointer dark:text-white" size={24} />
          </Link> 
        </div>
      </div>

      <div className="border-t border-primary pt-2 sm:pt-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col sm:flex-row sm:gap-8 items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0 px-2 sm:px-0"
          >
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center w-full">
              {/* User info */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={review.userImage}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized 
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{review.name}</p>
                  <p className="text-gray-500 text-sm dark:text-white">{review.date}</p>
                </div>
              </div>

              {/* Product info */}
              <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={review.productImage}
                    alt={review.productName}
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate dark:text-white">{review.productName}</p>
                  <p className="text-gray-500 text-sm truncate">{review.productDescription}</p>
                </div>
              </div>
            </div>

            {/* Star rating */}
            <div className="flex gap-1 items-center mt-3 sm:mt-0 flex-shrink-0 text-sm">
              <FaStar className="text-yellow-400" size={20} />
              <p className=" dark:text-white">(5)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastReviews;
