export const dbFiller = () => {
  const events = [];
  const dateId = (year, month) => `${year}-${month}`;
  const id = (year, month, day) => `${year}-${month}-${day}`;

  const date = new Date("January 1, 2021");
  let counter = 0;
  let normal = -2;

  for (let i = 1; i <= 365; i++) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const getLabels = () => {
      if (normal < 0 || (normal > 1 && normal < 9) || normal > 10)
        return ["Ranní", "Denní", "Odpolední", "Noční", "volno", "volno"];
      if (normal === 0 || normal === 1)
        return ["Denní", "Denní", "Odpolední", "Noční", "volno", "volno"];
      if (normal === 9 || normal === 10)
        return ["Ranní", "Denní", "Noční", "Noční", "volno", "volno"];
    };

    const getTypes = () => {
      if (normal < 0 || (normal > 1 && normal < 9) || normal > 10)
        return ["ranni", "denni", "odpoledni", "nocni"];
      if (normal === 0 || normal === 1)
        return ["denni", "denni", "odpoledni", "nocni"];
      if (normal === 9 || normal === 10)
        return ["ranni", "denni", "nocni", "nocni"];
    };

    if (counter === 6) counter = 0;
    if (normal === 14) normal = 0;

    const labels = getLabels();
    const types = getTypes();

    const workingHours = [7.5, 11, 7.5, 11];

    if (labels[counter] !== "volno") {
      events.push({
        dateId: dateId(year, month),
        day,
        function: "Strojvedoucí",
        id: id(year, month, day),
        key: null,
        label: labels[counter],
        location: "Uhelná služba",
        month,
        notes: "",
        type: types[counter],
        workingHours: workingHours[counter],
        workingHoursType: "work",
        year,
      });
    }

    counter++;
    if (counter === 5) normal++;
    date.setDate(date.getDate() + 1);
  }
  return events;
};
