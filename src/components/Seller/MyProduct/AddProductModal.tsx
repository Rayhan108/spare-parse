/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Form, Input, Modal, Select, Upload, message, Spin } from "antd";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { SlCloudUpload } from "react-icons/sl";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TipTapMenu from "./TipTapMenu";
import { useAddProductMutation } from "@/redux/features/seller/product/productApi";
import { useEffect } from "react";
import {
  useGetBrandsByYearQuery,
  useGetModelsByBrandQuery,
  useGetEnginesByModelQuery,
} from "@/redux/features/carBrand/carBrandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Model {
  modelId: string;
  modelName: string;
}

interface Engine {
  engineId: string;
  kw: number;
}

interface Brand {
  brandId: string;
  brandName: string;
}

interface ProductDetailModalProps {
  isModalOpen: boolean;
  handleOk: () => void; //boolean //any
  handleCancel: () => void; //boolean //any
}

interface OEMReference {
  type: "OE" | "INTERNAL";
  number: string;
  brandId?: string;
  brandName?: string;
}

interface ShippingInfo {
  countryCode: string;
  countryName: string;
  carrier: string;
  cost: number;
  deliveryMin: number;
  deliveryMax: number;
  isDefault?: boolean;
}

interface Field {
  fieldName: string;
  valueString?: string;
  valueFloat?: number;
  valueType: "string" | "float";
}

interface SubSection {
  sectionName: string;
  fields: Field[];
}

interface Section {
  sectionName: string;
  fields: Field[];
  subSections: SubSection[];
}

interface ProductFormFields {
  productName: string;
  productAvailability: "inStock" | "outOfStock";
  price: number;
  stock?: number;
  discount?: number;
  fitVehicles?: string;
  newSectionName?: string;
  refType?: "OE" | "INTERNAL";
  refNumber?: string;
  refBrandId?: string;
  shippingCountryCode?: string;
  shippingCountryName?: string;
  shippingCarrier?: string;
  shippingCost?: number;
  shippingDeliveryMin?: number;
  shippingDeliveryMax?: number;
  shippingIsDefault?: boolean;
}

