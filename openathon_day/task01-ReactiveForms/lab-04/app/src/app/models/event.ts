export interface Event {
  id: string;
  title: string;
  location: string;
  date: Date;
  description: string;
  addedBy: string;
}

export function initializeEvent(): Event {
  let newEvent: Event = {
    id: "",
    title: "",
    location: "",
    description: "",
    addedBy: "",
    date: new Date(),
  };
  return newEvent;
}
