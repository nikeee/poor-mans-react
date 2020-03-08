# [Poor Man's React](https://nikeee.github.io/poor-mans-react)
Understanding React by implementing some of its core concepts in a simple manner.

Inspired by Tejas Kumar's talk [Deconstructing React](https://www.youtube.com/watch?v=f2mMOiCSj5c).

Essential stuff that is missing:
- The ability to have multiple root nodes (currently, it is fixed to render `<App />` to `document.body`)
- Re-using DOM nodes (for performacne and to prevent loss of focus etc)
- Class-based components
- Style support
- All hooks except `useState`
- Everything else that would make this implementation usable
