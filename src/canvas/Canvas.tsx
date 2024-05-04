import React, { useEffect, useRef } from 'react';

export const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return;
    }
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (<canvas ref={canvasRef} {...props}/>)
}
