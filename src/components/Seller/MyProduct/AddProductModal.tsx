"use client"

import type React from "react"
import { Form, Input, Modal, Select, Upload, message, Spin } from "antd"
import { useState } from "react"
import { IoAdd } from "react-icons/io5"
import { SlCloudUpload } from "react-icons/sl"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Heading from "@tiptap/extension-heading"
import Image from "next/image"
import { IoMdArrowRoundBack } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import TipTapMenu from "./TipTapMenu"

import { useAddProductMutation } from "@/redux/features/seller/product/productApi" // Adjust the import according to your project structure



import { useEffect } from "react";

import {
  useGetBrandsByYearQuery,
  useGetModelsByBrandQuery,
  useGetEnginesByModelQuery,
} from "@/redux/features/carBrand/carBrandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/categories/categoriesApi"



//category 
// adjust path
const { Option } = Select;
interface Brand {
  brandId: string;
  brandName: string;
}

interface Model {
  modelId: string;
  modelName: string;
}

interface Engine {
  engineId: string;
  hp: number;
}


interface ProductDetailModalProps {
  isModalOpen: boolean
  handleOk: () => any
  handleCancel: () => any
}

interface OEMReference {
  type: "OE" | "INTERNAL"
  number: string
  brandId?: string
}

interface ShippingInfo {
  countryCode: string
  countryName: string
  carrier: string
  cost: number
  deliveryMin: number
  deliveryMax: number
  isDefault?: boolean
}

interface Field {
  fieldName: string
  valueString?: string
  valueFloat?: number
  valueType: "string" | "float"
}

interface SubSection {
  sectionName: string
  fields: Field[]
}

interface Section {
  sectionName: string
  fields: Field[]
  subSections: SubSection[]
}

const AddProductModal: React.FC<ProductDetailModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {

  //categroy 

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery({ page: 1, limit: 100 });
  console.log(categoriesData);


  const [year, setYear] = useState<string>();
  const [brandId, setBrandId] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [modelId, setModelId] = useState<string>();
  const [modelName, setModelName] = useState<string>();
  const [hp, setHp] = useState<string>();

  // Generate years (1976 → current)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1976 + 1 }, (_, i) => {
    const y = String(currentYear - i);
    return { value: y, label: y };
  });

  // 1️⃣ Fetch brands by selected year
  const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsByYearQuery(year!, {
    skip: !year,
  });
  const brandOptions =
    brandsData?.data.map((b: Brand) => ({
      value: b.brandId,
      label: b.brandName,
    })) || [];

  // 2️⃣ Fetch models by brand + year
  const { data: modelsData, isLoading: isModelsLoading } = useGetModelsByBrandQuery(
    { brandId: brandId!, year: year! },
    { skip: !brandId || !year }
  );
  const modelOptions =
    modelsData?.data.map((m: Model) => ({
      value: m.modelId,
      label: m.modelName,
    })) || [];

  // 3️⃣ Fetch engines by model
  const { data: enginesData, isLoading: isEnginesLoading } = useGetEnginesByModelQuery(modelId!, {
    skip: !modelId,
  });
  const hpOptions =
    enginesData?.data.map((e: Engine) => ({
      value: String(e.hp),
      label: `${e.hp} HP`,
    })) || [];

  // Reset dependent fields
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





  const { Option } = Select
  const [form] = Form.useForm()
  const [nextCompoment, SetNextComponent] = useState("details")
  const [loading, setLoading] = useState(false)
  const [oemReferences, setOemReferences] = useState<OEMReference[]>([])
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [formData, setFormData] = useState<any>({})
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const [categoryId, setCategoryId] = useState<string>();
  console.log(categoryId)




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
  ]

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3",
      },
    },
  })

  const [profilePic, setProfilePic] = useState<File | null>(null)
  const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null
  const handleProfilePicUpload = (e: any) => {
    setProfilePic(e.file)
  }

  const handleAddOEMReference = () => {
    const refType = form.getFieldValue("refType")
    const refNumber = form.getFieldValue("refNumber")
    const refBrandId = form.getFieldValue("refBrandId")

    console.log("[v0] Reference values:", { refType, refNumber, refBrandId })

    if (refType && refNumber) {
      const newRef: OEMReference = {
        type: refType,
        number: refNumber,
        ...(refType === "OE" && { brandId: refBrandId }),
      }
      setOemReferences([...oemReferences, newRef])
      form.setFieldsValue({ refType: "", refNumber: "", refBrandId: "" })
      message.success("Reference added")
    } else {
      message.error("Please fill in reference type and number")
    }
  }

  const handleRemoveOEMReference = (index: number) => {
    setOemReferences(oemReferences.filter((_, i) => i !== index))
  }

  const handleAddShipping = () => {
    const countryCode = form.getFieldValue("shippingCountryCode")
    const countryName = form.getFieldValue("shippingCountryName")
    const carrier = form.getFieldValue("shippingCarrier")
    const cost = form.getFieldValue("shippingCost")
    const deliveryMin = form.getFieldValue("shippingDeliveryMin")
    const deliveryMax = form.getFieldValue("shippingDeliveryMax")
    const isDefault = form.getFieldValue("shippingIsDefault")

    console.log("[v0] Shipping values:", { countryCode, countryName, carrier, cost })

    if (countryCode && countryName && carrier && cost) {
      const newShipping: ShippingInfo = {
        countryCode: countryCode.trim(),
        countryName: countryName.trim(),
        carrier: carrier.trim(),
        cost: Number.parseFloat(cost),
        deliveryMin: deliveryMin ? Number.parseInt(deliveryMin) : 0,
        deliveryMax: deliveryMax ? Number.parseInt(deliveryMax) : 0,
        isDefault: isDefault || false,
      }
      setShippingInfo([...shippingInfo, newShipping])
      form.setFieldsValue({
        shippingCountryCode: "",
        shippingCountryName: "",
        shippingCarrier: "",
        shippingCost: "",
        shippingDeliveryMin: "",
        shippingDeliveryMax: "",
        shippingIsDefault: false,
      })
      message.success("Shipping info added")
    } else {
      message.error("Please fill in all required shipping fields (Country Code, Country Name, Carrier, Cost)")
    }
  }

  const handleRemoveShipping = (index: number) => {
    setShippingInfo(shippingInfo.filter((_, i) => i !== index))
  }

  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName")
    console.log("[v0] Adding section with name:", sectionName)

    if (sectionName && sectionName.trim()) {
      const newSection: Section = {
        sectionName: sectionName.trim(),
        fields: [],
        subSections: [],
      }
      setSections([...sections, newSection])
      form.setFieldsValue({ newSectionName: "" })
      message.success("Section added")
    } else {
      message.error("Please enter section name")
    }
  }

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const handleAddFieldToSection = (sectionIndex: number) => {
    const fieldName = form.getFieldValue(`field_name_${sectionIndex}`)
    const fieldValue = form.getFieldValue(`field_value_${sectionIndex}`)
    const fieldType = form.getFieldValue(`field_type_${sectionIndex}`)

    if (fieldName && fieldValue !== undefined && fieldValue !== "") {
      const newSections = [...sections]
      const newField: Field = {
        fieldName,
        valueType: fieldType || "string",
        ...(fieldType === "float" ? { valueFloat: Number.parseFloat(fieldValue) } : { valueString: fieldValue }),
      }
      newSections[sectionIndex].fields.push(newField)
      setSections(newSections)
      form.setFieldsValue({
        [`field_name_${sectionIndex}`]: "",
        [`field_value_${sectionIndex}`]: "",
        [`field_type_${sectionIndex}`]: "string",
      })
      message.success("Field added to section")
    } else {
      message.error("Please fill in field name and value")
    }
  }

  const handleRemoveFieldFromSection = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].fields.splice(fieldIndex, 1)
    setSections(newSections)
  }

  const handleAddSubSection = (sectionIndex: number) => {
    const subSectionName = form.getFieldValue(`subsection_name_${sectionIndex}`)
    if (subSectionName) {
      const newSections = [...sections]
      const newSubSection: SubSection = {
        sectionName: subSectionName,
        fields: [],
      }
      newSections[sectionIndex].subSections.push(newSubSection)
      setSections(newSections)
      form.setFieldsValue({ [`subsection_name_${sectionIndex}`]: "" })
      message.success("Subsection added")
    } else {
      message.error("Please enter subsection name")
    }
  }

  const handleRemoveSubSection = (sectionIndex: number, subSectionIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].subSections.splice(subSectionIndex, 1)
    setSections(newSections)
  }

  const handleAddFieldToSubSection = (sectionIndex: number, subSectionIndex: number) => {
    const fieldName = form.getFieldValue(`subfield_name_${sectionIndex}_${subSectionIndex}`)
    const fieldValue = form.getFieldValue(`subfield_value_${sectionIndex}_${subSectionIndex}`)
    const fieldType = form.getFieldValue(`subfield_type_${sectionIndex}_${subSectionIndex}`)

    if (fieldName && fieldValue !== undefined && fieldValue !== "") {
      const newSections = [...sections]
      const newField: Field = {
        fieldName,
        valueType: fieldType || "string",
        ...(fieldType === "float" ? { valueFloat: Number.parseFloat(fieldValue) } : { valueString: fieldValue }),
      }
      newSections[sectionIndex].subSections[subSectionIndex].fields.push(newField)
      setSections(newSections)
      form.setFieldsValue({
        [`subfield_name_${sectionIndex}_${subSectionIndex}`]: "",
        [`subfield_value_${sectionIndex}_${subSectionIndex}`]: "",
        [`subfield_type_${sectionIndex}_${subSectionIndex}`]: "string",
      })
      message.success("Field added to subsection")
    } else {
      message.error("Please fill in field name and value")
    }
  }

  const handleRemoveFieldFromSubSection = (sectionIndex: number, subSectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].subSections[subSectionIndex].fields.splice(fieldIndex, 1)
    setSections(newSections)
  }



  const handleSubmitProduct = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const selectedCategoryId = values.category; // <- this will now have the selected category ID
      console.log("Selected Category ID:", selectedCategoryId);


      const selectedBrandId = brandId;

      const productData = {
        categoryId: values.category || "68ec9d7e5d5df4fdb737e5a5",
        brandId: selectedBrandId,
        productName: values.productName || "demo1",
        description: editor?.getHTML() || "",
        price: Number(values.price) || 30,
        discount: Number(values.discount) || 10,
        stock: Number(values.stock) || 10,
        isVisible: values.productAvailability === "inStock",
        fitVehicles: values.fitVehicles ? [values.fitVehicles] : [],
        sections: sections.map((section) => ({
          sectionName: section.sectionName,
          fields: section.fields.map((field) => ({
            fieldName: field.fieldName,
            ...(field.valueType === "float"
              ? { valueFloat: field.valueFloat }
              : { valueString: field.valueString }),
          })),
          subSections: section.subSections.map((subSection) => ({
            sectionName: subSection.sectionName,
            fields: subSection.fields.map((field) => ({
              fieldName: field.fieldName,
              ...(field.valueType === "float"
                ? { valueFloat: field.valueFloat }
                : { valueString: field.valueString }),
            })),
          })),
        })),
        references: oemReferences,
        shipping: shippingInfo,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("bodyData", JSON.stringify(productData));
      if (profilePic) formDataToSend.append("productImages", profilePic);

      console.log("Final payload before upload:");
      formDataToSend.forEach((v, k) => console.log(k, v));

      const result = await addProduct(formDataToSend).unwrap();
      message.success("✅ Product uploaded successfully!");

      // Reset
      form.resetFields();
      setOemReferences([]);
      setShippingInfo([]);
      setSections([]);
      setProfilePic(null);
      SetNextComponent("details");
      editor?.commands.clearContent();
      handleOk();
    } catch (error: any) {
      message.error(error.message || "Error uploading product");
    } finally {
      setLoading(false);
    }
  };




  const handleNextStep = async () => {
    try {
      await form.validateFields()
      setFormData(form.getFieldsValue())
      SetNextComponent("description")
    } catch (error) {
      message.error("Please fill in all required fields")
    }
  }

  return (
    <Modal
      closable={{ "aria-label": "Custom Close Button" }}
      className="w-full md:w-[800px]"
      footer={false}
      width={1000}
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
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">1</span>
                  <Select
                    placeholder="Year"
                    className="w-full"
                    options={[
                      { value: "2025", label: "2025" },
                      { value: "2024", label: "2024" },
                      { value: "2023", label: "2023" },
                      { value: "2022", label: "2022" },
                      { value: "2021", label: "2021" },
                    ]}
                  />
                </div>
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">2</span>
                  <Select
                    placeholder="Brand"
                    className="w-full"
                    options={[
                      { value: "toyota", label: "Toyota" },
                      { value: "honda", label: "Honda" },
                      { value: "ford", label: "Ford" },
                      { value: "chevrolet", label: "Chevrolet" },
                      { value: "bmw", label: "BMW" },
                      { value: "audi", label: "Audi" },
                      { value: "mercedes", label: "Mercedes-Benz" },
                    ]}
                  />
                </div>
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">3</span>
                  <Select
                    placeholder="Model"
                    className="w-full"
                    options={[
                      { value: "camry", label: "Toyota Camry" },
                      { value: "accord", label: "Honda Accord" },
                      { value: "mustang", label: "Ford Mustang" },
                      { value: "impala", label: "Chevrolet Impala" },
                      { value: "x5", label: "BMW X5" },
                      { value: "a4", label: "Audi A4" },
                      { value: "c_class", label: "Mercedes-Benz C-Class" },
                    ]}
                  />
                </div>
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">4</span>
                  <Select
                    placeholder="Engine Power"
                    className="w-full"
                    options={[
                      { value: "150", label: "150 HP" },
                      { value: "200", label: "200 HP" },
                      { value: "250", label: "250 HP" },
                      { value: "300", label: "300 HP" },
                      { value: "350", label: "350 HP" },
                      { value: "400", label: "400 HP" },
                    ]}
                  />
                </div>
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {/* Year */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">1</span>
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
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">2</span>
                  <Select
                    placeholder="Brand"
                    className="w-full"
                    loading={isBrandsLoading}
                    options={brandOptions}
                    value={brandId}
                    onChange={(val) => {
                      setBrandId(val);
                      const selected = brandsData?.data.find((b: Brand) => b.brandId === val);
                      setBrandName(selected?.brandName);
                    }}
                    disabled={!year}
                  />
                </div>

                {/* Model */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">3</span>
                  <Select
                    placeholder="Model"
                    className="w-full"
                    loading={isModelsLoading}
                    options={modelOptions}
                    value={modelId}
                    onChange={(val) => {
                      setModelId(val);
                      const selected = modelsData?.data.find((m: Model) => m.modelId === val);
                      setModelName(selected?.modelName);
                    }}
                    disabled={!brandId}
                  />
                </div>

                {/* Engine Power */}
                <div className="flex items-center w-full">
                  <span className="bg-[#f56100] py-[11px] px-4 text-white">4</span>
                  <Select
                    placeholder="Engine Power"
                    className="w-full"
                    loading={isEnginesLoading}
                    options={hpOptions}
                    value={hp}
                    onChange={setHp}
                    disabled={!modelId}
                  />
                </div>
              </div>


              <div className=" mt-8">
                <Form form={form} layout="vertical" className="mx-auto p-5 bg-white rounded-md">
                  <Form.Item
                    label="Product Name"
                    name="productName"
                    rules={[{ required: true, message: "Product name is required" }]}
                  >
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



                  {/* <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                      notFoundContent={isCategoriesLoading ? <Spin size="small" /> : null}
                    >
                      {categoriesData?.data.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}


                  {/* <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                      value={categoryId}
                      onChange={(val) => setCategoryId(val)}
                    >
                      {categoriesData?.data.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name} {cat.id}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}

                  {/* <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                      value={categoryId} // state that holds selected category id
                      onChange={(val: string) => {
                        console.log("Selected Category ID:", val); // debug
                        setCategoryId(val);
                      }}
                    >
                      {categoriesData?.data.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}

                  {/* <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                      onChange={(val: string) => {
                        // Optional: if you need categoryId elsewhere
                        setCategoryId(val);
                      }}
                    >
                      {categoriesData?.data.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}
                  {/* 
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                    >
                      {categoriesData?.data.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}

                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select
                      placeholder="Select Category"
                      allowClear
                      loading={isCategoriesLoading}
                      options={categoriesData?.data.map(cat => ({ value: cat.id, label: cat.name }))}
                    />
                  </Form.Item>



                  <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Brand is required" }]}>
                    <Select placeholder="Select Brand" allowClear>
                      <Option value="68eb81dbf3e7ce80d2119818">BMW</Option>
                      <Option value="brand2">Audi</Option>
                      <Option value="brand3">Mercedes</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price is required" }]}>
                    <Input type="number" placeholder="Enter price" />
                  </Form.Item>

                  <Form.Item label="Stock" name="stock">
                    <Input type="number" placeholder="Enter stock quantity" />
                  </Form.Item>

                  <Form.Item label="Discount (%)" name="discount">
                    <Input type="number" placeholder="Enter discount percentage" />
                  </Form.Item>

                  {/* <Form.Item label="Compatible Models" name="compatibleModels">
                    <Input placeholder="Enter compatible models" />
                  </Form.Item>

                  <Form.Item label="Mounting Type" name="mountingType">
                    <Input placeholder="Enter mounting type" />
                  </Form.Item>

                  <Form.Item label="Material" name="material">
                    <Input placeholder="Enter material" />
                  </Form.Item>

                  <Form.Item label="Color" name="color">
                    <Input placeholder="Enter color" />
                  </Form.Item>

                  <Form.Item label="Product Weight (kg)" name="productWeight">
                    <Input type="number" placeholder="Enter weight" />
                  </Form.Item>

                  <Form.Item label="Product Length (mm)" name="productLength">
                    <Input type="number" placeholder="Enter length" />
                  </Form.Item>

                  <Form.Item label="Product Width (mm)" name="width">
                    <Input type="number" placeholder="Enter width" />
                  </Form.Item>

                  <Form.Item label="Product Height (mm)" name="height">
                    <Input type="number" placeholder="Enter height" />
                  </Form.Item> */}

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-3">Product Sections</h3>
                    <div className="flex gap-2 mb-4">
                      <Form.Item name="newSectionName" noStyle initialValue="">
                        <Input placeholder="Enter section name (e.g., Specifications)" className="flex-1" />
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
                          <div key={sectionIndex} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold text-base">{section.sectionName}</h4>
                              <button
                                type="button"
                                onClick={() => handleRemoveSection(sectionIndex)}
                                className="text-red-500 cursor-pointer"
                              >
                                <MdDelete size={20} />
                              </button>
                            </div>

                            {/* Fields in section */}
                            <div className="mb-4 bg-white p-3 rounded">
                              <p className="text-sm font-semibold mb-2">Fields</p>
                              <div className="flex gap-2 mb-2">
                                <Form.Item name={`field_name_${sectionIndex}`} noStyle>
                                  <Input placeholder="Field name" className="flex-1" />
                                </Form.Item>
                                <Form.Item name={`field_type_${sectionIndex}`} noStyle initialValue="string">
                                  <Select className="w-24">
                                    <Option value="string">String</Option>
                                    <Option value="float">Float</Option>
                                  </Select>
                                </Form.Item>
                                <Form.Item name={`field_value_${sectionIndex}`} noStyle>
                                  <Input placeholder="Value" className="flex-1" />
                                </Form.Item>
                                <button
                                  type="button"
                                  onClick={() => handleAddFieldToSection(sectionIndex)}
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
                                        {field.valueType === "float" ? field.valueFloat : field.valueString}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveFieldFromSection(sectionIndex, fieldIndex)}
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
                            <div className="bg-white p-3 rounded">
                              <p className="text-sm font-semibold mb-2">Subsections</p>
                              <div className="flex gap-2 mb-2">
                                <Form.Item name={`subsection_name_${sectionIndex}`} noStyle>
                                  <Input placeholder="Subsection name (e.g., Dimensions)" className="flex-1" />
                                </Form.Item>
                                <button
                                  type="button"
                                  onClick={() => handleAddSubSection(sectionIndex)}
                                  className="bg-[#f56100] px-3 py-2 text-white cursor-pointer rounded"
                                >
                                  <IoAdd size={16} />
                                </button>
                              </div>

                              {section.subSections.length > 0 && (
                                <div className="space-y-2">
                                  {section.subSections.map((subSection, subSectionIndex) => (
                                    <div
                                      key={subSectionIndex}
                                      className="border-l-4 border-[#f56100] pl-3 py-2 bg-gray-100 rounded"
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-sm">{subSection.sectionName}</p>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveSubSection(sectionIndex, subSectionIndex)}
                                          className="text-red-500 cursor-pointer"
                                        >
                                          <MdDelete size={16} />
                                        </button>
                                      </div>

                                      {/* Fields in subsection */}
                                      <div className="flex gap-2 mb-2">
                                        <Form.Item name={`subfield_name_${sectionIndex}_${subSectionIndex}`} noStyle>
                                          <Input placeholder="Field name" className="flex-1" size="small" />
                                        </Form.Item>
                                        <Form.Item
                                          name={`subfield_type_${sectionIndex}_${subSectionIndex}`}
                                          noStyle
                                          initialValue="string"
                                        >
                                          <Select className="w-20" size="small">
                                            <Option value="string">String</Option>
                                            <Option value="float">Float</Option>
                                          </Select>
                                        </Form.Item>
                                        <Form.Item name={`subfield_value_${sectionIndex}_${subSectionIndex}`} noStyle>
                                          <Input placeholder="Value" className="flex-1" size="small" />
                                        </Form.Item>
                                        <button
                                          type="button"
                                          onClick={() => handleAddFieldToSubSection(sectionIndex, subSectionIndex)}
                                          className="bg-[#f56100] px-2 py-1 text-white cursor-pointer rounded text-sm"
                                        >
                                          <IoAdd size={14} />
                                        </button>
                                      </div>

                                      {subSection.fields.length > 0 && (
                                        <div className="space-y-1">
                                          {subSection.fields.map((field, fieldIndex) => (
                                            <div
                                              key={fieldIndex}
                                              className="flex justify-between items-center bg-white p-1 rounded text-xs"
                                            >
                                              <span>
                                                {field.fieldName}:{" "}
                                                {field.valueType === "float" ? field.valueFloat : field.valueString}
                                              </span>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleRemoveFieldFromSubSection(
                                                    sectionIndex,
                                                    subSectionIndex,
                                                    fieldIndex,
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
                                  ))}
                                </div>
                              )}
                            </div>
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
                        <Input placeholder="Reference number" className="w-1/3" />
                      </Form.Item>
                      <Form.Item name="refBrandId" noStyle initialValue="">
                        <Input placeholder="Brand ID (for OE)" className="w-1/4" />
                      </Form.Item>
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
                          <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                            <span>
                              {ref.type} - {ref.number}
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
                    <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Form.Item name="shippingCountryCode" noStyle initialValue="">
                        <Input placeholder="Country Code (e.g., US)" />
                      </Form.Item>
                      <Form.Item name="shippingCountryName" noStyle initialValue="">
                        <Input placeholder="Country Name" />
                      </Form.Item>
                      <Form.Item name="shippingCarrier" noStyle initialValue="">
                        <Input placeholder="Carrier (e.g., UPS)" />
                      </Form.Item>
                      <Form.Item name="shippingCost" noStyle initialValue="">
                        <Input type="number" placeholder="Cost" />
                      </Form.Item>
                      <Form.Item name="shippingDeliveryMin" noStyle initialValue="">
                        <Input type="number" placeholder="Min Days" />
                      </Form.Item>
                      <Form.Item name="shippingDeliveryMax" noStyle initialValue="">
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
                          <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                            <span>
                              {ship.countryName} ({ship.countryCode}) - {ship.carrier} - ${ship.cost}
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
                <h2 className="text-xl">Product Images</h2>
                <div className=" h-30 flex items-center justify-center rounded-2xl border border-dashed border-[#f56100] mt-4">
                  {profilePic ? (
                    <>
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
                    </>
                  ) : (
                    <Upload
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleProfilePicUpload}
                      className=""
                    >
                      <SlCloudUpload className=" cursor-pointer" size={32} />
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
  )
}

export default AddProductModal
