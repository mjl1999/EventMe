"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { deleteEvent } from "@/app/actions/deleteEvent";

export default function DeleteEvent({ event, user }: { event: any, user: any }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    startTransition(async () => {
      await deleteEvent(event.id);
      router.push("/events");
      router.refresh();
    });
  }

  if (!user?.isStaff || event.isSeeded) return null;
  

  return (
    <>
      <Button
        size="lg"
        variant="destructive"
        className="w-full sm:w-fit"
        onClick={() => setOpen(true)}
      >
        Delete Event
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                disabled={pending}
                onClick={handleDelete}
              >
                {pending ? "Deleting..." : "Yes, Delete"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}