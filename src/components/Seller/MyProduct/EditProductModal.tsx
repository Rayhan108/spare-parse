"use client";

import { useEffect, useState } from "react";
import { Spin, Modal, message, Upload } from "antd";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import TipTapMenu from "./TipTapMenu";
import CarAndCategorySelector from "./SelectorBlock";
import { useUpdateProductMutation } from "@/redux/features/seller/product/productApi";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";


export interface Field {
  fieldName: string;
  valueString?: string;
  valueFloat?: number;
  valueType: "string" | "float";
}

export interface SubSection {
  sectionName: string;
  fields: Field[];
}

export interface Section {
  sectionName: string;
  fields: Field[];
  subSections?: SubSection[];
}

export interface OEMReference {
  type: "OE" | "INTERNAL";
  number: string;
  brandId?: string;
}

export interface ShippingInfo {
  countryCode: string;
  countryName: string;
  carrier: string;
  cost: number;
  deliveryMin?: number;
  deliveryMax?: number;
  isDefault?: boolean;
}


interface EditProductModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  productId: string;
}

interface SellerProduct {
  id: string;
  categoryId?: string;
  brandId?: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  isVisible: boolean;
}

interface Product {
  id: string;
  categoryId?: string;
  brandId?: string;
  productName?: string;
  description?: string;
  price?: number;
  discount?: number;
  stock?: number;
  isVisible?: boolean;
  productImages?: string[];
}




//
import React from "react";
import { Form, Input, Select, Button } from "antd";
import { IoAdd } from "react-icons/io5";

const { Option } = Select;

// interface Field {
//   fieldName: string;
//   valueString?: string;
//   valueFloat?: number;
//   valueType: "string" | "float";
// }

// interface SubSection {
//   sectionName: string;
//   fields: Field[];
// }

// interface Section {
//   sectionName: string;
//   fields: Field[];
//   subSections: SubSection[];
// }

// interface OEMReference {
//   type: "OE" | "INTERNAL";
//   number: string;
//   brandId?: string;
// }

// interface ShippingInfo {
//   countryCode: string;
//   countryName: string;
//   carrier: string;
//   cost: number;
//   deliveryMin: number;
//   deliveryMax: number;
//   isDefault?: boolean;
// }





