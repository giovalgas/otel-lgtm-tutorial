import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="[--header-height:calc(--spacing(14))]">
                <SidebarProvider className="flex flex-col">
                    <SiteHeader />
                    <div className="flex flex-1">
                        <AppSidebar />
                        <SidebarInset>
                            <div className="flex flex-1 flex-col gap-4 p-4">
                                <Outlet />
                            </div>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </div>
            <hr />
            <TanStackRouterDevtools />
        </>
    ),
})