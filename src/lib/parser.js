'use strict';

/**
 * Transform a line protocol entry into JSON
 *
 * measurement[,tag_key1=tag_value1...] field_key=field_value[,field_key2=field_value2] [timestamp]
 *
 * @param  {Buffer} point Line protocol point
 * @return {Object}       JSON representation
 */
module.exports.lineToJSON = function(point){

    if(point) {
        point = point.toString();
    }

    if(!point || typeof point !== 'string'){
        console.warn('Parser Error: invalid point format ', point);
        return {};
    }

    var out = {};

    try {
        out = parse(point);
    } catch(e){
        console.error('LineParser error');
        console.error('point: %s', point);
        console.error('error: %s', e.message);
        console.error('stack: %s', e.stack);
    }

    return out;
};

function parse(point){
    var parts = point.split(' ');

    var measurement,
        tags = parts[0],
        fields = parts[1],
        timestamp = parts[2];

    tags = tags.split(',');
    fields = fields.split(',');

    measurement = tags.shift();

    var key, value;
    tags = tags.map(function(tag){
        key = tag.split('=')[0];
        value = tag.split('=')[1];
        var out = {};
        out[key] = value;
        return out;
    });

    fields = fields.map(function(field){
        key = field.split('=')[0];
        value = field.split('=')[1];
        var out = {};
        out[key] = JSON.parse(value);
        return out;
    });

    timestamp = parseInt(timestamp);

    return {
        timestamp: timestamp,
        measurement: measurement,
        fields: fields,
        tags: tags
    };
}


// var o = module.exports.lineToJSON('access_granted,building=MTL01,type=access_granted value=1,userid="53e118c0-da47-0133-d6d4-1a37fdb00f9d",username="Tran",portalname="ww-mtl01-4th-fl-mantrap-mailroom" 1470957807655000000');
// console.log(o)
