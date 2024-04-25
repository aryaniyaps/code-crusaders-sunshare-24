import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Provider } from "@/lib/types/provider";

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{provider.sitename}</CardTitle>
        <CardDescription>{provider.address}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
