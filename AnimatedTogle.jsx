import { useState, useEffect } from 'react'

/**
 * It doesn't make any renders on children, unless the parent changes the
 * children's reference. Also naturally if doUnmount = true, it mounts and
 * therefore renders the children.
 */
export const AnimatedToggle = ({
      show = false,
      secs = 0.3,
      showStyle = {opacity: '1', marginRight: '0', rotate: '0deg'},
      hideStyle = {opacity: '0', marginRight: '30px', rotate: '-15deg'},
      beforeShowExtraStyle = {marginRight: '-30px', rotate: '15deg'},
      initDisplay = 'block',
      doUnmount = false, // On `false`, only sets `display: none`
      safeDelay = 20, // If it's low, may show up without animation
      children,
    }) => {
  
  const [display, setDisplay] = useState(show)
  const [style, setStyle] = useState({})
  
  useEffect(() => {
    var timeout = null
    
    if (show) {
      setDisplay(true)
      if (beforeShowExtraStyle) {
        setStyle(prev => ({
          ...prev,
          ...beforeShowExtraStyle,
        }))
      }
      timeout = setTimeout(() =>
        setStyle(prev => ({
          ...prev,
          ...showStyle,
        })), safeDelay)
      
    } else {
      setStyle(prev => ({
        ...prev,
        ...hideStyle,
      }))
      timeout = setTimeout(() =>
        setDisplay(false), secs * 1000 + safeDelay)
    }
    
    return () => {
      if (timeout)
        clearTimeout(timeout)
    }
  }, [show])
  
  if (doUnmount)
    return display ?
      <div class="animated-toggle" style={{transition: `all ${secs}s`, ...style, display: initDisplay}}>{children}</div> :
      <div class="animated-toggle" style={{transition: `all ${secs}s`, ...style, display: 'none'}}></div>
  else
    return <div class="animated-toggle" style={{transition: `all ${secs}s`, ...style,
      display: display ? initDisplay : 'none'}}>{children}</div>
}
