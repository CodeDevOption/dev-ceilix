"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Package,
    PackageX,
    Store,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, } from "@radix-ui/react-collapsible"
import Link from "next/link"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    console.log(props);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}

                <SidebarMenuButton tooltip="Ceylix Global (Pvt) Ltd">

                    <Link href={"/"} className="px-6"><h1 className="my-3 text-md font-semibold text-blue-400 text-center font-sans">Ceylix Global (Pvt) Ltd</h1>
                    </Link>
                </SidebarMenuButton>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>

                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="">
                                <LayoutDashboard />
                                <Link href="/dashboard">
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton tooltip="">
                                <Store />
                                <Link href="/stock">
                                    <span>
                                        Stock
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton tooltip="">
                                <Package />
                                <Link href={"/add-orders"}>
                                    <span>Add Orders</span></Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton tooltip="">
                                <Package />
                                <span>Ship</span>
                            </SidebarMenuButton>
                            <SidebarMenuButton tooltip="">
                                <PackageX />
                                <span>Returns</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <Collapsible
                            asChild
                            defaultOpen={false}
                            className="group/collapsible"
                        >
                        </Collapsible>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
