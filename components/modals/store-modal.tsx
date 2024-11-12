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


const formSchema = z.object({
    name: z.string().min(3),
});

export const StoreModal = () => {    
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await fetch("/api/stores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (response.ok) {
                window.location.assign(`/stores/${data.id}`)
                toast.success("Store created successfully")
            } else {
                throw new Error("Failed to create store");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create store");
        } finally {
            setLoading(false);
        }
    };
    return (
    <Modal
        title="Create Store"
        description="Create a new store"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose} 
    >
        <div>
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Your Store Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="pt-6 space-x-2 flex justify-end items-center w-full">
                        <Button
                         disabled={loading}
                         variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                        <Button
                         disabled={loading}
                         type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
            </div>
            </div>

        </Modal>


)}