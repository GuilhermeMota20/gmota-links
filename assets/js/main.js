// Theme dark
const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")


const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style)



const initialColors = {
    bgColor: getStyle(html, "--bg-color"),
    titleColor: getStyle(html, "--title-color"),
    borderColor: getStyle(html, "--border-color")
}

const darkMode = {
    bgColor: "#040404",
    titleColor: "#f2f2f2",
    borderColor: "#fff"
}

const transformKey = Key => 
    "--" + Key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(Key =>
        html.style.setProperty(transformKey(Key), colors[Key])
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

// Local storage
const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}