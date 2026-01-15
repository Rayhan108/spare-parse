"use client";

import { ConfigProvider, Steps, Modal } from "antd";
import { FaCheck } from "react-icons/fa6";

interface OrderItem {
  id: string | number;
  productName: string;
  quantity: number;
}

interface Order {
  orderId: string;
  createdAt?: string;
  status: string;
  items?: OrderItem[];
}

interface ProductTrackModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  order?: Order;
}

const statusSteps = ["Order Placed", "Processing", "Confirmed", "Packing", "Delivering", "Delivered"];

const ProductTrackModal: React.FC<ProductTrackModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  order,
}) => {
  if (!order) return null;

  const itemCount = order.items?.length || 0;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-";

  // Highlight the current step or default to first
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.toLowerCase() === order.status.toLowerCase()
  );
  const highlightedStep = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <Modal
      closable
      className="w-full md:w-[800px]"
      footer={false}
      width={800}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h2 className="text-2xl font-semibold mb-4">Order Track</h2>

      {/* Order Info */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-primary pt-8 pb-4 mb-6 text-sm text-gray-700 dark:text-white overflow-x-auto">
        <span className="whitespace-nowrap">Order ID</span>
        <span className="h-4 border-l border-gray-300"></span>
        <span className="whitespace-nowrap">{order.orderId}</span>
        <span className="h-4 border-l border-gray-300"></span>
        <span className="whitespace-nowrap">{orderDate}</span>
        <span className="h-4 border-l border-gray-300"></span>
        <span className="whitespace-nowrap">{itemCount} Items</span>
        <span className="h-4 border-l border-gray-300"></span>
        <span className="text-orange-500 whitespace-nowrap">{order.status}</span>
      </div>

      {/* Steps */}
      <div className="flex justify-center mb-10">
        <div className="w-[350px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-primary rounded-xl p-4">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(223,88,0)",
                colorPrimaryBorder: "rgb(223,88,0)",
              },
            }}
          >
            <Steps
              direction="vertical"
              current={highlightedStep}
              items={statusSteps.map((title, index) => ({
                title,
                description: getStepDescription(title, order.orderId),
                icon: (
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                      index <= highlightedStep
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary"
                    }`}
                  >
                    <FaCheck size={16} />
                  </div>
                ),
              }))}
            />
          </ConfigProvider>
        </div>
      </div>
    </Modal>
  );
};

// Function to dynamically generate step descriptions
function getStepDescription(step: string, orderId: string) {
  switch (step) {
    case "Order Placed":
      return `Your order is successfully placed. Order ID: ${orderId}`;
    case "Processing":
      return "We have received your order and will check and confirm shortly.";
    case "Confirmed":
      return "We have confirmed your order.";
    case "Packing":
      return "We are currently packing your order.";
    case "Delivering":
      return "Rider has picked up your order for delivery.";
    case "Delivered":
      return "You will receive your order soon.";
    default:
      return "";
  }
}

export default ProductTrackModal;
