# Slider

A content slider using SplideJS.

Styling a slider depends greatly on the theme. All this block does is put the `innerContent` of the slides into the right HTML so SplideJS can make a slider out of it.

## Installation

1. Import and register the `slider` and `slide` blocks in your project.

2. Install splide `npm install @splidejs/splide`

4. Import the CSS `@import '@splidejs/splide/css';`

5. Make some slides using the Gutenberg editor

6. Add the frontend JavaScript and adjust the options to your liking

```JS
import Splide from '@splidejs/splide';

export default () => {
 const events = () => {
  const sliders = document.querySelectorAll( '.splide' );

  sliders.forEach( ( slider ) => {
   const options = {
    // Required for accessibility
    i18n: {
     prev: 'Vorige slide',
     next: 'Volgende slide',
     first: 'Ga naar de eerste slide',
     last: 'Ga naar de laatste slide',
     slideX: 'Ga naar slide %s',
     pageX: 'Ga naar pagina %s',
     play: 'Start slideshow',
     pause: 'Pauzeer slideshow',
     select: 'Selecteer een slide',
     slideLabel: 'Slide %s van de %s',
    },
    // All other options, see https://splidejs.com/guides/options/#options 
    type: 'loop',
    perPage: 1,
    gap: '1.5rem'
   };
   const splide = new Splide( slider, options );
   splide.mount();
  } );
 };

 events();
};

```

## Hooks

Want to change the starting template of a slide to, for example, a Media & Text block? Use this filter.

```JS
addFilter( 'yard-blocks.slideTemplate', 'gutenberg-core', () => {
 return [
  [
   'core/media-text',
   {
    isStackedOnMobile: true,
    mediaPosition: 'right',
    mediaType: 'image',
    mediaUrl: 'https://via.placeholder.com/300x300',
   },
   [
    [
     'core/heading',
     {
      level: 2,
      content: 'Titel h2',
     },
    ],
    [
     'core/paragraph',
     {
      content:
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.',
     },
    ],
   ],
  ],
 ];
} );
```
