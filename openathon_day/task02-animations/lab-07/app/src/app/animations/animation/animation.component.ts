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
    animate(".75s ease-out", style({ opacity: 1, transform: "translateY(0)" })),
  ]),
]);
