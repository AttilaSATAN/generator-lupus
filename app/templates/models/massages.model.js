'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: {
        type: String,
        required: 'MESSAGE_REQUIRED',
        default: '',
        trim:true
    }
});

mongoose.model('Message', MessageSchema);
