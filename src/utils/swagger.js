class SwaggerService {
    doc = null
    constructor() {
        const docStr = localStorage.getItem('doc')
        if (!docStr) return ''
        this.doc = JSON.parse(docStr)
    }
    getVersion() {
        return this.doc.swagger
    }
    getServices() {
        return this.doc.services || []
    }
    setCurrentService(serviceUrl) {
        console.log(serviceUrl)
    }
}

export default new SwaggerService()
