import { useEffect, useState } from "react"


function Buttonmode() {
    const [mode, setMode] = useState<'light' | 'dark'>(localStorage.getItem('mode') === 'dark' ? 'dark' : 'light')
    const [isAnitimated, setIsAnimated] = useState(false);
    const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    if(isAnitimated){
        setIsAnimated(false);
        setTimeout(() => {
            setIsAnimated(true);
        }, 0);
    }else{
        setIsAnimated(true);
    }
    
}
    useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
    localStorage.setItem('mode', mode)
}, [mode])
return (
    <>
    <label className="cursor-pointer hover:animate-squeeze hover:animate-iteration-count-infinite">
        
        <input
            type="checkbox"
            checked={mode === 'dark'}
            onChange={toggleMode}
            className="peer hidden"
        />

        <div className="
        w-4 h-4
        rounded-full
        bg-slate-800
        [mask:radial-gradient(circle_at_100%_30%,transparent_55%,black_56%)]
        transition-all duration-300
        peer-checked:bg-yellow-400
        peer-checked:[mask:none]
        ">
        </div>
    </label>
    </>
)
}

export default Buttonmode