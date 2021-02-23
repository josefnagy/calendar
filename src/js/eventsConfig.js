export const eventTypes = [
  {
    name: "Ranní",
    type: "ranni",
    defaultWorkingHours: 7.5,
    workingHoursType: "work",
  },
  {
    name: "Denní",
    type: "denni",
    defaultWorkingHours: 11,
    workingHoursType: "work",
  },
  {
    name: "Odpolední",
    type: "odpoledni",
    defaultWorkingHours: 7.5,
    workingHoursType: "work",
  },
  {
    name: "Noční",
    type: "nocni",
    defaultWorkingHours: 11,
    workingHoursType: "work",
  },
  {
    name: "Preventivka",
    type: "preventivka",
    defaultWorkingHours: 3,
    workingHoursType: "holidayAverage",
  },
  {
    name: "Školení",
    type: "skoleni",
    defaultWorkingHours: 4,
    workingHoursType: "holidayAverage",
  },
  {
    name: "Paragraf",
    type: "paragraf",
    defaultWorkingHours: 11,
    workingHoursType: "obstacleInWork",
  },
  {
    name: "Nemocenská",
    type: "nemocenska",
    defaultWorkingHours: 7.5,
    workingHoursType: "sickLeaveAverage",
  },
  {
    name: "Dovolená",
    type: "dovolena",
    defaultWorkingHours: 11,
    workingHoursType: "vacation",
  },
  {
    name: "Náhradní volno",
    type: "nv",
    defaultWorkingHours: 11,
    workingHoursType: "nv",
  },
];

export const functionTypes = [
  { name: "Strojvedoucí", type: "str" },
  { name: "Vlakvedoucí", type: "vv" },
  { name: "Vedoucí posunu", type: "vp" },
  { name: "posunovač", type: "p" },
  { name: "Staniční dozorce", type: "std" },
  { name: "Civilista", type: "cv" },
  { name: "Ostatní..", type: "other" },
];

export const locationTypes = [
  { name: "Uhelná služba", type: "usl" },
  { name: "Základní závod", type: "zz" },
  { name: "Heřmanice", type: "her" },
  { name: "Muglinov", type: "mug" },
  { name: "Hornická poliklinika", type: "hp" },
  { name: "Ostatní..", type: "other" },
];
