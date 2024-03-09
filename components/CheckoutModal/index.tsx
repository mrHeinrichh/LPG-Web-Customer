import React from "react";
import Modal from "react-modal";
import { Button } from "@/components"; // Assuming Button is part of your components
import { IItemModel, ICartItemModel, ITransactionModel } from "@/models";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: {
    contactNumber: string;
    name: string;
    houseLotBlk: string;
    barangay: string;
    deliveryDate: string;
  };
  selectedItems: IItemModel[];
  selectedItems1?: ICartItemModel[]; // make it optional
  selectedItems2?: ITransactionModel[]; // make it optional
}

const modalStyles = {
  content: {
    width: "50%",
    height: "60%",
    margin: "auto",
    padding: "56px",
    fontSize: "14px",
    borderRadius: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
  selectedItems,
  selectedItems1,
  selectedItems2,
}) => {
  const selectedFormData = selectedItems2?.[0] ?? formData;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div>
        <h4 className="text-2xl font-bold mb-4">Order Confirmation</h4>
        {selectedFormData && (
          <div className="p-4">
            <p className="mb-2">Name: {selectedFormData.name}</p>
            <p className="mb-2">Mobile Number: {selectedFormData.contactNumber}</p>
            <p className="mb-2">HouseLotBlk: {formData.houseLotBlk}</p>
            <p className="mb-2">Barangay: {formData.barangay}</p>
            <p className="mb-2">Date: {formData.deliveryDate}</p>
          </div>
        )}
        <div className="p-4 border-t mt-4">
          {selectedItems.map((item) => (
            
            <div key={item._id} className="py-2">
              <hr/>
              <p className="p-2">Item Name: {item.name}</p>
              <p className="p-2">Category: {item.category}</p>
              <p className="p-2">Weight: {item.weight}</p>
              <p className="p-2">Price: {item.customerPrice}</p>
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={onConfirm}>
          Confirm Order
        </Button>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
