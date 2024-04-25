import ApplyProviderDialog from "@/components/dashboard/provider/apply-provider-dialog";
import UserNav from "@/components/dashboard/user-nav";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="border-b py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link href="/dashboard">
            <h1 className="font-semibold">{APP_NAME}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <ApplyProviderDialog />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full h-full">{children}</div>
      </div>
    </main>
  );
}
