# AnimatedToggle

Unlike [React Transition Group](https://reactcommunity.org/react-transition-group/)'s `CSSTransition`, this component doesn't make any renders on children, unless the parent changes the
children's reference. Also naturally if you send `doUnmount` attribute, it mounts and
therefore renders the children.

``` JS
import { AnimatedToggle } from './AnimatedToggle'

//...
return <AnimatedToggle show={someShowState}><SomeChildComp/></AnimatedToggle>
```

## Customize the container `div`
``` CSS
.animated-toggle {
  width: fit-content;
}
```

## Customize the animation
``` JS
const template1 = {
  secs: 1,
  showStyle: {opacity: '1', marginRight: '0',     rotate: '0deg'},
  hideStyle: {opacity: '0', marginRight: '30px',  rotate: '-15deg'},
  beforeShowExtraStyle:    {marginRight: '-30px', rotate: '15deg'},
}

//...
return <AnimatedToggle show={someShowState} {...template1}><SomeChildComp/></AnimatedToggle>
```
