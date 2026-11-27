/**
 * Shared by the Planned Trips form (client) and its API route (server): the allowed choices,
 * so a value the form offers is always one the server accepts.
 */
import { pilgrimageDirections } from "@/content/pilgrimage-data";

export const tripGenders = ["Male", "Female", "Other", "Prefer not to say"] as const;
export const tripModes = ["Train", "Flight", "Bus", "Car / Cab", "Tempo Traveller", "No preference"] as const;
export const tripDarshan = ["Special darshan", "Public darshan"] as const;
export const tripGuide = ["Yes", "No"] as const;

/** Every place a visitor can choose, grouped by region — one entry per state / country. */
export const tripPlaceGroups = pilgrimageDirections.map((d) => ({
  region: d.title,
  places: d.states.map((s) => s.title),
}));

export const tripPlaces: string[] = tripPlaceGroups.flatMap((g) => g.places);
