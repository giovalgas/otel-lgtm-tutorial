import {SidebarIcon} from "lucide-react"
import {useRouter} from "@tanstack/react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {useSidebar} from "@/components/ui/sidebar"
import {ThemeToggle} from "@/components/theme-switcher.tsx";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const router = useRouter()

  const currentPath = router.state.location.pathname

  const pathSegments = currentPath.split('/').filter(Boolean)
  const homePath = pathSegments.length === 0 ? 'Home' : pathSegments[0]

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/users">
                {homePath.charAt(0).toUpperCase() + homePath.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.length > 1 && (
              <>
                <BreadcrumbSeparator />
                  {pathSegments
                      .slice(1)
                      .map(value => (
                          <BreadcrumbPage key={value}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </BreadcrumbPage>
                      ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="py-2 ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
