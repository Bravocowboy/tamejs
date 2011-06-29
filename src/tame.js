//
// Functions to support the tame runtime!  Needs to required in every tame-
//   generated file.
//
function callChain (l) {
    if (l.length) {
	var first = l.shift ();
	first (function () { callChain (l); });
    }
};

function end () {}

function Event (k) {
    this._count = 1;
    this._continuation = k;
    this.trigger = function () {
	this._count--;
	if (this._count == 0) {
	    this._continuation ();
	}
    };
    this.mkevent = function () {
	this._count++;
	var x = this;
	return (function () { x.trigger (); });
    };
    return this;
};

var tame = {
    callChain : callChain,
    end : end,
    Event : Event,

    // Global labels for unadorned 'continue' and 'break' calls
    __k_global : { k_break : null, k_continue : null }
};

exports.tame = tame;
