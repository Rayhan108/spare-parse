"use client";

import { useEffect, useState } from "react";
import { Form, Input, Upload, Spin, Modal, message, Select } from "antd";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import TipTapMenu from "./TipTapMenu";
import { useUpdateProductMutation } from "@/redux/features/seller/product/productApi";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import CarAndCategorySelector from "./SelectorBlock";
import ProductDetailsForm from "./ProductDetailsForm";

const { Option } = Select;

interface EditProductModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    productId: string;
}

interface ProductFormValues {
    productName?: string;
    price?: number | string;
    discount?: number | string;
    stock?: number | string;
    description?: string;
    productAvailability?: string;
}

interface SellerProduct {
    id: string;
    sellerId: string;
    categoryId: string;
    brandId: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    productImages: string[];
    isVisible: boolean;
    productAvailability?: string;
    createdAt: string;
    updatedAt: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
    isModalOpen,
    handleOk,
    handleCancel,
    productId,
}) => {
    const [form] = Form.useForm<ProductFormValues>();
    const [nextComponent, setNextComponent] = useState<"details" | "description">("details");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;

    const [sections, setSections] = useState<any[]>([]);
    const [oemReferences, setOemReferences] = useState<any[]>([]);
    const [shippingInfo, setShippingInfo] = useState<any[]>([]);
    const [brandId, setBrandId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { data, isLoading, isError } = useGetSingleProductQuery(productId);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ bulletList: { HTMLAttributes: { class: "list-disc ml-2" } }, heading: false }),
            Highlight.configure({ HTMLAttributes: { class: "highlight-text" } }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Heading.configure({ levels: [1, 2, 3] }),
        ],
        content: "",
        editorProps: { attributes: { class: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3" } },
    });

    useEffect(() => {
        if (data?.data) {
            const product = data.data as SellerProduct;
            form.setFieldsValue({
                productName: product.productName,
                productAvailability: product.productAvailability,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                description: product.description,
            });

            if (product.description && editor) {
                editor.commands.setContent(product.description);
            }

            if (product.brandId) {
                setBrandId(product.brandId);
            }
        }
    }, [data, form, editor]);

    const handleSelectionChange = (selectedData: unknown) => {
        console.log("Selected values:", selectedData);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            if (!data?.data) return message.error("Product data not loaded.");

            const product = data.data as SellerProduct;

            // Build updated sections
            const updatedSections = sections.map((section, sIndex) => {
                const updatedFields = [...section.fields];
                const typedFieldName = form.getFieldValue(`field_name_${sIndex}`);
                const typedFieldValue = form.getFieldValue(`field_value_${sIndex}`);
                const typedFieldType = form.getFieldValue(`field_type_${sIndex}`);
                if (typedFieldName && typedFieldValue !== undefined && typedFieldValue !== "") {
                    updatedFields.push({
                        fieldName: typedFieldName,
                        valueType: typedFieldType || "string",
                        ...(typedFieldType === "float"
                            ? { valueFloat: parseFloat(typedFieldValue) }
                            : { valueString: typedFieldValue }),
                    });
                }

                const updatedSubSections = section.subSections.map((subSection, subIndex) => {
                    const updatedSubFields = [...subSection.fields];
                    const typedSubName = form.getFieldValue(`subfield_name_${sIndex}_${subIndex}`);
                    const typedSubValue = form.getFieldValue(`subfield_value_${sIndex}_${subIndex}`);
                    const typedSubType = form.getFieldValue(`subfield_type_${sIndex}_${subIndex}`);
                    if (typedSubName && typedSubValue !== undefined && typedSubValue !== "") {
                        updatedSubFields.push({
                            fieldName: typedSubName,
                            valueType: typedSubType || "string",
                            ...(typedSubType === "float"
                                ? { valueFloat: parseFloat(typedSubValue) }
                                : { valueString: typedSubValue }),
                        });
                    }
                    return { sectionName: subSection.sectionName, fields: updatedSubFields };
                });

                return { sectionName: section.sectionName, fields: updatedFields, subSections: updatedSubSections };
            });

            const productData = {
                categoryId: product.categoryId,
                brandId: brandId || product.brandId,
                productName: values.productName ?? product.productName,
                description: editor?.getHTML() || product.description,
                // price: Number(values.price) ?? product.price ||"10" ,
                price: values.price !== undefined && values.price !== ""
                    ? Number(values.price)
                    : product.price ?? 10,

                // discount: Number(values.discount) ?? product.discount,
                discount: values.discount !== undefined && values.discount !== ""
                    ? Number(values.discount)
                    : product.discount ?? 0,

                // stock: Number(values.stock) ?? product.stock,
                stock: values.stock !== undefined && values.stock !== ""
                    ? Number(values.stock)
                    : product.stock ?? 0,

                isVisible: product.isVisible,
                fitVehicles: [],
                sections: updatedSections,
                references: oemReferences,
                shipping: shippingInfo,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("bodyData", JSON.stringify(productData));
            if (profilePic) formDataToSend.append("productImages", profilePic);

            await updateProduct({ productId, formData: formDataToSend }).unwrap();
            message.success("Product updated successfully!");
            handleOk();
        } catch (error) {
            console.error(error);
            message.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            closable
            className="w-full md:w-[800px]"
            footer={false}
            width={1000}
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <div className="container mx-auto p-5">
                <div className="flex items-center justify-between mb-2 mt-3">
                    {nextComponent !== "details" && (
                        <IoMdArrowRoundBack
                            onClick={() => setNextComponent("details")}
                            className="mb-4 cursor-pointer"
                            size={30}
                        />
                    )}
                    <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spin size="large" />
                    </div>
                ) : isError ? (
                    <p className="text-red-500">Failed to load product details.</p>
                ) : nextComponent === "details" ? (
                    <>
                        <h2 className="text-xl mb-4">Select Vehicle & Category</h2>
                        <CarAndCategorySelector onSelectChange={handleSelectionChange} />

                        <div className="mt-8">
                            <Form form={form} layout="vertical" className="mx-auto p-5 bg-white rounded-md">
                                <Form.Item label="Product Name" name="productName">
                                    <Input placeholder="Enter product name" />
                                </Form.Item>

                                <Form.Item
                                    label="Product Availability"
                                    name="productAvailability"
                                    rules={[{ required: true, message: "Please select availability" }]}
                                >
                                    <Select placeholder="In Stock / Out of Stock" allowClear>
                                        <Option value="inStock">In Stock</Option>
                                        <Option value="outOfStock">Out of Stock</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Price" name="price">
                                    <Input placeholder="Enter price" />
                                </Form.Item>

                                <Form.Item label="Discount" name="discount">
                                    <Input placeholder="Enter discount" />
                                </Form.Item>

                                <Form.Item label="Stock" name="stock">
                                    <Input placeholder="Enter stock quantity" />
                                </Form.Item>

                                <ProductDetailsForm
                                    form={form}
                                    sections={sections}
                                    setSections={setSections}
                                    oemReferences={oemReferences}
                                    setOemReferences={setOemReferences}
                                    shippingInfo={shippingInfo}
                                    setShippingInfo={setShippingInfo}
                                    brandId={brandId}
                                />

                                <Form.Item>
                                    <button
                                        onClick={() => setNextComponent("description")}
                                        className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer"
                                    >
                                        Next
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h2 className="text-xl">Description</h2>
                            <div className="h-auto rounded-2xl border border-dashed border-primary mt-4 mb-5 px-3 py-3">
                                <TipTapMenu editor={editor} />
                                <EditorContent editor={editor} />
                            </div>
                        </div>

                        <div className="mb-5">
                            <h2 className="mb-2">Product Image</h2>
                            <Upload
                                maxCount={1}
                                beforeUpload={(file) => {
                                    setProfilePic(file);
                                    return false;
                                }}
                                showUploadList={false}
                                className="border border-dashed border-gray-300 p-3 rounded-lg"
                            >
                                <div className="flex items-center justify-center gap-3 cursor-pointer">
                                    {profilePicUrl ? (
                                        <Image
                                            src={profilePicUrl}
                                            width={70}
                                            height={70}
                                            alt="product"
                                            className="rounded-md"
                                        />
                                    ) : (
                                        <SlCloudUpload className="text-primary text-3xl" />
                                    )}
                                    <span>{profilePic ? profilePic.name : "Upload product image"}</span>
                                </div>
                            </Upload>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-5 py-2 rounded-md border border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading || isUpdating}
                                onClick={handleSubmit}
                                className="px-5 py-2 rounded-md bg-primary text-white"
                            >
                                {loading || isUpdating ? <Spin /> : "Save Changes"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default EditProductModal;
