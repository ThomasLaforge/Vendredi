import {Store} from '../modules/Store'
import {Game} from '../modules/Game'

export interface InjectedStores {
    store?: Store
}

export interface DefaultProps {
    game?: Game
}

export const injector = (injectContent: InjectedStores) : DefaultProps => ({
    game: injectContent.store.gameStore as Game,
    
})