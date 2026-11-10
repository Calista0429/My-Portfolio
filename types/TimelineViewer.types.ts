export type TimelineViewerData = {
  title: string;
  date: string;
  description: string;
  latest?: boolean;
  // Japanese text for the language toggle; same field names as the English.
  ja: { title: string; date: string; description: string };
};
 