import delivery from '../../../public/service/delivery.svg'
import customer_service from '../../../public/service/customer_service.svg'
import money_back from '../../../public/service/money_back.svg'
import Image from 'next/image';
import { useTranslations } from 'next-intl';


const ServiceFeatures = () => {
  const  t  = useTranslations(); // Hook for dynamic translations

  return (
    <div className='px-3 xl:px-0 xl:w-[1100px] mx-auto pt-10 pb-16 md:pb-32'>
      <div className='flex flex-col md:flex-row gap-16 md:gap-0 justify-between'>
        <div className='flex flex-col justify-center items-center'>
          <Image
            src={delivery}
            height={500}
            width={500}
            alt='delivery'
            className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10'
          />
          <h2 className='text-xl font-bold mb-2 dark:text-white'>{t('serviceFeatures.freeFastDelivery.title')}</h2>
          <p className='dark:text-white'>{t('serviceFeatures.freeFastDelivery.description')}</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <Image
            src={customer_service}
            height={500}
            width={500}
            alt='customer service'
            className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10'
          />
          <h2 className='text-xl font-bold mb-2 dark:text-white'>{t('serviceFeatures.customerService.title')}</h2>
          <p className='dark:text-white'>{t('serviceFeatures.customerService.description')}</p>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <Image
            src={money_back}
            height={500}
            width={500}
            alt='money back guarantee'
            className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10'
          />
          <h2 className='text-xl font-bold mb-2 dark:text-white'>{t('serviceFeatures.moneyBackGuarantee.title')}</h2>
          <p className='dark:text-white'>{t('serviceFeatures.moneyBackGuarantee.description')}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
