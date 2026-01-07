"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { notification, Spin } from "antd"
import Cookies from "js-cookie"
import { useAddToCartMutation } from "@/redux/features/cart/cartApi"

interface AlternativeProduct {
  id: string
  companyName: string
  productCode?: string
  productName: string
  image?: string
  price: number
  dispatch?: string
}

interface AlternativesTabProps {
  similarProducts: AlternativeProduct[]
}

export default function AlternativesTab({ similarProducts }: AlternativesTabProps) {
  const router = useRouter()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
  const [addToCart] = useAddToCartMutation()
  const [api, contextHolder] = notification.useNotification()
  const handleQuantityChange = (id: string, value: string) => {
    const num = Number.parseInt(value) || 1
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, num) }))
  }

  const handleAddToCart = async (id: string) => {
    const quantity = quantities[id] || 1
    try {
      const token = Cookies.get("hatem-ecommerce-token")
      if (!token) {
        api.open({
          type: "warning",
          message: "Login Required",
          description: "Please log in to add products to your cart.",
          placement: "topRight",
        })
        return
      }

      setLoadingIds((prev) => ({ ...prev, [id]: true }))

      const payload = { productId: id, quantity }
      const response = await addToCart(payload).unwrap()

      api.open({
        type: "success",
        message: "Cart",
        description: response.message || `Added ${quantity} item(s) to cart successfully!`,
        placement: "topRight",
      })
    } catch (err: unknown) {
      let errorMessage = "Failed to add product to cart"
      if (err && typeof err === "object" && "data" in err) {
        const fetchError = err as { data?: { message?: string } }
        errorMessage = fetchError.data?.message || errorMessage
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      api.open({
        type: "error",
        message: "Cart Error",
        description: errorMessage,
        placement: "topRight",
      })

      console.error("Add to cart failed:", err)
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleNavigate = (id: string) => {
    router.push(`/product/${id}`)
  }

  return (
    <div className="space-y-6">
      {contextHolder}

      <h3 className="text-lg font-semibold text-foreground pb-4">Alternatives</h3>
      {similarProducts?.length ? (
        <div className="space-y-4">
          {similarProducts.map((alt) => (
            <div
              key={alt.id}
              className="flex gap-6 border border-gray-300 bg-card p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigate(alt.id)}
            >
              <div className="h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-md border border-gray-300 bg-muted flex items-center justify-center relative">
                <Image
                  src={alt.image || "/placeholder.svg?height=150&width=150&query=product"}
                  alt={alt.productName}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1 flex flex-col justify-start gap-2">
                <h4 className="text-base font-semibold text-foreground">
                  {alt.companyName} ® {alt.productCode}
                </h4>
                <p className="text-sm text-muted-foreground">{alt.productName}</p>
              </div>

              <div className="flex flex-col items-end justify-between gap-4" onClick={(e) => e.stopPropagation()}>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">dz {alt.price.toFixed(2)}</p>
                  {alt.dispatch && <p className="text-sm text-green-600 font-medium">{alt.dispatch}</p>}
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    min="1"
                    value={quantities[alt.id] || 1}
                    onChange={(e) => handleQuantityChange(alt.id, e.target.value)}
                    className="w-16 px-3 py-2 border border-border rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(alt.id)
                    }}
                    className="bg-primary text-white font-medium py-2 px-6 rounded flex items-center gap-2 transition-colors"
                    disabled={loadingIds[alt.id]}
                  >
                    {loadingIds[alt.id] ? <Spin size="small" /> : <ShoppingCart size={20} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No alternative products available.</p>
      )}
    </div>
  )
}
