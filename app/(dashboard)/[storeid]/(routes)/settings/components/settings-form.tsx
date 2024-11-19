"use client"
import * as z from "zod";
import { useState } from "react";
import { Store } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useParams, useRouter} from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";



interface SettingsFormProps {
    initialData: Store;
}
const formSchema = z.object({   
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData    });

        const onSubmit = async (formData: SettingsFormValues) => {
            try {
                setLoading(true);
                const response = await fetch(`/api/stores/${params.storeid}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });
                const responseData = await response.json();
                if (response.ok) {
                    toast.success("Store settings updated successfully");
                    router.refresh();
                } else {
                    throw new Error("Failed to update store settings");
                }
            } catch (error) {
                console.error("Store settings update error:", error);
                toast.error(error instanceof Error ? error.message : "Failed to update store settings");
            } finally {
                setLoading(false);
            }
        }

        const onDelete = async () => {
            try{
                setLoading(true);
                const response = await fetch(`/api/stores/${params.storeid}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const responseData = await response.json();
                if (response.ok) {
                    router.refresh();
                    router.push("/");
                    toast.success("Store deleted successfully");

                } else {
                    throw new Error("Failed to delete store");
                }
            }
            catch (error) {
                console.error("Store deletion error:", error);
                toast.error("Make sure you have removed all products and categories first.")
            } finally {
                setLoading(false);
            }
        }
        



    return (
        <>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}

         />
        <div className=" flex items-center justify-between">
            <Heading
                title="Store Settings"
                description="Manage your store settings"
            />
            <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
                setOpen(true);  
            }}
            >
            <Trash className="h-4 w-4" />
            </Button>

            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store Name"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            /></div>
                            <Button type="submit" disabled={loading}>
                                Save Changes
                            </Button>
                </form> 
            </Form>
            <Separator />
            <ApiAlert 
            title="NEXT_PUBLIC_API" 
            description={`${origin}/api/${params.storeid}`}
            variant="public" />

            </>
    )
}