const AddProductModal: React.FC<ProductDetailModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({ page: 1, limit: 100 });
  // console.log(categoriesData);
  const [year, setYear] = useState<string>();
  const [brandId, setBrandId] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refBrandId, setRefBrandId] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refBrandName, setRefBrandName] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const [modelName, setModelName] = useState<string>();
  const [hp, setHp] = useState<string>();
  console.log("brand id ", brandId);
  console.log(brandName);
  console.log(modelName);

  const [engineId, setEngineId] = useState<string>();

  const [fitVehicles, setFitVehicles] = useState<string[]>([]);

  console.log("fitengineid", fitVehicles);

  console.log("engineid ", engineId);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => {
    const y = String(currentYear - i);
    return { value: y, label: y };
  });

  const { data: brandsData, isLoading: isBrandsLoading } =
    useGetBrandsByYearQuery(year!, {
      skip: !year,
    });
  const brandOptions =
    brandsData?.data.map((b: Brand) => ({
      value: b.brandId,
      label: b.brandName,
    })) || [];

  const { data: modelsData, isLoading: isModelsLoading } =
    useGetModelsByBrandQuery(
      { brandId: brandId!, year: year! },
      { skip: !brandId || !year }
    );
  const modelOptions =
    modelsData?.data.map((m: Model) => ({
      value: m.modelId,
      label: m.modelName,
    })) || [];

  const { data: enginesData, isLoading: isEnginesLoading } =
    useGetEnginesByModelQuery(modelId!, {
      skip: !modelId,
    });
  const hpOptions =
    enginesData?.data.map((e: Engine) => ({
      value: String(e.engineId),
      label: `${e.kw} KW`,
    })) || [];

  useEffect(() => {
    setBrandId(undefined);
    setModelId(undefined);
    setHp(undefined);
  }, [year]);

  useEffect(() => {
    setModelId(undefined);
    setHp(undefined);
  }, [brandId]);

  useEffect(() => {
    setHp(undefined);
  }, [modelId]);

  useEffect(() => {
    if (hp && enginesData?.data?.length) {
      const selectedEngine = enginesData.data.find(
        (e: Engine) => String(e.kw) === hp
      );
      setEngineId(selectedEngine?.engineId);
    } else {
      setEngineId(undefined);
    }
  }, [hp, enginesData]);

  const { Option } = Select;
  const [form] = Form.useForm();
  const [nextCompoment, SetNextComponent] = useState("details");
  const [loading, setLoading] = useState(false);
  const [oemReferences, setOemReferences] = useState<OEMReference[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [addProduct] = useAddProductMutation();
  const [categoryId, setCategoryId] = useState<string>();
  const [formData, setFormData] = useState<ProductFormFields>({
    productName: "",
    productAvailability: "inStock",
    price: 0,
    stock: 0,
    discount: 0,
    fitVehicles: "",
    newSectionName: "",
    refType: undefined,
    refNumber: "",
    refBrandId: "",
    shippingCountryCode: "",
    shippingCountryName: "",
    shippingCarrier: "",
    shippingCost: 0,
    shippingDeliveryMin: 0,
    shippingDeliveryMax: 0,
    shippingIsDefault: false,
  });

  // console.log(categoryId)

  const extensions = [
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      },
      heading: false,
    }),
    Highlight.configure({
      HTMLAttributes: {
        class: "my-custom-class",
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
  ];

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3",
      },
    },
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;


  const handleAddOEMReference = () => {
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

  const handleRemoveOEMReference = (index: number) => {
    setOemReferences(oemReferences.filter((_, i) => i !== index));
  };

  const handleAddShipping = () => {
    const countryCode = form.getFieldValue("shippingCountryCode");
    const countryName = form.getFieldValue("shippingCountryName");
    const carrier = form.getFieldValue("shippingCarrier");
    const cost = form.getFieldValue("shippingCost");
    const deliveryMin = form.getFieldValue("shippingDeliveryMin");
    const deliveryMax = form.getFieldValue("shippingDeliveryMax");
    const isDefault = form.getFieldValue("shippingIsDefault");

    // console.log("[v0] Shipping values:", { countryCode, countryName, carrier, cost })

    if (countryCode && countryName && carrier && cost) {
      const newShipping: ShippingInfo = {
        countryCode: countryCode.trim(),
        countryName: countryName.trim(),
        carrier: carrier.trim(),
        cost: Number.parseFloat(cost),
        deliveryMin: deliveryMin ? Number.parseInt(deliveryMin) : 0,
        deliveryMax: deliveryMax ? Number.parseInt(deliveryMax) : 0,
        isDefault: isDefault || false,
      };
      setShippingInfo([...shippingInfo, newShipping]);
      form.setFieldsValue({
        shippingCountryCode: "",
        shippingCountryName: "",
        shippingCarrier: "",
        shippingCost: "",
        shippingDeliveryMin: "",
        shippingDeliveryMax: "",
        shippingIsDefault: false,
      });
      message.success("Shipping info added");
    } else {
      message.error(
        "Please fill in all required shipping fields (Country Code, Country Name, Carrier, Cost)"
      );
    }
  };

  const handleRemoveShipping = (index: number) => {
    setShippingInfo(shippingInfo.filter((_, i) => i !== index));
  };

  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName");
    // console.log("[v0] Adding section with name:", sectionName)

    if (sectionName && sectionName.trim()) {
      const newSection: Section = {
        sectionName: sectionName.trim(),
        fields: [],
        subSections: [],
      };
      setSections([...sections, newSection]);
      form.setFieldsValue({ newSectionName: "" });
      message.success("Section added");
    } else {
      message.error("Please enter section name");
    }
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleAddFieldToSection = (sectionIndex: number) => {
    const fieldName = form.getFieldValue(`field_name_${sectionIndex}`);
    const fieldValue = form.getFieldValue(`field_value_${sectionIndex}`);
    const fieldType = form.getFieldValue(`field_type_${sectionIndex}`);

    if (fieldName && fieldValue !== undefined && fieldValue !== "") {
      const newSections = [...sections];
      const newField: Field = {
        fieldName,
        valueType: fieldType || "string",
        ...(fieldType === "float"
          ? { valueFloat: Number.parseFloat(fieldValue) }
          : { valueString: fieldValue }),
      };
      newSections[sectionIndex].fields.push(newField);
      setSections(newSections);
      form.setFieldsValue({
        [`field_name_${sectionIndex}`]: "",
        [`field_value_${sectionIndex}`]: "",
        [`field_type_${sectionIndex}`]: "string",
      });
      message.success("Field added to section");
    } else {
      message.error("Please fill in field name and value");
    }
  };

  const handleRemoveFieldFromSection = (
    sectionIndex: number,
    fieldIndex: number
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields.splice(fieldIndex, 1);
    setSections(newSections);
  };

  const router = useRouter();


  const handleSubmitProduct = async () => {
    try {
      setLoading(true);

      // Step 1: Collect form values
      const values = { ...formData, ...form.getFieldsValue() };
      console.log("Form values:", values);

      // Step 2: Process sections and fields
      const updatedSections = sections.map((section, sIndex) => {
        const updatedFields = [...section.fields];
        const typedFieldName = form.getFieldValue(`field_name_${sIndex}`);
        const typedFieldValue = form.getFieldValue(`field_value_${sIndex}`);
        const typedFieldType = form.getFieldValue(`field_type_${sIndex}`);
        if (
          typedFieldName &&
          typedFieldValue !== undefined &&
          typedFieldValue !== ""
        ) {
          updatedFields.push({
            fieldName: typedFieldName,
            valueType: typedFieldType || "string",
            ...(typedFieldType === "float"
              ? { valueFloat: parseFloat(typedFieldValue) }
              : { valueString: typedFieldValue }),
          });
        }

        // Handle sub-sections similarly
        const updatedSubSections = section.subSections.map(
          (subSection, subIndex) => {
            const updatedSubFields = [...subSection.fields];
            const typedSubName = form.getFieldValue(
              `subfield_name_${sIndex}_${subIndex}`
            );
            const typedSubValue = form.getFieldValue(
              `subfield_value_${sIndex}_${subIndex}`
            );
            const typedSubType = form.getFieldValue(
              `subfield_type_${sIndex}_${subIndex}`
            );
            if (
              typedSubName &&
              typedSubValue !== undefined &&
              typedSubValue !== ""
            ) {
              updatedSubFields.push({
                fieldName: typedSubName,
                valueType: typedSubType || "string",
                ...(typedSubType === "float"
                  ? { valueFloat: parseFloat(typedSubValue) }
                  : { valueString: typedSubValue }),
              });
            }
            return {
              sectionName: subSection.sectionName,
              fields: updatedSubFields,
            };
          }
        );

        return {
          sectionName: section.sectionName,
          fields: updatedFields,
          subSections: updatedSubSections,
        };
      });

      // Step 3: Prepare the main product data including references, shipping, and other fields
      const productData = {
        categoryId,
        brandId: brandId, // Include the main brandId for the product
        productName: values.productName,
        description: editor?.getHTML() || "", // Get the content from the rich text editor
        price: Number(values.price) || 30, // Ensure a default value if missing
        discount: Number(values.discount) || 10,
        stock: Number(values.stock) || 10,
        isVisible: values.productAvailability === "inStock", // Visibility based on stock
        fitVehicles: fitVehicles, // Selected fit vehicles
        sections: updatedSections, // Processed sections with fields
        references: oemReferences, // Include all OEM references
        shipping: shippingInfo, // Include shipping information
      };

      // Step 4: Prepare FormData for sending the product data to the server
      const formDataToSend = new FormData();
      formDataToSend.append("bodyData", JSON.stringify(productData)); // Append the JSON data
      if (profilePic) formDataToSend.append("productImages", profilePic); // If there is a profile picture, include it

      // Step 5: Log the final payload for debugging before sending the request
      console.log("Final payload before upload:");
      formDataToSend.forEach((v, k) => console.log(k, v));

      // Step 6: Send the product data to the API for uploading

      const result = await addProduct(formDataToSend).unwrap();
      console.log("result--------------->", result);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }

      // Step 7: Reset the form and state after a successful upload
      form.resetFields();
      setOemReferences([]);
      setShippingInfo([]);
      setSections([]);
      setProfilePic(null);
      SetNextComponent("details");
      editor?.commands.clearContent(); // Clear the rich text editor content
      handleOk(); // Close the modal

      // Optionally, refresh the page after a successful upload
      router.refresh();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading product"); // Show an error message if something goes wrong
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  const handleNextStep = async () => {
    try {
      await form.validateFields();
      setFormData(form.getFieldsValue());
      SetNextComponent("description");
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Error uploading product");
    }
  };

  return (
    <Modal
      closable={{ "aria-label": "Custom Close Button" }}
      className="w-full md:w-[800px]"
      footer={false}
      width={1350}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Spin spinning={loading}>
        <div className="container mx-auto p-5">
          <div className=" flex items-center justify-between mb-2 mt-3">
            {nextCompoment !== "details" && (
              <IoMdArrowRoundBack
                onClick={() => SetNextComponent("details")}
                className="mb-4 cursor-pointer"
                size={30}
              />
            )}
            <h2 className="text-2xl font-semibold mb-4">Upload Product</h2>
          </div>
          {nextCompoment === "details" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {/* Year */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">
                    1
                  </span>
                  <Select
                    placeholder="Year"
                    className="w-full"
                    options={yearOptions}
                    value={year}
                    onChange={setYear}
                  />
                </div>

                {/* Brand */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">
                    2
                  </span>
                  <Select
                    placeholder="Brand"
                    className="w-full"
                    loading={isBrandsLoading}
                    options={brandOptions}
                    value={brandId}
                    onChange={(val) => {
                      setBrandId(val);
                      const selected = brandsData?.data.find(
                        (b: Brand) => b.brandId === val
                      );
                      setBrandName(selected?.brandName);
                    }}
                    disabled={!year}
                  />
                </div>

                {/* Model */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">
                    3
                  </span>
                  <Select
                    placeholder="Model"
                    className="w-full"
                    loading={isModelsLoading}
                    options={modelOptions}
                    value={modelId}
                    onChange={(val) => {
                      setModelId(val);
                      const selected = modelsData?.data.find(
                        (m: Model) => m.modelId === val
                      );
                      setModelName(selected?.modelName);
                      // setEngineId(selected.engineId);
                    }}
                    disabled={!brandId}
                  />
                </div>

                {/* Engine Power (Multiple Selection) */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">
                    4
                  </span>
                  <Select
                    placeholder="Engine Power"
                    className="w-full"
                    mode="multiple"
                    loading={isEnginesLoading}
                    options={hpOptions}
                    value={fitVehicles} // Using fitVehicles as the value to store selected MongoDB _id(s)
                    onChange={(selectedValues) =>
                      setFitVehicles(selectedValues)
                    } // Directly set the MongoDB _id(s) in fitVehicles
                    disabled={!modelId}
                  />
                </div>

                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">
                    4
                  </span>
                  <Select
                    placeholder="Select Category"
                    allowClear
                    loading={isCategoriesLoading}
                    options={categoriesData?.data.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    value={categoryId}
                    onChange={setCategoryId}
                  />
                </div>
              </div>

              <div className=" mt-8">
                <Form
                  form={form}
                  layout="vertical"
                  className="mx-auto p-5 bg-white rounded-md"
                >
                  <Form.Item
                    label="Product Name"
                    name="productName"
                    rules={[
                      { required: true, message: "Product name is required" },
                    ]}
                  >
                    <Input placeholder="Enter product name" />
                  </Form.Item>

                  <Form.Item
                    label="Product Availability"
                    name="productAvailability"
                    rules={[
                      { required: true, message: "Please select availability" },
                    ]}
                  >
                    <Select placeholder="In Stock / Out of Stock" allowClear>
                      <Option value="inStock">In Stock</Option>
                      <Option value="outOfStock">Out of Stock</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Price is required" }]}
                  >
                    <Input type="number" placeholder="Enter price" />
                  </Form.Item>

                  <Form.Item label="Stock" name="stock">
                    <Input type="number" placeholder="Enter stock quantity" />
                  </Form.Item>

                  <Form.Item label="Discount (%)" name="discount">
                    <Input
                      type="number"
                      placeholder="Enter discount percentage"
                    />
                  </Form.Item>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Product Sections
                    </h3>
                    <div className="flex gap-2 mb-4">
                      <Form.Item name="newSectionName" noStyle initialValue="">
                        <Input
                          placeholder="Enter section name (e.g., Specifications)"
                          className="flex-1"
                        />
                      </Form.Item>
                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="bg-[#f56100] px-4 py-2 text-white cursor-pointer rounded flex items-center gap-2"
                      >
                        <IoAdd size={20} /> Add Section
                      </button>
                    </div>

                    {sections.length > 0 && (
                      <div className="space-y-4">
                        {sections.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="border rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold text-base">
                                {section.sectionName}
                              </h4>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveSection(sectionIndex)
                                }
                                className="text-red-500 cursor-pointer"
                              >
                                <MdDelete size={20} />
                              </button>
                            </div>

                            {/* Fields in section */}
                            <div className="mb-4 bg-white p-3 rounded">
                              <p className="text-sm font-semibold mb-2">
                                Fields
                              </p>
                              <div className="flex gap-2 mb-2">
                                <Form.Item
                                  name={`field_name_${sectionIndex}`}
                                  noStyle
                                >
                                  <Input
                                    placeholder="Field name"
                                    className="flex-1"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name={`field_type_${sectionIndex}`}
                                  noStyle
                                  initialValue="string"
                                ></Form.Item>
                                <Form.Item
                                  name={`field_value_${sectionIndex}`}
                                  noStyle
                                >
                                  <Input
                                    placeholder="Value"
                                    className="flex-1"
                                  />
                                </Form.Item>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAddFieldToSection(sectionIndex)
                                  }
                                  className="bg-[#f56100] px-3 py-2 text-white cursor-pointer rounded"
                                >
                                  <IoAdd size={16} />
                                </button>
                              </div>

                              {section.fields.length > 0 && (
                                <div className="space-y-1">
                                  {section.fields.map((field, fieldIndex) => (
                                    <div
                                      key={fieldIndex}
                                      className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm"
                                    >
                                      <span>
                                        {field.fieldName}:{" "}
                                        {field.valueType === "float"
                                          ? field.valueFloat
                                          : field.valueString}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveFieldFromSection(
                                            sectionIndex,
                                            fieldIndex
                                          )
                                        }
                                        className="text-red-500 cursor-pointer"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Subsections */}
                          </div>
                        ))}
                      </div>
                    )}
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
                        <Input
                          placeholder="Reference number"
                          className="w-1/3"
                        />
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
                        onClick={handleAddOEMReference}
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
                              onClick={() => handleRemoveOEMReference(idx)}
                              className="text-red-500 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Form.Item
                        name="shippingCountryCode"
                        noStyle
                        initialValue=""
                      >
                        <Input placeholder="Country Code (e.g., US)" />
                      </Form.Item>
                      <Form.Item
                        name="shippingCountryName"
                        noStyle
                        initialValue=""
                      >
                        <Input placeholder="Country Name" />
                      </Form.Item>
                      <Form.Item name="shippingCarrier" noStyle initialValue="">
                        <Input placeholder="Carrier (e.g., UPS)" />
                      </Form.Item>
                      <Form.Item name="shippingCost" noStyle initialValue="">
                        <Input type="number" placeholder="Cost" />
                      </Form.Item>
                      <Form.Item
                        name="shippingDeliveryMin"
                        noStyle
                        initialValue=""
                      >
                        <Input type="number" placeholder="Min Days" />
                      </Form.Item>
                      <Form.Item
                        name="shippingDeliveryMax"
                        noStyle
                        initialValue=""
                      >
                        <Input type="number" placeholder="Max Days" />
                      </Form.Item>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddShipping}
                      className="w-full bg-[#f56100] py-2 rounded text-white cursor-pointer mb-4"
                    >
                      Add Shipping
                    </button>
                    {shippingInfo.length > 0 && (
                      <div className="mb-4">
                        {shippingInfo.map((ship, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                          >
                            <span>
                              {ship.countryName} ({ship.countryCode}) -{" "}
                              {ship.carrier} - ${ship.cost}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveShipping(idx)}
                              className="text-red-500 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Form.Item>
                    <button
                      onClick={handleNextStep}
                      className="w-full bg-[#f56100] py-3 rounded-2xl mt-3 text-white cursor-pointer"
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
                <div className=" h-auto rounded-2xl border border-dashed border-[#f56100] mt-4 mb-5 px-3 py-3">
                  <div>
                    <TipTapMenu editor={editor} />
                  </div>
                  <EditorContent editor={editor} />
                </div>
              </div>
      <div className="mb-5">
  <h2 className="text-xl font-semibold mb-4">Product Images</h2>
  <div className="flex items-center justify-center rounded-2xl py-3 border border-dashed border-[#f56100] mt-4 relative">
    {profilePic ? (
      <>
        <div className="relative w-full h-64 bg-gray-200 overflow-hidden rounded-xl ">
          <Image
            src={profilePicUrl || ""}
            layout="fill"
            objectFit="cover"  // Ensures the image covers the container properly
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
          <SlCloudUpload size={40} className="transition-all duration-300 hover:scale-110" />
        </div>
      </Upload>
    )}
  </div>
</div>

              <button
                onClick={handleSubmitProduct}
                className="w-full bg-[#f56100] py-3 rounded-2xl mt-3 text-white cursor-pointer"
              >
                Submit Product
              </button>
            </>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default AddProductModal;
