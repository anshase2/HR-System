export const EMPLOYMENT_TYPES = [
  "FullTime",
  "PartTime",
  "Contract",
  "Freelance",
  "Internship",
];

export const WORKPLACE_TYPES = ["OnSite", "Remote", "Hybrid"];

export const EXPERIENCE_LEVELS = [
  "EntryLevel",
  "Junior",
  "MidLevel",
  "Senior",
  "Lead",
  "Executive",
];

export function formatEnumLabel(value) {
  if (!value) return "";
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}
