/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal, Select, Upload } from 'antd';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { SlCloudUpload } from 'react-icons/sl';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TipTapMenu from './TipTapMenu';
import Heading from '@tiptap/extension-heading';
import Image from 'next/image';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface ProductDetailModalProps {
    isModalOpen: boolean;
    handleOk: () => any;
    handleCancel: () => any;
}

const AddProductModal: React.FC<ProductDetailModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [nextCompoment, SetNextComponent] = useState('details');

    // tiptap
    const extensions = [
        StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: 'list-disc ml-2',
                },
            },
            heading: false,
        }),
        Highlight.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Heading.configure({
            levels: [1, 2, 3],
        }),
    ];

    const editor = useEditor({
        extensions,
        content: '',
        editorProps: {
            attributes: {
                class: 'min-h-[400px] rounded-md bg-slate-50 py-2 px-3',
            },
        },
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
        },
    });

    // upload image
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;
    const handleProfilePicUpload = (e: any) => {
        setProfilePic(e.file);
    };


    return (
        <Modal
            closable={{ 'aria-label': 'Custom Close Button' }}
            className='w-full md:w-[800px]'
            footer={false}
            width={1000}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >

            <div className="container mx-auto p-5">
                <div className=' flex items-center justify-between mb-2 mt-3'>
                    {
                        nextCompoment !== 'details' && <IoMdArrowRoundBack onClick={() => SetNextComponent('details')} className='mb-4 cursor-pointer' size={30} />
                    }
                    <h2 className='text-2xl font-semibold mb-4'>Upload Product</h2>
                </div>
                {
                    nextCompoment === 'details' ?
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                                {/* Select 1 */}
                                <div className="flex items-center w-full">
                                    <span className="bg-[#f56100] py-[11px] px-4 text-white">1</span>
                                    <Select
                                        // defaultValue="2025"
                                        placeholder="Year"
                                        className="w-full"
                                        options={[
                                            { value: '2025', label: '2025' },
                                            { value: '2024', label: '2024' },
                                            { value: '2023', label: '2023' },
                                            { value: '2022', label: '2022' },
                                            { value: '2021', label: '2021' },
                                        ]}
                                    />
                                </div>
                                {/* Select 2 */}
                                <div className="flex items-center w-full">
                                    <span className="bg-[#f56100] py-[11px] px-4 text-white">2</span>
                                    <Select
                                        placeholder="Brand"
                                        className="w-full"
                                        options={[
                                            { value: 'toyota', label: 'Toyota' },
                                            { value: 'honda', label: 'Honda' },
                                            { value: 'ford', label: 'Ford' },
                                            { value: 'chevrolet', label: 'Chevrolet' },
                                            { value: 'bmw', label: 'BMW' },
                                            { value: 'audi', label: 'Audi' },
                                            { value: 'mercedes', label: 'Mercedes-Benz' },
                                        ]}
                                    />
                                </div>
                                {/* Select 3 */}
                                <div className="flex items-center w-full">
                                    <span className="bg-[#f56100] py-[11px] px-4 text-white">3</span>
                                    <Select
                                        placeholder="Model"
                                        className="w-full"
                                        options={[
                                            { value: 'camry', label: 'Toyota Camry' },
                                            { value: 'accord', label: 'Honda Accord' },
                                            { value: 'mustang', label: 'Ford Mustang' },
                                            { value: 'impala', label: 'Chevrolet Impala' },
                                            { value: 'x5', label: 'BMW X5' },
                                            { value: 'a4', label: 'Audi A4' },
                                            { value: 'c_class', label: 'Mercedes-Benz C-Class' },
                                        ]}
                                    />
                                </div>
                                {/* Select 4 */}
                                <div className="flex items-center w-full">
                                    <span className="bg-[#f56100] py-[11px] px-4 text-white">4</span>
                                    <Select
                                        placeholder="Engine Power"
                                        className="w-full"
                                        options={[
                                            { value: '150', label: '150 HP' },
                                            { value: '200', label: '200 HP' },
                                            { value: '250', label: '250 HP' },
                                            { value: '300', label: '300 HP' },
                                            { value: '350', label: '350 HP' },
                                            { value: '400', label: '400 HP' },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className=' mt-8'>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    className="mx-auto p-5 bg-white rounded-md"
                                >
                                    <Form.Item label="Product Name" name="productName">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Product Availability" name="productAvailability">
                                        <Select placeholder="In Stock / Out of Stock" allowClear>
                                            <Option value="inStock">In Stock</Option>
                                            <Option value="outOfStock">Out of Stock</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Category" name="category">
                                        <Select placeholder="Select Category" allowClear>
                                            <Option value="category1">Category 1</Option>
                                            <Option value="category2">Category 2</Option>
                                            <Option value="category3">Category 3</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="Price" name="price">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Size" name="size">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Country of origin" name="countryOrigin">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Model" name="model">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Manufacturer reference" name="manufacturerReference">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="OEM/Part number" style={{ marginBottom: 0 }}>
                                        <div className="flex gap-2">
                                            <Form.Item name="oemCompany" noStyle>
                                                <Input placeholder="Enter product company name" className="w-1/3" />
                                            </Form.Item>
                                            <Form.Item name="oemCode" noStyle>
                                                <Input placeholder="Enter product code" className="w-1/3" />
                                            </Form.Item>
                                            <Form.Item name="oemLink" noStyle>
                                                <Input placeholder="Enter product Link" className="w-1/3" />
                                            </Form.Item>
                                            <button
                                                className="w-10 flex justify-center items-center bg-primary px-2 text-white cursor-pointer"
                                            > <IoAdd size={20} /> </button>
                                        </div>
                                    </Form.Item>

                                    <Form.Item label="Discount" name="discount">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Product Weight" name="productWeight">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Product Length (mm)" name="productLength">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item label="Warranty" name="warranty">
                                        <Input placeholder="Enter product name" />
                                    </Form.Item>

                                    <Form.Item>
                                        <button
                                            className="w-full mb-3 bg-[#fcefe6] py-3 rounded-2xl flex justify-center items-center gap-2 cursor-pointer"
                                        >
                                            <IoAdd size={20} /> Add Option
                                        </button>
                                        <button onClick={() => SetNextComponent('description')} className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer">
                                            Next
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <h2 className='text-xl' >Description</h2>
                                <div className=' h-auto rounded-2xl border border-dashed border-primary mt-4 mb-5 px-3 py-3'>
                                    <div>
                                        <TipTapMenu editor={editor} />
                                    </div>
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                            <div className='mb-5'>
                                <h2 className='text-xl' >Product Images</h2>
                                <div className=' h-30 flex items-center justify-center rounded-2xl border border-dashed border-primary mt-4'>
                                    {profilePic ?
                                        <>
                                            <Image
                                                src={profilePicUrl || ''}
                                                width={500}
                                                height={500}
                                                alt='image'
                                                className="border-4 w-32"
                                            />

                                        </>
                                        :
                                        <Upload
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={handleProfilePicUpload}
                                            className=""
                                        >
                                            <SlCloudUpload className=' cursor-pointer' size={32} />
                                        </Upload>

                                    }
                                </div>
                            </div>
                            <button className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer">
                                Upload Product
                            </button>
                        </>
                }
            </div>
        </Modal>
    );
};

export default AddProductModal;