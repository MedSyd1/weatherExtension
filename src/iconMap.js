
export const ICON_MAP = new Map()


 const addMapping = (keys,value) => {
    keys.forEach(key => {
        ICON_MAP.set(key,value)
    })
}

addMapping([0,1],"1")
addMapping([2],"2")
addMapping([3],"4")
addMapping([45,48],"6")
addMapping([51, 53, 55,56, 57,61, 63, 65,66, 67,71, 73, 75,80, 81, 82,95,80,96],"7")
