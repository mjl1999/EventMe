"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { checkEventTitle } from "@/app/actions/checkEventTitle";
import { updateEvent } from "@/app/actions/updateEvent";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z
    .string()
    .min(1, "Location is required")
    .regex(
      /^.+,\s*[A-Z]{1,2}\d{1,2}\s*\d?[A-Z]{0,2}\s*\d[A-Z]{2}$/i,
      "Location must be in the format: Place Name, POSTCODE"
    ),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date and time",
    })
    .refine((val) => Date.parse(val) > Date.now(), {
      message: "Date and time must be in the future",
    }),
  category: z.enum(["cooking", "coding", "football"], {
    errorMap: () => ({
      message: "Category must be cooking, coding, or football",
    }),
  }),
  organiser: z.string().min(1, "Organiser is required"),
  capacity: z.preprocess(
    (val) =>
      val === "" ||
      val === null ||
      typeof val === "undefined" ||
      (typeof val === "number" && isNaN(val))
        ? undefined
        : Number(val),
    z.number().min(1, "Capacity must be at least 1").optional()
  ),
  eventImageUrl: z
    .string()
    .url("Invalid URL")
    .or(z.literal("")) // allow empty string for optional
    .optional(),
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace with -
    .replace(/-+/g, "-"); // collapse dashes
}

type EventFormData = z.infer<typeof eventSchema>;

export function UpdateEventForm({ event }: { event: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<EventFormData | undefined>(
    undefined
  );
  const [titleError, setTitleError] = useState<string | null>(null);

  const defaultValues: EventFormData = {
    title: event.title,
    description: event.description,
    location: event.location,
    date: new Date(event.date).toISOString().slice(0, 16),
    category: event.category,
    organiser: event.organiser,
    capacity: event.capacity,
    eventImageUrl: event.eventImageUrl || "",
  };

  const form = useForm({
      resolver: zodResolver(eventSchema),
      defaultValues: {
        title: "",
        description: "",
        location: "",
        date: "",
        category: undefined,
        organiser: "",
        capacity: undefined,
        eventImageUrl: "",
      },
    });
  

  const { reset } = form;

  useEffect(() => {
    reset(defaultValues);
    setTitleError(null);
  }, [event, reset]);

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    setTitleError(null);
    const duplicate = await checkEventTitle(data.title, event.id);
    if (duplicate) {
      setTitleError("An event with this title already exists.");
      return;
    }
    setFormData(data);
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;
    try {
      const slug = generateSlug(formData.title);
      // You should have an updateEvent action that takes event.id and new data
      await updateEvent(event.id, { ...formData, slug });
      alert("Event updated successfully!");
      reset();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
      {(form.formState.errors.title || titleError) && (
        <p className="text-red-500">
          {form.formState.errors.title?.message || titleError}
        </p>
      )}
      <Input type="text" placeholder="Title" {...form.register("title")} />

      <Textarea
        placeholder="Description"
        className="h-32 resize-none overflow-y-auto"
        maxLength={2000}
        {...form.register("description")}
      />
      {form.formState.errors.description && (
        <p className="text-red-500">
          {form.formState.errors.description.message}
        </p>
      )}

      <Input
        type="text"
        placeholder="e.g. Coventry Central Library, CV1 1FY"
        {...form.register("location")}
      />
      {form.formState.errors.location && (
        <p className="text-red-500">{form.formState.errors.location.message}</p>
      )}

      <Input
        type="datetime-local"
        placeholder="Date and Time"
        {...form.register("date")}
      />
      {form.formState.errors.date && (
        <p className="text-red-500">{form.formState.errors.date.message}</p>
      )}

      <select
        id="category"
        {...form.register("category")}
        className="block w-full border rounded px-3 py-2"
        value={form.watch("category") ?? ""}
      >
        <option value="" disabled>
          Select a category
        </option>
        <option value="cooking">Cooking</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
      </select>
      {form.formState.errors.category && (
        <p className="text-red-500">{form.formState.errors.category.message}</p>
      )}

      <Input
        type="text"
        placeholder="Organiser"
        {...form.register("organiser")}
      />
      {form.formState.errors.organiser && (
        <p className="text-red-500">
          {form.formState.errors.organiser.message}
        </p>
      )}

      <Input
        type="number"
        min={1}
        placeholder="Capacity (optional)"
        {...form.register("capacity")}
      />
      {form.formState.errors.capacity && (
        <p className="text-red-500">{form.formState.errors.capacity.message}</p>
      )}

      <Input
        type="text"
        placeholder="Event Image URL (optional)"
        {...form.register("eventImageUrl")}
      />
      {form.formState.errors.eventImageUrl && (
        <p className="text-red-500">
          {form.formState.errors.eventImageUrl.message}
        </p>
      )}

      <div className="flex gap-4">
        <Button type="submit">Update Event</Button>
        <Button
          type="button"
          variant="destructive"
          className="transition-colors duration-150 hover:bg-red-700 active:bg-red-800"
          onClick={() => {
            reset();
            setTitleError(null);
          }}
        >
          Reset Form
        </Button>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Event Update</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
