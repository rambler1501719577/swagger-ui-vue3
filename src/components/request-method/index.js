import RequestMethod from './request-method'

const components = [RequestMethod]

export default {
    install: app => {
        components.forEach(component => {
            app.component(component.name, component)
        })
    }
}
