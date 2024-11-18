"use client"
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormItem, FormLabel, FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(3, "Store name must be at least 3 characters long"),
});

type FormValues = z.infer<typeof formSchema>;

export const StoreModal = () => {
    const router = useRouter();
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onClose = () => {
        form.reset();
        storeModal.onClose();
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            setLoading(true);

            const response = await fetch("/api/stores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create store");
            }

            // Use Next.js Router for client-side navigation
            router.push(`/${data.id}`);
            router.refresh(); // Refresh the current route to update any server components
            
            toast.success("Store created successfully");
            onClose();
        } catch (error) {
            console.error("Store creation error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to create store");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and inventory"
            isOpen={storeModal.isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading} 
                                            placeholder="E.g. Fashion Boutique" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end items-center gap-2">
                            <Button
                                type="button"
                                disabled={loading}
                                variant="outline" 
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Store"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};