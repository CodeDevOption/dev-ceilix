"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export default function Page() {


    const [uploading, setUploading] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ name: string, address: string, contactNumber1: string, contactNumber2: string, product: string, quantity: number, price: number, discount: number }>({ name: "", address: "", contactNumber1: "", contactNumber2: "", product: "", quantity: 0, price: 0, discount: 0 });

    // getProduct by Product name get product code

    // uploading order Data in to the Orders Collection
    const handleSubmit = async () => {
        setUploading(true);
        await addDoc(collection(db, "Orders"), {
            ...formData
        }).then(() => { setUploading(false); toast("Order Added Successfully") })
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
                    <h1 className="text-md  font-sans uppercase">Add Order</h1>
                </div>
            </header>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="p-5 flex flex-col gap-5">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input value={formData.name} onChange={((e) => setFormData({ ...formData, name: e?.target?.value }))} type="text" id="name" placeholder="Name" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="address">Address</Label>
                        <Input value={formData.address} onChange={((e) => setFormData({ ...formData, address: e?.target?.value }))} type="text" id="address" placeholder="Address" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="customer-contact">Contact Number</Label>
                        <Input value={formData.contactNumber1} onChange={((e) => setFormData({ ...formData, contactNumber1: e?.target?.value }))} type="text" id="customer-contact" placeholder="Contact Number One" />
                        <Input value={formData.contactNumber2} onChange={((e) => setFormData({ ...formData, contactNumber2: e?.target?.value }))} type="text" id="customer-contact" placeholder="Contact Number Two" />
                    </div>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="product-code">Select Product</Label>
                        <Input value={formData.product} onChange={((e) => setFormData({ ...formData, product: e?.target?.value }))} type="text" id="product-code" placeholder="Product" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input value={formData.quantity} onChange={((e) => setFormData({ ...formData, quantity: parseInt(e?.target?.value) }))} type="number" id="quantity" placeholder="Quantity" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="price">Selling Price</Label>
                        <Input value={formData.price} onChange={((e) => setFormData({ ...formData, price: parseInt(e?.target?.value) }))} type="number" id="price" placeholder="Selling Price" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="discount">Discount</Label>
                        <Input value={formData.discount} onChange={((e) => setFormData({ ...formData, discount: parseInt(e?.target?.value) }))} type="number" id="discount" placeholder="Discount" />
                    </div>


                </div>


            </div>
            <div className="w-full">

                <Table className="mx-auto w-2/3">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Product Name</TableHead>
                            <TableHead>UnitPrice</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <TableRow >
                            <TableCell className="font-medium">{formData?.product}</TableCell>
                            <TableCell>{formData?.price}</TableCell>
                            <TableCell>{formData?.quantity}</TableCell>
                            <TableCell className="text-right">{formData?.price * formData?.quantity}</TableCell>
                        </TableRow>

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{formData?.price * formData?.quantity}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className="pr-14 py-2 w-full flex justify-end">
                <Button onClick={handleSubmit} className="cursor-pointer  grid w-full max-w-sm items-center gap-3" disabled={uploading}>
                    {/* <label className="w-5 h-5  border-b-2 border-black rounded-full animate-spin" /> */}
                    {
                        uploading ? <><Spinner /> Uploading...</> : <>Add Order</>
                    }

                </Button>
            </div>
        </>
    )
}
