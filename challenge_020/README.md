# Animating React Apps

## React Transition Group

- Exposes simple components useful for defining entering and exiting transitions. React Transition Group is not an animation library like React-Motion, it does not animate styles by itself. Instead it exposes transition stages, manages classes and group elements and manipulates the DOM in useful ways, making the implementation of actual visual transitions much easier.

- ### Components

  - Transition

    - The Transition component lets you describe a transition from one component state to another over time with a simple declarative API. Most commonly it's used to animate the mounting and unmounting of a component, but can also be used to describe in-place transition states as well.
    - Note: Transition is a platform-agnostic base component. If you're using transitions in CSS, you'll probably want to use [CSSTransition](https://reactcommunity.org/react-transition-group/css-transition) instead. It inherits all the features of Transition, but contains additional features necessary to play nice with CSS transitions (hence the name of the component).

  - CSSTransition

    - A transition component inspired by the excellent [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should use it if you're using CSS transitions or animations. It's built upon the [Transition](https://reactcommunity.org/react-transition-group/transition) component, so it inherits all of its props.

    - CSSTransition applies a pair of class names during the appear, enter, and exit states of the transition. The first class is applied and then a second _-active class in order to activate the CSS transition. After the transition, matching _-done class names are applied to persist the transition state.

  - SwitchTransition

    - A transition component inspired by the [vue transition modes](https://vuejs.org/v2/guide/transitions.html#Transition-Modes). You can use it when you want to control the render between state transitions. Based on the selected mode and the child's key which is the Transition or CSSTransition component, the SwitchTransition makes a consistent transition between them.

    - If the out-in mode is selected, the SwitchTransition waits until the old child leaves and then inserts a new child. If the in-out mode is selected, the SwitchTransition inserts a new child first, waits for the new child to enter and then removes the old child.

    - Note: If you want the animation to happen simultaneously (that is, to have the old child removed and a new child inserted at the same time), you should use [TransitionGroup](https://reactcommunity.org/react-transition-group/transition-group) instead.

  - TransitionGroup

    - The `<TransitionGroup>` component manages a set of transition components (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition components, `<TransitionGroup>` is a state machine for managing the mounting and unmounting of components over time.

    - Consider the example below. As items are removed or added to the TodoList the in prop is toggled automatically by the `<TransitionGroup>`.

    - Note that `<TransitionGroup>` does not define any animation behavior! Exactly how a list item animates is up to the individual transition component. This means you can mix and match animations across different list items.

## Alternatives

- [React Motion](https://github.com/chenglou/react-motion)
- [React Move](https://github.com/sghall/react-move)
- [React Router Transition](https://github.com/maisano/react-router-transition)
