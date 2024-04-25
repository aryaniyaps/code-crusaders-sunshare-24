import { Provider } from "@/lib/types/provider";
import ProviderCard from "./provider-card";

export default function ProviderList({ providers }: { providers: Provider[] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-lg">My providers</h1>
        <h3 className="text-muted-foreground text-sm">
          Here are your solar panel providers.
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        {providers.map((provider) => (
          <ProviderCard provider={provider} key={provider.id} />
        ))}
      </div>
    </div>
  );
}
