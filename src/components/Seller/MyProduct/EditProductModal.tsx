/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

import { useUpdateProductMutation } from "@/redux/features/seller/product/productApi";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import React from "react";
import { Form, Input, Select } from "antd";
import { IoAdd } from "react-icons/io5";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import {
  useGetBrandsByYearQuery,
  useGetEnginesByModelQuery,
  useGetModelsByBrandQuery,
} from "@/redux/features/carBrand/carBrandApi";
import toast from "react-hot-toast";

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
  brandName?: string;
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

interface Category {
  id: string;
  name: string;
}
interface Model {
  modelId: string;
  modelName: string;
}
interface Engine {
  engineId: string;
  kw: number;
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

const { Option } = Select;

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  productId,
}) => {
  const [nextComponent, setNextComponent] = useState<"details" | "description">(
    "details"
  );
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const profilePicUrl = useMemo(
    () => (profilePic ? URL.createObjectURL(profilePic) : ""),
    [profilePic] // Only regenerate when profilePic changes
  );
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [brandId, setBrandId] = useState<string>();
  const [form] = Form.useForm();
  const [sections, setSections] = useState<Section[]>([]);
  const [oemReferences, setOemReferences] = useState<OEMReference[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([]);

  interface Brand {
    brandId: string;
    brandName: string;
  }

  const [year, setYear] = useState<string>();

  const [refBrandId, setRefBrandId] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const [modelName, setModelName] = useState<string>();
  const [hp, setHp] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({ page: 1, limit: 100 });
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => {
    const y = String(currentYear - i);
    return { value: y, label: y };
  });

  const { data: brandsData, isLoading: isBrandsLoading } =
    useGetBrandsByYearQuery(year!, { skip: !year });
  const brandOptions =
    (brandsData?.data as Brand[] | undefined)?.map((b) => ({
      value: b.brandId,
      label: b.brandName,
    })) || [];

  const { data: modelsData, isLoading: isModelsLoading } =
    useGetModelsByBrandQuery(
      { brandId: brandId!, year: year! },
      { skip: !brandId || !year }
    );
  const modelOptions =
    (modelsData?.data as Model[] | undefined)?.map((m) => ({
      value: m.modelId,
      label: m.modelName,
    })) || [];

  const { data: enginesData, isLoading: isEnginesLoading } =
    useGetEnginesByModelQuery(modelId!, { skip: !modelId });
  const hpOptions =
    (enginesData?.data as Engine[] | undefined)?.map((e) => ({
      value: String(e.kw),
      label: `${e.kw} KW`,
    })) || [];

  const [selectedValues, setSelectedValues] = useState<{
    year?: string;
    brandId?: string;
    brandName?: string;
    modelId?: string;
    modelName?: string;
    kw?: string;
    categoryId?: string;
    hp?: string; // Add hp to the state type
  }>({});

  // const handleSelectChange = useCallback((values: typeof selectedValues) => {
  //   setSelectedValues(values);
  // }, []);

  useEffect(() => {
    setBrandId(undefined);
    setBrandName(undefined);
    setModelId(undefined);
    setModelName(undefined);
    setHp(undefined);
  }, [year]);

  useEffect(() => {
    setModelId(undefined);
    setModelName(undefined);
    setHp(undefined);
  }, [brandId]);

  useEffect(() => {
    setHp(undefined);
  }, [modelId]);

  // useEffect(() => {
  //   handleSelectChange({
  //     year,
  //     brandId,
  //     brandName,
  //     modelId,
  //     modelName,
  //     hp,
  //     categoryId,
  //   });
  // }, [year, brandId, brandName, modelId, modelName, hp, categoryId, handleSelectChange]);

  // --- Product Sections ---
  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName");
    if (sectionName?.trim()) {
      setSections([
        ...sections,
        { sectionName: sectionName.trim(), fields: [], subSections: [] },
      ]);
      form.setFieldsValue({ newSectionName: "" });
      message.success("Section added");
    } else message.error("Enter section name");
  };

  const handleAddField = (sectionIndex: number) => {
    const fieldName = form.getFieldValue(`field_name_${sectionIndex}`);
    const fieldValue = form.getFieldValue(`field_value_${sectionIndex}`);
    const fieldType =
      form.getFieldValue(`field_type_${sectionIndex}`) || "string";
    if (fieldName && fieldValue !== undefined && fieldValue !== "") {
      const newField: Field = {
        fieldName,
        valueType: fieldType,
        ...(fieldType === "float"
          ? { valueFloat: parseFloat(fieldValue) }
          : { valueString: fieldValue }),
      };
      const newSections = [...sections];
      newSections[sectionIndex].fields.push(newField);
      setSections(newSections);
      form.setFieldsValue({
        [`field_name_${sectionIndex}`]: "",
        [`field_value_${sectionIndex}`]: "",
        [`field_type_${sectionIndex}`]: "string",
      });
      message.success("Field added");
    } else message.error("Fill field name and value");
  };

  const handleRemoveField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields.splice(fieldIndex, 1);
    setSections(newSections);
  };

  const handleRemoveSection = (sectionIndex: number) =>
    setSections(sections.filter((_, i) => i !== sectionIndex));

  // --- References ---
  const handleAddReference = () => {
    const refType = form.getFieldValue("refType");
    const refNumber = form.getFieldValue("refNumber");
    const refBrandId = form.getFieldValue("refBrandId") || brandId; // Use brandId if not provided in form

    const selectedBrand = brandsData?.data.find(
      (b: Brand) => b.brandId === refBrandId
    );

    if (refType && refNumber && selectedBrand) {
      // Construct the new reference object
      const newRef: OEMReference = {
        type: refType,
        number: refNumber,
        brandId: refBrandId,
        brandName: selectedBrand?.brandName,
      };

      // Append the new reference to the state
      setOemReferences((prevRefs) => [...prevRefs, newRef]);

      // Reset form fields after addition
      form.setFieldsValue({ refType: "", refNumber: "", refBrandId: "" });

      message.success("Reference added successfully");
    } else {
      message.error("Please provide valid reference details");
    }
  };

  const handleRemoveReference = (index: number) =>
    setOemReferences(oemReferences.filter((_, i) => i !== index));

  // --- Shipping ---
  const handleAddShipping = () => {
    const countryCode = form.getFieldValue("shippingCountryCode");
    const countryName = form.getFieldValue("shippingCountryName");
    const carrier = form.getFieldValue("shippingCarrier");
    const cost = form.getFieldValue("shippingCost");
    const deliveryMin = form.getFieldValue("shippingDeliveryMin") || 0;
    const deliveryMax = form.getFieldValue("shippingDeliveryMax") || 0;
    if (countryCode && countryName && carrier && cost !== undefined) {
      const newShip: ShippingInfo = {
        countryCode,
        countryName,
        carrier,
        cost: parseFloat(cost),
        deliveryMin: parseInt(deliveryMin),
        deliveryMax: parseInt(deliveryMax),
      };
      setShippingInfo([...shippingInfo, newShip]);
      form.setFieldsValue({
        shippingCountryCode: "",
        shippingCountryName: "",
        shippingCarrier: "",
        shippingCost: "",
        shippingDeliveryMin: "",
        shippingDeliveryMax: "",
      });
      message.success("Shipping added");
    } else message.error("Fill all required shipping fields");
  };

  const handleRemoveShipping = (index: number) =>
    setShippingInfo(shippingInfo.filter((_, i) => i !== index));

  const { data, isLoading, isError } = useGetSingleProductQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-2" } },
        heading: false,
      }),
      Highlight.configure({ HTMLAttributes: { class: "my-custom-class" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        className: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3",
      },
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
      if (product.description && editor)
        editor.commands.setContent(product.description);
    }
  }, [data, editor]);

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
        hp: selectedValues.kw || undefined,
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
// Log formData
// eslint-disable-next-line prefer-const
for (let [key, value] of formData.entries()) {
  // console.log(`${key}:`, value);
}



      await updateProduct({ productId, formData }).unwrap();
     toast.success("Product updated successfully!");
      handleOk();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  ///
