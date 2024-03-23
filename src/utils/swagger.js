const getDoc = () => {
    const docStr = localStorage.getItem('doc')
    if (!docStr) return ''
    return JSON.parse(docStr)
}
// swagger版本
export function getVersion() {
    const doc = getDoc()
    if (!doc) return ''
    return doc.swagger
}
