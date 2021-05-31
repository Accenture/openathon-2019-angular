import {
  trigger,
  style,
  animate,
  animation,
  transition,
  state,
} from "@angular/animations";

export const animationTask = trigger("headerIn", [
  transition(":enter", [
    style({
      opacity: 0,
      transform: "translateY(-100%)",
    }),
    animate(".5s ease-in", style({ opacity: 1, transform: "translateY(0)" })),
  ]),
]);
