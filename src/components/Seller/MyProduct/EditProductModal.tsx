/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Spin, Modal, message, Upload, Form, Input, Select } from "antd";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";

import TipTapMenu from "./TipTapMenu";

import { useUpdateProductMutation } from "@/redux/features/seller/product/productApi";
import { useGetSellerSingleProductQuery } from "@/redux/features/products/productsApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import {
  useGetBrandsByYearQuery,
  useGetEnginesByModelQuery,
  useGetModelsByBrandQuery,
} from "@/redux/features/carBrand/carBrandApi";

export interface Field {
  id?: string; // from API
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
  id?: string; // from API
  sectionName: string;
  fields: Field[];
  subSections?: SubSection[];
}

export interface OEMReference {
  id?: string; // from API
  type: "OE" | "INTERNAL";
  number: string;
  brandId?: string | null;
  brandName?: string;
}

export interface ShippingInfo {
  id?: string; // from API
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
  refetch: () => void;
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
  kw: number | null;
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

const { Option } = Select;

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  productId,
  refetch
}) => {
  const [nextComponent, setNextComponent] =
    useState<"details" | "description">("details");

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const profilePicUrl = useMemo(
    () => (profilePic ? URL.createObjectURL(profilePic) : ""),
    [profilePic]
  );

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const [brandId, setBrandId] = useState<string | undefined>();
  const [brandName, setBrandName] = useState<string | undefined>();
  const [modelId, setModelId] = useState<string | undefined>();
  const [modelName, setModelName] = useState<string | undefined>();
  const [year, setYear] = useState<string | undefined>();
  const [hp, setHp] = useState<string[] | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const [form] = Form.useForm();

  const [sections, setSections] = useState<Section[]>([]);
  const [oemReferences, setOemReferences] = useState<OEMReference[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([]);

  interface Brand {
    brandId: string;
    brandName: string;
  }

  const [refBrandId, setRefBrandId] = useState<string | undefined>();

  const [selectedValues, setSelectedValues] = useState<{
    year?: string;
    brandId?: string;
    brandName?: string;
    modelId?: string;
    modelName?: string;
    kw?: string[]; // engine power(s)
    categoryId?: string;
  }>({});

  // Categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({ page: 1, limit: 100 });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1976 + 1 },
    (_, i) => {
      const y = String(currentYear - i);
      return { value: y, label: y };
    }
  );

  // Car brand/model/engine queries
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

  // Product query + mutation
  const {
    data,
    isLoading: isProductLoading,
    isError,
  } = useGetSellerSingleProductQuery(productId);
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

  // Prefill everything when product data arrives
  useEffect(() => {
    if (!data?.data || !editor) return;

    const apiProduct: any = data.data;

    const product: SellerProduct = {
      id: apiProduct.id,
      categoryId: apiProduct.categoryId || "",
      brandId: apiProduct.brandId || "",
      productName: apiProduct.productName || "",
      description: apiProduct.description || "",
      price: apiProduct.price || 0,
      discount: apiProduct.discount || 0,
      stock: apiProduct.stock || 0,
      isVisible: apiProduct.isVisible ?? true,
    };

    // Basic fields
    setProductName(product.productName);
    setPrice(product.price);
    setDiscount(product.discount);
    setStock(product.stock);

    // Description
    if (product.description) {
      editor.commands.setContent(product.description);
    }

    // Existing image
    setExistingImageUrl(
      Array.isArray(apiProduct.productImages) &&
        apiProduct.productImages.length > 0
        ? apiProduct.productImages[0]
        : null
    );

    // Category
    if (apiProduct.categoryId) {
      setCategoryId(apiProduct.categoryId);
      setSelectedValues((prev) => ({
        ...prev,
        categoryId: apiProduct.categoryId,
      }));
    }

    // Year from productionStartDate
    let derivedYear: string | undefined;
    if (apiProduct.productionStartDate) {
      const d = new Date(apiProduct.productionStartDate);
      if (!isNaN(d.getTime())) {
        derivedYear = String(d.getFullYear());
        setYear(derivedYear);
      }
    }

    // Brand / Model
    if (apiProduct.brandId) setBrandId(apiProduct.brandId);
    if (apiProduct.brandName) setBrandName(apiProduct.brandName);
    if (apiProduct.modelId) setModelId(apiProduct.modelId);
    if (apiProduct.modelName) setModelName(apiProduct.modelName);

    setSelectedValues((prev) => ({
      ...prev,
      year: derivedYear ?? prev.year,
      brandId: apiProduct.brandId ?? prev.brandId,
      brandName: apiProduct.brandName ?? prev.brandName,
      modelId: apiProduct.modelId ?? prev.modelId,
      modelName: apiProduct.modelName ?? prev.modelName,
    }));

    // HP from engines -> we use kw/hp as selected engine power(s)
    const kwStrings: string[] =
      (apiProduct.engines || [])
        .map((e: any) => e.kw ?? e.hp)
        .filter((v: any) => v !== null && v !== undefined)
        .map((v: any) => String(v));

    if (kwStrings.length) {
      setHp(kwStrings);
      setSelectedValues((prev) => ({
        ...prev,
        kw: kwStrings,
      }));
    }

    // Sections (map API structure -> local Section)
    const mappedSections: Section[] =
      (apiProduct.sections || []).map((s: any) => ({
        id: s.id,
        sectionName: s.sectionName,
        fields:
          (s.fields || []).map((f: any) => {
            if (f.valueFloat !== null && f.valueFloat !== undefined) {
              return {
                id: f.id,
                fieldName: f.fieldName,
                valueType: "float",
                valueFloat: f.valueFloat,
              } as Field;
            }
            return {
              id: f.id,
              fieldName: f.fieldName,
              valueType: "string",
              valueString: f.valueString ?? "",
            } as Field;
          }) ?? [],
        subSections: [],
      })) ?? [];

    setSections(mappedSections);

    // References
    const mappedRefs: OEMReference[] =
      (apiProduct.references || []).map((r: any) => ({
        id: r.id,
        type: r.type,
        number: r.number,
        brandId: r.brandId ?? null,
        brandName: r.brandName ?? undefined,
      })) ?? [];

    setOemReferences(mappedRefs);

    // Shippings
    const mappedShip: ShippingInfo[] =
      (apiProduct.shippings || []).map((s: any) => ({
        id: s.id,
        countryCode: s.countryCode,
        countryName: s.countryName,
        carrier: s.carrier,
        cost: s.cost,
        deliveryMin: s.deliveryMin ?? undefined,
        deliveryMax: s.deliveryMax ?? undefined,
        isDefault: s.isDefault ?? undefined,
      })) ?? [];

    setShippingInfo(mappedShip);
  }, [data, editor]);

  // --- Product Sections ---
  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName");
    if (sectionName?.trim()) {
      setSections((prev) => [
        ...prev,
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
    const formRefBrandId = form.getFieldValue("refBrandId") || brandId;

    const selectedBrand = (brandsData?.data as Brand[] | undefined)?.find(
      (b) => b.brandId === formRefBrandId
    );

    if (refType && refNumber) {
      const newRef: OEMReference = {
        type: refType,
        number: refNumber,
        brandId: formRefBrandId ?? null,
        brandName: selectedBrand?.brandName,
      };

      setOemReferences((prevRefs) => [...prevRefs, newRef]);

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
      setShippingInfo((prev) => [...prev, newShip]);
      form.setFieldsValue({
        shippingCountryCode: "",
        shippingCountryName: "",
        shippingCarrier: "",
        shippingCost: "",
        shippingDeliveryMin: "",
        shippingDeliveryMax: "",
      });
      message.success("Shipping added");
    } 
  };

  const handleRemoveShipping = (index: number) =>
    setShippingInfo(shippingInfo.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!data?.data) return message.error("Product data not loaded.");

    try {
      setLoading(true);

      const apiProduct: any = data.data;

      //  Clean Sections format
      const sectionsForUpdate = sections.map((s) => {
        const section: any = {
          sectionName: s.sectionName,
          fields: s.fields.map((f) => {
            const field: any = {
              fieldName: f.fieldName,
            };
            if (f.id) field.id = f.id;
            if (f.valueType === "float") {
              field.valueFloat = f.valueFloat;
            } else {
              field.valueString = f.valueString;
            }
            return field;
          }),
        };
        if (s.id) section.id = s.id;
        return section;
      });

      //  Clean References format
      const referencesForUpdate = oemReferences.map((r) => {
        const ref: any = {
          type: r.type,
          number: r.number,
        };
        if (r.id) ref.id = r.id;
        if (r.brandId) ref.brandId = r.brandId;
        return ref;
      });

      //  Clean Shipping format
      const shippingForUpdate = shippingInfo.map((s) => {
        const ship: any = {
          countryCode: s.countryCode,
          countryName: s.countryName,
          carrier: s.carrier,
          cost: s.cost,
          deliveryMin: s.deliveryMin ?? 0,
          deliveryMax: s.deliveryMax ?? 0,
        };
        if (s.id) ship.id = s.id;
        if (s.isDefault !== undefined) ship.isDefault = s.isDefault;
        return ship;
      });

      //  Final Body Data
      const bodyData = {
        categoryId: selectedValues.categoryId || categoryId || apiProduct.categoryId,
        brandId: selectedValues.brandId || brandId || apiProduct.brandId,
        productName: productName || apiProduct.productName,
        description: editor?.getHTML() || apiProduct.description,
        price: price !== "" ? Number(price) : apiProduct.price,
        discount: discount !== "" ? Number(discount) : apiProduct.discount,
        stock: stock !== "" ? Number(stock) : apiProduct.stock,
        isVisible: apiProduct.isVisible ?? true,
        sections: sectionsForUpdate,
        references: referencesForUpdate,
        shipping: shippingForUpdate,  //  "shipping" NOT "shippings"
      };

      // console.log("=== SENDING DATA ===");
      // console.log(JSON.stringify(bodyData, null, 2));

      //  Create FormData
      const formData = new FormData();
      formData.append("bodyData", JSON.stringify(bodyData));  //  "body" key
      
      if (profilePic) {
        formData.append("productImages", profilePic);  //  Same as Postman
      }

      // API Call
      await updateProduct({ productId, formData }).unwrap();
      
      toast.success("Product updated successfully!");
      handleOk();
      refetch()
    } catch (err: any) {
      console.error("Update Error:", err);
      toast.error(err?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Car & Category selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Year */}
          <Select
            placeholder="Select Year"
            options={yearOptions}
            value={year}
            onChange={(val: string) => {
              setYear(val);

              // reset dependent fields
              setBrandId(undefined);
              setBrandName(undefined);
              setModelId(undefined);
              setModelName(undefined);
              setHp(undefined);

              setSelectedValues((prev) => ({
                ...prev,
                year: val,
                brandId: undefined,
                brandName: undefined,
                modelId: undefined,
                modelName: undefined,
                kw: undefined,
              }));
            }}
            className="w-full"
          />

          {/* Brand */}
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

              // reset model & hp when brand changes
              setModelId(undefined);
              setModelName(undefined);
              setHp(undefined);

              setSelectedValues((prev) => ({
                ...prev,
                brandId: val,
                brandName: name,
                modelId: undefined,
                modelName: undefined,
                kw: undefined,
              }));
            }}
            disabled={!year}
            className="w-full"
          />

          {/* Model */}
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

              // reset hp when model changes
              setHp(undefined);

              setSelectedValues((prev) => ({
                ...prev,
                modelId: val,
                modelName: name,
                kw: undefined,
              }));
            }}
            disabled={!brandId}
            className="w-full"
          />

          {/* Engine Power */}
          <div className="flex items-center w-full">
            <Select
              placeholder="Engine Power"
              className="w-full"
              mode="multiple"
              loading={isEnginesLoading}
              options={hpOptions}
              value={hp}
              onChange={(val: string[]) => {
                setHp(val);
                setSelectedValues((prev) => ({
                  ...prev,
                  kw: val,
                }));
              }}
              disabled={!modelId}
            />
          </div>

          {/* Category */}
          <Select
            placeholder="Select Category"
            allowClear
            loading={isCategoriesLoading}
            options={
              (categoriesData?.data as Category[] | undefined)?.map((cat) => ({
                value: cat.id,
                label: cat.name,
              })) || []
            }
            value={categoryId}
            onChange={(val: string) => {
              setCategoryId(val);
              setSelectedValues((prev) => ({ ...prev, categoryId: val }));
            }}
            className="w-full"
          />
        </div>

        {isProductLoading ? (
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
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : e.target.valueAsNumber)
                }
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Discount</label>
              <input
                type="number"
                value={discount}
                onChange={(e) =>
                  setDiscount(
                    e.target.value === "" ? "" : e.target.valueAsNumber
                  )
                }
                placeholder="Enter discount"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value === "" ? "" : e.target.valueAsNumber
                  )
                }
                placeholder="Enter stock quantity"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />

              <Form form={form} layout="vertical">
                {/* Product Sections */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">
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
                      className="border rounded-lg p-4 bg-gray-50 dark:bg-[#24292E] mb-4"
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
                        <Form.Item name={`field_type_${sIdx}`} noStyle />
                        <Form.Item name={`field_value_${sIdx}`} noStyle>
                          <Input placeholder="Value" />
                        </Form.Item>
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
                          className="flex justify-between bg-gray-100 dark:bg-[#24292E] p-2 rounded mb-1 text-sm"
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

                {/* References */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">
                    References
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <Form.Item name="refType" noStyle initialValue="">
                      <Select placeholder="Type" className="w-1/4">
                        <Option value="OE">OE</Option>
                        <Option value="INTERNAL">INTERNAL</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="refNumber" noStyle initialValue="">
                      <Input
                        placeholder="Reference number"
                        className="w-1/3"
                      />
                    </Form.Item>
                    <div className="flex items-center w-full">
                      <Form.Item name="refBrandId" noStyle>
                        <Select
                          placeholder="Brand"
                          className="w-full"
                          loading={isBrandsLoading}
                          options={brandOptions}
                          value={refBrandId || brandId}
                          onChange={(val: string) => {
                            setRefBrandId(val);
                            const selected =
                              (brandsData?.data as Brand[] | undefined)?.find(
                                (b) => b.brandId === val
                              );
                            setBrandName(selected?.brandName);
                          }}
                          disabled={!year}
                        />
                      </Form.Item>
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
                          className="flex justify-between items-center bg-gray-100 dark:bg-[#24292E] p-2 rounded mb-2"
                        >
                          <span>
                            {ref.type} - {ref.number}{" "}
                            {/* {ref.brandId && `- Brand: ${ref.brandName}`} */}
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
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">
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
                      className="flex justify-between bg-gray-100 dark:bg-[#24292E] p-2 rounded mb-1 text-sm"
                    >
                      <span>
                        {ship.countryName} ({ship.countryCode}) -{" "}
                        {ship.carrier} - dzd{ship.cost}
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
              <div className="h-auto rounded-2xl border border-dashed dark:bg-[#24292E] border-primary mt-4 mb-5 px-3 py-3">
                <TipTapMenu editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              <div className="flex items-center justify-center rounded-2xl py-3 border border-dashed border-[#f56100] mt-4 relative">
                {profilePic || existingImageUrl ? (
                  <div className="relative w-full h-64 bg-gray-200 overflow-hidden rounded-xl">
                    <Image
                      src={
                        profilePic
                          ? profilePicUrl
                          : (existingImageUrl as string)
                      }
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Product image"
                      className="transition-all duration-300 transform hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePic(null);
                        setExistingImageUrl(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:bg-red-700"
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
                    <div className="w-32 h-32 border border-dashed border-[#f56100] rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#f56100] hover:text-white">
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