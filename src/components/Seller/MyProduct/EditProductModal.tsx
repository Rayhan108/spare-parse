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
