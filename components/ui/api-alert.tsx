"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    "public": "Public",
    "admin": "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    "public": "secondary",
    "admin": "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant = "public" }) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("Copied to clipboard");
    }

    return (
        <Alert className="relative">
            <Server className="h-4 w-4" />
            <div className="flex items-center gap-4">
                <AlertTitle className="mb-0">
                    {title}
                </AlertTitle>
                <Badge variant={variantMap[variant]} className="h-6">
                    {textMap[variant]}
                </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
                <AlertDescription className="mt-0 flex-grow">
                    <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                        {description}
                    </code>
                </AlertDescription>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopy(description)}
                    className="shrink-0"
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </Alert>
    )
}