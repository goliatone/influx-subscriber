'use strict';

/**
 * Transform a line protocol entry into JSON
 * Read more at InfluxDB [documentation][1] page.
 * [1]:https://docs.influxdata.com/influxdb/v0.13/write_protocols/write_syntax/
 *
 * The basic format is as follows:
 * ```
 * measurement[,tag_key1=tag_value1...] field_key=field_value[,field_key2=field_value2] [timestamp]
 * ```
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
        out[key] = cast(value);
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

function cast(value){
    /*
     * Integers: 344i
     */
    if(value.match(/^\d+i$/m)){
        value = value.slice(0, -1);
        return parseInt(value);
    }

    /* boolean true
     * t, T, true, True, or TRUE
     */
    if(value.match(/^t$|^true$/im)){
        return true;
    }

    /* boolean false
     * f, F, false, False, or FALSE
     */
    if(value.match(/^f$|^false$/im)){
        return false;
    }

    if(value.match(/^"(.*)"$/)){
        value = value.match(/^"(.*)"$/);
        if(value.length === 2){
            return value[1];
        }
    }

    if(!isNaN(value)) return parseFloat(value);

    return undefined;

}
