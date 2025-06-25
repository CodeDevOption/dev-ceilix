"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Spinner from "@/components/spinner";
import { toast } from "sonner";
export default function Page() {
    const [imgFile, setImgFile] = useState(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [formData, setFormData] = useState<{ name: string, title: string, quantity: number | undefined, unitPrice: number | undefined, sellingPrice: number | undefined, productCode: string, category: string }>({
        name: "",
        title: "",
        quantity: undefined,
        unitPrice: undefined,
        sellingPrice: undefined,
        productCode: "",
        category: ""



    })

    const handleFileChange = (e: any) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setImgFile(selected);
            setImgPreview(URL.createObjectURL(selected))
        }
    }

    const handleSubmit = async () => {

        if (!imgFile) return;
        setUploading(true);
        const formDatas = new FormData();
        formDatas.append('file', imgFile);

        const res = await fetch('/api/uploads', {
            method: 'POST',
            body: formDatas,
        });

        await res.json().then(async (data) => {

            console.log(data);
            const productDocRef = doc(db, "Products",
                formData?.productCode
            )
            const docRef = await setDoc(productDocRef, {
                ...formData,
                productImg: data.url
            })

            setFormData({
                name: "",
                title: "",
                quantity: 0,
                unitPrice: 0,
                sellingPrice: 0,
                productCode: "",
                category: ""
            })
            setImgFile(null);
            setImgPreview(null);
            setUploading(false);
            toast("✅ Product added Successfully")
        })

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
                    <h1 className="text-md  font-sans uppercase">Add Product</h1>
                </div>
            </header>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 flex flex-col gap-5">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input value={formData.name} onChange={((e) => setFormData({ ...formData, name: e?.target?.value }))} type="text" id="product-name" placeholder="Product Name" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="product-title">Title</Label>
                        <Input value={formData.title} onChange={((e) => setFormData({ ...formData, title: e?.target?.value }))} type="text" id="product-title" placeholder="Title" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="product-quantity">Products Quantity</Label>
                        <Input value={formData.quantity} onChange={((e) => setFormData({ ...formData, quantity: parseInt(e?.target?.value) }))} type="number" min={1} id="product-quantity" placeholder="Products Quantity" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="unit-price">Unit Price</Label>
                        <Input value={formData.unitPrice} onChange={((e) => setFormData({ ...formData, unitPrice: parseInt(e?.target?.value) }))} type="number" min={0} id="unit-price" placeholder="Unit Price" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="selling-price">Selling Price</Label>
                        <Input value={formData.sellingPrice} onChange={((e) => setFormData({ ...formData, sellingPrice: parseInt(e?.target?.value) }))} type="number" min={0} id="selling-price" placeholder="Selling Price" />
                    </div>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-center justify-center">

                        <label htmlFor="upload-img" className="bg-white/30 rounded-md w-30 h-30 object-center object-cover overflow-hidden cursor-pointer">
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

                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="sku-product-code">SKU / Product Code</Label>
                        <Input value={formData.productCode} onChange={((e) => setFormData({ ...formData, productCode: e?.target?.value }))} type="text" id="sku-product-code" placeholder="SKU / Product Code" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="product-category">Category</Label>
                        <Input value={formData.category} onChange={((e) => setFormData({ ...formData, category: e?.target?.value }))} type="text" id="product-category" placeholder="Category" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Button onClick={handleSubmit} className="cursor-pointer " disabled={uploading}>
                            {/* <label className="w-5 h-5  border-b-2 border-black rounded-full animate-spin" /> */}
                            {
                                uploading ? <><Spinner /> Uploading...</> : <>Add Product</>
                            }

                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}
