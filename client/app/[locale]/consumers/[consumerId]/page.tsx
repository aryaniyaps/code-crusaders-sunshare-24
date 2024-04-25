"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function Price() {
  return (
    <div className="w-60">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">100 Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +25% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}
function Subscription() {
  return (
    <div>
      <Card className="w-72 sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Validity</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="default">2 months</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
function UserName() {
  return (
    <div>
      <Card className="w-80 border-0">
        <CardContent>
          <div className="text-xl font-bold">Raj's House</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
function MonthPrice() {
  return (
    <div className="w-60">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">300 Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}

// consumer name
// energy units consumed by this consumer site
export default function ConsumerDetailPage({
  params,
}: {
  params: { consumerId: string };
}) {
  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>Consumer Details:</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-2">Consumer Site Name:</p>
          <UserName />
          <p className="text-2xl mb-2">Your Subscription Plan:</p>
          <Subscription />
          <p className="text-2xl mb-4">Power Gained:</p>
          <div className="flex flex-start gap-2">
            <Price />
            <MonthPrice />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
