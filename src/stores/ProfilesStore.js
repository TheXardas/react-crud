import {observable, computed, action, asStructure} from 'mobx';

export default class ProfilesStore {
    lastId = 0;
    @observable profiles = [];

    constructor() {
        // Loading profile storage from localStorage
        // TODO implement a more generic solution, for all storages.
        // TODO concern about storage limit.

        let profiles = localStorage.getItem('profiles');
        profiles = (profiles && JSON.parse(profiles)) || [];

        // deserializing profile dates
        profiles = profiles.map((profile) => {
            return Object.assign({}, profile, {
                birthDate: profile.birthDate && new Date(profile.birthDate),
            });
        });

        this.profiles = observable(profiles);

        this.lastId = observable(localStorage.getItem('profilesLastId') || 0);
    }

    onChange() {
        localStorage.setItem('profiles', JSON.stringify(this.profiles));
        localStorage.setItem('profilesLastId', this.lastId);
    }

    @action addProfile(profile) {
        profile.id = ++this.lastId;
        this.profiles.push(observable(profile));
        this.onChange();
    }

    @action deleteProfile(profileId) {
        const index = this.profiles.findIndex((profile) => profile.id === profileId);
        if (index === -1) {
            throw new Error('Trying to delete a non-existant profile. Id: ' + profileId);
        }

        this.profiles.splice(index, 1);
        this.onChange();
    }

    getProfile(profileId) {
        return this.profiles.find((profile) => profile.id === profileId);
    }

    @action editProfile(updatedProfile) {
        const {id} = updatedProfile;
        if (!id) {
            throw new Error('You cannot edit a new profile! Id is required.');
        }

        const profile = this.getProfile(id);
        if (!profile) {
            throw new Error('Trying to edit a non-existant profile with id: ' + id);
        }

        Object.assign(profile, updatedProfile);
        this.onChange();
    }
}