const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  productId,
}) => {
  const [nextComponent, setNextComponent] = useState<"details" | "description">("details");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState<{
    year?: string;
    brandId?: string;
    brandName?: string;
    modelId?: string;
    modelName?: string;
    hp?: string;
    categoryId?: string;
  }>({});
  const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;
  const { data, isLoading, isError } = useGetSingleProductQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: { HTMLAttributes: { class: "list-disc ml-2" } }, heading: false }),
      Highlight.configure({ HTMLAttributes: { class: "my-custom-class" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "",
    editorProps: {
      attributes: { className: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3" },
    },
  });

  useEffect(() => {
    if (data?.data) {
      const product = {
        ...(data.data as Product),
        categoryId: data.data.categoryId || "",
        brandId: data.data.brandId || "",
      } as SellerProduct;

      setProductName(product.productName);
      setPrice(product.price);
      setDiscount(product.discount);
      setStock(product.stock);
      if (product.description && editor) editor.commands.setContent(product.description);
    }
  }, [data, editor]);

  const handleSelectChange = (values: typeof selectedValues) => setSelectedValues(values);
  const handleSubmit = async () => {
    if (!data?.data) return message.error("Product data not loaded.");

    try {
      setLoading(true);
      const product = {
        ...(data.data as Product),
        categoryId: data.data.categoryId || "",
        brandId: data.data.brandId || "",
      } as SellerProduct;

      const bodyData = {
        categoryId: selectedValues.categoryId || product.categoryId,
        brandId: selectedValues.brandId || product.brandId,
        modelId: selectedValues.modelId || undefined,
        modelName: selectedValues.modelName || undefined,
        year: selectedValues.year || undefined,
        hp: selectedValues.hp || undefined,
        brandName: selectedValues.brandName || undefined,
        productName: productName || product.productName,
        price: price !== "" ? Number(price) : product.price,
        discount: discount !== "" ? Number(discount) : product.discount,
        stock: stock !== "" ? Number(stock) : product.stock,
        description: editor?.getHTML() || product.description,
        isVisible: product.isVisible,
      };

      const formData = new FormData();
      formData.append("bodyData", JSON.stringify(bodyData));
      if (profilePic) formData.append("productImages", profilePic);

      await updateProduct({ productId, formData }).unwrap();
      message.success(" Product updated successfully!");
      handleOk();
    } catch (err) {
      console.error(err);
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };






  ///


  const [form] = Form.useForm();
  const [sections, setSections] = useState<Section[]>([]);
  const [oemReferences, setOemReferences] = useState<OEMReference[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([]);
  const brandId = "sample-brand-id"; // replace dynamically if needed

  // --- Product Sections ---
  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName");
    if (sectionName?.trim()) {
      setSections([...sections, { sectionName: sectionName.trim(), fields: [], subSections: [] }]);
      form.setFieldsValue({ newSectionName: "" });
      message.success("Section added");
    } else message.error("Enter section name");
  };

  const handleAddField = (sectionIndex: number) => {
    const fieldName = form.getFieldValue(`field_name_${sectionIndex}`);
    const fieldValue = form.getFieldValue(`field_value_${sectionIndex}`);
    const fieldType = form.getFieldValue(`field_type_${sectionIndex}`) || "string";
    if (fieldName && fieldValue !== undefined && fieldValue !== "") {
      const newField: Field = {
        fieldName,
        valueType: fieldType,
        ...(fieldType === "float" ? { valueFloat: parseFloat(fieldValue) } : { valueString: fieldValue }),
      };
      const newSections = [...sections];
      newSections[sectionIndex].fields.push(newField);
      setSections(newSections);
      form.setFieldsValue({ [`field_name_${sectionIndex}`]: "", [`field_value_${sectionIndex}`]: "", [`field_type_${sectionIndex}`]: "string" });
      message.success("Field added");
    } else message.error("Fill field name and value");
  };

  const handleRemoveField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields.splice(fieldIndex, 1);
    setSections(newSections);
  };

  const handleRemoveSection = (sectionIndex: number) => setSections(sections.filter((_, i) => i !== sectionIndex));

  // --- References ---
  const handleAddReference = () => {
    const refType = form.getFieldValue("refType");
    const refNumber = form.getFieldValue("refNumber");
    if (refType && refNumber) {
      const newRef: OEMReference = { type: refType, number: refNumber, ...(refType === "OE" && { brandId }) };
      setOemReferences([...oemReferences, newRef]);
      form.setFieldsValue({ refType: "", refNumber: "" });
      message.success("Reference added");
    } else message.error("Fill type and number");
  };

  const handleRemoveReference = (index: number) => setOemReferences(oemReferences.filter((_, i) => i !== index));

  // --- Shipping ---
  const handleAddShipping = () => {
    const countryCode = form.getFieldValue("shippingCountryCode");
    const countryName = form.getFieldValue("shippingCountryName");
    const carrier = form.getFieldValue("shippingCarrier");
    const cost = form.getFieldValue("shippingCost");
    const deliveryMin = form.getFieldValue("shippingDeliveryMin") || 0;
    const deliveryMax = form.getFieldValue("shippingDeliveryMax") || 0;
    if (countryCode && countryName && carrier && cost !== undefined) {
      const newShip: ShippingInfo = { countryCode, countryName, carrier, cost: parseFloat(cost), deliveryMin: parseInt(deliveryMin), deliveryMax: parseInt(deliveryMax) };
      setShippingInfo([...shippingInfo, newShip]);
      form.setFieldsValue({ shippingCountryCode: "", shippingCountryName: "", shippingCarrier: "", shippingCost: "", shippingDeliveryMin: "", shippingDeliveryMax: "" });
      message.success("Shipping added");
    } else message.error("Fill all required shipping fields");
  };

  const handleRemoveShipping = (index: number) => setShippingInfo(shippingInfo.filter((_, i) => i !== index));



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

        <h2 className="mb-4">Select Car and Category</h2>
        <CarAndCategorySelector onSelectChange={handleSelectChange} />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : isError ? (
          <p className="text-red-500">Failed to load product details.</p>
        ) : nextComponent === "details" ? (
          <div className="mt-8">
            {/* Basic product fields */}
            <div className="mb-4">
              <label className="block mb-1">Product Name</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Discount</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.valueAsNumber)}
                placeholder="Enter discount"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.valueAsNumber)}
                placeholder="Enter stock quantity"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <Form form={form} layout="vertical">
                {/* Product Sections */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3">Product Sections</h3>
                  <div className="flex gap-2 mb-4">
                    <Form.Item name="newSectionName" noStyle>
                      <Input placeholder="Section name" className="flex-1" />
                    </Form.Item>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="bg-[#f56100] px-4 py-2 text-white cursor-pointer rounded flex items-center gap-2"
                    >
                      <IoAdd size={20} /> Add Section
                    </button>
                  </div>

                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="border rounded-lg p-4 bg-gray-50 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{section.sectionName}</h4>
                        <button onClick={() => handleRemoveSection(sIdx)} className="text-red-500">Delete</button>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Form.Item name={`field_name_${sIdx}`} noStyle><Input placeholder="Field name" /></Form.Item>
                        <Form.Item name={`field_type_${sIdx}`} noStyle>
                        </Form.Item>
                        <Form.Item name={`field_value_${sIdx}`} noStyle><Input placeholder="Value" /></Form.Item>
                        <Button type="primary" onClick={() => handleAddField(sIdx)} icon={<IoAdd />} />
                      </div>
                      {section.fields.map((f, fIdx) => (
                        <div key={fIdx} className="flex justify-between bg-gray-100 p-2 rounded mb-1 text-sm">
                          <span>{f.fieldName}: {f.valueType === "float" ? f.valueFloat : f.valueString}</span>
                          <button onClick={() => handleRemoveField(sIdx, fIdx)} className="text-red-500">×</button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* References */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3">References</h3>
                  <div className="flex gap-2 mb-4">
                    <Form.Item name="refType" noStyle>
                      <Select placeholder="Type" className="w-1/4">
                        <Option value="OE">OE</Option>
                        <Option value="INTERNAL">INTERNAL</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="refNumber" noStyle><Input placeholder="Reference number" className="w-1/3" /></Form.Item>
                    <Button type="primary" onClick={handleAddReference} icon={<IoAdd />} />
                  </div>
                  {oemReferences.map((ref, idx) => (
                    <div key={idx} className="flex justify-between bg-gray-100 p-2 rounded mb-1 text-sm">
                      <span>{ref.type} - {ref.number}</span>
                      <button onClick={() => handleRemoveReference(idx)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                </div>

                {/* Shipping */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Form.Item name="shippingCountryCode" noStyle><Input placeholder="Country Code" /></Form.Item>
                    <Form.Item name="shippingCountryName" noStyle><Input placeholder="Country Name" /></Form.Item>
                    <Form.Item name="shippingCarrier" noStyle><Input placeholder="Carrier" /></Form.Item>
                    <Form.Item name="shippingCost" noStyle><Input placeholder="Cost" type="number" /></Form.Item>
                    <Form.Item name="shippingDeliveryMin" noStyle><Input placeholder="Min Days" type="number" /></Form.Item>
                    <Form.Item name="shippingDeliveryMax" noStyle><Input placeholder="Max Days" type="number" /></Form.Item>
                  </div>
                    <button
                      type="button"
                      onClick={handleAddShipping}
                      className="w-full bg-[#f56100] py-2 rounded text-white cursor-pointer mb-4"
                    >
                      Add Shipping
                    </button>
                  {shippingInfo.map((ship, idx) => (
                    <div key={idx} className="flex justify-between bg-gray-100 p-2 rounded mb-1 text-sm">
                      <span>{ship.countryName} ({ship.countryCode}) - {ship.carrier} - ${ship.cost}</span>
                      <button onClick={() => handleRemoveShipping(idx)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                </div>
              </Form>
            </div>

            <button
              onClick={() => setNextComponent("description")}
              className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer"
            >
              Next
            </button>
          </div>
        ) : (
          <>
            {/* Description */}
            <div>
              <h2 className="text-xl">Description</h2>
              <div className="h-auto rounded-2xl border border-dashed border-primary mt-4 mb-5 px-3 py-3">
                <TipTapMenu editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-5">
              <h2 className="text-xl">Product Images</h2>
              <div className="h-30 flex items-center justify-center rounded-2xl border border-dashed border-[#f56100] mt-4">
                {profilePic ? (
                  <div className="relative">
                    <Image
                      src={profilePicUrl || ""}
                      width={500}
                      height={500}
                      alt="product image"
                      className="border-4 w-32"
                    />
                    <button
                      type="button"
                      onClick={() => setProfilePic(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file: File) => {
                      setProfilePic(file);
                      return false;
                    }}
                  >
                    <SlCloudUpload className="cursor-pointer" size={32} />
                  </Upload>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || isUpdating}
              className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer"
            >
              {loading || isUpdating ? "Updating..." : "Upload Product"}
            </button>
          </>
        )}
      </div>


    </Modal>
  );
};

export default EditProductModal;
