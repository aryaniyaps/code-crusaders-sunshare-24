"use client";
import { Button } from "@/components/ui/button"; // Update import path as per your component structure
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import apiClient from "@/lib/apiClient";
import { useRouter } from "@/lib/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from "use-places-autocomplete";
import { z } from "zod";

const purchaseEnergySchema = z.object({
  sitename: z.string().min(2).max(50),
  location: z.string(),
  energyUnits: z.number().min(100).max(2500),
});

export default function PurchaseEnergyDialog() {
  const form = useForm({
    resolver: zodResolver(purchaseEnergySchema),
    defaultValues: {
      sitename: "",
      location: "",
      energyUnits: 100,
      coordinates: [80.23634, 13.01311],
    },
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    debounce: 300,
  });

  const [open, setOpen] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 13.01311,
    lng: 80.23634,
  });

  const handleFocus = () => {
    setShowAutocomplete(true);
  };

  const router = useRouter();

  const handleSelect = async (suggestion: Suggestion) => {
    try {
      const results = await getGeocode({ address: suggestion.description });
      const { lat, lng } = await getLatLng(results[0]);
      setValue(suggestion.description, false);
      setCoordinates({ lat, lng });
      setShowAutocomplete(false);
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={place_id} onClick={() => handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  const onSubmit = async (values: z.infer<typeof purchaseEnergySchema>) => {
    try {
      const { data } = await apiClient.post("/consumers/purchase-energy", {
        sitename: values.sitename,
        coordinates: [coordinates.lat, coordinates.lng],
        powergained: values.energyUnits,
      });

      setOpen(false);

      router.replace(`/consumers/${data.consumer.id}/confirm`);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        // no nearby providers found
        toast.error("no nearby providers found!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Purchase energy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Purchase energy</DialogTitle>
          <DialogDescription>
            We'll source your energy supply from the nearest providers
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="sitename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site name</FormLabel>
                  <FormControl>
                    <Input placeholder="Aryan's house" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your consumer's display name.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="energyUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy units ({field.value})</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      max={2500}
                      min={100}
                      step={50}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    How many energy units do you need?
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <GoogleMap
                    mapContainerStyle={{ height: "300px", width: "100%" }}
                    zoom={8}
                    center={coordinates}
                  >
                    <Marker position={coordinates} />
                  </GoogleMap>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Search for a location"
                        {...field}
                        disabled={!ready}
                        onFocus={handleFocus}
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value);
                          field.onChange(e);
                        }}
                      />
                      {showAutocomplete &&
                        status === "OK" &&
                        renderSuggestions()}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex w-full items-end gap-4">
              <Button variant="ghost">Cancel</Button>
              <Button type="submit">Find best providers</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
