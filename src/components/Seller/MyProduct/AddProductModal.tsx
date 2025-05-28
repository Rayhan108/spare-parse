/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'antd';

interface ProductDetailModalProps {
    isModalOpen: boolean;
    handleOk: () => any;
    handleCancel: () => any;
}

const AddProductModal: React.FC<ProductDetailModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {


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
                    <h2 className='text-2xl font-semibold mb-4'>Upload Product</h2>
                </div>
               
            </div>
        </Modal>
    );
};

export default AddProductModal;