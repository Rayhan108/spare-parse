/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';
import Image from 'next/image';
import productPic from '../../../public/products/wheel2.svg';

interface ProductDetailModalProps {
    isModalOpen: boolean;
    handleOk: () => any;
    handleCancel: () => any;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {
    const order = {
        orderId: '#12345',
        orderDate: '15 May 2025',
        totalItems: 5,
        status: 'Delivered',
        products: [
            {
                id: 1,
                name: 'MRF Tyre',
                imageUrl: '/images/mrf-tyre.png',
                quantity: 1,
                price: 650,
            },
            {
                id: 2,
                name: 'MRF Tyre',
                imageUrl: '/images/mrf-tyre.png',
                quantity: 2,
                price: 650,
            },
            {
                id: 3,
                name: 'Michelin Tyre Xtreme Grip',
                imageUrl: '/images/michelin-tyre.png',
                quantity: 1,
                price: 800,
            },
            {
                id: 4,
                name: 'Pirelli Racing Slicks',
                imageUrl: '/images/pirelli-tyre.png',
                quantity: 3,
                price: 1200,
            },
        ],
        subtotal: 1950,
    };
    const calculatedSubtotal = order.products.reduce((sum, product) => sum + (product.quantity * product.price), 0);


    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            className='w-full md:w-[800px]'
            footer={false}
            width={800}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className="container mx-auto p-5">
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Product Detail</h2>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-primary pt-8 pb-4 mb-6 text-sm text-gray-700 overflow-x-auto">
                    <span className='whitespace-nowrap'>Order Derail</span>
                    <span className="h-4 border-l border-gray-300"></span>
                    <span className='whitespace-nowrap'>{order.orderId}</span>
                    <span className="h-4 border-l border-gray-300"></span>
                    <span className='whitespace-nowrap'>{order.orderDate}</span>
                    <span className="h-4 border-l border-gray-300"></span>
                    <span className='whitespace-nowrap'>{order.totalItems} Items</span>
                    <span className="h-4 border-l border-gray-300"></span>
                    <span className="text-orange-500 whitespace-nowrap">{order.status}</span>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto">
                    <div className="min-w-[500px] lg:min-w-full">
                        <div className="grid grid-cols-4 text-left text-gray-600 border-y border-primary px-4 py-3
                            sm:grid-cols-4 lg:grid-cols-4">
                            <div className="font-normal">Product</div>
                            <div className="font-normal">Quantity</div>
                            <div className="font-normal">Price</div>
                            <div className="font-normal text-right">Total</div>
                        </div>


                        <div className="space-y-4 mt-5 pb-5"> 
                            {order.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-4 items-center bg-white border border-orange-200 rounded-lg p-4
                             sm:grid-cols-4 lg:grid-cols-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={productPic}
                                            alt={'product'}
                                            width={50}
                                            height={50}
                                            className="rounded-lg flex-shrink-0"
                                        />
                                        <span className="text-sm sm:text-base">{product.name}</span>
                                    </div>
                                    <div className="text-sm sm:text-base">{String(product.quantity).padStart(2, '0')}</div>
                                    <div className="text-sm sm:text-base">${product.price}</div>
                                    <div className="text-right text-sm sm:text-base">${product.quantity * product.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-end mt-6 pr-4">
                    <div className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                        Subtotal: <span className="ml-2">${calculatedSubtotal}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailModal;