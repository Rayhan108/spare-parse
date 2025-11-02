"use client"

import { Form, Input, Select, message, Spin } from "antd"
import { IoAdd } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import React, { useEffect } from "react"
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi"

const { Option } = Select

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

interface ProductDetailsFormProps {
  form: any
  productId: string // ✅ added to fetch data
  sections: Section[]
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
  oemReferences: OEMReference[]
  setOemReferences: React.Dispatch<React.SetStateAction<OEMReference[]>>
  shippingInfo: ShippingInfo[]
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo[]>>
  brandId?: string
}

const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  form,
  productId,
  sections,
  setSections,
  oemReferences,
  setOemReferences,
  shippingInfo,
  setShippingInfo,
  brandId,
}) => {
  // ✅ Fetch existing product data
  const { data: productData, isLoading } = useGetSingleProductQuery(productId)

  // ✅ Prefill once data is loaded
  useEffect(() => {
    if (productData?.product) {
      const product = productData.product

      if (product.sections && product.sections.length > 0) {
        setSections(product.sections)
      }

      if (product.references && product.references.length > 0) {
        setOemReferences(product.references)
      }

      if (product.shipping && product.shipping.length > 0) {
        setShippingInfo(product.shipping)
      }

      // Prefill form for extra fields if needed
      form.setFieldsValue({
        newSectionName: "",
        refType: "",
        refNumber: "",
        refBrandId: brandId || product.brandId,
      })
    }
  }, [productData, form, setSections, setOemReferences, setShippingInfo, brandId])

  // ✅ Show loading spinner while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    )
  }

  // ------------------------- existing UI unchanged --------------------------
  const handleAddSection = () => {
    const sectionName = form.getFieldValue("newSectionName")
    if (sectionName && sectionName.trim()) {
      setSections([...sections, { sectionName: sectionName.trim(), fields: [], subSections: [] }])
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

  const handleAddOEMReference = () => {
    const refType = form.getFieldValue("refType")
    const refNumber = form.getFieldValue("refNumber")
    const refBrandId = form.getFieldValue("refBrandId")

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

    if (countryCode && countryName && carrier && cost) {
      const newShipping: ShippingInfo = {
        countryCode,
        countryName,
        carrier,
        cost: parseFloat(cost),
        deliveryMin: deliveryMin ? parseInt(deliveryMin) : 0,
        deliveryMax: deliveryMax ? parseInt(deliveryMax) : 0,
      }
      setShippingInfo([...shippingInfo, newShipping])
      form.setFieldsValue({
        shippingCountryCode: "",
        shippingCountryName: "",
        shippingCarrier: "",
        shippingCost: "",
        shippingDeliveryMin: "",
        shippingDeliveryMax: "",
      })
      message.success("Shipping info added")
    } else {
      message.error("Please fill in all required shipping fields")
    }
  }

  const handleRemoveShipping = (index: number) => {
    setShippingInfo(shippingInfo.filter((_, i) => i !== index))
  }

  return (
    <>
      {/* ✅ same UI as before */}
      {/* (Sections, References, and Shipping rendering stays identical) */}

      {/* Product Sections */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-3">Product Sections</h3>
        <div className="flex gap-2 mb-4">
          <Form.Item name="newSectionName" noStyle initialValue="">
            <Input placeholder="Enter section name" className="flex-1" />
          </Form.Item>
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-[#f56100] px-4 py-2 text-white rounded flex items-center gap-2"
          >
            <IoAdd size={20} /> Add Section
          </button>
        </div>

        {sections.map((section, sIndex) => (
          <div key={sIndex} className="border rounded-lg p-4 bg-gray-50 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-base">{section.sectionName}</h4>
              <button onClick={() => handleRemoveSection(sIndex)} className="text-red-500">
                <MdDelete size={20} />
              </button>
            </div>

            <div className="flex gap-2 mb-2">
              <Form.Item name={`field_name_${sIndex}`} noStyle>
                <Input placeholder="Field name" className="flex-1" />
              </Form.Item>
              <Form.Item name={`field_type_${sIndex}`} noStyle initialValue="string">
                <Select className="w-24">
                  <Option value="string">Text</Option>
                  <Option value="float">Number</Option>
                </Select>
              </Form.Item>
              <Form.Item name={`field_value_${sIndex}`} noStyle>
                <Input placeholder="Value" className="flex-1" />
              </Form.Item>
              <button
                onClick={() => handleAddFieldToSection(sIndex)}
                className="bg-[#f56100] px-3 py-2 text-white rounded"
              >
                <IoAdd size={16} />
              </button>
            </div>

            {section.fields.map((f, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded text-sm mb-1">
                <span>
                  {f.fieldName}: {f.valueType === "float" ? f.valueFloat : f.valueString}
                </span>
                <button onClick={() => handleRemoveFieldFromSection(sIndex, i)} className="text-red-500">
                  ×
                </button>
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
          <Form.Item name="refNumber" noStyle>
            <Input placeholder="Reference number" className="w-1/3" />
          </Form.Item>
          <Form.Item name="refBrandId" noStyle>
            <Input placeholder="Brand ID" className="w-1/4" value={brandId} disabled />
          </Form.Item>
          <button
            onClick={handleAddOEMReference}
            type="button"
            className="w-10 flex justify-center items-center bg-[#f56100] px-2 text-white rounded"
          >
            <IoAdd size={20} />
          </button>
        </div>

        {oemReferences.map((ref, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>
              {ref.type} - {ref.number}
            </span>
            <button onClick={() => handleRemoveOEMReference(i)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Shipping */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
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
            <Input type="number" placeholder="Cost" />
          </Form.Item>
          <Form.Item name="shippingDeliveryMin" noStyle>
            <Input type="number" placeholder="Min Days" />
          </Form.Item>
          <Form.Item name="shippingDeliveryMax" noStyle>
            <Input type="number" placeholder="Max Days" />
          </Form.Item>
        </div>

        <button
          type="button"
          onClick={handleAddShipping}
          className="w-full bg-[#f56100] py-2 rounded text-white mb-4"
        >
          Add Shipping
        </button>

        {shippingInfo.map((ship, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>
              {ship.countryName} ({ship.countryCode}) - {ship.carrier} - ${ship.cost}
            </span>
            <button onClick={() => handleRemoveShipping(i)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductDetailsForm
