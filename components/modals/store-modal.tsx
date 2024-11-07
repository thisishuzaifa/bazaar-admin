"use client"

import { useStoreModalStore } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = useStoreModalStore();
    
    return (
    <Modal
        title="Create Store"
        description="Create a new store"
        isOpen={false}
        onClose={() => {}}
    >
        <div>Future create Store Form</div>ß

        </Modal>
    )

}