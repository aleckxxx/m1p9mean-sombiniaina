
const Sequence = require('../models/sequence.model');

module.exports = {
    getSequenceValue
};
async function getSequenceValue(sequenceName){
    let sequencer = await Sequence.findOneAndUpdate({name: sequenceName},{$inc:{value:1}});
    let zeroNumber = sequencer.sequenceLength - Math.floor(Math.log10(sequencer.value));
    let stringValue = sequencer.value;
    if(zeroNumber>0){
        while(zeroNumber>0) {
            stringValue = '0' + stringValue;
            zeroNumber--;
        }
    }
    return sequencer.sequencePrefix + stringValue;
}