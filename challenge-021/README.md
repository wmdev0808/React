# Replacing Redux with Context + Hooks

- A totally optional of reducing your dependencies

# Note

## Downsides of Context API

- Context is ready to be used for low frequency unlikely updates (like locale/theme). It's also good to use it in the same way as old context was used. I.e. for static values and then propagate updates through subscriptions. It's not ready to be used as a replacement for all Flux-like state propagation.
- Regarding the performance, it's simply not optimized for that.
  - The way Context API works is such that whenever something changes in your context, it has no way of cleverly figuring out which component that uses this context really is concerned and which component is not, which means that every component that uses useContext will rebuild, will re-render when you switch something in that context no matter if it's directly effected or not.

## Custom Hook as a Store
