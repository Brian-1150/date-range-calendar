import { useEffect, useState } from 'react'

interface IViewPortSize {
    width: number
    height: number
}

function useViewPortSize(): IViewPortSize {
    const [viewPortSize, viewPortSizeSet] = useState<IViewPortSize>({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const handler = () => {
            viewPortSizeSet({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handler()
        window.addEventListener('resize', handler)
      
        return () => {
            window.removeEventListener('resize', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return viewPortSize
}

export default useViewPortSize
