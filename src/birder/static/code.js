    var toggler = document.getElementById("darkmode");
    function setDarkMode(){
        if ( localStorage.theme === 'dark' ){
            toggler.src="/static/images/on.svg";
        }else{
            toggler.src="/static/images/off.svg";
        }
        document.documentElement.classList.toggle('dark', localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
    }
    toggler.addEventListener("click",  function (){
        if ( localStorage.theme === 'dark' ){
            localStorage.theme = 'light';
        }else{
            localStorage.theme = 'dark';
        }
        setDarkMode()
    });
    setDarkMode()
