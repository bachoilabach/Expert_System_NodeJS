'use strict';

const formatDescription = (description, klValue) => {
    return `(${description.join('^')}) → ${klValue}`;
}

const parseDescriptionToEventsAndConclusion = (description) => {
    const [eventsPart, conclusionPart] = description.split("→").map(part => part.trim());
    const events = eventsPart.replace(/[()]/g, '').split("∧").map(event => event.trim());
    const conclusion = conclusionPart;
    return { events, conclusion };
}

const isSubset = (subset, set) => {
    console.log("SUBSET::", subset);
    console.log("SET::", set);
    return subset.events.every(event => set.includes(event));
}

module.exports = {
    formatDescription,
    parseDescriptionToEventsAndConclusion,
    isSubset
}