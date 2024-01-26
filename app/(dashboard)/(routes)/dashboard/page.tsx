import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    //   <Button variant="destructive" size='lg'>Button</Button>
    <div>
      <p>dashboard (protected) </p>
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
}
