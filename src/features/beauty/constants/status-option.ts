export const UNIT_STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-primary/15 text-base-content/80 border border-primary/30 font-bold",
  },
  backup: {
    label: "Backup",
    className:
      "bg-warning/15 text-base-content/80 border border-warning/30 font-bold",
  },
  finished: {
    label: "Finished",
    className:
      "bg-base-300 text-base-content/80 border border-base-content/10 font-bold",
  },
  discarded: {
    label: "Discarded",
    className:
      "bg-error/15 text-base-content/80 border border-error/30 font-bold",
  },
};
