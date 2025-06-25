"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChevronRight,
    Command,
    Frame,
    GalleryVerticalEnd,
    Globe,
    LayoutDashboard,
    Map,
    Package,
    PackageX,
    PieChart,
    Settings2,
    SquareTerminal,
    Store,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { CollapsibleContent } from "./ui/collapsible"
import Link from "next/link"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
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
