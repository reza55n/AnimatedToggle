# AnimatedToggle

This component doesn't make any renders on children, unless the parent changes the
children's reference. Also naturally if you set `doUnmount = true`, it mounts and
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

## Customize the `AnimatedToggle`
``` JS
const template1 = {
  secs: 1,
  showStyle: {opacity: '1', marginRight: '0',     color: 'black'},
  hideStyle: {opacity: '0', marginRight: '30px',  color: 'red'},
  beforeShowExtraStyle:    {marginRight: '-30px', color: 'blue'},
}

//...
return <AnimatedToggle show={someShowState} {...template1}><SomeChildComp/></AnimatedToggle>
```
