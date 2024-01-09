import { useState, useEffect } from 'react'

/**
 * It doesn't make any renders on children, unless the parent changes the
 * children's reference. Also naturally if `doUnmount = true`, it mounts and
 * therefore renders the children.
 */
export const AnimatedToggle = ({
      show = false,
      secs = 0.3,
      showStyle = {opacity: '1', transform: 'none'},
      hideStyle = {opacity: '0', transform: 'translateY(16px)'},
      beforeShowExtraStyle =    {transform: 'translateY(-16px)'},
      doUnmount = false, // On `false`, sets `display: none` instead
      initDisplay = 'block', // Only when `doUnmount = false`
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
          transition: "none",
          ...beforeShowExtraStyle,
        }))
      }
      timeout = setTimeout(() =>
        setStyle(prev => ({
          ...prev,
          transition: `all ${secs}s`,
          ...showStyle,
        })), safeDelay)
      
    } else {
      setStyle(prev => ({
        ...prev,
        transition: `all ${secs}s`,
        ...hideStyle,
      }))
      timeout = setTimeout(() =>
        setDisplay(false), secs * 1000 + safeDelay)
    }
    
    return () => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    }
  }, [show])
  
  if (doUnmount)
    return (
      <div class="animated-toggle" style={style}>{display ? children : ""}</div>
    )
  else
    return <div class="animated-toggle" style={{...style,
      display: display ? initDisplay : 'none'}}>{children}</div>
}