// console.log("is modal open--->",isModalOpen);
  return (
    
    <Modal
      closable
      className="w-full md:w-[800px]"
      footer={false}
      width={1350}
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
        {/* <CarAndCategorySelector onSelectChange={handleSelectChange} /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1️⃣ Year */}
          <Select
            placeholder="Select Year"
            options={yearOptions}
            value={year}
            onChange={(val: string) => {
              setYear(val);
              setSelectedValues((prev) => ({ ...prev, year: val }));
            }}
            className="w-full"
          />

          {/* 2️⃣ Brand */}
          <Select
            placeholder="Select Brand"
            loading={isBrandsLoading}
            options={brandOptions}
            value={brandId}
            onChange={(val: string) => {
              setBrandId(val);
              const selected = (brandsData?.data as Brand[] | undefined)?.find(
                (b) => b.brandId === val
              );
              const name = selected?.brandName;

              setBrandName(name);

              setSelectedValues((prev) => ({
                ...prev,
                brandId: val,
                brandName: name,
              }));
            }}
            disabled={!year}
            className="w-full"
          />

          {/* 3️⃣ Model */}
          <Select
            placeholder="Select Model"
            loading={isModelsLoading}
            options={modelOptions}
            value={modelId}
            onChange={(val: string) => {
              setModelId(val);
              const selected = (modelsData?.data as Model[] | undefined)?.find(
                (m) => m.modelId === val
              );
              const name = selected?.modelName;

              setModelName(name);

              setSelectedValues((prev) => ({
                ...prev,
                modelId: val,
                modelName: name,
              }));
            }}
            disabled={!brandId}
            className="w-full"
          />

          {/* Engine Power (Multiple Selection) */}
          <div className="flex items-center w-full">
            <Select
              placeholder="Engine Power"
              className="w-full"
              mode="multiple"
              loading={isEnginesLoading}
              options={hpOptions}
              value={hp}
              onChange={(val: any) => {
                setHp(val);
                setSelectedValues((prev) => ({
                  ...prev,

                  kw: val,
                }));
              }}
              disabled={!modelId}
            />
          </div>
          {/* 5️⃣ Category */}
          <Select
            placeholder="Select Category"
            allowClear
            loading={isCategoriesLoading}
            options={(categoriesData?.data as Category[] | undefined)?.map(
              (cat) => ({
                value: cat.id,
                label: cat.name,
              })
            )}
            value={categoryId}
            onChange={(val: string) => {
              setCategoryId(val);
              setSelectedValues((prev) => ({ ...prev, categoryId: val }));
            }}
            className="w-full"
          />
        </div>

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
                  <h3 className="text-lg font-semibold mb-3">
                    Product Sections
                  </h3>
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
                    <div
                      key={sIdx}
                      className="border rounded-lg p-4 bg-gray-50 mb-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{section.sectionName}</h4>
                        <button
                          onClick={() => handleRemoveSection(sIdx)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Form.Item name={`field_name_${sIdx}`} noStyle>
                          <Input placeholder="Field name" />
                        </Form.Item>
                        <Form.Item
                          name={`field_type_${sIdx}`}
                          noStyle
                        ></Form.Item>
                        <Form.Item name={`field_value_${sIdx}`} noStyle>
                          <Input placeholder="Value" />
                        </Form.Item>
                        {/* <Button type="primary" onClick={() => handleAddField(sIdx)} icon={<IoAdd />} /> */}
                        <button
                          type="button"
                          onClick={() => handleAddField(sIdx)}
                          className="flex items-center gap-2 bg-[#f56100] hover:bg-[#e04b00] text-white px-3 py-2 rounded transition-colors"
                        >
                          <IoAdd size={16} />
                          Add
                        </button>
                      </div>
                      {section.fields.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex justify-between bg-gray-100 p-2 rounded mb-1 text-sm"
                        >
                          <span>
                            {f.fieldName}:{" "}
                            {f.valueType === "float"
                              ? f.valueFloat
                              : f.valueString}
                          </span>
                          <button
                            onClick={() => handleRemoveField(sIdx, fIdx)}
                            className="text-red-500"
                          >
                            remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3">References</h3>
                  <div className="flex gap-2 mb-4">
                    <Form.Item name="refType" noStyle initialValue="">
                      <Select placeholder="Type" className="w-1/4">
                        <Option value="OE">OE</Option>
                        <Option value="INTERNAL">INTERNAL</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="refNumber" noStyle initialValue="">
                      <Input placeholder="Reference number" className="w-1/3" />
                    </Form.Item>
                    <div className="flex items-center w-full">
                      <Select
                        placeholder="Brand"
                        className="w-full"
                        loading={isBrandsLoading}
                        options={brandOptions}
                        value={brandId} // Ensure this reflects the selected brand ID
                        onChange={(val) => {
                          setBrandId(val); // Update the main brandId
                          const selected = brandsData?.data.find(
                            (b: Brand) => b.brandId === val
                          );
                          setBrandName(selected?.brandName); // Set the brand name
                          setRefBrandId(val); // Sync the reference brand ID to the main brandId
                        }}
                        disabled={!year}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddReference}
                      className="w-10 flex justify-center items-center bg-[#f56100] px-2 text-white cursor-pointer rounded"
                    >
                      <IoAdd size={20} />
                    </button>
                  </div>
                  {oemReferences.length > 0 && (
                    <div className="mb-4">
                      {oemReferences.map((ref, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                        >
                          <span>
                            {ref.type} - {ref.number}{" "}
                            {ref.brandId && `- Brand: ${ref.brandName}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveReference(idx)}
                            className="text-red-500 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Shipping */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Form.Item name="shippingCountryCode" noStyle>
                      <Input placeholder="Country Code" />
                    </Form.Item>
                    <Form.Item name="shippingCountryName" noStyle>
                      <Input placeholder="Country Name" />
                    </Form.Item>
                    <Form.Item name="shippingCarrier" noStyle>
                      <Input placeholder="Carrier" />
                    </Form.Item>
                    <Form.Item name="shippingCost" noStyle>
                      <Input placeholder="Cost" type="number" />
                    </Form.Item>
                    <Form.Item name="shippingDeliveryMin" noStyle>
                      <Input placeholder="Min Days" type="number" />
                    </Form.Item>
                    <Form.Item name="shippingDeliveryMax" noStyle>
                      <Input placeholder="Max Days" type="number" />
                    </Form.Item>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddShipping}
                    className="w-full bg-[#f56100] py-2 rounded text-white cursor-pointer mb-4"
                  >
                    Add Shipping
                  </button>
                  {shippingInfo.map((ship, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between bg-gray-100 p-2 rounded mb-1 text-sm"
                    >
                      <span>
                        {ship.countryName} ({ship.countryCode}) - {ship.carrier}{" "}
                        - dzd{ship.cost}
                      </span>
                      <button
                        onClick={() => handleRemoveShipping(idx)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
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
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              <div className="flex items-center justify-center rounded-2xl py-3 border border-dashed border-[#f56100] mt-4 relative">
                {profilePic ? (
                  <>
                    <div className="relative w-full h-64 bg-gray-200 overflow-hidden rounded-xl ">
                      <Image
                        src={profilePicUrl || ""}
                        layout="fill"
                        objectFit="cover" // Ensures the image covers the container properly
                        alt="Product image"
                        className="transition-all duration-300 transform hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => setProfilePic(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </>
                ) : (
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file: File) => {
                      setProfilePic(file);
                      return false;
                    }}
                  >
                    <div className="w-32 h-32  border border-dashed border-[#f56100] rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#f56100] hover:text-white">
                      <SlCloudUpload
                        size={40}
                        className="transition-all duration-300 hover:scale-110"
                      />
                    </div>
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
