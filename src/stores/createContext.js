import mobx from 'mobx';
import createAppState from './createAppState';
import ProfilesStore from './ProfilesStore';
import FormStore from './FormStore';

export default function createContext() {
    return mobx.observable({
        state: createAppState(),
        store: new ProfilesStore(),
        formStore: new FormStore(),
    });
}