import { Trash2, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteDialog({
  handleDelete,
  title,
  id,
}: {
  handleDelete: (id: string) => void;
  id: string;
  title: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="flex h-10 items-center justify-center gap-2 rounded-xl border  text-sm font-semibold transition border-red-500/60 bg-red-500/10 text-red-500 hover:bg-red-500/40">
            <Trash2 size={16} />
            Delete
          </button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Event?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This will permanently delete <br />
            <span className="font-semibold text-primary">{title}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            render={
              <button
                onClick={() => handleDelete(id)}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border  text-sm font-semibold transition border-red-500/60 bg-red-500/10 text-red-500 hover:bg-red-500/40"
              >
                <Trash2 size={16} />
                Delete
              </button>
            }
            variant="destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
