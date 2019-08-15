
export interface Route {
    [name: string]: Function;
}

export default class Router {
    protected routes: Route;
    protected currentUrl: string;

    constructor(_routes = {}) {
        this.routes = _routes;
        this.currentUrl = '';
    }

    init() {
        window.addEventListener('load', () => this.refresh(), false);
        window.addEventListener('hashchange', () => this.refresh(), false);
    }

    route(path: string, callback: Function = () => {}) {
        this.routes[path] = callback;
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    }
}
