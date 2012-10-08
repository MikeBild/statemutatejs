var vows = require('vows'),
    assert = require('assert');

var sm = require('../lib/statemutate.js')

vows.describe('With basic state projection').addBatch({
    'When no initital state defined and no elements arranged': {
        topic: function () { 
            var sut = new sm.Projections();
            return sut;
        },
        'we get a empty string as final state': function (topic) {
            assert.equal(topic.perform(), '');
        }
    },
    'When a simple initial state and a element added': {
        topic: function () { 
            var sut = new sm.Projections();
            sut
                .append({
                    payload: 'tests'
                })
                .for({
                    text: ''
                })
                .with(function(state, message) {
                    state.text += message.payload;
                    return state;
                })
            return sut.perform();
        },

        'we get other final state': {
            'has a final "test" state': function (topic) {
                assert.equal(topic.text, 'test');
            },
            'is not a empty string': function (topic) {
                assert.notEqual(topic, '');
            }
        }
    }
}).export(module);