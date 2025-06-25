"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [imgFile, setImgFile] = useState(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const handleFileChange = (e: any) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setImgFile(selected);
            setImgPreview(URL.createObjectURL(selected))
        }
    }

    const handleClick = async () => {
        if (!imgFile) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', imgFile);

        const res = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setUrl(data.url);
        alert(data.url)
        setUploading(false);
    }

    return (
        <>

            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <h1 className="text-md  font-sans uppercase">Upload Image to Cloudeinary</h1>
                </div>
            </header>
            <div className="grid grid-cols-2 gap-5">

                <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-center justify-center">

                        <label htmlFor="upload-img" className="bg-white/30 rounded-md w-80 h-80 object-center object-cover overflow-hidden cursor-pointer">
                            {imgPreview ?
                                <Image src={imgPreview} className="" width={500} height={500} alt="This is theImg" />
                                :
                                <div className="w-full h-full flex flex-col items-center justify-center z-10">
                                    <Camera className="text-sm" />
                                    <p className="text-sm">Upload Image</p>
                                </div>
                            }
                        </label>
                        <input accept="image/*" type="file" name="image" id="upload-img" onChange={handleFileChange} hidden />
                    </div>

                    <Button className="cursor-pointer" onClick={handleClick}>Add Product</Button>

                </div>
            </div>
        </>
    )
}
