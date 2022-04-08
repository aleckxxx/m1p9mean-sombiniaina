module.exports = {
    getSearchQuery
};
function getSearchQuery(stringQuery){
    if(!stringQuery || stringQuery === ''){
        return {};
    }
    var query = {
        "$or": [
           {
               name:{
                   $regex: '.*'+stringQuery+".*"
               }
           }
        ]
    }
    return query; 
}